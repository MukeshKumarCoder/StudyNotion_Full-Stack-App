import { useEffect, useState } from "react";
import Footer from "../components/common/Footer";
import { useParams } from "react-router-dom";
import { getCataLogPageData } from "../services/operations/pageAndComponentData";
import Course_Card from "../components/core/Catalog/Course_Card";
import CourseSlider from "../components/core/Catalog/Course_Slider";
import { useSelector } from "react-redux";
import Error from "./Error";
import toast from "react-hot-toast";

const Catalog = () => {
  const { loading } = useSelector((state) => state.profile);
  const [active, setActive] = useState(1);
  const [catalogPageData, setCatalogPageData] = useState(null);
  const { categorySlugWithId } = useParams();
  const categoryId = categorySlugWithId.match(/[0-9a-fA-F]{24}$/)?.[0];

  // Fetch catalog page data
  useEffect(() => {
    const getCategoryDetails = async () => {
      try {
        const res = await getCataLogPageData(categoryId);
        setCatalogPageData(res);
      } catch (error) {
        toast.error(error.message || "could not get catalog page data");
      }
    };
    if (categoryId) {
      getCategoryDetails();
    }
  }, [categoryId]);

  const tabs = [
    { id: 1, label: "Most Popular" },
    { id: 2, label: "New" },
  ];

  if (loading || !catalogPageData) {
    return (
      <div className="grid min-h-[calc(100vh-3.5rem)] place-items-center">
        <div className="spinner"></div>
      </div>
    );
  }

  if (!loading && !catalogPageData.success) {
    return <Error />;
  }

  return (
    <div className="w-full min-w-0 max-w-full overflow-x-clip">
      <div className="box-content bg-richBlack-800 px-3 sm:px-4">
        <div className="mx-auto flex min-h-[200px] max-w-maxContentTab flex-col justify-center gap-3 py-8 sm:min-h-[240px] sm:gap-4 sm:py-10 md:min-h-[260px] lg:max-w-maxContent">
          <p className="break-words text-xs text-richBlack-300 sm:text-sm">
            {`Home / Catalog / `}
            <span className="text-yellow-25">
              {catalogPageData?.data?.selectedCategory?.name || "Category"}
            </span>
          </p>
          <p className="break-words text-2xl text-richBlack-5 sm:text-3xl md:text-4xl">
            {catalogPageData?.data?.selectedCategory?.name || "Category"}
          </p>
          <p className="max-w-prose text-sm text-richBlack-200 sm:text-base md:max-w-[870px]">
            {catalogPageData?.data?.selectedCategory?.description || ""}
          </p>
        </div>
      </div>

      <div className="mx-auto box-content w-full max-w-maxContentTab px-3 py-8 sm:px-4 sm:py-10 md:py-12 lg:max-w-maxContent">
        <div className="section_heading">Courses to get you started</div>
        <div className="my-3 flex flex-wrap gap-x-1 border-b border-richBlack-600 text-xs sm:my-4 sm:text-sm">
          {tabs.map((tab) => (
            <p
              key={tab.id}
              onClick={() => setActive(tab.id)}
              onKeyDown={(e) => e.key === "Enter" && setActive(tab.id)}
              role="button"
              tabIndex={0}
              className={`cursor-pointer px-3 py-2 sm:px-4 ${
                active === tab.id
                  ? "border-b border-yellow-25 text-yellow-25"
                  : "text-richBlack-50"
              }`}
            >
              {tab.label}
            </p>
          ))}
        </div>
        <div>
          <CourseSlider
            Courses={catalogPageData?.data?.selectedCategory?.courses}
          />
        </div>
      </div>

      <div className="mx-auto box-content w-full max-w-maxContentTab px-3 py-8 sm:px-4 sm:py-10 md:py-12 lg:max-w-maxContent">
        <h2 className="section_heading break-words">
          Top courses in {catalogPageData?.data?.suggestedCategory?.name || ""}
        </h2>
        <div className="py-6 sm:py-8">
          <CourseSlider
            Courses={catalogPageData?.data?.suggestedCategory?.courses}
          />
        </div>
      </div>

      <div className="mx-auto box-content w-full max-w-maxContentTab px-3 py-8 sm:px-4 sm:py-10 md:py-12 lg:max-w-maxContent">
        <div className="section_heading">Frequently Bought</div>
        <div className="py-6 sm:py-8">
          <div className="grid grid-cols-1 gap-5 sm:gap-6 lg:grid-cols-2">
            {catalogPageData?.data?.mostSellingCourses
              ?.slice(0, 4)
              .map((course) => (
                <Course_Card course={course} key={course._id} featured />
              ))}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Catalog;
