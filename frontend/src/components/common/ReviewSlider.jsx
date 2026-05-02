import { useEffect, useState } from "react";
import ReactStars from "react-rating-stars-component";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/pagination";
import "../../App.css";

import { FaStar } from "react-icons/fa";
import { Autoplay, FreeMode, Pagination } from "swiper";

import { apiConnector } from "../../services/apiConnector";
import { ratingsEndpoints } from "../../services/apis";

function starSizeForWidth() {
  if (typeof window === "undefined") return 18;

  const w = window.innerWidth;

  if (w < 360) return 14;
  if (w < 480) return 16;
  if (w < 768) return 18;
  return 20;
}

const ReviewSlider = () => {
  const [reviews, setReviews] = useState([]);
  const [starSize, setStarSize] = useState(18);

  useEffect(() => {
    (async () => {
      const { data } = await apiConnector(
        "GET",
        ratingsEndpoints.REVIEWS_DETAILS_API,
        null,
        null,
        { page: 1, limit: 100 }
      );

      if (data?.success) {
        setReviews(data?.data ?? []);
      }
    })();
  }, []);

  useEffect(() => {
    const update = () => setStarSize(starSizeForWidth());

    update();

    window.addEventListener("resize", update);

    return () =>
      window.removeEventListener("resize", update);
  }, []);

  if (reviews.length === 0) {
    return (
      <div className="w-full px-2 py-8 text-center text-sm text-richBlack-100 sm:text-base">
        No reviews to show yet.
      </div>
    );
  }

  const enableLoop = reviews.length > 4;

  return (
    <div className="w-full text-white">
      <div className="mx-auto w-full max-w-maxContent">
        <Swiper
          slidesPerView={1}
          spaceBetween={12}
          loop={enableLoop}
          freeMode={true}
          autoplay={{
            delay: 2800,
            disableOnInteraction: false,
            pauseOnMouseEnter: true,
          }}
          breakpoints={{
            480: {
              slidesPerView: 1.2,
              spaceBetween: 14,
            },
            640: {
              slidesPerView: 2,
              spaceBetween: 16,
            },
            1024: {
              slidesPerView: 2.5,
              spaceBetween: 20,
            },
            1280: {
              slidesPerView: 3,
              spaceBetween: 24,
            },
            1536: {
              slidesPerView: 4,
              spaceBetween: 24,
            },
          }}
          modules={[FreeMode, Pagination, Autoplay]}
          className="w-full pb-8 [&_.swiper-slide]:h-auto"
        >
          {reviews.map((review, i) => (
            <SwiperSlide
              key={review?._id ?? i}
            >
              <div className="flex h-full min-h-[220px] flex-col gap-3 rounded-lg bg-richBlack-800 p-4 text-sm text-richBlack-25 sm:min-h-[240px]">
                
                {/* User Info */}
                <div className="flex items-start gap-3">
                  <img
                    src={
                      review?.user?.image
                        ? review?.user?.image
                        : `https://api.dicebear.com/5.x/initials/svg?seed=${review?.user?.firstName} ${review?.user?.lastName}`
                    }
                    alt="user"
                    className="h-10 w-10 shrink-0 rounded-full object-cover"
                  />

                  <div className="min-w-0 flex-1">
                    <p className="truncate font-semibold text-richBlack-5">
                      {`${review?.user?.firstName ?? ""} ${
                        review?.user?.lastName ?? ""
                      }`}
                    </p>

                    <p className="line-clamp-2 text-xs text-richBlack-400">
                      {review?.course?.courseName}
                    </p>
                  </div>
                </div>

                {/* Review */}
                <p className="line-clamp-5 flex-1 leading-relaxed text-richBlack-25">
                  {review?.review}
                </p>

                {/* Rating */}
                <div className="mt-auto flex flex-wrap items-center gap-2">
                  <span className="font-semibold text-yellow-100">
                    {Number(
                      review?.rating ?? 0
                    ).toFixed(1)}
                  </span>

                  <ReactStars
                    count={5}
                    value={Number(
                      review?.rating ?? 0
                    )}
                    size={starSize}
                    edit={false}
                    activeColor="#ffd700"
                    emptyIcon={<FaStar />}
                    fullIcon={<FaStar />}
                  />
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
};

export default ReviewSlider;