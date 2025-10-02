import React from "react";
// import { HiOutVideoCamera } from "react-icons/hi";
import { FaCamera } from "react-icons/fa";

const CourseSubSectionAccordion = ({ subSec }) => {
  return (
    <div className="flex justify-between py-2">
      <div className="flex items-center gap-2">
        <span>
          {/* <HiOutVideoCamera /> */}
          <FaCamera />
        </span>
        <p>{subSec?.title}</p>
      </div>
    </div>
  );
};

export default CourseSubSectionAccordion;
