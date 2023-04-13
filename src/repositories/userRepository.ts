import { User } from "../models/types";

export const add = async (item: User): Promise<User> => {
  return {
    id: item.id,
    name: item.name,
    dob: item.dob,
    phone: item.phone,
    address: {
      street1: item.address.street1,
      street2: item.address.street2,
      city: item.address.city,
      postcode: item.address.postcode,
    },
  };
};
