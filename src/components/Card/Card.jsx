import { useContext } from "react";
import { CartContext } from "../../context/Cart.context";
import { Link } from "react-router-dom";
import { WishlistContext } from "../../context/Wishlist.Context";

export default function Card({ productInfo }) {
  const { addProductsToWishlist } = useContext(WishlistContext);
  const {
    imageCover,
    title,
    price,
    category,
    description,
    ratingsAverage,
    id,
  } = productInfo;
  const { addProducttoCart } = useContext(CartContext);
  return (
    <>
      <div className="card group/card rounded-lg shadow-lg overflow-hidden border-2 p-2 ">
        <div className="relative">
          <img src={imageCover} alt="" />
          <div className="layer group-hover/card:opacity-75 gap-3 transition-opacity duration-300 flex opacity-0  justify-center items-center absolute w-full h-full bg-slate-400 left-0 top-0">
            <div
              onClick={() => {
                addProductsToWishlist({ productId: id });
              }}
              className="icon cursor-pointer w-8 h-8 rounded-full bg-primary-500 text-white flex justify-center items-center"
            >
              <i className="fa-solid fa-heart"></i>
            </div>{" "}
            <div
              onClick={() => {
                addProducttoCart({ productId: id });
              }}
              className="icon cursor-pointer w-8 h-8 rounded-full bg-primary-500 text-white flex justify-center items-center"
            >
              <i className="fa-solid fa-cart-shopping"></i>
            </div>{" "}
            <Link
              to={`/product/${id}`}
              className="icon cursor-pointer w-8 h-8 rounded-full bg-primary-500 text-white flex justify-center items-center"
            >
              <i className="fa-solid fa-eye"></i>
            </Link>
          </div>
        </div>
        <div className="cardB py-4">
          <header>
            <h3 className="text-lg text-gray-600 font-semibold line-clamp-1">
              {<Link to={`product/${id}`}>{title}</Link>}
            </h3>
            <h4 className="text-primary-700 font-semibold">{category.name}</h4>
          </header>
          <p className="text-gray-400 text-sm line-clamp-2">{description}</p>
          <div className="flex items-center justify-between">
            <span>{price}</span>{" "}
            <div>
              <i className="fa-solid fa-star mr-2 text-yellow-500"></i>
              <span>{ratingsAverage}</span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
