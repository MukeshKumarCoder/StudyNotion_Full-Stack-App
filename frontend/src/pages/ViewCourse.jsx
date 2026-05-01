import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Outlet, useParams } from "react-router-dom";
import { AiOutlineClose, AiOutlineMenu } from "react-icons/ai";
import CourseReviewModal from "../components/core/ViewCourse/CourseReviewModal";
import VideoDetailsSidebar from "../components/core/ViewCourse/VideoDetailsSidebar";
import { getFullDetailsOfCourse } from "../services/operations/courseDetailsAPI";
import {
  setCompletedLectures,
  setEntireCourseData,
  setLastViewedLecture,
  setCourseSectionData,
  setTotalNoOfLectures,
} from "../slices/viewCourseSlice";

const ViewCourse = () => {
  const { courseId } = useParams();
  const { token } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const [reviewModal, setReviewModal] = useState(false);
  const [lectureMenuOpen, setLectureMenuOpen] = useState(false);

  useEffect(() => {
    (async () => {
      const courseData = await getFullDetailsOfCourse(courseId, token);
      if (!courseData?.courseDetails) return;
      dispatch(setCourseSectionData(courseData.courseDetails.courseContent));
      dispatch(setEntireCourseData(courseData.courseDetails));
      dispatch(setCompletedLectures(courseData.completedVideos));
      dispatch(
        setLastViewedLecture({
          lastAccessedSection: courseData?.lastAccessedSection || null,
          lastAccessedSubSection: courseData?.lastAccessedSubSection || null,
          lastPlaybackTime: courseData?.lastPlaybackTime || 0,
          lastVisitedAt: courseData?.lastVisitedAt || null,
        })
      );

      let lectures = 0;
      courseData?.courseDetails?.courseContent?.forEach((sec) => {
        lectures += sec.subSection.length;
      });
      dispatch(setTotalNoOfLectures(lectures));
    })();
  }, [courseId, token, dispatch]);

  useEffect(() => {
    if (typeof document === "undefined") return;
    document.body.style.overflow = lectureMenuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [lectureMenuOpen]);

  return (
    <>
      <div className="relative flex w-full min-w-0 min-h-0 flex-1 flex-col overflow-hidden bg-richBlack-900 md:flex-row md:min-h-[calc(100vh-3.5rem)]">
        <div className="flex w-full min-w-0 items-center justify-between border-b border-richBlack-700 bg-richBlack-800 px-3 py-2.5 text-sm text-richBlack-5 md:hidden">
          <p className="line-clamp-1 font-medium text-richBlack-25">
            Course content
          </p>
          <div className="flex shrink-0 items-center gap-1">
            <button
              type="button"
              onClick={() => setLectureMenuOpen(true)}
              className="flex items-center gap-1.5 rounded-md border border-richBlack-600 px-2.5 py-1.5 text-xs text-richBlack-5 transition active:bg-richBlack-700"
              aria-expanded={lectureMenuOpen}
            >
              <AiOutlineMenu className="text-lg" aria-hidden />
              <span className="hidden min-[400px]:inline">Lectures</span>
            </button>
          </div>
        </div>
        {lectureMenuOpen && (
          <div
            className="fixed inset-0 top-14 z-[200] flex md:hidden"
            role="dialog"
            aria-modal="true"
          >
            <div
              className="min-h-0 flex-1 bg-richBlack-900/60 backdrop-blur-sm"
              onClick={() => setLectureMenuOpen(false)}
            />
            <div className="flex h-[calc(100dvh-3.5rem)] w-[min(100%,340px)] max-w-full shrink-0 flex-col border-l border-richBlack-800 bg-richBlack-800 shadow-2xl">
              <div className="flex h-10 shrink-0 items-center justify-end border-b border-richBlack-700 px-2">
                <button
                  type="button"
                  onClick={() => setLectureMenuOpen(false)}
                  className="grid h-9 w-9 place-items-center rounded-md text-richBlack-100"
                  aria-label="Close"
                >
                  <AiOutlineClose className="text-2xl" />
                </button>
              </div>
              <div className="min-h-0 min-w-0 flex-1">
                <VideoDetailsSidebar
                  setReviewModal={setReviewModal}
                  onLectureSelect={() => setLectureMenuOpen(false)}
                />
              </div>
            </div>
          </div>
        )}
        <div className="hidden h-[calc(100vh-3.5rem)] min-h-0 w-auto shrink-0 md:block">
          <VideoDetailsSidebar
            setReviewModal={setReviewModal}
            onLectureSelect={undefined}
          />
        </div>
        <div className="min-h-0 min-w-0 flex-1 overflow-y-auto md:h-[calc(100vh-3.5rem)]">
          <div className="mx-3 w-auto max-w-full py-4 sm:mx-6 sm:py-6">
            <Outlet />
          </div>
        </div>
      </div>
      {reviewModal && <CourseReviewModal setReviewModal={setReviewModal} />}
    </>
  );
};

export default ViewCourse;
