const dbConfig = require("./conn");

module.exports = {
  getUsers: async () => {
    const db = dbConfig.getDb();
    const data = await db.collection("user").find({}).toArray();

    return {
      statusOk: !!data,
      users: data,
    };
  },
  update: async (email, body) => {
    const db = dbConfig.getDb();
    const userCollections = db.collection("user");
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
  getUserByEmail: async (email) => {
    const db = dbConfig.getDb();
    const userCollections = db.collection("user");
    const data = await userCollections.findOne({ email: email });

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
  getUserByPersonalInfo: async (username, email, phone) => {
    const db = dbConfig.getDb();
    const userCollections = db.collection("user");
    console.log(email);
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
    const db = dbConfig.getDb();
    if (username && password) {
      const userCollections = db.collection("user");

      const data = await userCollections.findOne({
        $or: [{ email: username }, { username: username }],
      });

      if (data && data.password === password) {
        return {
          statusOk: !!data,
          user: data,
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
    const db = dbConfig.getDb();
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
            return {
              statusOk: !!data,
              user: data,
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
    const db = dbConfig.getDb();
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
