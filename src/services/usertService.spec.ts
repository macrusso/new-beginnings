import { User } from "../models/types";
import * as userService from "./userService";

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
    const result = await userService.add(userNoId);

    expect(result).toHaveProperty("id");
  });
});
