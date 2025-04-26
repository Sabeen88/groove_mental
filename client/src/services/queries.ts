import { useQuery } from "@tanstack/react-query";
import { getProducts, getProductByCategory, getCart, getUsers } from "./api";

export const useAllUsers = () => {
  return useQuery({
    queryKey: ["users"],
    queryFn: () => getUsers(),
  });
};

export const useProducts = () => {
  return useQuery({
    queryKey: ["products"],
    queryFn: () => getProducts(),
  });
};

export const useProductsByCategory = (category: string) => {
  return useQuery({
    queryKey: ["productsCategory", category],
    queryFn: () => getProductByCategory(category),
  });
};

export const useCart = () => {
  return useQuery({
    queryKey: ["cart"],
    queryFn: () => getCart(),
  });
};
