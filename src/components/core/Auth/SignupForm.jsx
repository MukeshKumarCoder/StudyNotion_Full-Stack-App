import React, { useState } from "react";
import { toast } from "react-hot-toast";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";

import { sendOtp } from "../../../services/operations/authAPI";
import { setSignupData } from "../../../slices/authSlice";
import { ACCOUNT_TYPE } from "../../../utils/constants";
import Tab from "../../common/Tab";

const SignupForm = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // student or instructor
  const [accountType, setAccountType] = useState(ACCOUNT_TYPE.STUDENT);

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const { firstName, lastName, email, password, confirmPassword } = formData;

  // Handle input fields, when some value changes
  const handleOnChange = (e) => {
    setFormData((prevData) => ({
      ...prevData,
      [e.target.name]: e.target.value,
    }));
  };

  // Handle Form Submission
  const handleOnSubmit = (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      toast.error("Password Do Not Match");
      return;
    }
    const signupData = {
      ...formData,
      accountType,
    };

    // Setting signup data to state
    // To be used after otp verification
    dispatch(setSignupData(signupData));
    // Send OTP to user for verification
    dispatch(sendOtp(formData.email, navigate));

    // Reset
    setFormData({
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      confirmPassword: "",
    });
    setAccountType(ACCOUNT_TYPE.STUDENT);
  };

  // data to pass to Tab component
  const tabData = [
    {
      id: 1,
      tabName: "Student",
      type: ACCOUNT_TYPE.STUDENT,
    },
    {
      id: 2,
      tabName: "Instructor",
      type: ACCOUNT_TYPE.INSTRUCTOR,
    },
  ];

  return (
    <div>
      {/* Tab */}
      <Tab tabData={tabData} field={accountType} setField={setAccountType} />
      {/* Form */}
      <form onSubmit={handleOnSubmit} className="flex flex-col w-full gap-y-4">
        <div className="flex gap-x-4">
          <div>
            <label
              htmlFor="firstName"
              className="mb-1 text-[0.875rem] leading-[1.375rem] text-richblack-5"
            >
              First Name <sup className="text-pink-200">*</sup>
            </label>
            <input
              required
              type="text"
              name="firstName"
              id="firstName"
              value={firstName}
              onChange={handleOnChange}
              placeholder="Enter first Name"
              style={{
                boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
              }}
              className="w-full rounded-[0.5rem] bg-richblack-800 p-[12px] text-richblack-5"
            />
          </div>
          <div>
            <label
              htmlFor="lastName"
              className="mb-1 text-[0.875rem] leading-[1.375rem] text-richblack-5"
            >
              Last Name <sup className="text-pink-200">*</sup>
            </label>
            <input
              required
              type="text"
              name="lastName"
              id="lastName"
              value={lastName}
              onChange={handleOnChange}
              placeholder="Enter Last Name"
              style={{
                boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
              }}
              className="w-full rounded-[0.5rem] bg-richblack-800 p-[12px] text-richblack-5"
            />
          </div>
        </div>
        <div className="w-full">
          <label
            htmlFor="email"
            className="mb-1 text-[0.875rem] leading-[1.375rem] text-richblack-5"
          >
            Email <sup className="text-pink-200">*</sup>
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
            className="w-full rounded-[0.5rem] bg-richblack-800 p-[12px] text-richblack-5"
          />
        </div>
        <div className="flex gap-x-4">
          <div className="relative">
            <label
              className="mb-1 text-[0.875rem] leading-[1.375rem] text-richblack-5"
              htmlFor="password"
            >
              Create Password
              <sup className="text-pink-200">*</sup>
            </label>
            <input
              required
              type={showPassword ? "text" : "password"}
              name="password"
              id="password"
              value={password}
              onChange={handleOnChange}
              placeholder="Enter Password"
              style={{
                boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
              }}
              className="w-full rounded-[0.5rem] bg-richblack-800 p-[12px] pr-10 text-richblack-5"
            />
            <span
              onClick={() => setShowPassword((prev) => !prev)}
              className="absolute right-3 top-[38px] z-[10] cursor-pointer"
            >
              {showPassword ? (
                <AiOutlineEyeInvisible fontSize={24} fill="#AFB2BF" />
              ) : (
                <AiOutlineEye fontSize={24} fill="#AFB2BF" />
              )}
            </span>
          </div>
          <div className="relative">
            <label
              className="mb-1 text-[0.875rem] leading-[1.375rem] text-richblack-5"
              htmlFor="confirmPassword"
            >
              Confirm Password
              <sup className="text-pink-200">*</sup>
            </label>
            <input
              required
              type={showConfirmPassword ? "text" : "password"}
              name="confirmPassword"
              id="confirmPassword"
              value={confirmPassword}
              onChange={handleOnChange}
              placeholder="Confirm Password"
              style={{
                boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
              }}
              className="w-full rounded-[0.5rem] bg-richblack-800 p-[12px] pr-10 text-richblack-5"
            />
            <span
              onClick={() => setShowConfirmPassword((prev) => !prev)}
              className="absolute right-3 top-[38px] z-[10] cursor-pointer"
            >
              {showPassword ? (
                <AiOutlineEyeInvisible fontSize={24} fill="#AFB2BF" />
              ) : (
                <AiOutlineEye fontSize={24} fill="#AFB2BF" />
              )}
            </span>
            <Link to="/login">
              <p className="mt-1 ml-auto max-w-max text-xs text-blue-100 border-b border-richblack-25 py-[1px] ">
                Already have an Account
              </p>
            </Link>
          </div>
        </div>
        <button
          type="submit"
          className="mt-6 rounded-[8px] bg-yellow-50 py-[8px] px-[12px] font-medium text-richblack-900"
        >
          Create Account
        </button>
      </form>
    </div>
  );
};

export default SignupForm;
