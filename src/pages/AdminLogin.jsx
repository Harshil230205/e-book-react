import React, { useState } from "react";
import {
  IoMail,
  IoLockClosed,
  IoEyeOutline,
  IoEyeOffOutline,
} from "react-icons/io5";
import { baseUrl } from "../baseUrl";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

const AdminLogin = () => {
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [errors, setErrors] = useState({});

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Email is invalid";
    }
    if (!formData.password) {
      newErrors.password = "Password is required";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;
    setLoading(true);
    try {
      const response = await fetch(`${baseUrl}/api/admin/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      const data = await response.json();
      if (response.ok) {
        navigate("/");
        localStorage.setItem("adminBookToken", data.token);
        toast.success("Login successfully");
      } else {
        throw new Error(data.message || "Login failed");
      }
    } catch (error) {
      setErrors((prev) => ({ ...prev, submit: error.message }));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-8 flex items-center justify-center">
      <div className="max-w-md mx-auto bg-white rounded-xl shadow-sm overflow-hidden w-full">
        <div className="p-4 md:p-6 border-b border-gray-100">
          <h1 className="text-2xl font-bold text-gray-800">Sign In</h1>
          <p className="mt-2 text-gray-600">
            Welcome back! Please enter your details.
          </p>
        </div>
        <form onSubmit={handleSubmit} className="p-4 md:p-6 space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Email Address
            </label>
            <div className="mt-1 relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <IoMail className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                className={`block w-full pl-10 pr-3 py-2 border ${
                  errors.email ? "border-red-500" : "border-gray-300"
                } rounded-lg focus:outline-none focus:ring-1 focus:border-orange-500 focus:ring-orange-500`}
                placeholder="you@example.com"
              />
            </div>
            {errors.email && (
              <p className="mt-1 text-sm text-red-500">{errors.email}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Password
            </label>
            <div className="mt-1 relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <IoLockClosed className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                value={formData.password}
                onChange={handleInputChange}
                className={`block w-full pl-10 pr-10 py-2 border ${
                  errors.password ? "border-red-500" : "border-gray-300"
                } rounded-lg focus:outline-none focus:ring-1 focus:border-orange-500 focus:ring-orange-500`}
                placeholder="••••••••"
              />
              <button
                type="button"
                className="absolute inset-y-0 right-0 pr-3 flex items-center"
                onClick={() => setShowPassword(!showPassword)}>
                {showPassword ? (
                  <IoEyeOffOutline className="h-5 w-5 text-gray-400 hover:text-gray-600" />
                ) : (
                  <IoEyeOutline className="h-5 w-5 text-gray-400 hover:text-gray-600" />
                )}
              </button>
            </div>
            {errors.password && (
              <p className="mt-1 text-sm text-red-500">{errors.password}</p>
            )}
          </div>

          {errors.submit && (
            <div className="bg-red-50 text-red-500 p-3 rounded-lg text-sm">
              {errors.submit}
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-orange-500 text-white px-6 py-3 rounded-lg hover:bg-orange-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed">
            {loading ? "Signing In..." : "Sign In"}
          </button>

          <p className="text-center text-sm text-gray-600">
            Don't have an account?{" "}
            <Link
              to="/signup"
              className="text-orange-500 hover:text-orange-600 font-medium">
              Sign Up
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default AdminLogin;
