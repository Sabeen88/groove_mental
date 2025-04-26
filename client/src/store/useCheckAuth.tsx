import { useEffect } from "react";
import { useAuthStore } from "@/store/useAuthStore";
import axios from "axios";

const useCheckAuth = () => {
  const setUser = useAuthStore((state) => state.setUser);

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (token) {
      // Token exists, fetch user data from backend
      axios
        .get("/api/users/profile", {
          headers: {
            Authorization: `Bearer ${token}`, // Send token in Authorization header
          },
        })
        .then((response) => {
          setUser(response.data); // Set user data in the store
        })
        .catch((error) => {
          console.error("Error fetching user data:", error);
          setUser(null); // If error occurs, set user as null
        });
    }
  }, [setUser]);
};

export default useCheckAuth;
