import { useFormik } from "formik";
import { useContext, useState } from "react";
import { CartContext } from "../../context/Cart.context";
import { UserContext } from "../../context/Userr.contex";
import axios from "axios";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet";
export default function Checkout() {
  let { cartInfo } = useContext(CartContext);
  let { token } = useContext(UserContext);
  let navigate = useNavigate();
  const [PayementMethod, setPayementMethod] = useState(null);
  async function createCashOrder(values) {
    let toastId = toast.loading("Creating Order");
    try {
      const options = {
        url: `https://ecommerce.routemisr.com/api/v1/orders/${cartInfo.cartId}`,
        method: "POST",
        headers: {
          token,
        },
        data: values,
      };
      let { data } = await axios.request(options);
      if (data.status == "success") {
        toast.success("Order Has Been Created");
        setTimeout(() => {
          navigate("/allorders");
        }, 2000);
      } else if (data.status == 404) {
        toast.error("Your cart is empty");
      }
    } catch (error) {
      toast.error("Your cart is empty");
    } finally {
      toast.dismiss(toastId);
    }
  }
  async function onlinePayment(values) {
    const loaderId = toast.loading("Taking Order...");
    try {
      const options = {
        url: `https://ecommerce.routemisr.com/api/v1/orders/checkout-session/${cartInfo.cartId}?url=${location.origin}`,
        method: "POST",
        headers: {
          token,
        },
        data: values,
      };
      let { data } = await axios.request(options);
      if (data.status == "success") {
        toast.loading("Redirect To Stripe");
        setTimeout(() => {
          location.href = data.session.url;
        }, 2000);
      } else if (data.status == 404) {
        toast.error("Your cart is empty");
      }
    } catch (error) {
      toast.error("Your cart is empty");
    } finally {
      toast.dismiss(loaderId);
    }
  }
  const formik = useFormik({
    initialValues: {
      shippingAddress: {
        details: "",
        phone: "",
        city: "",
      },
    },

    onSubmit: (values) => {
      if ([PayementMethod == "online"]) {
        onlinePayment(values);
      } else {
        createCashOrder(values);
      }
    },
  });
  return (
    <>
      <Helmet>
        <title>CheckOut</title>
      </Helmet>
      <section>
        <h1 className="text-xl text-gray-600 font-semibold mb-4">
          Shipping Adress:
        </h1>
        <form className="space-y-3" onSubmit={formik.handleSubmit}>
          <div className="city">
            <input
              type="text"
              className="formControl w-full"
              placeholder="City"
              value={formik.values.shippingAddress.city}
              onChange={formik.handleChange}
              name="shippingAddress.city"
            />
          </div>
          <div className="phone">
            <input
              type="tel"
              className="formControl w-full"
              placeholder="Phone"
              value={formik.values.shippingAddress.phone}
              onChange={formik.handleChange}
              name="shippingAddress.phone"
            />
          </div>
          <div className="details">
            <textarea
              className="formControl w-full"
              placeholder="Details"
              value={formik.values.shippingAddress.details}
              onChange={formik.handleChange}
              name="shippingAddress.details"
            />
          </div>
          <button
            onClick={() => {
              setPayementMethod("cash");
            }}
            type="sumbit"
            className="btn bg-blue-500 mr-3 hover:bg-blue-600 text-white font-semibold"
          >
            Cash Order
          </button>
          <button
            onClick={() => {
              setPayementMethod("online");
            }}
            type="sumbit"
            className="btn bg-lime-500 hover:bg-lime-600 text-white font-semibold"
          >
            Online Payement
          </button>
        </form>
      </section>
    </>
  );
}
