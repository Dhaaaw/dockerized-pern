const expect = require("chai").expect;
const request = require("supertest");
const app = require("../server.js");
const helpers = require("./helpers");

describe("Server", () => {
  it("GET /", async () => {
    const response = await request(app).get("/");

    expect(response.statusCode).to.equal(200);
  });
});

describe("User API Endpoint Tests", () => {
  context("GET /users", () => {
    it("GET /api/user", async () => {
      const response = await request(app).get("/api/user");

      expect(response.statusCode).to.equal(200);
    });

    it("GET /api/user/:searchValue", async () => {
      const user = await helpers.createUser();

      const response = await request(app).get(
        `/api/user/${user.user.username}`
      );

      expect(response.statusCode).to.equal(200);
    });
  });

  context("POST /api/auth/", () => {
    it("POST /api/auth/signup", async () => {
      let user = {
        name: "test",
        email: "test@continious.com",
        password: "idk",
      };

      const response = await request(app).post("/api/auth/signup").send(user);

      expect(response.statusCode).to.equal(200);
    });

    it("POST /api/auth/signin Success login", async () => {
      let user = {
        name: "test",
        email: "test@continious.com",
        password: "idk",
      };

      const response = await request(app).post("/api/auth/signin").send(user);

      expect(response.statusCode).to.equal(200);
    });

    it("POST /api/auth/signin Failed login", async () => {
      let user = {
        email: "test@continious.com",
        password: "xxxxxx",
      };

      const response = await request(app).post("/api/auth/signin").send(user);

      expect(response.statusCode).to.equal(401);
      expect(response.body).to.have.property("message");
      expect(response.body.message).to.equal("Invalid Password!");
    });

    it("POST /api/v1/users/login Failed login user not found", async () => {
      let user = {
        email: "dhia@continious.com",
        password: "xxxxxx",
      };

      const response = await request(app).post("/api/auth/signin").send(user);

      expect(response.statusCode).to.equal(404);
      expect(response.body).to.have.property("message");
      expect(response.body.message).to.equal("User Not found.");
    });
  });

  context("PUT /api", () => {
    it("PUT /api/user/update/:id Success update user", async () => {
      const userNew = {
        name: "testUserUpdate",
        email: "testUserUpdate@gmail",
      };

      const user = await helpers.createUser();

      const response = await request(app)
        .put(`/api/user/update/${user.user.id}`)
        .send(userNew);

      expect(response.statusCode).to.equal(200);
    });

    it("PUT /api/user/update/:id Failed update, user not found", async () => {
      const userNew = {
        name: "testUserUpdate",
        email: "testUserUpdate@gmail",
      };

      const idUserFake = 69;

      await helpers.createUser();

      const response = await request(app)
        .put(`/api/user/update/${idUserFake}`)
        .send(userNew);

      expect(response.statusCode).to.equal(401);
    });
  });
});
