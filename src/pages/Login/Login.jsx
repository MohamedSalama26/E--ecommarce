import axios from "axios";
import { useFormik } from "formik";
import { useContext, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";
import { object, string } from "yup";
import { UserContext } from "../../context/Userr.contex";

export default function Login() {
  let { setToken } = useContext(UserContext);
  const navigate = useNavigate();
  const passwordRegex =
    /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$ %^&*-]).{8,}$/;

  let [incorrect, setincorrect] = useState();

  async function sendDataTologin(values) {
    const loadingToastId = toast.loading("Loading..");
    try {
      const options = {
        url: "https://ecommerce.routemisr.com/api/v1/auth/signin",
        method: "post",
        data: values,
      };
      let { data } = await axios.request(options);

      if (data.message == "success") {
        localStorage.setItem("token", data.token);
        setToken(data.token);
        toast.success("Logged In");

        setTimeout(() => {
          navigate("/");
        }, 1500);
      }
    } catch (error) {
      toast.error(error.response.data.message);
      setincorrect(error.response.data.massege);
    } finally {
      toast.dismiss(loadingToastId);
    }
  }
  const validationSchema = object({
    email: string().required("Email is Required").email("Email Is Invalid"),
    password: string()
      .required("Password Is Required")
      .matches(
        passwordRegex,
        "Minimum eight characters, at least one upper case English letter, one lower case English letter, one number and one special character"
      ),
  });
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema,
    onSubmit: sendDataTologin,
  });

  return (
    <>
      <h1 className="text-xl text-slate-700 font-semibold mb-5">
        <i className="fa-solid fa-user mr-2"></i> Login
      </h1>
      <form className="space-y-5" onSubmit={formik.handleSubmit}>
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
          {incorrect &&
            <p className="text-red-600 mt-1 text-sm"></p> * { incorrect }}
        </div>

        <button
          type="submit"
          className="btn bg-primary-800 hover:bg-primary-950 text-white w-full"
        >
          Log In
        </button>
        <div>
          <button
            type="sumbit"
            className="btn bg-slate-300  hover:bg-slate-500 text-black w-full "
          >
            <Link to={"/forgetpasssword"}>Forget Your Password</Link>
          </button>
        </div>
      </form>
    </>
  );
}
