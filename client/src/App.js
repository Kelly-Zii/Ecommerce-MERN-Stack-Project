import { BrowserRouter, Routes, Route } from "react-router-dom";
import Menu from "./ components/navs/Menu";
import Home from "./pages/Home";
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import { Toaster } from "react-hot-toast";
import Dashboard from "./pages/user/Dashboard";
import PrivateRoute from "./ components/routes/PrivateRoutes";
import AdminDashboard from "./pages/admin/Dashboard";
import AdminRoute from "./ components/routes/AdminRoutes";
import AdminCategory from "./pages/admin/Category";
import AdminProduct from "./pages/admin/Product";
import AdminProducts from "./pages/admin/Products";
import AdminProductUpdate from "./pages/admin/ProductUpdate";

import UserOrders from "./pages/user/Orders";
import UserProfile from "./pages/user/Profile";
import UserProduct from "./pages/user/Product";
import UserProducts from "./pages/user/Products.js"; 
import UserProductUpdate from "./pages/user/ProductUpdate";

import Shop from "./pages/Shop";
import CategoriesList from "./pages/CategoriesList";
import CategoryView from "./pages/CategoryView";
import Search from "./pages/Search";
import ProductView from "./pages/ProductView";
import Cart from "./pages/Cart";
import AdminOrders from "./pages/admin/Orders";
import FlightSearch from "./pages/FlightSearch";
import HotelSearch from "./pages/HotelSearch";

const PageNotFound = () => {
  return (
    <div className="d-flex justify-content-center align-items-center vh-100">
      404 | Page not found
    </div>
  );
};

export default function App() {
  return (
    <BrowserRouter>
      <Menu />
      <Toaster position="top-right"/>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/communities" element={<Shop />} />
        <Route path="/categories" element={<CategoriesList />} />
        <Route path="/category/:slug" element={<CategoryView />} />
        <Route path="/flights" element={<FlightSearch />}/>
        <Route path="/hotel" element={<HotelSearch />}/>
        <Route path="/cart" element={<Cart />} />
        <Route path="/search" element={<Search />} />
        <Route path="/blog/:slug" element={<ProductView />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/dashboard" element={<PrivateRoute />}>
          <Route path="user" element={<Dashboard />} />
          <Route path="user/profile" element={<UserProfile />} />
          <Route path="user/createblog" element={<UserProduct/>}/>
          <Route path="user/blogs" element={<UserProducts />} />
          <Route path="user/orders" element={<UserOrders />} />
          <Route
            path="auser/blog/update/:slug"
            element={<UserProductUpdate />}
          />
        </Route>
        <Route path="/dashboard" element={<AdminRoute />}>
          <Route path="admin" element={<AdminDashboard />} />
          <Route path="admin/category" element={<AdminCategory />} />
          <Route path="admin/createblog" element={<AdminProduct />} />
          <Route path="admin/blogs" element={<AdminProducts />} />
          <Route path="admin/orders" element={<AdminOrders />} />
          <Route
            path="admin/blog/update/:slug"
            element={<AdminProductUpdate />}
          />
        </Route>
        <Route path="*" element={<PageNotFound />} replace />
      </Routes>
    </BrowserRouter>
  );
}
