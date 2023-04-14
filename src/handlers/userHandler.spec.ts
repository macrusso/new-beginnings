import { APIGatewayProxyEvent } from "aws-lambda";
import { addUser } from "./userHandler";
import { User, UserUpdate } from "../models/types";
import * as userService from "../services/userService";

describe("App Handlers", () => {
  const user: User = {
    name: "john doe",
    dob: "01-01-1900",
    phone: "+447000000000",
    address: {
      street1: "Flat 1, Some Building",
      street2: "10 Nice Street",
      city: "London",
      postcode: "LL10 3LL",
    },
  };
  describe("add user", () => {
    it("Returns stringified results on add user", async () => {
      const id = "some_id";
      const payload = {
        body: JSON.stringify(user),
        httpMethod: "POST",
      } as any as APIGatewayProxyEvent;

      const createMock = jest.spyOn(userService, "add");
      createMock.mockResolvedValue({ ...user, id });

      const result = await addUser(payload);

      expect(result).toStrictEqual({
        statusCode: 200,
        body: JSON.stringify({
          ...user,
          id,
        }),
      });
    });

    it("Throws when wrong httpMethod is used", async () => {
      const payload = {
        body: JSON.stringify(user),
        httpMethod: "GET",
      } as any as APIGatewayProxyEvent;

      const result = await addUser(payload);

      expect(result).toStrictEqual({
        statusCode: 500,
        body: `Only accepts POST method, you tried: GET method.`,
      });
    });

    it("Throws when empty no body is provided", async () => {
      const payload = {
        httpMethod: "POST",
      } as any as APIGatewayProxyEvent;

      const result = await addUser(payload);

      expect(result).toStrictEqual({
        statusCode: 500,
        body: `Empty payment body`,
      });
    });

    it("Throws when service errors out", async () => {
      const payload = {
        body: JSON.stringify(user),
        httpMethod: "POST",
      } as any as APIGatewayProxyEvent;

      const createMock = jest.spyOn(userService, "add");
      createMock.mockRejectedValue({
        statusCode: 400,
        message: "Bad Request",
      });

      const result = await addUser(payload);

      expect(result).toStrictEqual({
        statusCode: 400,
        body: `Bad Request`,
      });
    });
  });

  describe("update user", () => {
    const userToUpdate: UserUpdate = {
      id: "some_id",
      address: {
        street1: "Flat 1, New Building",
        street2: "10 New Street",
        city: "Oxford",
        postcode: "OX10 3OX",
      },
    };
    it("Returns stringified results on update user", async () => {
      const payload = {
        body: JSON.stringify(userToUpdate),
        httpMethod: "PUT",
      } as any as APIGatewayProxyEvent;

      const createMock = jest.spyOn(userService, "update");
      createMock.mockResolvedValue({ ...user, ...userToUpdate });

      const result = await updateUser(payload);

      expect(result).toStrictEqual({
        statusCode: 200,
        body: JSON.stringify({
          ...user,
          ...userToUpdate,
        }),
      });
    });

    it("Throws when wrong httpMethod is used", async () => {
      const payload = {
        body: JSON.stringify(user),
        httpMethod: "GET",
      } as any as APIGatewayProxyEvent;

      const result = await updateUser(payload);

      expect(result).toStrictEqual({
        statusCode: 500,
        body: `Only accepts POST method, you tried: GET method.`,
      });
    });

    it("Throws when empty no body is provided", async () => {
      const payload = {
        httpMethod: "PUT",
      } as any as APIGatewayProxyEvent;

      const result = await updateUser(payload);

      expect(result).toStrictEqual({
        statusCode: 500,
        body: `Empty payment body`,
      });
    });

    it("Throws when service errors out", async () => {
      const payload = {
        body: JSON.stringify(user),
        httpMethod: "PUT",
      } as any as APIGatewayProxyEvent;

      const createMock = jest.spyOn(userService, "update");
      createMock.mockRejectedValue({
        statusCode: 400,
        message: "Bad Request",
      });

      const result = await updateUser(payload);

      expect(result).toStrictEqual({
        statusCode: 400,
        body: `Bad Request`,
      });
    });
  });
});
