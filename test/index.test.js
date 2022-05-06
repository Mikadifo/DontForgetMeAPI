const supertest = require("supertest");
const app = require("./../src/index");
const request = supertest(app);

describe("API correct entry data test", () => {
  describe("GET /", () => {
    it("Example default get", async () => {
      const res = await request.get("/");

      expect(res.status).toBe(204);
    });
  });

  describe("POST /user/create", () => {
    it("Example post creating user", async () => {
      const res = await request.post("/user/create").send({
        phone: "1231239798",
        password: "Example@1234",
        things: [],
        emergencyContacts: [],
        email: "aws@aws.lambda.com",
        username: "iam-user",
        schedules: [],
      });

      expect(res.status).toBe(201);
      expect(res.body.statusOk).toBe(true);
    });
  });

  describe("GET /users", () => {
    it("Example get all users", async () => {
      const res = await request.get("/users");

      expect(res.status).toBe(200);
      expect(res.body.statusOk).toBe(true);
      expect(res.body.users.length).toBe(1);
    });
  });

  describe("GET /user/:email", () => {
    it("Example get user by email", async () => {
      const exampleEmail = "aws@aws.lambda.com";
      const res = await request.get(`/user/${exampleEmail}`);

      expect(res.status).toBe(200);
      expect(res.body.statusOk).toBe(true);
      expect(res.body.user.email).toBe(exampleEmail);
    });
  });

  describe("POST /login", () => {
    it("Example login user", async () => {
      const examplePhone = "1231239798";
      const res = await request.post("/login").send({
        username: "iam-user",
        password: "Example@1234",
      });

      expect(res.status).toBe(200);
      expect(res.body.statusOk).toBe(true);
      expect(res.body.user.phone).toBe(examplePhone);
    });
  });

  describe("PUT /user/update/:email", () => {
    it("Example put user update", async () => {
      const res = await request.put("/user/update/aws@aws.lambda.com").send({
        phone: "90909090090",
        username: "test-iam",
      });

      expect(res.status).toBe(200);
      expect(res.body.statusOk).toBe(true);
    });
  });

  describe("POST /user/by/personal_info", () => {
    it("Example get user by personal info", async () => {
      const responseName = "test-iam";
      const res = await request.post("/user/by/personal_info").send({
        email: "",
        username: "",
        phone: "90909090090",
      });

      expect(res.status).toBe(200);
      expect(res.body.statusOk).toBe(true);
      expect(res.body.user.username).toBe(responseName);
    });
  });

  describe("DELETE /user/delete/:email", () => {
    it("Example deletee user remove", async () => {
      const res = await request.delete("/user/delete/aws@aws.lambda.com");

      expect(res.status).toBe(200);
      expect(res.body.statusOk).toBe(true);
    });
  });

  describe("GET /users", () => {
    it("Example get all users after delete", async () => {
      const res = await request.get("/users");

      expect(res.status).toBe(200);
      expect(res.body.statusOk).toBe(true);
      expect(res.body.users.length).toBe(0);
    });
  });
});
