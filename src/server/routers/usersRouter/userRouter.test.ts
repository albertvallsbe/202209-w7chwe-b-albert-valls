import request from "supertest";
import { MongoMemoryServer } from "mongodb-memory-server";
import mongoose from "mongoose";
import connectDb from "../../../database/connectDb";
import User from "../../../database/models/User";
import app from "../../app";
import type { RegisterData } from "../../types";

let server: MongoMemoryServer;

beforeAll(async () => {
  server = await MongoMemoryServer.create();
  await connectDb(server.getUri());
});

afterAll(async () => {
  await mongoose.disconnect();
  await server.stop();
});

beforeEach(async () => {
  await User.deleteMany();
});

describe("Given a POST method with /users/register endpoint", () => {
  describe("When it receives a request with username 'anna' and password 'patata' and email 'ann@a.com'", () => {
    test("Then it should respond with a 201 status and a user anna and id", async () => {
      const expectedStatus = 201;
      const registerInfo: RegisterData = {
        username: "anna",
        password: "patata",
        email: "ann@a.com",
      };

      const response = await request(app)
        .post("/users/register")
        .send(registerInfo)
        .expect(expectedStatus);

      const newUser = await User.findOne({ username: registerInfo.username });

      expect(response.body).toHaveProperty("username", registerInfo.username);
      expect(response.body).toHaveProperty("id", newUser.id);
    });
  });
});
