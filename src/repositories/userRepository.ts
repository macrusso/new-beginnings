import { User, UserUpdate } from "../models/types";
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

export const update = async (item: UserUpdate): Promise<User> => {
  const { Attributes } = await UserEntity.update(
    {
      ...item,
      id: item.id,
    },
    { returnValues: "UPDATED_NEW" },
  );

  if (!Attributes) {
    throw new Error("No updated user");
  } else {
    return {
      id: Attributes.id,
      name: Attributes.name,
      dob: Attributes.dob,
      phone: Attributes.phone,
      address: Attributes.address,
    };
  }
};

export const remove = async (id: string): Promise<Boolean> => {
  await UserEntity.delete({
    id,
  });

  return true;
};

export const getOne = async (id: string): Promise<User> => {
  const { Item } = await UserEntity.get({
    id,
  });

  if (!Item) {
    throw new Error("No user");
  } else {
    return {
      id: Item.id,
      name: Item.name,
      dob: Item.dob,
      phone: Item.phone,
      address: Item.address,
    };
  }
};
