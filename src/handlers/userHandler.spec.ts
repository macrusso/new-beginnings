import { APIGatewayProxyEvent } from "aws-lambda";
import { addUser } from "./userHandler";
import { User } from "../models/types";
import * as userService from "../services/userService";

describe("App Handlers", () => {
  describe("add user", () => {
    it("Returns stringified results on add user", async () => {
      const id = "some_id";
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
  });
});
