import { useContext, useEffect } from "react";
import { CartContext } from "../../context/Cart.context";
import Loading from "../../components/Loading/Loading";
import Carditem from "../../components/CardItem/Carditem";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet";
export default function Cart() {
  let { getCartProducts, cartInfo, clearCart } = useContext(CartContext);
  useEffect(() => {
    getCartProducts();
  }, []);
  return (
    <>
      <Helmet>
        <title>Cart</title>
      </Helmet>
      {cartInfo == null ? (
        <Loading />
      ) : (
        <section>
          <div className="flex gap-8 items-center">
            <i className="fa-brands fa-opencart text-3xl"></i>
            <h2 className="text-xl text-slate-600 pl-4 font-semibold relative before:absolute before:w-0.5 before:h-3/4 before:bg-slate-600 before:-left-1 before:-top-1 before:translate-y-1/2">
              Your Shopping Cart
            </h2>
          </div>
          {cartInfo.numOfCartItems == 0 ? (
            <div className="mt-6 bg-gray-100 rounded-md p-6 shadow flex justify-center items-center flex-col gap-3">
              <h2>Oooops! Your Cart Is Empty </h2>
              <Link
                to="/"
                className="btn bg-primary-600 hover:bg-primary-700 text-white"
              >
                Back Home
              </Link>
            </div>
          ) : (
            <>
              <div className="space-y-4 mt-6">
                {cartInfo.data.products.map((product) => (
                  <Carditem key={product._id} productInfo={product} />
                ))}
              </div>
              <div className="flex justify-between items-center">
                <p className="text-xl mt-5">
                  <i className="fa-solid fa-dollar-sign text-xl mr-2 text-primary-600"></i>
                  Your Total Price Is{" "}
                  <span className="text-primary-600 font-bold">
                    {cartInfo.data.totalCartPrice}
                  </span>
                </p>
                <button
                  onClick={clearCart}
                  className="btn bg-red-600 hover:bg-red-700 text-white  transition-colors duration-300"
                >
                  <i className="fa-solid fa-trash mr-2"></i>
                  Clear Cart
                </button>
              </div>
              <Link
                className="btn bg-primary-700 hover:bg-primary-800 inline-block w-full text-center text-white rounded-md transition-colors duration-300 py-1 my-4"
                to={"/checkout"}
              >
                Payment
              </Link>
            </>
          )}
        </section>
      )}
    </>
  );
}
