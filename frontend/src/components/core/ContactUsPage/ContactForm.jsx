import ContactUsForm from "./ContactUsForm";

const ContactForm = () => {
  return (
    <div className="flex flex-col gap-3 rounded-xl border border-richBlack-600 p-4 text-richBlack-300 sm:p-6 lg:py-8 lg:px-12">
      <h1 className="text-2xl font-semibold leading-tight text-richBlack-5 sm:text-3xl sm:leading-snug md:text-4xl md:leading-10">
        Got a Idea? We&apos;ve got the skills. Let&apos;s team up
      </h1>
      <p className="text-sm sm:text-base">
        Tell us more about yourself and what you&apos;re got in mind.
      </p>

      <div className="mt-4 sm:mt-7">
        <ContactUsForm />
      </div>
    </div>
  );
};

export default ContactForm;
