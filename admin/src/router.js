import { createBrowserRouter } from "react-router-dom";
import App from './App'
import NotFound from "./pages/NotFound";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Orders from "./pages/Orders";
import AddProduct from "./pages/AddProduct";
import AllProducts from "./pages/AllProducts";
import EditProduct from "./pages/EditProducts";
import FeaturedProducts from "./pages/FeaturedProducts";
import ManageCategory from "./pages/ManageCategory";
import ManageBrand from "./pages/ManageBrands";
import ResetPassword from "./pages/ResetPassword";

const router = createBrowserRouter([
    {
        path: '/',
        element: <App />,
        errorElement: <NotFound />
    },
    {
        path: '/login',
        element: <Login />
    },
    {
        path: '/signup',
        element: <Signup />
    },
    {
        path: '/orders',
        element: <Orders />
    },
    {
        path: '/add-product',
        element: <AddProduct />
    },
    {
        path: '/all-products',
        element: <AllProducts />
    },
    {
        path: '/edit-product/:id',
        element: <EditProduct />
    },
    {
        path: '/featured-products',
        element: <FeaturedProducts />
    },
    {
        path: '/manage-category',
        element: <ManageCategory />
    },
    {
        path: '/manage-brands',
        element: <ManageBrand />
    },
    {
        path: '/reset-password',
        element: <ResetPassword />
    }
]);

export default router;