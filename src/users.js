const connectDB = require("./conn");
const { generateAccessToken } = require("./jwt");
const { encryptData, decryptData } = require("./encryptation");

module.exports = {
  getUsers: async () => {
    const db = await connectDB();
    const data = await db.collection("user").find({}).toArray();

    return {
      statusOk: !!data,
      users: data,
    };
  },
  update: async (email, body) => {
    const db = await connectDB();
    const userCollections = db.collection("user");
    if (body.password) {
      body.password = encryptData(body.password);
    }
    const updateResponse = await userCollections.updateOne(
      { email: email },
      { $set: body }
    );
    if (updateResponse) {
      return {
        statusOk: !!updateResponse,
        user: null,
      };
    }
    return {
      statusOk: false,
      user: null,
      errorMessagge: "Error updating user. Try again",
    };
  },
  getUserByEmail: async (email, passwordType) => {
    const db = await connectDB();
    const userCollections = db.collection("user");
    const data = await userCollections.findOne({ email: email });

    if (data) {
      if (passwordType === "decrypted")
        data.password = decryptData(data.password);
      return {
        statusOk: !!data,
        user: data,
      };
    }
    return {
      statusOk: false,
      user: null,
      errorMessagge: "User not found",
    };
  },
  getUserByPersonalInfo: async (username, email, phone) => {
    const db = await connectDB();
    const userCollections = db.collection("user");
    const data = await userCollections.findOne({
      $or: [{ email: email }, { username: username }, { phone: phone }],
    });

    if (data) {
      return {
        statusOk: !!data,
        user: data,
      };
    }
    return {
      statusOk: false,
      user: null,
      errorMessagge: "User not found",
    };
  },
  login: async (username, password) => {
    const db = await connectDB();
    if (username && password) {
      const userCollections = db.collection("user");
      const data = await userCollections.findOne({
        $or: [{ email: username }, { username: username }],
      });

      if (data && decryptData(data.password) === password) {
        data.password = password;
        return {
          statusOk: !!data,
          user: data,
          token: generateAccessToken({ username: username }),
        };
      } else {
        return {
          statusOk: false,
          user: null,
          errorMessagge: "Username or Password incorrect",
        };
      }
    } else {
      return {
        statusOk: false,
        user: null,
        errorMessagge: "Username or Password not provided",
      };
    }
  },
  createAccount: async (body) => {
    const db = await connectDB();
    if (body) {
      const userCollections = db.collection("user");

      const data = await userCollections.findOne({
        $or: [
          { email: body.email },
          { username: body.username },
          { phone: body.phone },
        ],
      });

      if (data) {
        return {
          statusOk: false,
          user: null,
          errorMessagge: "Username, Email or Phone already registered",
        };
      } else {
        const responseCreate = await userCollections.insertOne(body);

        if (responseCreate) {
          const data = await userCollections.findOne({ email: body.email });

          if (data) {
            data.password = decryptData(body.password);
            return {
              statusOk: !!data,
              user: data,
              token: generateAccessToken({ username: body.username }),
            };
          }
        }

        return {
          statusOk: false,
          user: null,
          errorMessagge: "Error creating account",
        };
      }
    } else {
      return {
        statusOk: false,
        user: null,
        errorMessagge: "Missing Information",
      };
    }
  },
  deleteUser: async (email) => {
    const db = await connectDB();
    const userCollections = db.collection("user");

    const deleteResponse = await userCollections.deleteOne({ email: email });

    if (deleteResponse) {
      if (deleteResponse.deletedCount == 1) {
        return {
          statusOk: !!deleteResponse,
          user: null,
        };
      }
      return {
        statusOk: false,
        user: null,
        errorMessagge: "User not found",
      };
    }
    return {
      statusOk: false,
      user: null,
      errorMessagge: "Error deleting user. Try again",
    };
  },
};
