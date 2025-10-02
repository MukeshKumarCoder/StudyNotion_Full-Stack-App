import React, { useEffect, useRef, useState } from "react";
import { AiOutlineDown } from "react-icons/ai";
import CourseSubSectionAccordion from "./CourseSubSectionAccordion";

const CourseAccordionBar = ({ course, isActive, handleActive }) => {
  const contentEl = useRef(null);

  // Accordion state
  const [active, setActive] = useState(false);
  useEffect(() => {
    setActive(isActive?.includes(course._id));
  }, [isActive]);

  const [sectionHeight, setSectionHeight] = useState(0);
  useEffect(() => {
    setSectionHeight(active ? contentEl.current.scrollHeight : 0);
  }, [active]);

  return (
    <div className="border-richBlack-600 bg-richBlack-700 text-richBlack-5 overflow-hidden border border-solid last:mb-0">
      <div
        className={`flex cursor-pointer items-start justify-between bg-opacity-20 px-7  py-6 transition-[0.3s]`}
        onClick={() => {
          handleActive(course._id);
        }}
      >
        <div className="flex items-center gap-2">
          <i
            className={
              isActive.includes(course._id) ? "rotate-180" : "rotate-0"
            }
          >
            <AiOutlineDown />
          </i>
          <p>{course?.sectionName}</p>
        </div>
        <div className="space-x-4">
          <span className="text-yellow-25">
            {`${course.subSection.length || 0} lecture(s)`}
          </span>
        </div>
      </div>
      <div
        ref={contentEl}
        className={`relative h-0 overflow-hidden bg-richBlack-900 transition-[height] duration-[0.35s] ease-[ease]`}
        style={{
          height: sectionHeight,
        }}
      >
        <div className="text-textHead flex flex-col gap-2 px-7 py-6 font-semibold">
          {course?.subSection?.map((subSec, i) => {
            return <CourseSubSectionAccordion subSec={subSec} key={i} />;
          })}
        </div>
      </div>
    </div>
  );
};

export default CourseAccordionBar;
