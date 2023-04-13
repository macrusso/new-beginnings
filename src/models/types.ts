export interface User {
  id?: string;
  name: string;
  dob: string;
  phone: string;
  address: Address;
}

export interface UserUpdate {
  id: string;
  name?: string;
  dob?: string;
  phone?: string;
  address?: Address;
}

export interface Address {
  street1: string;
  street2?: string;
  city: string;
  postcode: string;
}
