import { useEffect, useState } from "react";
import { BsChevronDown } from "react-icons/bs";
import { IoIosArrowBack } from "react-icons/io";
import { useSelector } from "react-redux";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import IconBtn from "../../common/IconBtn";

const VideoDetailsSidebar = ({ setReviewModal, onLectureSelect }) => {
  const [activeStatus, setActiveStatus] = useState("");
  const [videoBarActive, setVideoBarActive] = useState("");
  const navigate = useNavigate();
  const location = useLocation();
  const { sectionId, subSectionId } = useParams();
  const {
    courseSectionData,
    courseEntireData,
    totalNoOfLectures,
    completedLectures,
    lastAccessedSection,
    lastAccessedSubSection,
  } = useSelector((state) => state.viewCourse);

  const firstSectionId = courseSectionData?.[0]?._id;
  const firstSubSectionId = courseSectionData?.[0]?.subSection?.[0]?._id;
  const canResume = Boolean(lastAccessedSection && lastAccessedSubSection);

  useEffect(() => {
    (() => {
      if (!courseSectionData.length) return;
      const currentSectionIndx = courseSectionData.findIndex(
        (data) => data._id === sectionId
      );
      const currentSubSectionIndx = courseSectionData?.[
        currentSectionIndx
      ]?.subSection.findIndex((data) => data._id === subSectionId);
      const activeSubSectionId =
        courseSectionData[currentSectionIndx]?.subSection?.[
          currentSubSectionIndx
        ]?._id;
      setActiveStatus(courseSectionData?.[currentSectionIndx]?._id);
      setVideoBarActive(activeSubSectionId);
    })();
  }, [courseSectionData, courseEntireData, location.pathname]);

  return (
    <div className="flex h-full min-h-0 w-full min-w-0 flex-1 flex-col overflow-hidden border-r border-richBlack-700 bg-richBlack-800 md:h-[calc(100vh-3.5rem)] md:max-w-[350px] md:shrink-0 md:w-[min(100%,320px)]">
      <div className="mx-3 flex flex-col items-start justify-between gap-2 gap-y-4 border-b border-richBlack-600 py-4 text-base font-bold text-richBlack-25 sm:mx-5 sm:py-5 sm:text-lg">
        <div className="flex w-full min-w-0 items-center justify-between gap-2">
          <div
            onClick={() => {
              navigate(`/dashboard/enrolled-courses`);
            }}
            className="flex h-8 w-8 shrink-0 cursor-pointer items-center justify-center rounded-full bg-richBlack-100 p-1 text-richBlack-700 transition hover:scale-95"
            title="back"
            role="button"
            tabIndex={0}
            onKeyDown={(e) => e.key === "Enter" && navigate(`/dashboard/enrolled-courses`)}
          >
            <IoIosArrowBack size={26} />
          </div>
          <IconBtn
            text="Add Review"
            customClasses="ml-auto whitespace-normal text-left text-sm sm:text-base"
            onclick={() => setReviewModal(true)}
          />
        </div>
        <div className="flex w-full min-w-0 flex-col break-words">
          <p className="line-clamp-2">{courseEntireData?.courseName}</p>
          <p className="text-sm font-semibold text-richBlack-500">
            {completedLectures?.length} / {totalNoOfLectures}
          </p>
        </div>
        <button
          type="button"
          disabled={!canResume}
          className="mt-1 w-full rounded-md bg-yellow-50 px-3 py-2 text-left text-xs font-semibold text-richBlack-800 transition hover:bg-yellow-100 disabled:cursor-not-allowed disabled:bg-richBlack-600 disabled:text-richBlack-300"
          onClick={() => {
            const targetSectionId = canResume ? lastAccessedSection : firstSectionId;
            const targetSubSectionId = canResume
              ? lastAccessedSubSection
              : firstSubSectionId;
            if (!targetSectionId || !targetSubSectionId) return;
            navigate(
              `/view-course/${courseEntireData?._id}/section/${targetSectionId}/sub-section/${targetSubSectionId}`
            );
            onLectureSelect?.();
          }}
        >
          {canResume
            ? "Continue where you left off"
            : "Start course to unlock resume"}
        </button>
      </div>
      <div className="min-h-0 flex-1 overflow-y-auto overscroll-contain">
        {courseSectionData.map((course, i) => (
          <div
            className="mt-2 cursor-pointer text-sm text-richBlack-5"
            onClick={() =>
            setActiveStatus(
            activeStatus === course?._id ? null : course?._id
         )}
            key={i}
          >
            {/* section 1 */}
            <div className="flex justify-between bg-richBlack-600 px-5 py-4">
              <p className="w-[70%] font-semibold">{course?.sectionName}</p>
              <div className="flex items-center gap-3">
                <span
                  className={`${
                    activeStatus === course?._id
                      ? "rotate-180"
                      : "rotate-0"
                  } transition-all duration-500`}
                >
                  <BsChevronDown />
                </span>
              </div>
            </div>
            {/* sub section */}
            {activeStatus === course?._id && (
              <div className="transition-[height] duration-500 ease-in-out ">
                {course.subSection.map((topic, i) => (
                  <div
                    className={`flex gap-3 px-5 py-2 ${
                      videoBarActive === topic._id
                        ? "bg-yellow-200 font-semibold text-richBlack-800"
                        : "hover:bg-richBlack-900"
                    }`}
                    key={i}
                    onClick={() => {
                      navigate(
                        `/view-course/${courseEntireData?._id}/section/${course?._id}/sub-section/${topic?._id}`
                      );
                      setVideoBarActive(topic._id);
                      onLectureSelect?.();
                    }}
                  >
                    <input
                      type="checkbox"
                      checked={completedLectures.includes(topic?._id)}
                      onChange={() => {}}
                    />
                    {topic.title}
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default VideoDetailsSidebar;
