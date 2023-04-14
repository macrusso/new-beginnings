import { User, UserUpdate } from "../models/types";
import * as userRepo from "../repositories/userRepository";

export const add = async (user: User): Promise<User> => {
  // assuming we use another service to get userID
  // we'd need to have another adapter to that service
  // and call it here to get new id and pass it with the user to DB
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

export const remove = async (id: string): Promise<Boolean> => {
  return await userRepo.remove(id);
};

export const getOne = async (id: string): Promise<User> => {
  return await userRepo.getOne(id);
};
