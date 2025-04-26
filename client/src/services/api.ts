import axios from "axios";
// import Cookies from "js-cookie";

const API_URL = "http://localhost:5000/api/";
const axiosInstance = axios.create({ baseURL: API_URL });

type User = {
  name: string;
  email: string;
  password: string;
};

type UserLogin = {
  email: string;
  password: string;
};

// Auth
export const login = async (data: UserLogin) => {
  return await axiosInstance.post("users/auth", data, {
    withCredentials: true,
  });
};

export const register = async (data: User) => {
  return await axiosInstance.post("users/", data);
};

export const getUser = async () => {
  return await axiosInstance.get("users/profile");
};

export const getUsers = async () => {
  return await axiosInstance.get("users/all");
};

export const logout = async () => {
  return await axiosInstance.get("auth/logout");
};

// Products
export const getProducts = async () => {
  const response = await axiosInstance.get("products");
  return response.data;
};

export const getProductByCategory = async (category: string) => {
  const response = await axiosInstance.get("products");
  return response.data.filter((item: any) => item.category === category);
};

export const createProduct = async (data: any) => {
  return await axiosInstance.post("products", data, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};

// Cart
export const getCart = async () => {
  return await axiosInstance.get("cart", { withCredentials: true });
};

export const addToCart = async (data: {
  productId: string;
  quantity: number;
}) => {
  return await axiosInstance.post("cart", data, { withCredentials: true });
};
