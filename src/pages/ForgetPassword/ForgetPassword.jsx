import { useFormik } from "formik";
import { Helmet } from "react-helmet";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { object, string } from "yup";
export default function ForgetPassword() {
  const navigate = useNavigate();
  const passwordRegex =
    /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$ %^&*-]).{8,}$/;
  const validationSchema = object({
    email: string().required("Email is required").email("Email is invalid"),
    password: string()
      .required("Password is required")
      .matches(
        passwordRegex,
        "password should be at least Minimum eight characters, at least one upper case English letter, one lower case English letter, one number and one special character"
      ),
  });
  async function handleForgotPassword() {
    const toastId = toast.loading(" please wait ...");
    try {
      const options = {
        url: "https://ecommerce.routemisr.com/api/v1/auth/resetPassword",
        method: "PUT",
        data: {
          email: formik.values.email,
          newPassword: formik.values.password,
        },
      };
      let { data } = await axios.request(options);
      if (data.token) {
        toast.success("password has been updated");
        navigate("/login");
      }
    } catch (error) {
      toast.error(error.response.data.message);
    } finally {
      toast.dismiss(toastId);
    }
  }
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema,
    onSubmit: handleForgotPassword,
  });
  return (
    <>
      <Helmet>
        <title>Rest Your Password</title>
      </Helmet>
      <form
        onSubmit={formik.handleSubmit}
        className="mt-10 flex-col flex gap-4"
      >
        <div className="email">
          <input
            type="email"
            name="email"
            className="formControl w-full"
            placeholder="Ente Your Email"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.email}
          />
          {formik.errors.email && formik.touched.email && (
            <p className="text-red-600 mt-2 text-sm"> *{formik.errors.email}</p>
          )}
        </div>
        <div className="password">
          <input
            type="password"
            name="password"
            className="formControl w-full"
            placeholder="Ente Your New Pssword"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.password}
          />
          {formik.errors.password && formik.touched.password && (
            <p className="text-red-600 mt-2 text-sm">
              {" "}
              *{formik.errors.password}
            </p>
          )}
        </div>
        <button type="sumbit" className="btn w-full">
          Update Password
        </button>
      </form>
    </>
  );
}
