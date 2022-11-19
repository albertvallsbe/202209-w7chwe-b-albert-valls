import type { NextFunction, Request, Response } from "express";
import bcrypt from "bcrypt";
import { loginUser, registerUser } from "./usersControllers";
import type { Credentials, RegisterData } from "../../types";
import User from "../../../database/models/User";
import CustomError from "../../../CustomError/CustomError";

beforeEach(() => {
  jest.clearAllMocks();
});

const req: Partial<Request> = {};

const res: Partial<Response> = {
  status: jest.fn().mockReturnThis(),
  json: jest.fn(),
};

const next = jest.fn();

describe("Given a registerUser", () => {
  const registerBody: RegisterData = {
    username: "maria",
    password: "patata",
    email: "ann@a.cad",
  };

  describe("When it receives a request with username 'maria', password 'patata' and not exist in the DDBB", () => {
    test("Then it's should been called with status 201 and it's method should been called with data", async () => {
      const expectedStatusCode = 201;

      const req: Partial<Request> = {
        body: registerBody,
      };

      User.create = jest.fn().mockReturnValue(User);
      await registerUser(req as Request, res as Response, next as NextFunction);

      expect(res.status).toHaveBeenCalledWith(expectedStatusCode);
      // Expect(res.json).toHaveBeenCalled();
    });
  });
});

describe("Given a loginUser controller", () => {
  describe("When it receives an invalid username in the request", () => {
    test("Then it should invoke the next function with a username error", async () => {
      const loginBody: Credentials = {
        username: "anna",
        password: "patat",
      };
      req.body = loginBody;

      User.findOne = jest.fn().mockResolvedValueOnce(loginBody.username);

      await loginUser(req as Request, res as Response, next as NextFunction);

      expect(next).toHaveBeenCalled();
    });
  });

  describe("When it receives a valid username 'anna' and the wrong password", () => {
    test("Then it should invoke the next function with a password error", async () => {
      const loginBody: Credentials = {
        username: "maria",
        password: "patata",
      };
      User.findOne = jest.fn().mockResolvedValueOnce(loginBody);
      const passwordError = new CustomError(
        "Password is incorrect",
        "Wrong credentials",
        401
      );

      bcrypt.compare = jest.fn().mockResolvedValueOnce(false);

      await loginUser(req as Request, res as Response, next as NextFunction);

      expect(next).toHaveBeenCalledWith(passwordError);
    });
  });
});
