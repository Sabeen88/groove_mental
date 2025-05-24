import { useAuthStore } from "@/store/useAuthStore";
import { useEffect } from "react";

const DebugAuth = () => {
  const user = useAuthStore((state) => state.user);

  useEffect(() => {
    console.log("=== AUTH DEBUG INFO ===");
    console.log("User from store:", user);
    console.log("Token from localStorage:", localStorage.getItem("token"));
    console.log("User data from localStorage:", localStorage.getItem("user"));
    console.log(
      "Auth storage from localStorage:",
      localStorage.getItem("auth-storage")
    );
    console.log("======================");
  }, [user]);

  return (
    <div className="p-4 border rounded bg-gray-100 m-4">
      <h3 className="font-bold mb-2">Auth Debug Info:</h3>
      <div className="text-sm space-y-1">
        <div>User exists: {user ? "Yes" : "No"}</div>
        <div>User ID: {user?._id || "N/A"}</div>
        <div>User email: {user?.email || "N/A"}</div>
        <div>User token: {user?.token ? "Present" : "Missing"}</div>
        <div>
          LocalStorage token:{" "}
          {localStorage.getItem("token") ? "Present" : "Missing"}
        </div>
        <div>Is Admin: {user?.isAdmin ? "Yes" : "No"}</div>
      </div>
      <button
        onClick={() => {
          console.log("Full user object:", user);
          console.log("Full localStorage:", localStorage);
        }}
        className="mt-2 px-2 py-1 bg-blue-500 text-white rounded text-xs"
      >
        Log Full Data
      </button>
    </div>
  );
};

export default DebugAuth;
