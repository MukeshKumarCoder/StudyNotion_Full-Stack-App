import FoundingStory from "../assets/Images/FoundingStory.png";
import BannerImage1 from "../assets/Images/aboutUs1.webp";
import BannerImage2 from "../assets/Images/aboutUs2.webp";
import BannerImage3 from "../assets/Images/aboutUs3.webp";
import Footer from "../components/common/Footer";
import HighlightText from "../components/core/HomePage/HighlightText";
import Quote from "../components/core/AboutPage/Quote";
import StatsComponent from "../components/core/AboutPage/Stats";
import LearningGrid from "../components/core/AboutPage/LearningGrid";

const About = () => {
  return (
    <div className="w-full overflow-x-hidden">
      {/* Hero Section */}
      <section className="bg-richBlack-700 text-white">
        <div className="mx-auto w-11/12 max-w-6xl text-center py-10">
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-semibold">
            Driving Innovation in Online Education for a{" "}
            <HighlightText text="Brighter Future" />
          </h1>

          <p className="mt-4 text-sm sm:text-base text-richBlack-300 max-w-2xl mx-auto">
            Study Notion is at the forefront of driving innovation in online
            education. We're passionate about creating a brighter future by
            offering cutting-edge courses and nurturing a vibrant learning
            community.
          </p>

          {/* Images */}
          <div className="mt-10 grid grid-cols-1 sm:grid-cols-3 gap-4">
            {[BannerImage1, BannerImage2, BannerImage3].map((img, i) => (
              <img
                key={i}
                src={img}
                alt="about"
                className="w-full h-48 sm:h-56 md:h-64 object-cover rounded-lg shadow-lg"
                loading="lazy"
              />
            ))}
          </div>
        </div>
      </section>

      {/* Quote Section */}
      <section className="border-b border-richBlack-700 py-6">
        <div className="mx-auto w-11/12 max-w-6xl">
          <Quote />
        </div>
      </section>

      {/* Founding Story */}
      <section className="py-6">
        <div className="mx-auto w-11/12 max-w-6xl flex flex-col lg:flex-row items-center gap-10">
          {/* Text */}
          <div className="flex-1 space-y-5">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-semibold bg-gradient-to-r from-[#833AB4] via-[#FD1D1D] to-[#FCB045] text-transparent bg-clip-text">
              Our Founding Story
            </h2>

            <p className="text-sm sm:text-base text-richBlack-300">
              Our e-learning platform was born out of a shared vision to make
              education accessible and flexible for everyone.
            </p>

            <p className="text-sm sm:text-base text-richBlack-300">
              We believed that education should not be confined to classrooms
              and aimed to build a platform that empowers learners globally.
            </p>
          </div>

          {/* Image */}
          <div className="flex-1">
            <img
              src={FoundingStory}
              alt="Founding Story"
              className="w-full max-w-md mx-auto lg:max-w-full object-contain shadow-xl"
            />
          </div>
        </div>
      </section>

      {/* Vision & Mission */}
      <section className="py-10">
        <div className="mx-auto w-11/12 max-w-6xl grid md:grid-cols-2 gap-10">
          {/* Vision */}
          <div className="space-y-4">
            <h2 className="text-2xl sm:text-3xl font-semibold bg-gradient-to-r from-[#FF512F] to-[#F09819] text-transparent bg-clip-text">
              Our Vision
            </h2>
            <p className="text-sm sm:text-base text-richBlack-300">
              We aim to revolutionize learning through technology and create an
              engaging and accessible learning experience.
            </p>
          </div>

          {/* Mission */}
          <div className="space-y-4">
            <h2 className="text-2xl sm:text-3xl font-semibold bg-gradient-to-r from-[#1FA2FF] via-[#12D8FA] to-[#A6FFCB] text-transparent bg-clip-text">
              Our Mission
            </h2>
            <p className="text-sm sm:text-base text-richBlack-300">
              Our mission is to build a collaborative learning community where
              users can grow, connect, and share knowledge.
            </p>
          </div>
        </div>
      </section>

      {/* Stats */}
      <StatsComponent />

      {/* Learning Grid */}
      <section className="py-8">
        <div className="mx-auto w-11/12 max-w-6xl">
          <LearningGrid />
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default About;
