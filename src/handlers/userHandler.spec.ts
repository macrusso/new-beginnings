import { APIGatewayProxyEvent } from "aws-lambda";
import { addUser, updateUser, removeUser, getOneUser } from "./userHandler";
import { User, UserUpdate } from "../models/types";
import * as userService from "../services/userService";

describe("App Handlers", () => {
  const id = "some_id";
  const userNoId: User = {
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
  const userWithId = {
    ...userNoId,
    id,
  };
  const userToUpdate: UserUpdate = {
    id: "some_id",
    address: {
      street1: "Flat 1, New Building",
      street2: "10 New Street",
      city: "Oxford",
      postcode: "OX10 3OX",
    },
  };
  describe("add user", () => {
    it("Returns stringified results on add user", async () => {
      const payload = {
        body: JSON.stringify(userNoId),
        httpMethod: "POST",
      } as any as APIGatewayProxyEvent;

      const createMock = jest.spyOn(userService, "add");
      createMock.mockResolvedValue(userWithId);

      const result = await addUser(payload);

      expect(result).toStrictEqual({
        statusCode: 200,
        body: JSON.stringify(userWithId),
      });
    });

    it("Throws when wrong httpMethod is used", async () => {
      const payload = {
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
        body: `Empty body`,
      });
    });

    it("Throws when service errors out", async () => {
      const payload = {
        body: JSON.stringify(userNoId),
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
    it("Returns stringified results on update user", async () => {
      const payload = {
        body: JSON.stringify(userToUpdate),
        httpMethod: "PUT",
      } as any as APIGatewayProxyEvent;

      const createMock = jest.spyOn(userService, "update");
      createMock.mockResolvedValue({ ...userNoId, ...userToUpdate });

      const result = await updateUser(payload);

      expect(result).toStrictEqual({
        statusCode: 200,
        body: JSON.stringify({
          ...userNoId,
          ...userToUpdate,
        }),
      });
    });

    it("Throws when wrong httpMethod is used", async () => {
      const payload = {
        httpMethod: "GET",
      } as any as APIGatewayProxyEvent;

      const result = await updateUser(payload);

      expect(result).toStrictEqual({
        statusCode: 500,
        body: `Only accepts PUT method, you tried: GET method.`,
      });
    });

    it("Throws when empty no body is provided", async () => {
      const payload = {
        httpMethod: "PUT",
      } as any as APIGatewayProxyEvent;

      const result = await updateUser(payload);

      expect(result).toStrictEqual({
        statusCode: 500,
        body: `Empty body`,
      });
    });

    it("Throws when service errors out", async () => {
      const payload = {
        body: JSON.stringify(userToUpdate),
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

  describe("remove user", () => {
    it("Returns stringified confirmation on remove user", async () => {
      const payload = {
        body: JSON.stringify({ id }),
        httpMethod: "DELETE",
      } as any as APIGatewayProxyEvent;

      const createMock = jest.spyOn(userService, "remove");
      createMock.mockResolvedValue(true);

      const result = await removeUser(payload);

      expect(result).toStrictEqual({
        statusCode: 200,
        body: JSON.stringify(true),
      });
    });

    it("Throws when wrong httpMethod is used", async () => {
      const payload = {
        httpMethod: "GET",
      } as any as APIGatewayProxyEvent;

      const result = await removeUser(payload);

      expect(result).toStrictEqual({
        statusCode: 500,
        body: `Only accepts DELETE method, you tried: GET method.`,
      });
    });

    it("Throws when empty no body is provided", async () => {
      const payload = {
        httpMethod: "DELETE",
      } as any as APIGatewayProxyEvent;

      const result = await removeUser(payload);

      expect(result).toStrictEqual({
        statusCode: 500,
        body: `Empty body`,
      });
    });

    it("Throws when service errors out", async () => {
      const payload = {
        body: JSON.stringify({ id }),
        httpMethod: "DELETE",
      } as any as APIGatewayProxyEvent;

      const createMock = jest.spyOn(userService, "remove");
      createMock.mockRejectedValue({
        statusCode: 400,
        message: "Bad Request",
      });

      const result = await removeUser(payload);

      expect(result).toStrictEqual({
        statusCode: 400,
        body: `Bad Request`,
      });
    });
  });

  describe("get one user", () => {
    it("Returns stringified result on get one user", async () => {
      const payload = {
        body: JSON.stringify({ id }),
        httpMethod: "GET",
      } as any as APIGatewayProxyEvent;

      const createMock = jest.spyOn(userService, "getOne");
      createMock.mockResolvedValue(userWithId);

      const result = await getOneUser(payload);

      expect(result).toStrictEqual({
        statusCode: 200,
        body: JSON.stringify(userWithId),
      });
    });

    it("Throws when wrong httpMethod is used", async () => {
      const payload = {
        httpMethod: "PUT",
      } as any as APIGatewayProxyEvent;

      const result = await getOneUser(payload);

      expect(result).toStrictEqual({
        statusCode: 500,
        body: `Only accepts GET method, you tried: PUT method.`,
      });
    });

    it("Throws when empty no body is provided", async () => {
      const payload = {
        httpMethod: "GET",
      } as any as APIGatewayProxyEvent;

      const result = await getOneUser(payload);

      expect(result).toStrictEqual({
        statusCode: 500,
        body: `Empty body`,
      });
    });

    it("Throws when service errors out", async () => {
      const payload = {
        body: JSON.stringify({ id }),
        httpMethod: "GET",
      } as any as APIGatewayProxyEvent;

      const createMock = jest.spyOn(userService, "getOne");
      createMock.mockRejectedValue({
        statusCode: 400,
        message: "Bad Request",
      });

      const result = await getOneUser(payload);

      expect(result).toStrictEqual({
        statusCode: 400,
        body: `Bad Request`,
      });
    });
  });
});
