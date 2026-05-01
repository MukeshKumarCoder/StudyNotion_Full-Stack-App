import { Swiper, SwiperSlide } from "swiper/react";
import { FreeMode, Pagination } from "swiper";
import Course_Card from "./Course_Card";
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/pagination";

const Course_Slider = ({ Courses }) => {
  return (
    <>
      {Courses?.length ? (
        <Swiper
          slidesPerView={1}
          spaceBetween={16}
          loop={Courses.length > 3}
          modules={[FreeMode, Pagination]}
          breakpoints={{
            640: {
              slidesPerView: 2,
              spaceBetween: 20,
            },
            1024: {
              slidesPerView: 3,
              spaceBetween: 24,
            },
          }}
          className="max-h-[min(32rem,85vh)] min-w-0"
        >
          {Courses?.map((course, i) => (
            <SwiperSlide key={i} className="min-w-0">
              <Course_Card course={course} />
            </SwiperSlide>
          ))}
        </Swiper>
      ) : (
        <p className="text-lg text-richBlack-5 sm:text-xl">No Course Found</p>
      )}
    </>
  );
};

export default Course_Slider;
