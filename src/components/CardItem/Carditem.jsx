import { useContext } from "react";
import { CartContext } from "../../context/Cart.context";
import { Link } from "react-router-dom";

export default function Carditem({ productInfo }) {
  const { price, count, product } = productInfo;
  const { title, imageCover, category, id } = product;
  const { removeProduct, updateCart } = useContext(CartContext);
  return (
    <>
      <div className="flex gap-2">
        <div className="carditem grow flex justify-between items-center bg-gray-100 py-4 px-6 rounded-lg">
          <img
            className="h-24 w-24 rounded-full borded-4 border-white object-cover"
            src={imageCover}
            alt=""
          />
          <h3 className="text-lg text-gray-700 font-semibold cursor-pointer hover:text-gray-900 transition-colors duration-300">
            <Link to={`/product/${id}`}> {title}</Link>
          </h3>
          <h4 className=" text-gray-500 font-semibold">{category.name}</h4>
          <div className="count flex gap-5 items-center ">
            <span className="text-lg font-bold text-gray-800">{count}</span>
            <div className="icons space-y-2">
              <div
                onClick={() => {
                  updateCart({ productId: id, count: count + 1 });
                }}
                className="plus w-6 h-6 rounded-full bg-gray-700 text-white flex justify-center items-center cursor-pointer"
              >
                <i className="fa-solid fa-plus"></i>
              </div>
              <div
                onClick={() => {
                  updateCart({ productId: id, count: count - 1 });
                }}
                className="minus w-6 h-6 rounded-full bg-gray-700 text-white flex justify-center items-center cursor-pointer"
              >
                <i className="fa-solid fa-minus"></i>
              </div>
            </div>
          </div>
          <span className="text-lg  text-gray-700">{price}</span>
        </div>
        <button
          onClick={() => {
            removeProduct({ productId: id });
          }}
          className="rounded-md bg-gray-100 hover:bg-gray-200 transition-colors duration-300 p-3"
        >
          <i className="fa-solid fa-xmark"></i>
        </button>
      </div>
    </>
  );
}
