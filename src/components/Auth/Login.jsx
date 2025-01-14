import React from "react";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import { Link } from "react-router-dom";
import { FaBuilding } from "react-icons/fa";
import { toast } from "react-toastify";
import { useAuth } from "../../context/AuthContext";

const LoginSchema = Yup.object().shape({
  email: Yup.string()
    .email("Invalid email address")
    .required("Email is required"),
  password: Yup.string()
    .min(8, "Password must be at least 8 characters")
    .matches(/[A-Za-z]/, "Password must contain at least one letter")
    .matches(/\d/, "Password must contain at least one number")
    .required("Password is required"),
  rememberMe: Yup.boolean(),
});

const Login = () => {
  const { login, isLoading } = useAuth();

  const handleLogin = async (values, { setSubmitting, setFieldError }) => {
    try {
      await login(values);
    } catch (error) {
      if (error.response?.data?.field) {
        setFieldError(error.response.data.field, error.response.data.message);
      } else {
        toast.error(error.response?.data?.message || "Login Failed");
      }
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-indigo-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8 bg-white/80 backdrop-blur-sm p-8 rounded-2xl shadow-xl border border-indigo-50">
        <div>
          <div className="flex justify-center">
            <div className="bg-indigo-100 p-3 rounded-2xl">
              <FaBuilding className="h-12 w-12 text-indigo-600" />
            </div>
          </div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Welcome back
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            Don't have an account?{" "}
            <Link
              to="/register"
              className="text-indigo-600 hover:text-indigo-500 font-medium"
            >
              Create one now
            </Link>
          </p>
        </div>

        <Formik
          initialValues={{
            email: "",
            password: "",
            rememberMe: false,
          }}
          validationSchema={LoginSchema}
          onSubmit={handleLogin}
        >
          {({ errors, touched, isValid, dirty }) => (
            <Form className="mt-8 space-y-6">
              <div className="space-y-5">
                <div>
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Email address
                  </label>
                  <Field
                    type="email"
                    id="email"
                    name="email"
                    autoComplete="email"
                    className={`mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 bg-white/50 px-4 py-2.5 transition-colors ${
                      errors.email && touched.email ? "border-red-500" : ""
                    }`}
                    placeholder="Enter your email"
                  />
                  {errors.email && touched.email && (
                    <p className="text-red-500 text-xs mt-1">{errors.email}</p>
                  )}
                </div>

                <div>
                  <label
                    htmlFor="password"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Password
                  </label>
                  <Field
                    type="password"
                    id="password"
                    name="password"
                    autoComplete="current-password"
                    className={`mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 bg-white/50 px-4 py-2.5 transition-colors ${
                      errors.password && touched.password
                        ? "border-red-500"
                        : ""
                    }`}
                    placeholder="Enter your password"
                  />
                  {errors.password && touched.password && (
                    <p className="text-red-500 text-xs mt-1">
                      {errors.password}
                    </p>
                  )}
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <Field
                      type="checkbox"
                      id="rememberMe"
                      name="rememberMe"
                      className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                    />
                    <label
                      htmlFor="rememberMe"
                      className="ml-2 block text-sm text-gray-700"
                    >
                      Remember me
                    </label>
                  </div>

                  <div className="text-sm">
                    <a
                      href="#"
                      className="font-medium text-indigo-600 hover:text-indigo-500"
                    >
                      Forgot your password?
                    </a>
                  </div>
                </div>
              </div>

              <button
                type="submit"
                disabled={!isValid || !dirty || isLoading}
                className={`group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-semibold rounded-lg text-white ${
                  !isValid || !dirty || isLoading
                    ? "bg-indigo-400 cursor-not-allowed"
                    : "bg-indigo-600 hover:bg-indigo-700"
                } focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-all duration-200 shadow-md hover:shadow-lg`}
              >
                {isLoading ? (
                  <svg
                    className="animate-spin h-5 w-5 text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 2.042.756 3.905 2 5.291l2-2z"
                    ></path>
                  </svg>
                ) : (
                  "Sign in"
                )}
              </button>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default Login;
