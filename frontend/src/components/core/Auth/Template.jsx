import React from "react";
import { useSelector } from "react-redux";
import frameImg from "../../../assets/Images/frame.png";
import LoginForm from "./LoginForm";
import SignupForm from "./SignupForm";

const Template = ({ title, description1, description2, image, formType }) => {
  const { loading } = useSelector((state) => state.auth);
  return (
    <div className="grid min-h-[calc(100vh-3.5rem)] place-items-center">
      {loading ? (
        <div className="spinner"></div>
      ) : (
        <div className="mx-auto flex w-11/12 min-w-0 max-w-maxContent flex-col-reverse justify-between gap-y-8 py-8 sm:gap-y-10 sm:py-10 md:flex-row md:gap-y-0 md:gap-x-8 lg:gap-x-12">
          <div className="mx-auto w-full max-w-[min(100%,450px)] md:mx-0">
            <h1 className="text-2xl font-semibold leading-tight text-richBlack-5 sm:text-[1.75rem] sm:leading-9 md:text-[1.875rem] md:leading-[2.375rem]">
              {title}
            </h1>
            <p className="mt-3 text-base leading-7 sm:mt-4 sm:text-[1.125rem] sm:leading-[1.625rem]">
              <span className="text-richBlack-100">{description1}</span>{" "}
              <span className="font-edu-sa font-bold italic text-blue-100">
                {description2}
              </span>
            </p>
            {formType === "signup" ? <SignupForm /> : <LoginForm />}
          </div>
          <div className="relative hidden md:block mx-auto w-full max-w-[min(100%,450px)] md:mx-0 ">
            <img
              src={frameImg}
              alt=""
              className="h-auto w-full max-w-full object-contain"
              width={558}
              height={504}
              loading="lazy"
            />
            <img
              src={image}
              alt="Students"
              className="absolute -top-2 right-2 z-10 h-auto w-4/5 max-w-sm object-contain sm:-top-3 sm:right-3 md:-top-4 md:right-4"
              width={558}
              height={504}
              loading="lazy"
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default Template;
