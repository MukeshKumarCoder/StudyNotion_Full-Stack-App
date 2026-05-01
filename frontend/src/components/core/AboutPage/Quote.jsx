import HighlightText from "../HomePage/HighlightText";

const Quote = () => {
  return (
    <div className="mx-auto w-full min-w-0 max-w-4xl px-2 py-5 pb-12 text-center text-lg font-semibold text-white sm:pb-16 sm:text-xl md:pb-20 md:text-3xl lg:text-4xl">
      We are passionate about revolutionizing the way we learn. Our innovative
      platform <HighlightText text={"combines technology"} />,{" "}
      <span className="bg-gradient-to-b from-[#FF512F] to-[#F09819] text-transparent bg-clip-text font-bold">
        {" "}
        expertise
      </span>
      , and community to create an
      <span className="bg-gradient-to-b from-[#E65C00] to-[#F9D423] text-transparent bg-clip-text font-bold">
        {" "}
        unparalleled educational experience.
      </span>
    </div>
  );
};

export default Quote;
