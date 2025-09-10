import axios from "axios";
import { useFormik } from "formik";
import { useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { object, ref, string } from "yup";

export default function Signup() {
  const navigate = useNavigate();
  const passwordRegex =
    /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$ %^&*-]).{8,}$/;
  const phoneRegax = /^(02)?01[0125][0-9]{8}$/;

  let [accEx, setaccCounter] = useState(null);

  async function sendData(values) {
    const loadingToastId = toast.loading("Loading..");
    try {
      const options = {
        url: "https://ecommerce.routemisr.com/api/v1/auth/signup",
        method: "post",
        data: values,
      };
      let { data } = await axios.request(options);
      if (data.message == "success") {
        toast.dismiss(Loding);
        toast.success("User Created Successfully");
        setTimeout(() => {
          navigate("/login");
        }, 2000);
      }
    } catch (error) {
      toast.error(error.response.data.massege);
      setaccCounter(error.response.data.massege);
    } finally {
      toast.dismiss(loadingToastId);
    }
  }
  const validationSchema = object({
    name: string()
      .required("Name Is Required")
      .min(3, "Name Is 3 char")
      .max(25),
    email: string().required("Email is Required").email("Email Is Invalid"),
    password: string()
      .required("Password Is Required")
      .matches(
        passwordRegex,
        "Minimum eight characters, at least one upper case English letter, one lower case English letter, one number and one special character"
      ),
    rePassword: string()
      .required()
      .oneOf([ref("password")], "Not The Same"),
    phone: string().required("Required").matches(phoneRegax, "Not Match"),
  });
  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      password: "",
      rePassword: "",
      phone: "",
    },
    validationSchema,
    onSubmit: sendData,
  });

  return (
    <>
      <h1 className="text-xl text-slate-700 font-semibold mb-5">
        <i className="fa-solid fa-user mr-2"></i> Rigster Now
      </h1>
      <form className="space-y-5" onSubmit={formik.handleSubmit}>
        <div className="name space-y-3">
          <input
            type="text"
            placeholder="Enter Ur Name"
            className="formControl w-full"
            value={formik.values.name}
            onChange={formik.handleChange}
            name="name"
            onBlur={formik.handleBlur}
          />
          {formik.errors.name && formik.touched.name && (
            <p className="text-red-600 mt-1 text-sm">*{formik.errors.name}</p>
          )}
        </div>
        <div className="email space-y-3">
          <input
            type="email"
            placeholder="Email Adress"
            className="formControl w-full"
            value={formik.values.email}
            onChange={formik.handleChange}
            name="email"
            onBlur={formik.handleBlur}
          />
          {formik.errors.email && formik.touched.email && (
            <p className="text-red-600 mt-1 text-sm">*{formik.errors.email}</p>
          )}
          {accEx && <p className="text-red-600 mt-1 text-sm">*{accEx}</p>}
        </div>
        <div className="password space-y-3">
          <input
            type="password"
            placeholder="Passwrod"
            className="formControl w-full"
            value={formik.values.password}
            onChange={formik.handleChange}
            name="password"
            onBlur={formik.handleBlur}
          />
          {formik.errors.password && formik.touched.password && (
            <p className="text-red-600 mt-1 text-sm">
              *{formik.errors.password}
            </p>
          )}
        </div>
        <div className="repassword space-y-3">
          <input
            type="password"
            placeholder="Confirm Passwrod"
            className="formControl w-full"
            value={formik.values.rePassword}
            onChange={formik.handleChange}
            name="rePassword"
            onBlur={formik.handleBlur}
          />
          {formik.errors.rePassword && formik.touched.rePassword && (
            <p className="text-red-600 mt-1 text-sm">
              *{formik.errors.rePassword}
            </p>
          )}
          <div className="phone space-y-3">
            <input
              type="tel"
              placeholder="Phone Number"
              className="formControl w-full"
              value={formik.values.phone}
              onChange={formik.handleChange}
              name="phone"
              onBlur={formik.handleBlur}
            />
            {formik.errors.phone && formik.touched.phone && (
              <p className="text-red-600 mt-1 text-sm">
                *{formik.errors.phone}
              </p>
            )}
          </div>
        </div>
        <button
          type="submit"
          className="btn bg-primary-800 hover:bg-primary-950 text-white w-full"
        >
          Sign Up
        </button>
      </form>
    </>
  );
}
