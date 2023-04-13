import { User } from "../models/types";
import { UserEntity } from "../models/user";

export const add = async (item: User): Promise<User> => {
  await UserEntity.put({
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
  });

  return item;
};
