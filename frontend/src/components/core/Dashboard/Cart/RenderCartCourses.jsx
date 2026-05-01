import { FaStar } from "react-icons/fa";
import { RiDeleteBin6Line } from "react-icons/ri";
import ReactStars from "react-rating-stars-component";
import { useDispatch, useSelector } from "react-redux";
import { removeFromCart } from "../../../../slices/cartSlice";

const RenderCartCourses = () => {
  const { cart } = useSelector((state) => state.cart);
  const dispatch = useDispatch();

  return (
    <div className="flex min-w-0 flex-1 flex-col">
      {cart.map((course, indx) => (
        <div
          key={course._id}
          className={`flex w-full min-w-0 flex-col gap-4 sm:flex-row sm:flex-wrap sm:items-start sm:justify-between sm:gap-6 ${
            indx !== cart.length - 1 && "border-b border-richBlack-400 pb-6"
          } ${indx !== 0 && "mt-6"} `}
        >
          <div className="flex min-w-0 flex-1 flex-col gap-4 sm:flex-row sm:items-start">
            <img
              src={course?.thumbnail}
              alt={course?.courseName}
              className="aspect-[220/148] h-auto w-full max-w-[220px] shrink-0 rounded-lg object-cover sm:h-[148px] sm:w-[220px]"
            />
            <div className="flex min-w-0 flex-1 flex-col space-y-1">
              <p className="break-words text-base font-medium text-richBlack-5 sm:text-lg">
                {course?.courseName}
              </p>
              <p className="text-sm text-richBlack-300">
                {course?.category?.name}
              </p>
              <div className="flex flex-wrap items-center gap-2">
                <span className="text-yellow-5">4.5</span>
                <ReactStars
                  count={5}
                  value={course?.ratingAndReviews?.length}
                  size={20}
                  edit={false}
                  activeColor="#ffd700"
                  emptyIcon={<FaStar />}
                  fullIcon={<FaStar />}
                />
                <span className="text-richBlack-400">
                  {course?.ratingAndReviews?.length} Ratings
                </span>
              </div>
            </div>
          </div>
          <div className="flex w-full min-w-0 flex-col gap-2 sm:w-auto sm:max-w-[12rem] sm:items-end sm:space-y-2">
            <button
              type="button"
              onClick={() => dispatch(removeFromCart(course._id))}
              className="flex w-full items-center justify-center gap-x-1 rounded-md border border-richBlack-600 bg-richBlack-700 py-2.5 px-3 text-sm text-pink-200 sm:w-auto sm:py-3 sm:px-3"
            >
              <RiDeleteBin6Line />
              <span>Remove</span>
            </button>
            <p className="text-2xl font-medium text-yellow-100 sm:mb-2 sm:text-3xl">
              ₹ {course?.price}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default RenderCartCourses;
