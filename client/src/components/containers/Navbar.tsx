import { NavLink, useNavigate } from "react-router";
import { Button } from "../ui/button";
import { useAuthStore } from "@/store/useAuthStore";
import { ShoppingCart } from "lucide-react";

const Navbar = () => {
  const user = useAuthStore((state) => state.user);
  const setUser = useAuthStore((state) => state.setUser);
  const navigate = useNavigate(); // Use navigate for redirection

  const handleLogout = () => {
    // Remove the token from localStorage
    localStorage.removeItem("token");

    // Clear user state in Zustand
    setUser(null);

    // Redirect to login page
    navigate("/login");
  };

  const button =
    "relative rounded bg-muted px-[0.3rem] py-[0.2rem] font-mono text-sm font-semibold";

  return (
    <div className="py-6 px-44 border-b-2 shadow-md flex justify-between items-center">
      <h3 className="scroll-m-20 text-2xl font-semibold tracking-tight">
        Groove Mental
      </h3>

      <div className="flex items-center gap-4">
        <NavLink to={"/products"} className={button}>
          Products
        </NavLink>
        <NavLink to={"/guitar"} className={button}>
          Guitar
        </NavLink>
        <NavLink to={"/bass"} className={button}>
          Bass
        </NavLink>
        <NavLink to={"/accessories"} className={button}>
          Accesorries
        </NavLink>
      </div>

      {user ? (
        <div className="flex items-center gap-6">
          <span>Hello, {user.name}</span>
          <NavLink to="/cart" className="bg-secondary p-2 rounded-full">
            <ShoppingCart width={18} height={18} />
          </NavLink>

          <Button onClick={handleLogout}>Logout</Button>
          {/* You can add Logout button too */}
        </div>
      ) : (
        <div className="gap-4 flex items-center">
          <NavLink to={"/register"}>
            <Button variant={"secondary"}>Sign Up</Button>
          </NavLink>
          <NavLink to={"/login"}>
            <Button>Sign In</Button>
          </NavLink>
        </div>
      )}
    </div>
  );
};

export default Navbar;
