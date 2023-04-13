import { User } from "../models/types";

export const add = async (user: User): Promise<User> => {
  const userId = "some_id";
  const paymentToStore: User = {
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

  return paymentToStore;
};
