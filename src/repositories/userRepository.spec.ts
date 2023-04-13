import { User } from "../models/types";
import * as userRepo from "./userRepository";

describe("User Repository", () => {
  it("adds user successfully", async () => {
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

    const result = await userRepo.add(user);
    expect(result).toStrictEqual(user);
  });
});
