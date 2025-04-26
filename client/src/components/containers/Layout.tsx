import { Outlet } from "react-router";
import Navbar from "./Navbar";
import { Toaster } from "sonner";

const Layout = () => {
  return (
    <div>
      <Navbar />
      <div className="px-44 mt-8">
        <Outlet />
      </div>
      <Toaster />
    </div>
  );
};

export default Layout;
