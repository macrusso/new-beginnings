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
    if (Object.keys(body).length === 0) {
      throw new Error(`Empty payment body`);
    }

    const result = await userService.add(body);

    return {
      statusCode: 200,
      body: JSON.stringify(result),
    };
  } catch (error: any) {
    if (error.statusCode) {
      return {
        statusCode: error.statusCode,
        body: error.message,
      };
    } else {
      return {
        statusCode: 500,
        body: error.message,
      };
    }
  }
};
