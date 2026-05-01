import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import GetAvgRating from "../../../utils/avgRating";
import RatingStars from "../../common/RatingStars";

const Course_Card = ({ course, featured }) => {
  const [avgReviewCount, setAvgReviewCount] = useState(0);

  useEffect(() => {
    const count = GetAvgRating(course.ratingAndReviews);
    setAvgReviewCount(count);
  }, [course]);

  const imageClass = featured
    ? "aspect-[16/10] w-full max-h-[220px] rounded-xl object-cover sm:max-h-[300px] md:max-h-[360px] lg:max-h-[400px]"
    : "aspect-[16/10] w-full max-h-[200px] rounded-xl object-cover sm:max-h-[240px] md:aspect-video md:max-h-[260px]";

  return (
    <Link to={`/courses/${course._id}`} className="block min-w-0 max-w-full">
      <div className="min-w-0">
        <div className="overflow-hidden rounded-lg">
          <img
            src={course?.thumbnail}
            alt=""
            className={imageClass}
          />
        </div>
        <div className="flex min-w-0 flex-col gap-1.5 px-1 py-2 sm:gap-2 sm:py-3">
          <p className="break-words text-base text-richBlack-5 sm:text-lg md:text-xl">
            {course?.courseName}
          </p>
          <p className="truncate text-sm text-richBlack-50">
            {course?.instructor?.firstName} {course?.instructor?.lastName}
          </p>
          <div className="flex flex-wrap items-center gap-2 text-sm">
            <span className="text-yellow-5">{avgReviewCount || 0}</span>
            <RatingStars Review_Count={avgReviewCount} />
            <span className="text-richBlack-400">
              {course?.ratingAndReviews?.length} Ratings
            </span>
          </div>
          <p className="text-lg font-medium text-richBlack-5 sm:text-xl">
            Rs. {course?.price}
          </p>
        </div>
      </div>
    </Link>
  );
};

export default Course_Card;
