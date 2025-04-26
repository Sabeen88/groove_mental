import { ThemeProvider } from "@/components/theme-provider";
import { Outlet } from "react-router";
import AdminNavbar from "./AdminNavbar";

function AdminLayout() {
  return (
    <ThemeProvider defaultTheme="light" storageKey="vite-ui-theme">
      <div>
        <AdminNavbar />
      </div>
      <div className="px-44 mt-8">
        <Outlet />
      </div>
    </ThemeProvider>
  );
}

export default AdminLayout;
