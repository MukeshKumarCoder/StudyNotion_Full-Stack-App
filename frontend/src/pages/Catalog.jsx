import React, { useEffect, useState } from "react";
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
    <>
      {/* Hero section */}
      <div className="box-content bg-richBlack-800 px-4">
        <div className="mx-auto flex min-h-[260px] max-w-maxContentTab flex-col justify-center gap-4 lg:max-w-maxContent ">
          <p className="text-sm text-richBlack-300">
            {`Home / Catalog / `}
            <span className="text-yellow-25">
              {catalogPageData?.data?.selectedCategory?.name || "Category"}
            </span>
          </p>
          <p className="text-3xl text-richBlack-5">
            {catalogPageData?.data?.selectedCategory?.name || "Category"}
          </p>
          <p className="max-w-[870px] text-richBlack-200">
            {catalogPageData?.data?.selectedCategory?.description || ""}
          </p>
        </div>
      </div>

      {/* section 1 */}
      <div className=" mx-auto box-content w-full max-w-maxContentTab px-4 py-12 lg:max-w-maxContent">
        <div className="section_heading">Courses to get you started</div>
        <div className="my-4 flex border-b border-b-richBlack-600 text-sm">
          {tabs.map((tab) => (
            <p
              key={tab.id}
              onClick={() => setActive(tab.id)}
              role="button"
              tabIndex={0}
              className={`px-4 py-2 cursor-pointer ${
                active === tab.id
                  ? "border-b border-b-yellow-25 text-yellow-25"
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

      {/* section 2 */}
      <div className=" mx-auto box-content w-full max-w-maxContentTab px-4 py-12 lg:max-w-maxContent">
        <div className="section_heading">
          Top courses in {catalogPageData?.data?.suggestedCategory?.name || ""}
        </div>
        <div className="py-8">
          <CourseSlider
            Courses={catalogPageData?.data?.suggestedCategory?.courses}
          />
        </div>
      </div>

      {/* Section 3 */}
      <div className=" mx-auto box-content w-full max-w-maxContentTab px-4 py-12 lg:max-w-maxContent">
        <div className="section_heading">Frequently Bought</div>
        <div className="py-8">
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
            {catalogPageData?.data?.mostSellingCourses
              ?.slice(0, 4)
              .map((course) => (
                <Course_Card
                  course={course}
                  key={course._id}
                  Height={"h-[400px]"}
                />
              ))}
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Catalog;
