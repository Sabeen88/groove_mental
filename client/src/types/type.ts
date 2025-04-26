export type User = {
  name: string;
  email: string;
  password: string;
};

export type UserLogin = {
  email: string;
  password: string;
};

export type Product = {
  _id: string;
  name: string;
  brand: string;
  image: string;
  price: number;
};
