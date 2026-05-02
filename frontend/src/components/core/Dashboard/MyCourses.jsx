import { useEffect, useState } from "react";
import { VscAdd } from "react-icons/vsc";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import IconBtn from "../../common/IconBtn";
import CoursesTable from "./InstructorCourses/CoursesTable";
import { fetchInstructorCourses } from "../../../services/operations/courseDetailsAPI";

const MyCourses = () => {
  const { token } = useSelector((state) => state.auth);
  const navigate = useNavigate();

  const [courses, setCourses] = useState([]);
  const [page, setPage] = useState(1);
  const [pagination, setPagination] = useState(null);
  const pageSize = 10;

  useEffect(() => {
    const fetchCourses = async () => {
      const result = await fetchInstructorCourses(token, {
        page,
        limit: pageSize,
      });

      if (result?.courses !== undefined) {
        setCourses(result.courses);
        setPagination(result.pagination);
        const tp = result.pagination?.totalPages ?? 1;
        if (page > tp && tp >= 1) {
          setPage(tp);
        }
      }
    };

    fetchCourses();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page, token]);

  return (
    <div className="w-full px-4 sm:px-6 lg:px-0">
      
      {/* Header */}
      <div className="mb-8 flex flex-col gap-4 sm:mb-10 sm:flex-row sm:items-center sm:justify-between lg:mb-14">
        
        <h1 className="text-2xl font-medium text-richBlack-5 sm:text-3xl">
          My Courses
        </h1>

        <IconBtn
          text="Add Course"
          onclick={() => navigate("/dashboard/add-course")}
        >
          <VscAdd />
        </IconBtn>
      </div>

      {/* Courses Table */}
      {courses && (
        <>
          <CoursesTable
            courses={courses}
            setCourses={setCourses}
            listPage={page}
            pageSize={pageSize}
          />
          {pagination && pagination.totalPages > 1 && (
            <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
              <button
                type="button"
                disabled={!pagination.hasPrevPage}
                onClick={() => setPage((p) => Math.max(1, p - 1))}
                className="rounded-md bg-richBlack-700 px-4 py-2 text-sm font-semibold text-richBlack-5 disabled:opacity-40"
              >
                Previous
              </button>
              <span className="text-sm text-richBlack-200">
                Page {pagination.currentPage} of {pagination.totalPages}
              </span>
              <button
                type="button"
                disabled={!pagination.hasNextPage}
                onClick={() => setPage((p) => p + 1)}
                className="rounded-md bg-richBlack-700 px-4 py-2 text-sm font-semibold text-richBlack-5 disabled:opacity-40"
              >
                Next
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default MyCourses;