import { User, UserUpdate } from "../models/types";
import { UserEntity } from "../models/user";
import * as userRepo from "./userRepository";

describe("User Repository", () => {
  const user: User = {
    id: "some_id",
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

  const userToUpdate: UserUpdate = {
    id: "some_id",
    address: {
      street1: "Flat 1, New Building",
      street2: "10 New Street",
      city: "Oxford",
      postcode: "OX10 3OX",
    },
  };
  it("adds user successfully", async () => {
    const createMock = jest.spyOn(UserEntity, "put");
    createMock.mockResolvedValue({});

    const result = await userRepo.add(user);

    expect(createMock).toBeCalledWith(user);
    expect(result).toStrictEqual(user);
  });

  it("updates user successfully", async () => {
    const userWithNewAddress = {
      ...user,
      address: userToUpdate.address,
    };
    const createMock = jest.spyOn(UserEntity, "update");
    createMock.mockResolvedValue({
      Attributes: userWithNewAddress,
    });

    const result = await userRepo.update(userToUpdate);

    expect(createMock).toBeCalledWith(userToUpdate, { returnValues: "UPDATED_NEW" });
    expect(result).toStrictEqual(userWithNewAddress);
  });

  it("removes user successfully", async () => {
    const createMock = jest.spyOn(UserEntity, "delete");
    createMock.mockResolvedValue({});

    const result = await userRepo.delete("some_id");

    expect(createMock).toBeCalledWith({ id: "some_id" });
    expect(result).toEqual(true);
  });
});
