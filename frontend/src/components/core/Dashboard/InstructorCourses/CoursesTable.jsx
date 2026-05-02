import { useState } from "react";
import { FaCheck } from "react-icons/fa";
import { FiEdit2 } from "react-icons/fi";
import { HiClock } from "react-icons/hi";
import { RiDeleteBin6Line } from "react-icons/ri";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import {
  Table,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
} from "react-super-responsive-table";
import "react-super-responsive-table/dist/SuperResponsiveTableStyle.css";

import { formatDate } from "../../../../services/formatDate";
import {
  deleteCourse,
  fetchInstructorCourses,
} from "../../../../services/operations/courseDetailsAPI";

import { COURSE_STATUS } from "../../../../utils/constants";
import ConfirmationModal from "../../../common/ConfirmationModal";

const CoursesTable = ({ courses, setCourses, listPage = 1, pageSize = 10 }) => {
  const navigate = useNavigate();
  const { token } = useSelector((state) => state.auth);

  const [loading, setLoading] = useState(false);
  const [confirmationModal, setConfirmationModal] =
    useState(null);

  const TRUNCATE_LENGTH = 30;

  const handleCourseDelete = async (courseId) => {
    setLoading(true);

    await deleteCourse({ courseId }, token);

    const result = await fetchInstructorCourses(token, {
      page: listPage,
      limit: pageSize,
    });

    if (result?.courses) {
      setCourses(result.courses);
    }

    setConfirmationModal(null);
    setLoading(false);
  };

  return (
    <>
      <div className="overflow-hidden rounded-xl border border-richBlack-800">
        <Table className="w-full">
          
          {/* Desktop Header */}
          <Thead className="hidden md:table-header-group">
            <Tr className="border-b border-richBlack-800 bg-richBlack-700">
              <Th className="px-6 py-4 text-left text-sm uppercase text-richBlack-100">
                Courses
              </Th>
              <Th className="px-4 py-4 text-left text-sm uppercase text-richBlack-100">
                Duration
              </Th>
              <Th className="px-4 py-4 text-left text-sm uppercase text-richBlack-100">
                Price
              </Th>
              <Th className="px-4 py-4 text-left text-sm uppercase text-richBlack-100">
                Actions
              </Th>
            </Tr>
          </Thead>

          <Tbody>
            {courses?.length === 0 ? (
              <Tr>
                <Td className="py-10 text-center text-xl font-medium text-richBlack-100">
                  No courses found
                </Td>
              </Tr>
            ) : (
              courses?.map((course) => (
                <Tr
                  key={course._id}
                  className="block border-b border-richBlack-800 p-4 md:table-row md:p-0"
                >
                  
                  {/* Course Info */}
                  <Td className="block md:table-cell px-0 md:px-6 py-4">
                    <div className="flex flex-col gap-4 sm:flex-row">
                      <img
                        src={course?.thumbnail}
                        alt={course?.courseName}
                        className="h-40 w-full rounded-lg object-cover sm:h-28 sm:w-44 md:h-[120px] md:w-[180px]"
                      />

                      <div className="flex flex-col gap-3">
                        <p className="text-lg font-semibold text-richBlack-5">
                          {course.courseName}
                        </p>

                        <p className="text-sm text-richBlack-300">
                          {course.courseDescription.split(" ")
                            .length > TRUNCATE_LENGTH
                            ? course.courseDescription
                                .split(" ")
                                .slice(0, TRUNCATE_LENGTH)
                                .join(" ") + "..."
                            : course.courseDescription}
                        </p>

                        <p className="text-xs text-white">
                          Created:{" "}
                          {formatDate(course.createdAt)}
                        </p>

                        {course.status ===
                        COURSE_STATUS.DRAFT ? (
                          <p className="flex w-fit items-center gap-2 rounded-full bg-richBlack-700 px-3 py-1 text-xs text-pink-100">
                            <HiClock size={14} />
                            Drafted
                          </p>
                        ) : (
                          <p className="flex w-fit items-center gap-2 rounded-full bg-richBlack-700 px-3 py-1 text-xs text-yellow-100">
                            <div className="flex h-3 w-3 items-center justify-center rounded-full bg-yellow-100 text-richBlack-700">
                              <FaCheck size={8} />
                            </div>
                            Published
                          </p>
                        )}
                      </div>
                    </div>
                  </Td>

                  {/* Duration */}
                  <Td className="block md:table-cell px-0 md:px-4 py-3 text-sm text-richBlack-100">
                    <span className="md:hidden font-semibold">
                      Duration:{" "}
                    </span>
                    {course.totalDuration || "N/A"}
                  </Td>

                  {/* Price */}
                  <Td className="block md:table-cell px-0 md:px-4 py-3 text-sm text-richBlack-100">
                    <span className="md:hidden font-semibold">
                      Price:{" "}
                    </span>
                    ₹{course.price}
                  </Td>

                  {/* Actions */}
                  <Td className="block md:table-cell px-0 md:px-4 py-3">
                    <div className="flex gap-4">
                      <button
                        disabled={loading}
                        onClick={() =>
                          navigate(
                            `/dashboard/edit-course/${course._id}`
                          )
                        }
                        className="transition-all duration-200 hover:scale-110 hover:text-caribBeanGreen-300"
                      >
                        <FiEdit2 size={20} />
                      </button>

                      <button
                        disabled={loading}
                        onClick={() => {
                          setConfirmationModal({
                            text1:
                              "Do you want to delete this course?",
                            text2:
                              "All the data related to this course will be deleted",
                            btn1Text: !loading
                              ? "Delete"
                              : "Loading...",
                            btn2Text: "Cancel",
                            btn1Handler: !loading
                              ? () =>
                                  handleCourseDelete(
                                    course._id
                                  )
                              : () => {},
                            btn2Handler: !loading
                              ? () =>
                                  setConfirmationModal(null)
                              : () => {},
                          });
                        }}
                        className="transition-all duration-200 hover:scale-110 hover:text-red-500"
                      >
                        <RiDeleteBin6Line size={20} />
                      </button>
                    </div>
                  </Td>
                </Tr>
              ))
            )}
          </Tbody>
        </Table>
      </div>

      {confirmationModal && (
        <ConfirmationModal
          modalData={confirmationModal}
        />
      )}
    </>
  );
};

export default CoursesTable;