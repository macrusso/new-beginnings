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
      throw new Error(`Empty body`);
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

export const updateUser = async (event: APIGatewayProxyEvent): Promise<Response> => {
  try {
    if (event.httpMethod !== "PUT") {
      throw new Error(`Only accepts PUT method, you tried: ${event.httpMethod} method.`);
    }

    const body = JSON.parse(event.body || "{}") as User;
    if (Object.keys(body).length === 0) {
      throw new Error(`Empty body`);
    }

    const id = event.pathParameters?.id || "";
    if (!id) {
      throw new Error(`Missing ID`);
    }

    const result = await userService.update({
      ...body,
      id: body.id as string,
    });

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

export const removeUser = async (event: APIGatewayProxyEvent): Promise<Response> => {
  try {
    if (event.httpMethod !== "DELETE") {
      throw new Error(`Only accepts DELETE method, you tried: ${event.httpMethod} method.`);
    }

    const id = event.pathParameters?.id || "";
    if (!id) {
      throw new Error(`Missing ID`);
    }

    const result = await userService.remove(id);

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

export const getOneUser = async (event: APIGatewayProxyEvent): Promise<Response> => {
  try {
    if (event.httpMethod !== "GET") {
      throw new Error(`Only accepts GET method, you tried: ${event.httpMethod} method.`);
    }

    const id = event.pathParameters?.id || "";
    if (!id) {
      throw new Error(`Missing ID`);
    }

    const result = await userService.getOne(id);

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
