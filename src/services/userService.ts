import { User, UserUpdate } from "../models/types";
import * as userRepo from "../repositories/userRepository";

export const add = async (user: User): Promise<User> => {
  const userId = "some_id";
  const userToStore: User = {
    id: userId,
    name: user.name,
    dob: user.dob,
    phone: user.phone,
    address: {
      street1: user.address.street1,
      street2: user.address.street2,
      city: user.address.city,
      postcode: user.address.postcode,
    },
  };

  return await userRepo.add(userToStore);
};

export const update = async (user: UserUpdate): Promise<User> => {
  return await userRepo.update(user);
};
