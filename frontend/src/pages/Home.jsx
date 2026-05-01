import { FaArrowRight } from "react-icons/fa";
import { Link } from "react-router-dom";
import HighlightText from "../components/core/HomePage/HighlightText";
import CTAButton from "../components/core/HomePage/CTAButton";
import CodeBlocks from "../components/core/HomePage/CodeBlocks";
import DemoVideo from "../assets/Images/banner.mp4";
import ExploreMore from "../components/core/HomePage/ExploreMore";
import TimelineSection from "../components/core/HomePage/TimelineSection";
import LearningLanguageSection from "../components/core/HomePage/LearningLanguageSection";
import InstructorSection from "../components/core/HomePage/InstructorSection";
import ReviewSlider from "../components/common/ReviewSlider";
import Footer from "../components/common/Footer";

const Home = () => {
  return (
    <main className="w-full min-w-0 max-w-full overflow-x-clip">
      {/* section 1 */}
      <section className="relative mx-auto flex w-11/12 max-w-maxContent min-w-0 flex-col items-center justify-between gap-6 px-1 sm:gap-8 text-white">
        <Link to={"/contact"} aria-label="Become an Instructor">
          <div className="group mx-auto mt-16 w-fit rounded-full bg-richBlack-800 p-1 font-bold shadow-md text-richBlack-200 transition-all duration-200 hover:scale-95 hover:shadow-none ">
            <div className="flex items-center gap-2 rounded-full px-10 py-1 transition-colors duration-300 group-hover:bg-richBlack-900">
              <p>Become an Instructor</p>
              <FaArrowRight />
            </div>
          </div>
        </Link>

        {/* Heading */}
        <h1 className="px-1 text-center text-3xl font-semibold sm:text-4xl lg:text-5xl">
          Empower Your Future with
          <HighlightText text={"Coding Skills"} />
        </h1>

        {/* Subheading */}
        <p className="-mt-1 w-full max-w-2xl text-center text-base font-bold text-richBlack-300 sm:-mt-3 sm:text-lg">
          With our online coding courses, you can learn at your own pace, from
          anywhere in the world, and get access to a wealth of resources,
          including hands-on projects, quizzes, and personalized feedback from
          instructors.
        </p>

        <div className="mt-4 flex w-full max-w-md flex-col items-stretch gap-4 min-[400px]:flex-row min-[400px]:justify-center min-[400px]:gap-6 sm:mt-6 sm:max-w-none sm:gap-7">
          <CTAButton active={true} linkTo={"/signup"}>
            Learn More
          </CTAButton>
          <CTAButton linkTo={"/contact"}>Book a Demo</CTAButton>
        </div>

        {/* Demo video */}
        <div className="my-5 w-full max-w-5xl px-1 sm:my-7">
          <video
            className="max-h-[min(50vh,420px)] w-full rounded-md object-cover shadow-[0_12px_40px_rgba(59,130,246,0.25)] sm:max-h-none"
            muted
            loop
            autoPlay
            title="Demo Video"
            playsInline
          >
            <source src={DemoVideo} type="video/mp4" />
          </video>
        </div>

        {/* code Section 1 */}
        <div>
          <CodeBlocks
            position={"lg:flex-row"}
            heading={
              <h2 className="text-4xl font-semibold">
                Unlock your
                <HighlightText text={"coding potential"} /> with our online
                courses.
              </h2>
            }
            subheading={
              "Our courses are designed and taught by industry experts who have years of experience in coding and are passionate about sharing their knowledge with you."
            }
            ctaBtn1={{
              btnText: "Try it Yourself",
              link: "/signup",
              active: true,
            }}
            ctaBtn2={{
              btnText: "Learn More",
              link: "/signup",
              active: false,
            }}
            codeColor={"text-yellow-25"}
            codeblock={`<!DOCTYPE html>\n <html lang="en">\n<head>\n<title>This is myPage</title>\n</head>\n<body>\n<h1><a href="/">Header</a></h1>\n<nav> <a href="/one">One</a> <a href="/two">Two</a> <a href="/three">Three</a>\n</nav>\n</body>`}
            backgroundGradient={<div className="codeblock1 absolute"></div>}
          />
        </div>

        {/* Code Section 2 */}
        <div className="w-full">
          <CodeBlocks
            position={"lg:flex-row-reverse"}
            heading={
              <h2 className="w-[100%] text-4xl font-semibold lg:w-[50%]">
                Start
                <HighlightText text={"coding in seconds"} />
              </h2>
            }
            subheading={
              "Go ahead, give it a try. Our hands-on learning environment means you'll be writing real code from your very first lesson."
            }
            ctaBtn1={{
              btnText: "Continue Lesson",
              link: "/signup",
              active: true,
            }}
            ctaBtn2={{
              btnText: "Learn More",
              link: "/signup",
              active: false,
            }}
            codeColor={"text-white"}
            codeblock={`import React from "react";\n import CTAButton from "./Button";\nimport TypeAnimation from "react-type";\nimport { FaArrowRight } from "react-icons/fa";\n\nconst Home = () => {\nreturn (\n<div>Home</div>\n)\n}\nexport default Home;`}
            backgroundGradient={<div className="codeblock2 absolute"></div>}
          />
        </div>
        {/* Explore More */}
        <ExploreMore />
      </section>

      {/* section 2 */}
      <section className="bg-pure-greys-5 text-richBlack-700">
        <div className="homepage_bg min-h-[240px] bg-center bg-no-repeat sm:h-[280px] md:min-h-[320px]">
          <div className="mx-auto flex w-11/12 max-w-maxContent min-w-0 flex-col items-center justify-between gap-6 py-8 sm:gap-8 ">
            <div className="w-full min-h-0 sm:min-h-0 lg:min-h-[100px] xl:min-h-[150px]" />
            <div className="mt-auto flex w-full max-w-sm flex-col items-stretch gap-3 text-center text-white min-[500px]:max-w-none min-[500px]:flex-row min-[500px]:flex-wrap min-[500px]:items-center min-[500px]:justify-center min-[500px]:gap-5 lg:mt-8 lg:gap-7">
              <CTAButton active={true} linkTo={"/signup"}>
                <div className="flex items-center justify-center gap-2">
                  Explore Full Catalog
                  <FaArrowRight />
                </div>
              </CTAButton>
              <CTAButton active={false} linkTo={"/login"}>
                Learn More
              </CTAButton>
            </div>
          </div>
        </div>

        <div className="mx-auto flex w-11/12 max-w-maxContent min-w-0 flex-col items-center justify-between gap-8">
          <div className="mb-10 mt-[-2.5rem] flex w-full min-w-0 flex-col justify-between gap-7 sm:mt-[-3rem] sm:pt-0 md:mt-[-4.5rem] lg:mt-4 lg:min-h-0 lg:flex-row lg:gap-0">
            <div className="text-2xl font-semibold sm:text-3xl lg:text-4xl lg:w-[45%]">
              Get the skills you need for a{" "}
              <HighlightText text={"job that is in demand."} />
            </div>
            <div className="flex flex-col items-start gap-10 lg:w-[40%]">
              <div className="text-[16px]">
                The modern StudyNotion is the dictates its own terms. Today, to
                be a competitive specialist requires more than professional
                skills.
              </div>
              <CTAButton active={true} linkTo={"/signup"}>
                <div>Learn More</div>
              </CTAButton>
            </div>
          </div>

          {/* Timeline Section - Section 2 */}
          <TimelineSection />

          {/* Learning Language Section - Section 3 */}
          <LearningLanguageSection />
        </div>
      </section>

      {/* Section 3 */}
      <div className="relative mx-auto my-12 flex w-11/12 max-w-maxContent min-w-0 flex-col items-center justify-between gap-8 bg-richBlack-900 px-1 text-white sm:my-20">
        <InstructorSection />

        <h2 className="mt-4 w-full min-w-0 text-center text-2xl font-semibold sm:mt-8 sm:text-3xl md:text-4xl">
          Reviews from other learners
        </h2>
        <div className="w-full">
          <ReviewSlider />
        </div>
      </div>
      {/* Footer */}
      <Footer />
    </main>
  );
};

export default Home;
