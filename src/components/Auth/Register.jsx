import React, { useState } from "react";
import { FaPhoneAlt, FaBriefcase, FaBuilding } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import axiosInstance from "../../api/axiosInstance";

import { toast } from "react-toastify";

const Register = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    password_confirmation: "",
    mobile_country_code: "+20",
    mobile: "",
    client_type: "", //
    issuing_authority: "",
    company_name: "",
    commercial_license_number: "",
  });

  const [errors, setErrors] = useState({
    name: "",
    email: "",
    password: "",
    password_confirmation: "",
    mobile: "",
    client_type: "",
  });

  const validateForm = () => {
    const newErrors = {};
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
    const phoneRegex = /^\+?\d{1,3}-?\d{10}$/;
    const passwordRegex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

    if (!form.name) {
      newErrors.name = "Name is required.";
    }
    if (!emailRegex.test(form.email)) {
      newErrors.email = "Please enter a valid email address.";
    }
    if (!passwordRegex.test(form.password)) {
      newErrors.password =
        "Password must contain at least 8 characters, including uppercase, lowercase, a number, and a special character.";
    }
    if (form.password !== form.password_confirmation) {
      newErrors.password_confirmation = "Passwords do not match.";
    }
    if (!phoneRegex.test(form.mobile)) {
      newErrors.mobile = "Please enter a valid mobile number.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const isFormValid = () => {
    return (
      form.name &&
      form.email &&
      form.password &&
      form.password_confirmation &&
      form.mobile &&
      form.client_type     );
  };


  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prevForm) => ({
      ...prevForm,
      [name]: value,
    }));
  };

  const register = async () => {
    try {
      setIsLoading(true);
      const res = await axiosInstance.post("/auth/register", form);
      // save token
      const token = res.data.token;
      localStorage.setItem("token", token);
      toast.success(res.data.message || "Register Susccess");
      navigate("/");
      console.log();
    } catch (error) {
      console.log(error);
      toast.error(error.response?.data?.message || "Register Failed");
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (validateForm()) {
      // Handle form submission logic here (e.g., API call)
      register();
      console.log(form);
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

        <form onSubmit={handleSubmit} className="mt-8 space-y-6">
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
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  required
                  maxLength={255}
                  className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 bg-white/50 px-4 py-2.5 transition-colors"
                />
                {errors.name && (
                  <p className="text-red-500 text-sm">{errors.name}</p>
                )}
              </div>

              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-700"
                >
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={form.email}
                  onChange={handleChange}
                  required
                  className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 bg-white/50 px-4 py-2.5 transition-colors"
                />
                {errors.email && (
                  <p className="text-red-500 text-sm">{errors.email}</p>
                )}
              </div>

              <div>
                <label
                  htmlFor="password"
                  className="block text-sm font-medium text-gray-700"
                >
                  Password
                </label>
                <input
                  type="password"
                  id="password"
                  name="password"
                  value={form.password}
                  onChange={handleChange}
                  required
                  pattern="(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}"
                  title="Password must contain at least 8 characters, including uppercase, lowercase, number, and special character"
                  className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 bg-white/50 px-4 py-2.5 transition-colors"
                />
                {errors.password && (
                  <p className="text-red-500 text-sm">{errors.password}</p>
                )}
              </div>

              <div>
                <label
                  htmlFor="password_confirmation"
                  className="block text-sm font-medium text-gray-700"
                >
                  Confirm Password
                </label>
                <input
                  type="password"
                  id="password_confirmation"
                  name="password_confirmation"
                  value={form.password_confirmation}
                  onChange={handleChange}
                  required
                  className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 bg-white/50 px-4 py-2.5 transition-colors"
                />
                {errors.password_confirmation && (
                  <p className="text-red-500 text-sm">
                    {errors.password_confirmation}
                  </p>
                )}
              </div>
            </div>

            {/* Contact & Business Information */}
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
                  <input
                    type="text"
                    id="mobile_country_code"
                    name="mobile_country_code"
                    value={form.mobile_country_code}
                    onChange={handleChange}
                    required
                    pattern="(\+?\d{1,3})"
                    title="Enter a valid country code, e.g., +20"
                    className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 bg-white/50 px-4 py-2.5 transition-colors"
                    placeholder="+20"
                  />
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
                    <input
                      type="tel"
                      id="mobile"
                      name="mobile"
                      value={form.mobile}
                      onChange={handleChange}
                      required
                      title="Enter a valid mobile number, e.g., 10XXXXXXXXX"
                      className="block w-full pl-10 rounded-lg border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 bg-white/50 px-4 py-2.5 transition-colors"
                      placeholder="10XXXXXXXXX"
                    />
                    {errors.mobile && (
                      <p className="text-red-500 text-sm">{errors.mobile}</p>
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
                <select
                  id="client_type"
                  name="client_type"
                  value={form.client_type}
                  onChange={handleChange}
                  required
                  aria-label="Select client type"
                  className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 bg-white/50 px-4 py-2.5 transition-colors"
                >
                  <option value="" disabled>
                    Select Client Type
                  </option>
                  <option value="B2C">B2C</option>
                  <option value="B2B">B2B</option>
                </select>
              </div>

              <div>
                <label
                  htmlFor="issuing_authority"
                  className="block text-sm font-medium text-gray-700"
                >
                  Issuing Authority
                </label>
                <input
                  type="text"
                  id="issuing_authority"
                  name="issuing_authority"
                  value={form.issuing_authority}
                  onChange={handleChange}
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
                  <input
                    type="text"
                    id="company_name"
                    name="company_name"
                    value={form.company_name}
                    onChange={handleChange}
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
                <input
                  type="text"
                  id="commercial_license_number"
                  name="commercial_license_number"
                  value={form.commercial_license_number}
                  onChange={handleChange}
                  className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 bg-white/50 px-4 py-2.5 transition-colors"
                />
              </div>
            </div>
          </div>

          <div className="flex justify-center mt-4">
            <button
              type="submit"
              className={`inline-flex w-full justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 hover:bg-indigo-700 ${
                isLoading || !isFormValid() ? "opacity-50 cursor-not-allowed" : ""
              }`}
              disabled={isLoading || !isFormValid()}
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

        </form>
      </div>
    </div>
  );
};

export default Register;
