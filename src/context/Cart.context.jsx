import { createContext, useContext, useState } from "react";
import { UserContext } from "./Userr.contex";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
export const CartContext = createContext(null);
export default function CartProvider({ children }) {
  const { token } = useContext(UserContext);
  const [cartInfo, setCartInfo] = useState(null);
  async function addProducttoCart({ productId }) {
    let toastId = toast.loading("Adding Product");
    try {
      const options = {
        url: "https://ecommerce.routemisr.com/api/v1/cart",
        method: "POST",
        headers: {
          token,
        },
        data: {
          productId,
        },
      };
      let { data } = await axios.request(options);
      if (data.status == "success") {
        toast.success(data.message);
        getCartProducts();
      }
    } catch (error) {
    } finally {
      toast.dismiss(toastId);
    }
  }
  async function getCartProducts() {
    try {
      const options = {
        url: "https://ecommerce.routemisr.com/api/v1/cart",
        method: "GET",
        headers: {
          token,
        },
      };
      let { data } = await axios.request(options);
      setCartInfo(data);
    } catch (error) {}
  }
  async function removeProduct({ productId }) {
    let toastId = toast.loading("Delteing Product");
    try {
      let options = {
        url: `https://ecommerce.routemisr.com/api/v1/cart/${productId}`,
        method: "DELETE",
        headers: {
          token,
        },
      };
      let { data } = await axios.request(options);
      if (data.status == "success") {
        toast.success("Product Deleted");
        setCartInfo(data);
      }
    } catch (error) {
    } finally {
      toast.dismiss(toastId);
    }
  }
  async function clearCart() {
    let toastId = toast.loading("Clear Cart");
    try {
      let options = {
        url: "https://ecommerce.routemisr.com/api/v1/cart",
        method: "DELETE",
        headers: {
          token,
        },
      };
      let { data } = await axios.request(options);
      if (data.message == "success") {
        toast.success("Cart Is Empty");
        setCartInfo({
          numOfCartItems: 0,
        });
      }
    } catch (error) {
    } finally {
      toast.dismiss(toastId);
    }
  }
  async function updateCart({ productId, count }) {
    try {
      const options = {
        url: `https://ecommerce.routemisr.com/api/v1/cart/${productId}`,
        method: "PUT",
        headers: {
          token,
        },
        data: { count },
      };
      const { data } = await axios.request(options);
      if (data.status == "success") {
        setCartInfo(data);
      }
    } catch (error) {}
  }
  return (
    <CartContext.Provider
      value={{
        addProducttoCart,
        getCartProducts,
        cartInfo,
        removeProduct,
        clearCart,
        updateCart,
      }}
    >
      <Toaster position="bottom-right" reverseOrder={false} />
      {children}
    </CartContext.Provider>
  );
}
