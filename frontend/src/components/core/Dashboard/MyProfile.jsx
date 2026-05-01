import React from "react";
import { RiEditBoxLine } from "react-icons/ri";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { formattedDate } from "../../../utils/formattedDate";
import IconBtn from "../../common/IconBtn";

const MyProfile = () => {
  const { user } = useSelector((state) => state.profile);
  const navigate = useNavigate();

  return (
    <div className="w-full px-4 sm:px-6 lg:px-0">
      {/* Heading */}
      <h1 className="mb-8 text-2xl font-medium text-richBlack-5 sm:mb-10 sm:text-3xl">
        My Profile
      </h1>

      {/* Profile Section */}
      <div className="flex flex-col gap-6 rounded-md border border-richBlack-700 bg-richBlack-800 p-4 sm:p-6 md:flex-row md:items-center md:justify-between lg:p-8">
        <div className="flex flex-col items-center gap-4 sm:flex-row sm:items-center">
          <img
            src={user?.image}
            alt={`profile-${user?.firstName}`}
            className="aspect-square w-16 rounded-full object-cover sm:w-20"
          />

          <div className="text-center sm:text-left">
            <p className="text-base font-semibold text-richBlack-5 sm:text-lg">
              {user?.firstName + " " + user?.lastName}
            </p>
            <p className="break-all text-sm text-richBlack-300">
              {user?.email}
            </p>
          </div>
        </div>

        <div className="w-full sm:w-auto">
          <IconBtn
            text="Edit"
            onclick={() => navigate("/dashboard/settings")}
          >
            <RiEditBoxLine />
          </IconBtn>
        </div>
      </div>

      {/* About Section */}
      <div className="my-6 flex flex-col gap-6 rounded-md border border-richBlack-700 bg-richBlack-800 p-4 sm:my-8 sm:p-6 lg:p-8">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-lg font-semibold text-richBlack-5">About</p>

          <div className="w-full sm:w-auto">
            <IconBtn
              text="Edit"
              onclick={() => navigate("/dashboard/settings")}
            >
              <RiEditBoxLine />
            </IconBtn>
          </div>
        </div>

        <p
          className={`text-sm font-medium ${
            user?.additionalDetails?.about
              ? "text-richBlack-5"
              : "text-richBlack-400"
          }`}
        >
          {user?.additionalDetails?.about ??
            "Write Something About Yourself"}
        </p>
      </div>

      {/* Personal Details Section */}
      <div className="my-6 flex flex-col gap-6 rounded-md border border-richBlack-700 bg-richBlack-800 p-4 sm:my-8 sm:p-6 lg:p-8">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-lg font-semibold text-richBlack-5">
            Personal Details
          </p>

          <div className="w-full sm:w-auto">
            <IconBtn
              text="Edit"
              onclick={() => navigate("/dashboard/settings")}
            >
              <RiEditBoxLine />
            </IconBtn>
          </div>
        </div>

        {/* Responsive Grid */}
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
          {/* Left Column */}
          <div className="space-y-5">
            <div>
              <p className="mb-2 text-sm text-richBlack-600">
                First Name
              </p>
              <p className="text-sm font-medium text-richBlack-5">
                {user?.firstName}
              </p>
            </div>

            <div>
              <p className="mb-2 text-sm text-richBlack-600">Email</p>
              <p className="break-all text-sm font-medium text-richBlack-5">
                {user?.email}
              </p>
            </div>

            <div>
              <p className="mb-2 text-sm text-richBlack-600">Gender</p>
              <p className="text-sm font-medium text-richBlack-5">
                {user?.additionalDetails?.gender ?? "Add Gender"}
              </p>
            </div>
          </div>

          {/* Right Column */}
          <div className="space-y-5">
            <div>
              <p className="mb-2 text-sm text-richBlack-600">
                Last Name
              </p>
              <p className="text-sm font-medium text-richBlack-5">
                {user?.lastName}
              </p>
            </div>

            <div>
              <p className="mb-2 text-sm text-richBlack-600">
                Phone Number
              </p>
              <p className="text-sm font-medium text-richBlack-5">
                {user?.additionalDetails?.contactNumber ??
                  "Add Contact Number"}
              </p>
            </div>

            <div>
              <p className="mb-2 text-sm text-richBlack-600">
                Date Of Birth
              </p>
              <p className="text-sm font-medium text-richBlack-5">
                {formattedDate(
                  user?.additionalDetails?.dateOfBirth
                ) ?? "Add Date Of Birth"}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyProfile;