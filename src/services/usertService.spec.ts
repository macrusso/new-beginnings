import { User, UserUpdate } from "../models/types";
import * as userService from "./userService";
import * as userRepo from "../repositories/userRepository";

describe("User Service", () => {
  it("Adds id before storing in the db", async () => {
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
    const createMock = jest.spyOn(userRepo, "add");
    createMock.mockResolvedValue({ ...userNoId, id: "some_id" });

    const result = await userService.add(userNoId);

    expect(result).toHaveProperty("id");
  });

  it("Updates user", async () => {
    const userToUpdate: UserUpdate = {
      id: "some_id",
      address: {
        street1: "Flat 1, New Building",
        street2: "10 New Street",
        city: "Oxford",
        postcode: "OX10 3OX",
      },
    };

    const userWithNewAddress = {
      id: "some_id",
      name: "john doe",
      dob: "01-01-1900",
      phone: "+447000000000",
      address: {
        street1: "Flat 1, New Building",
        street2: "10 New Street",
        city: "Oxford",
        postcode: "OX10 3OX",
      },
    };
    const createMock = jest.spyOn(userRepo, "update");
    createMock.mockResolvedValue(userWithNewAddress);

    const result = await userService.update(userToUpdate);

    expect(result).toHaveProperty("id");
  });
});
