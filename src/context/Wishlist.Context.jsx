import { createContext, useContext, useState } from "react";
import { UserContext } from "./Userr.contex";
import toast from "react-hot-toast";
import axios from "axios";
export const WishlistContext = createContext(null);
export default function WishlistProvider({ children }) {
  const [wishlist, setwishlist] = useState(null);
  const { token } = useContext(UserContext);
  async function addProductsToWishlist({ productId }) {
    const toastId = toast.loading(
      "Please Wait While We Add Your Product To Your Wishlist..."
    );

    try {
      const options = {
        url: `https://ecommerce.routemisr.com/api/v1/wishlist`,
        method: "POST",
        headers: {
          token,
        },
        data: {
          productId,
        },
      };
      let data = await axios.request(options);
      if (data.status == "success") {
        toast.success("Product Added To Your Wishlist ❤");
        getWhishlist();
      }
    } catch (error) {
      console.log(error);
    } finally {
      toast.dismiss(toastId);
    }
  }
  async function getWhishlist() {
    const options = {
      url: "https://ecommerce.routemisr.com/api/v1/wishlist",
      method: "GET",
      headers: {
        token,
      },
    };
    let { data } = await axios.request(options);
    setwishlist(data);
  }
  async function removeProductFromWishlist({ productId }) {
    const toastId = toast.loading("Deleting...");
    const options = {
      url: `https://ecommerce.routemisr.com/api/v1/wishlist/${productId}`,
      method: "DELETE",
      headers: {
        token,
      },
    };
    let { data } = await axios.request(options);
    if (data.status == "success") {
      getWhishlist();
      toast.success("Done");
    }
    toast.dismiss(toastId);
  }
  async function addFromWishlistToCart({ productId }) {
    const options = {
      url: `https://ecommerce.routemisr.com/api/v1/wishlist/${productId}`,
      method: "DELETE",
      headers: {
        token,
      },
    };
    let { data } = await axios.request(options);
    if (data.status == "success") {
      getWhishlist();
    }
  }

  return (
    <WishlistContext.Provider
      value={{
        addFromWishlistToCart,
        addProductsToWishlist,
        removeProductFromWishlist,
        getWhishlist,
        wishlist,
      }}
    >
      {children}
    </WishlistContext.Provider>
  );
}
