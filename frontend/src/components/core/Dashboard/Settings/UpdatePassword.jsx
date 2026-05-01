import { useState } from "react";
import { useForm } from "react-hook-form";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import IconBtn from "../../../common/IconBtn";
import { changePassword } from "../../../../services/operations/SettingsAPI";

const UpdatePassword = () => {
  const { token } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const [showOldPassword, setShowOldPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const submitPasswordForm = async (data) => {
    // console.log("password Data - ", data)
    try {
      await changePassword(token, navigate, data);
    } catch (error) {
      console.log("ERROR MESSAGE - ", error.message);
    }
  };
  return (
    <>
      <form onSubmit={handleSubmit(submitPasswordForm)}>
        <div className="my-6 flex flex-col gap-y-5 rounded-md border border-richBlack-700 bg-richBlack-800 p-4 sm:my-8 sm:gap-y-6 sm:p-6 md:my-10 md:p-8 md:px-10 lg:px-12">
          <h2 className="text-lg font-semibold text-richBlack-5">Password</h2>
          <div className="flex flex-col gap-5 lg:flex-row">
            <div className="flex min-w-0 flex-col gap-2 lg:w-[48%]">
              <label htmlFor="oldPassword" className="label-style">
                Current Password
              </label>
              <div className="relative">
              <input
                type={showOldPassword ? "text" : "password"}
                name="oldPassword"
                id="oldPassword"
                placeholder="Enter Current Password"
                className="form-style pr-11"
                {...register("oldPassword", { required: true })}
              />
              <span
                onClick={() => setShowOldPassword((prev) => !prev)}
                className="absolute right-3 top-1/2 z-10 -translate-y-1/2 cursor-pointer"
                role="button"
                tabIndex={0}
                onKeyDown={(e) => e.key === "Enter" && setShowOldPassword((p) => !p)}
              >
                {showOldPassword ? (
                  <AiOutlineEyeInvisible fontSize={24} fill="#AFB2BF" />
                ) : (
                  <AiOutlineEye fontSize={24} fill="#AFB2BF" />
                )}
              </span>
              </div>
              {errors.oldPassword && (
                <span className="-mt-1 text-[12px] text-yellow-100">
                  Please enter your Current Password.
                </span>
              )}
            </div>
            <div className="flex min-w-0 flex-col gap-2 lg:w-[48%]">
              <label htmlFor="newPassword" className="label-style">
                New Password
              </label>
              <div className="relative">
              <input
                type={showNewPassword ? "text" : "password"}
                name="newPassword"
                id="newPassword"
                placeholder="Enter New Password"
                className="form-style pr-11"
                {...register("newPassword", { required: true })}
              />
              <span
                onClick={() => setShowNewPassword((prev) => !prev)}
                className="absolute right-3 top-1/2 z-10 -translate-y-1/2 cursor-pointer"
                role="button"
                tabIndex={0}
                onKeyDown={(e) => e.key === "Enter" && setShowNewPassword((p) => !p)}
              >
                {showNewPassword ? (
                  <AiOutlineEyeInvisible fontSize={24} fill="#AFB2BF" />
                ) : (
                  <AiOutlineEye fontSize={24} fill="#AFB2BF" />
                )}
              </span>
              </div>
              {errors.newPassword && (
                <span className="-mt-1 text-[12px] text-yellow-100">
                  Please enter your New Password.
                </span>
              )}
            </div>
          </div>
        </div>
        <div className="mt-4 flex w-full min-w-0 flex-col-reverse gap-2 min-[420px]:flex-row min-[420px]:justify-end sm:mt-0">
          <button
            type="button"
            onClick={() => {
              navigate("/dashboard/my-profile");
            }}
            className="w-full cursor-pointer rounded-md bg-richBlack-700 py-2.5 px-4 text-center text-sm font-semibold text-richBlack-50 min-[420px]:w-auto sm:px-5"
          >
            Cancel
          </button>
          <IconBtn type="submit" text="Update" />
        </div>
      </form>
    </>
  );
};

export default UpdatePassword;
