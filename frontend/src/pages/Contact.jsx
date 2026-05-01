import Footer from "../components/common/Footer";
import ContactDetails from "../components/core/ContactUsPage/ContactDetails";
import ContactForm from "../components/core/ContactUsPage/ContactForm";
import ReviewSlider from "../components/common/ReviewSlider";

const Contact = () => {
  return (
    <div className="w-full min-w-0 max-w-full overflow-x-clip">
      <section className="mx-auto flex w-11/12 mt-8 min-w-0 max-w-maxContent flex-col justify-between gap-8 px-1 text-white  sm:gap-10 lg:flex-row lg:items-start">
        <div className="w-full min-w-0 lg:w-[40%]">
          <ContactDetails />
        </div>

        <div className="w-full min-w-0 lg:w-[60%]">
          <ContactForm />
        </div>
      </section>

      <section className="relative mx-auto my-6 flex w-11/12 min-w-0 max-w-maxContent flex-col items-center justify-between gap-6 bg-richBlack-900 px-1 text-white sm:gap-8 ">
        <h1 className="mt-4 w-full min-w-0 text-center text-2xl font-semibold sm:mt-8 sm:text-3xl md:text-4xl">
          Reviews from other learners
        </h1>
        <div className="w-full">
          <ReviewSlider />
        </div>
      </section>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default Contact;
