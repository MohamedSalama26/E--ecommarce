import { useContext, useEffect, useState } from "react";
import { UserContext } from "../../context/Userr.contex";
import { jwtDecode } from "jwt-decode";
import axios from "axios";
import Loading from "../../components/Loading/Loading";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet";

export default function Orders() {
  const { token } = useContext(UserContext);
  const [orders, setOrders] = useState(null);
  let { id } = jwtDecode(token);
  async function getUsersOrder() {
    const options = {
      url: `https://ecommerce.routemisr.com/api/v1/orders/user/${id}`,
      method: "GET",
    };
    let { data } = await axios.request(options);
    setOrders(data);
  }
  useEffect(() => {
    getUsersOrder();
  }, []);
  return (
    <>
      <Helmet>
        <title>All Orders</title>
      </Helmet>
      {orders ? (
        orders.length > 0 ? ( // Check if there are any orders
          <section className="space-y-3">
            {orders.map((order) => (
              <div
                key={order.id}
                className="order p-4 border-2 border-gray-300 border-opacity-25 rounded-lg"
              >
                <header className="flex justify-between items-center">
                  <div>
                    <h2 className="text-gray-500">Order Id</h2>
                    <span className="text-lg font-semibold text-gray-700">
                      # {order.id}
                    </span>
                  </div>
                  <div>
                    {order.isPaid ? (
                      <span className="mr-2 inline-block px-3 py-1 bg-red-500 text-white font-semibold rounded-md hover:bg-red-600 transition-colors duration-300">
                        Paid
                      </span>
                    ) : (
                      <span className="mr-2 inline-block px-3 py-1 bg-red-500 text-white font-semibold rounded-md hover:bg-red-600 transition-colors duration-300">
                        Unpaid
                      </span>
                    )}
                    {order.isDelivered ? (
                      <span className="inline-block px-3 py-1 bg-blue-500 text-white font-semibold rounded-md hover:bg-blue-600 transition-colors duration-300">
                        Delivered
                      </span>
                    ) : (
                      <span className="inline-block px-3 py-1 bg-blue-500 text-white font-semibold rounded-md hover:bg-blue-600 transition-colors duration-300">
                        Under Delivery
                      </span>
                    )}
                  </div>
                </header>
                <div className="grid md:gap-4 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 mt-4">
                  {order.cartItems.map((product) => (
                    <div
                      key={product._id}
                      className="product overflow-hidden border-2 border-gray-300 border-opacity-30 rounded-lg"
                    >
                      <img
                        src={product.product.imageCover}
                        alt=""
                        className="w-full"
                      />
                      <div className="p-4">
                        <h3 className="text-lg font-semibold line-clamp-3">
                          <Link to={`/product/${product.product.id}`}>
                            {product.product.title}
                          </Link>
                        </h3>
                        <div className="flex mt justify-between items-center">
                          <p>
                            <span className="font-bold pb-2 mt-2">Count:</span>
                            {product.count}
                          </p>
                          <span>{product.price}L.E</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                <p className="text-lg mt-4">
                  Your Total Order Price Is{" "}
                  <span className="mx-1 font-bold text-primary-600">
                    {order.totalOrderPrice}L.E
                  </span>
                </p>
              </div>
            ))}
          </section>
        ) : (
          // Display this message if there are no orders
          <div className="flex flex-col items-center justify-center h-[50vh] space-y-4">
            <p className="text-2xl font-semibold text-gray-700">
              You don't have any orders yet.
            </p>
            <Link
              to="/"
              className="px-6 py-2 bg-primary-600 text-white font-semibold rounded-md hover:bg-primary-700 transition-colors duration-300"
            >
              Go to Home Page
            </Link>
          </div>
        )
      ) : (
        <Loading />
      )}
    </>
  );
}
