import axios from "axios";
import { useFormik } from "formik";
import { Helmet } from "react-helmet";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { object, string } from "yup";

export default function Sendcode() {
  const navigate = useNavigate();
  const validationSchema = object({
    email: string().required("Email is required").email("Email is invalid"),
  });
  async function handleForgotPassword() {
    const toastId = toast.loading("Please Wait");
    try {
      const options = {
        url: "https://ecommerce.routemisr.com/api/v1/auth/forgotPasswords",
        method: "POST",
        data: {
          email: formik.values.email,
        },
      };
      let { data } = await axios.request(options);
      if (data.statusMsg == "success") {
        toast.success(data.message);
        navigate("/verify");
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message);
    } finally {
      toast.dismiss(toastId);
    }
  }
  const formik = useFormik({
    initialValues: { email: "" },
    validationSchema,
    onSubmit: handleForgotPassword,
  });
  return (
    <>
      <Helmet>
        <title>Forgot Password</title>
      </Helmet>
      <form
        action=""
        onSubmit={formik.handleSubmit}
        className="mt-10 flex-col gap-4"
      >
        <div className="email">
          <input
            type="email"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            placeholder="Email"
            value={formik.values.email}
          />
          {formik.errors.email &&
            formik.touched.email(
              <p className="text-red-600 mt-2 text-sm">
                {" "}
                *{formik.errors.email}
              </p>
            )}
        </div>
        <button type="submit" className="btn w-full">
          Send Code
        </button>
      </form>
    </>
  );
}
