import React, { useEffect, useState } from "react";
import ProgressBar from "@ramonak/react-progress-bar";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getUserEnrolledCourses } from "../../../services/operations/profileAPI";

const EnrolledCourses = () => {
  const { token } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const [enrolledCourses, setEnrolledCourses] = useState(null);

  const getEnrolledCourses = async () => {
    try {
      const res = await getUserEnrolledCourses(token);
      setEnrolledCourses(res);
    } catch (error) {
      console.log("Could not fetch enrolled courses.");
    }
  };

  useEffect(() => {
    getEnrolledCourses();
  }, []);

  const getCourseContinueUrl = (course) => {
    const fallbackSectionId = course?.courseContent?.[0]?._id;
    const fallbackSubSectionId =
      course?.courseContent?.[0]?.subSection?.[0]?._id;

    const sectionId =
      course?.lastAccessedSection || fallbackSectionId;

    const subSectionId =
      course?.lastAccessedSubSection || fallbackSubSectionId;

    if (!course?._id || !sectionId || !subSectionId) {
      return null;
    }

    return `/view-course/${course._id}/section/${sectionId}/sub-section/${subSectionId}`;
  };

  return (
    <div className="w-full px-4 sm:px-6 lg:px-0">
      <h1 className="text-2xl sm:text-3xl text-richBlack-50">
        Enrolled Courses
      </h1>

      {!enrolledCourses ? (
        <div className="grid min-h-[calc(100vh-3.5rem)] place-items-center">
          <div className="spinner"></div>
        </div>
      ) : !enrolledCourses.length ? (
        <p className="grid h-[10vh] w-full place-content-center text-center text-richBlack-5">
          You have not enrolled in any course yet.
        </p>
      ) : (
        <div className="my-8 text-richBlack-5">
          
          {/* Desktop Header */}
          <div className="hidden md:flex rounded-t-lg bg-richBlack-500">
            <p className="w-[50%] px-5 py-3">Course Name</p>
            <p className="w-[20%] px-2 py-3">Duration</p>
            <p className="w-[30%] px-2 py-3">Progress</p>
          </div>

          {/* Course List */}
          <div className="space-y-4 md:space-y-0">
            {enrolledCourses.map((course, i, arr) => (
              <div
                key={i}
                className={`
                  border border-richBlack-700 
                  bg-richBlack-800
                  md:flex md:items-center
                  ${
                    i === arr.length - 1
                      ? "md:rounded-b-lg"
                      : ""
                  }
                `}
              >
                {/* Course Info */}
                <div
                  className="flex cursor-pointer flex-col gap-4 p-4 sm:flex-row md:w-[50%]"
                  onClick={() => {
                    const continueUrl =
                      getCourseContinueUrl(course);
                    if (continueUrl) navigate(continueUrl);
                  }}
                >
                  <img
                    src={course.thumbnail}
                    alt="course_img"
                    className="h-20 w-full rounded-lg object-cover sm:h-16 sm:w-16 md:h-14 md:w-14"
                  />

                  <div className="flex flex-col gap-2">
                    <p className="font-semibold text-sm sm:text-base">
                      {course.courseName}
                    </p>

                    <p className="text-xs text-richBlack-300 sm:text-sm">
                      {course.courseDescription.length > 80
                        ? `${course.courseDescription.slice(
                            0,
                            80
                          )}...`
                        : course.courseDescription}
                    </p>
                  </div>
                </div>

                {/* Duration */}
                <div className="px-4 pb-2 md:w-[20%] md:px-2 md:py-3">
                  <p className="text-sm text-richBlack-300 md:hidden">
                    Duration
                  </p>
                  <p>{course?.totalDuration}</p>
                </div>

                {/* Progress */}
                <div className="flex flex-col gap-2 px-4 pb-4 md:w-[30%] md:px-2 md:py-3">
                  <p className="text-sm">
                    Progress: {course.progressPercentage || 0}%
                  </p>

                  <ProgressBar
                    completed={course.progressPercentage || 0}
                    height="8px"
                    isLabelVisible={false}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default EnrolledCourses;