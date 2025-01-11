import React from "react";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import { Link, useNavigate } from "react-router-dom";
import { FaPhoneAlt, FaBriefcase, FaBuilding } from "react-icons/fa";

import axiosInstance from "../../api/axiosInstance";
import { toast } from "react-toastify";

const RegisterSchema = Yup.object().shape({
  name: Yup.string().required("Name is required").max(255, "Name is too long"),
  email: Yup.string()
    .email("Invalid email address")
    .required("Email is required"),
  password: Yup.string()
    .min(8, "Password must be at least 8 characters")
    .matches(/[A-Z]/, "Password must contain at least one uppercase letter")
    .matches(/[a-z]/, "Password must contain at least one lowercase letter")
    .matches(/[0-9]/, "Password must contain at least one number")
    .matches(
      /[@$!%*?&]/,
      "Password must contain at least one special character"
    )
    .required("Password is required"),
  password_confirmation: Yup.string()
    .oneOf([Yup.ref("password")], "Passwords must match")
    .required("Password confirmation is required"),
  mobile_country_code: Yup.string()
    .matches(/^\+\d{1,3}$/, "Invalid country code")
    .required("Country code is required"),
  mobile: Yup.string()
    .matches(/^\d{11}$/, "Mobile number must be 11 digits")
    .required("Mobile number is required"),
  client_type: Yup.string()
    .oneOf(["B2C", "B2B"], "Please select a valid client type")
    .required("Client type is required"),
  issuing_authority: Yup.string(),
  company_name: Yup.string(),
  commercial_license_number: Yup.string(),
});

const Register = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = React.useState(false);

  const handleRegister = async (values, { setSubmitting, setFieldError }) => {
    try {
      setIsLoading(true);
      const res = await axiosInstance.post("/auth/register", values);
      const token = res.data.token;
      localStorage.setItem("token", token);
      toast.success(res.data.message || "Registration Successful");
      navigate("/");
    } catch (error) {
      console.error(error.response);
      if (error.response?.data?.field) {
        setFieldError(error.response.data.field, error.response.data.message);
      } else {
        toast.error(error.response?.data?.message || "Registration Failed");
      }
    } finally {
      setIsLoading(false);
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-indigo-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-2xl w-full space-y-8 bg-white/80 backdrop-blur-sm p-8 rounded-2xl shadow-xl border border-indigo-50">
        <div>
          <div className="flex justify-center">
            <div className="bg-indigo-100 p-3 rounded-2xl">
              <FaBuilding className="h-12 w-12 text-indigo-600" />
            </div>
          </div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Create your account
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            Join us to start your journey or{" "}
            <Link
              to="/login"
              className="text-indigo-600 hover:text-indigo-500 font-medium"
            >
              sign in to your account
            </Link>
          </p>
        </div>

        <Formik
          initialValues={{
            name: "",
            email: "",
            password: "",
            password_confirmation: "",
            mobile_country_code: "+20",
            mobile: "",
            client_type: "",
            issuing_authority: "",
            company_name: "",
            commercial_license_number: "",
          }}
          validationSchema={RegisterSchema}
          onSubmit={handleRegister}
        >
          {({ errors, touched, isValid, dirty }) => (
            <Form className="mt-8 space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Personal Information */}
                <div className="space-y-5">
                  <h3 className="text-lg font-semibold text-gray-700 border-b border-gray-200 pb-2">
                    Personal Information
                  </h3>

                  <div>
                    <label
                      htmlFor="name"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Name
                    </label>
                    <Field
                      type="text"
                      id="name"
                      name="name"
                      className={`mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 bg-white/50 px-4 py-2.5 transition-colors ${
                        errors.name && touched.name ? "border-red-500" : ""
                      }`}
                    />
                    {errors.name && touched.name && (
                      <p className="text-red-500 text-xs mt-1">{errors.name}</p>
                    )}
                  </div>

                  <div>
                    <label
                      htmlFor="email"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Email
                    </label>
                    <Field
                      type="email"
                      id="email"
                      name="email"
                      className={`mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 bg-white/50 px-4 py-2.5 transition-colors ${
                        errors.email && touched.email ? "border-red-500" : ""
                      }`}
                    />
                    {errors.email && touched.email && (
                      <p className="text-red-500 text-xs mt-1">
                        {errors.email}
                      </p>
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
                      className={`mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 bg-white/50 px-4 py-2.5 transition-colors ${
                        errors.password && touched.password
                          ? "border-red-500"
                          : ""
                      }`}
                    />
                    {errors.password && touched.password && (
                      <p className="text-red-500 text-xs mt-1">
                        {errors.password}
                      </p>
                    )}
                  </div>

                  <div>
                    <label
                      htmlFor="password_confirmation"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Confirm Password
                    </label>
                    <Field
                      type="password"
                      id="password_confirmation"
                      name="password_confirmation"
                      className={`mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 bg-white/50 px-4 py-2.5 transition-colors ${
                        errors.password_confirmation &&
                        touched.password_confirmation
                          ? "border-red-500"
                          : ""
                      }`}
                    />
                    {errors.password_confirmation &&
                      touched.password_confirmation && (
                        <p className="text-red-500 text-xs mt-1">
                          {errors.password_confirmation}
                        </p>
                      )}
                  </div>
                </div>

                {/* Business Information */}
                <div className="space-y-5">
                  <h3 className="text-lg font-semibold text-gray-700 border-b border-gray-200 pb-2">
                    Business Information
                  </h3>

                  <div className="flex gap-4">
                    <div className="w-1/3">
                      <label
                        htmlFor="mobile_country_code"
                        className="block text-sm font-medium text-gray-700"
                      >
                        Country Code
                      </label>
                      <Field
                        type="text"
                        id="mobile_country_code"
                        name="mobile_country_code"
                        className={`mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 bg-white/50 px-4 py-2.5 transition-colors ${
                          errors.mobile_country_code &&
                          touched.mobile_country_code
                            ? "border-red-500"
                            : ""
                        }`}
                      />
                      {errors.mobile_country_code &&
                        touched.mobile_country_code && (
                          <p className="text-red-500 text-xs mt-1">
                            {errors.mobile_country_code}
                          </p>
                        )}
                    </div>
                    <div className="w-2/3">
                      <label
                        htmlFor="mobile"
                        className="block text-sm font-medium text-gray-700"
                      >
                        Mobile
                      </label>
                      <div className="mt-1 relative rounded-md shadow-sm">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                          <FaPhoneAlt className="h-4 w-4 text-gray-400" />
                        </div>
                        <Field
                          type="text"
                          id="mobile"
                          name="mobile"
                          className={`block w-full pl-10 rounded-lg border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 bg-white/50 px-4 py-2.5 transition-colors ${
                            errors.mobile && touched.mobile
                              ? "border-red-500"
                              : ""
                          }`}
                          placeholder="10XXXXXXXXX"
                        />
                        {errors.mobile && touched.mobile && (
                          <p className="text-red-500 text-xs mt-1">
                            {errors.mobile}
                          </p>
                        )}
                      </div>
                    </div>
                  </div>

                  <div>
                    <label
                      htmlFor="client_type"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Client Type
                    </label>
                    <Field
                      as="select"
                      id="client_type"
                      name="client_type"
                      className={`mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 bg-white/50 px-4 py-2.5 transition-colors ${
                        errors.client_type && touched.client_type
                          ? "border-red-500"
                          : ""
                      }`}
                    >
                      <option value="">Select Client Type</option>
                      <option value="B2C">B2C</option>
                      <option value="B2B">B2B</option>
                    </Field>
                    {errors.client_type && touched.client_type && (
                      <p className="text-red-500 text-xs mt-1">
                        {errors.client_type}
                      </p>
                    )}
                  </div>

                  <div>
                    <label
                      htmlFor="issuing_authority"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Issuing Authority
                    </label>
                    <Field
                      type="text"
                      id="issuing_authority"
                      name="issuing_authority"
                      className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 bg-white/50 px-4 py-2.5 transition-colors"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="company_name"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Company Name
                    </label>
                    <div className="mt-1 relative rounded-md shadow-sm">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <FaBriefcase className="h-4 w-4 text-gray-400" />
                      </div>
                      <Field
                        type="text"
                        id="company_name"
                        name="company_name"
                        className="block w-full pl-10 rounded-lg border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 bg-white/50 px-4 py-2.5 transition-colors"
                      />
                    </div>
                  </div>

                  <div>
                    <label
                      htmlFor="commercial_license_number"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Commercial License Number
                    </label>
                    <Field
                      type="text"
                      id="commercial_license_number"
                      name="commercial_license_number"
                      className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 bg-white/50 px-4 py-2.5 transition-colors"
                    />
                  </div>
                </div>
              </div>

              <div className="flex justify-center mt-4">
                <button
                  type="submit"
                  disabled={!isValid || !dirty || isLoading}
                  className={`inline-flex w-full justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 hover:bg-indigo-700 ${
                    !isValid || !dirty || isLoading
                      ? "opacity-50 cursor-not-allowed"
                      : ""
                  }`}
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
                    "Register"
                  )}
                </button>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default Register;
