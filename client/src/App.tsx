import { Route, Routes } from "react-router";
import { Login } from "./pages/LoginPage";
import { RegisterPage } from "./pages/RegisterPage";
import Layout from "./components/containers/Layout";
import GuitarPage from "./pages/GuitarPage";
import BassPage from "./pages/BassPage";
import ProductsPage from "./pages/ProductsPage";
import Cart from "./pages/Cart";
import AdminLayout from "./components/containers/AdminLayout";
import DisplayProducts from "./pages/admin/DisplayProducts";
import AddProducts from "./pages/admin/AddProducts";
import DisplayUsers from "./pages/admin/DisplayUsers";
import AccessoriesPage from "./pages/AccessoriesPage";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<ProductsPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/products" element={<ProductsPage />} />
        <Route path="/guitar" element={<GuitarPage />} />
        <Route path="/bass" element={<BassPage />} />
        <Route path="/accessories" element={<AccessoriesPage />} />
        <Route path="/cart" element={<Cart />} />
      </Route>
      <Route path="/admin" element={<AdminLayout />}>
        <Route path="admin/" element={<DisplayProducts />} />
        <Route path="admin/add" element={<AddProducts />} />
        <Route path="admin/users" element={<DisplayUsers />} />
      </Route>
    </Routes>
  );
}

export default App;
