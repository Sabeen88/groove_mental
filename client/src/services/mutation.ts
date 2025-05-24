import { useMutation, useQueryClient } from "@tanstack/react-query";
import { login, register } from "@/services/api"; // Adjust path as needed
import { User, UserLogin } from "@/types/type"; // or wherever your User type is
import axios from "axios";

export const useRegister = () => {
  return useMutation({
    mutationFn: (data: User) => register(data),
  });
};

export const useLogin = () => {
  return useMutation({
    mutationFn: (data: UserLogin) => login(data),
  });
};

export const useCreateProduct = () => {
  return useMutation({
    mutationFn: async (data: FormData) => {
      const res = await axios.post("http://localhost:5000/api/products", data, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      return res.data;
    },
  });
};

export const useAddToCart = () => {
  return useMutation({
    mutationFn: async (data: { productId: string; quantity: number }) => {
      const res = await axios.post("http://localhost:5000/api/cart", data, {
        withCredentials: true,
      });
      return res.data;
    },
  });
};

export const useDeleteProduct = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id: string) => {
      await axios.delete(`http://localhost:5000/api/products/${id}`);
    },
    onSuccess: () => {
      // Invalidate and refetch
      queryClient.invalidateQueries({ queryKey: ["products"] });
    },
  });
};

export const useDeleteUser = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id: string) => {
      await axios.delete(`http://localhost:5000/api/users/profile/${id}`);
    },
    onSuccess: () => {
      // Invalidate and refetch
      queryClient.invalidateQueries({ queryKey: ["users"] });
    },
  });
};
