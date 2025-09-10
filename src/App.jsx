import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Login from "./pages/Login/Login";
import Signup from "./pages/Signup/Signup";
import Home from "./pages/Home/Home";
import Layout from "./components/layout/Layout";
import { Toaster } from "react-hot-toast";
import ProtcetedRoute from "./components/ProtcetedRoute/ProtcetedRoute";
import GusetRoute from "./components/GuestRoute/GusetRoute";
import CartProvider from "./context/Cart.context";
import Cart from "./pages/Cart/Cart";
import ProductDetails from "./pages/ProductDetails/ProductDetails";
import Checkout from "./pages/Checkout/Checkout";
import Orders from "./pages/Orders/Orders";
import Offline from "./components/Offline/Offline";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import Categories from "./pages/Categories/Categories";
import Products from "./pages/Products/Products";
import WishlistProvider from "./context/Wishlist.Context";
import Wishlist from "./pages/Wishlist/Wishlist";
import ForgetPassword from "./pages/ForgetPassword/ForgetPassword";
import Sendcode from "./pages/SendCode/Sendcode";
import Brands from "./pages/Brands/Brands";
import UserPorvider from "./context/Userr.contex";
import Verify from "./pages/Verify/Verify";

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: (
        <ProtcetedRoute>
          <Layout />
        </ProtcetedRoute>
      ),
      children: [
        {
          index: true,
          element: <Home />,
        },
        {
          path: "cart",
          element: <Cart />,
        },
        {
          path: "product/:id",
          element: <ProductDetails />,
        },
        {
          path: "checkout",
          element: <Checkout />,
        },
        {
          path: "allorders",
          element: <Orders />,
        },
        {
          path: "categories",
          element: <Categories />,
        },
        {
          path: "products",
          element: <Products />,
        },
        {
          path: "wishlist",
          element: <Wishlist />,
        },
        {
          path: "brands",
          element: <Brands />,
        },
      ],
    },
    {
      path: "/",
      element: (
        <GusetRoute>
          <Layout />
        </GusetRoute>
      ),
      children: [
        {
          path: "/login",
          element: <Login />,
        },
        {
          path: "/signup",
          element: <Signup />,
        },
        {
          path: "/forgetpasssword",
          element: <ForgetPassword />,
        },
        {
          path: "/sendcode",
          element: <Sendcode />,
        },
        {
          path: "/verify",
          element: <Verify />,
        },
      ],
    },
  ]);
  const myClient = new QueryClient();
  return (
    <>
      <QueryClientProvider client={myClient}>
        <UserPorvider>
          <CartProvider>
            <WishlistProvider>
              <RouterProvider router={router} />
            </WishlistProvider>
          </CartProvider>
        </UserPorvider>

        <Toaster position="top-center" reverseOrder={false} />
        <ReactQueryDevtools initialIsOpen={false} />
      </QueryClientProvider>

      <Offline>
        <div className="p-4 fixed right-8 bottom-8 z-10 rounded-lg shadow bg-gray-300 text-gray-600">
          <i className="fa-solid fa-wifi mr-2"></i>
          <span>Check Your Intrenet</span>
        </div>
      </Offline>
    </>
  );
}

export default App;
