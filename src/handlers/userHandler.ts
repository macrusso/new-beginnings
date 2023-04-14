import { APIGatewayProxyEvent } from "aws-lambda";
import { User } from "../models/types";
import * as userService from "../services/userService";

interface Response {
  statusCode: number;
  body: string;
}

export const addUser = async (event: APIGatewayProxyEvent): Promise<Response> => {
  try {
    if (event.httpMethod !== "POST") {
      throw new Error(`Only accepts POST method, you tried: ${event.httpMethod} method.`);
    }

    const body = JSON.parse(event.body || "{}") as User;

    const result = await userService.add(body);

    return {
      statusCode: 200,
      body: JSON.stringify(result),
    };
  } catch (error: any) {
    return {
      statusCode: 500,
      body: error.message,
    };
  }
};
