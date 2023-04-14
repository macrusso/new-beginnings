import { APIGatewayProxyEvent } from "aws-lambda";
import { User } from "../models/types";
import * as userService from "../services/userService";

interface Response {
  statusCode: number;
  body: string;
}

export const postPayment = async (event: APIGatewayProxyEvent): Promise<Response> => {
  const body = JSON.parse(event.body || "{}") as User;

  const result = await userService.add(body);

  return {
    statusCode: 200,
    body: JSON.stringify(result),
  };
};
