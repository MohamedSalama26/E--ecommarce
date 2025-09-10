import React, { useContext, useEffect } from "react";
import { WishlistContext } from "../../context/Wishlist.Context";
import { CartContext } from "../../context/Cart.context";
import { Helmet } from "react-helmet";
import Loading from "../../components/Loading/Loading";
import { Link } from "react-router-dom";
export default function Wishlist() {
  let {
    getWhishlist,
    wishlist,
    removeProductFromWishlist,
    addFromWishlistToCart,
  } = useContext(WishlistContext);
  let { addProducttoCart } = useContext(CartContext);
  useEffect(() => {
    getWhishlist();
  }, []);
  return (
    <>
      <Helmet>
        <title> Wishlist </title>
      </Helmet>
      {wishlist == null ? (
        <Loading />
      ) : (
        <>
          {" "}
          <div className="flex justify-center">
            <h1 className="text-center font-bold pb-2 text-[22px] header-lines mb-10">
              My Wishlist
            </h1>
          </div>
          <div className="flex flex-col gap-4 ">
            {wishlist.count == 0 ? (
              <div className=" text-black flex flex-col justify-center items-center gap-6 rounded-lg py-3">
                <p className="text-[20px]">
                  Your Wishlist Is Empty !! Lets Fix That{" "}
                </p>
                <Link
                  to={"/"}
                  className="btn  bg-primary-600 hover:bg-primary-700 transition-colors duration-300 first-letter:uppercase text-white"
                >
                  Go Back To Home{" "}
                </Link>
              </div>
            ) : (
              wishlist.data.map((e) => (
                <div
                  key={e._id}
                  className="wishlist-card border-2 border-primary-300 flex justify-between items-center rounded-xl overflow-hidden"
                >
                  <div className="flex gap-3  items-center">
                    <div className="w-[180px] h-[200px] overflow-hidden ">
                      <img
                        className="w-[180px] h-[200px] object-cover"
                        src={e.imageCover}
                        alt=""
                      />
                    </div>
                    <div className="flex flex-col gap-7  ">
                      <span>{e.title}</span>
                      <span>{e.price}L.E</span>
                      <button
                        onClick={() => {
                          removeProductFromWishlist({ productId: e.id });
                        }}
                        className="btn w-fit border-red-600 hover:border-red-700 hover:bg-red-700"
                      >
                        Remove <i className="fa-solid fa-trash fa-fade"></i>
                      </button>
                    </div>
                  </div>
                  <div className=" pe-7">
                    <button
                      onClick={() => {
                        addProducttoCart({ productId: e.id });
                        addFromWishlistToCart({ productId: e.id });
                      }}
                      className="btn"
                    >
                      Add To Cart
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        </>
      )}
    </>
  );
}
