import { Table, Entity } from "dynamodb-toolbox";
import DynamoDB from "aws-sdk/clients/dynamodb";

const DocumentClient = new DynamoDB.DocumentClient({
  convertEmptyValues: false,
  region: "eu-west-1",
});

const UsersTable = new Table({
  name: "users",
  partitionKey: "id",
  DocumentClient,
});

export const UserEntity = new Entity({
  name: "Payment",
  attributes: {
    id: { partitionKey: true },
    name: { type: "string" },
    dob: { type: "string" },
    phone: { type: "string" },
    address: { type: "map" },
  },
  table: UsersTable,
} as const);
