import React, { useState } from "react";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { login } from "../../../services/operations/authAPI";

const LoginForm = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const { email, password } = formData;

  const handleOnChange = (e) => {
    setFormData((prevData) => ({
      ...prevData,
      [e.target.name]: e.target.value,
    }));
  };

  const handleOnSubmit = (e) => {
    e.preventDefault();
    dispatch(login(email, password, navigate));
  };

  return (
    <form
      onSubmit={handleOnSubmit}
      className="mt-6 flex w-full flex-col gap-y-4"
    >
      <div className="w-full">
        <label
          htmlFor="email"
          className="mb-1 text-[0.75rem] leading[1.375rem] text-richBlack-5 "
        >
          Email Address <sup className="text-pink-200">*</sup>
        </label>
        <input
          required
          type="email"
          name="email"
          id="email"
          value={email}
          onChange={handleOnChange}
          placeholder="Enter email address"
          style={{
            boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
          }}
          className="w-full rounded-[0.5rem] bg-richBlack-800 p-[12px] text-richBlack-5 "
        />
      </div>
      <div className="w-full relative">
        <label
          htmlFor="password"
          className="mb-1 text-[0.75rem] leading[1.375rem] text-richBlack-5 "
        >
          password <sup className="text-pink-200">*</sup>
        </label>
        <input
          required
          type={showPassword ? "text" : "password"}
          name="password"
          id="password"
          value={password}
          onChange={handleOnChange}
          placeholder="Enter password"
          style={{
            boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
          }}
          className="w-full rounded-[0.5rem] bg-richBlack-800 p-[12px] text-richBlack-5 "
        />
        <span
          onClick={() => setShowPassword(!showPassword)}
          className="absolute right-3 top-[38px] z-10 cursor-pointer "
        >
          {showPassword ? (
            <AiOutlineEyeInvisible fontSize={24} fill="#AFB2BF" />
          ) : (
            <AiOutlineEye fontSize={24} fill="#AFB2BF" />
          )}
        </span>
        <div className="flex justify-between items-center mt-2 px-2">
          <Link to="/signup">
            <p className="mt-1 ml-auto max-w-max text-xs text-blue-100 border-b border-richBlack-25 pb-[1px] ">
              Don't have an Account
            </p>
          </Link>
          <Link to="/forgot-password">
            <p className="mt-1 ml-auto max-w-max text-xs text-blue-100 border-b border-richBlack-25 pb-[1px] ">
              Forgot Password
            </p>
          </Link>
        </div>
      </div>
      <button
        type="submit"
        className="mt-6 rounded-[8px] bg-yellow-50 py-[8px] px-[12px] font-medium text-richBlack-900 "
      >
        Login
      </button>
    </form>
  );
};

export default LoginForm;
