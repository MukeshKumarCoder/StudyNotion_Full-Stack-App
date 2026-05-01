import { FaArrowRight } from "react-icons/fa";
import { TypeAnimation } from "react-type-animation";
import CTAButton from "./CTAButton";

const codeBlocks = ({
  position,
  heading,
  subHeading,
  ctaBtn1,
  ctaBtn2,
  codeblock,
  backgroundGradient,
  codeColor,
}) => {
  
  return (
    <div
      className={`my-12 flex w-full min-w-0 max-w-full flex-col justify-between gap-8 sm:my-16 md:my-20 lg:gap-10 ${position}`}
    >
      <div className="flex w-full min-w-0 max-w-full flex-col gap-6 sm:gap-8 lg:max-w-[50%]">
        {heading}

        <div className="-mt-1 w-full max-w-prose text-sm font-bold text-richBlack-300 sm:-mt-2 sm:text-base">
          {subHeading}
        </div>

        <div className="mt-2 flex w-full min-w-0 max-w-sm flex-col gap-3 sm:mt-5 sm:max-w-none min-[480px]:flex-row min-[480px]:flex-wrap min-[480px]:items-center min-[480px]:gap-5 min-[480px]:gap-7">
          <CTAButton active={ctaBtn1.active} linkTo={ctaBtn1.link}>
            <div className="flex items-center gap-2">
              {ctaBtn1.btnText}
              <FaArrowRight />
            </div>
          </CTAButton>
          <CTAButton active={ctaBtn2.active} linkTo={ctaBtn2.link}>
            {ctaBtn2.btnText}
          </CTAButton>
        </div>
      </div>

      {/* Section 2 */}
      <div className="code-border relative flex h-fit w-full min-w-0 max-w-full flex-row overflow-x-auto py-3 text-[10px] leading-[18px] sm:max-w-2xl sm:text-sm sm:leading-6 lg:max-w-[min(100%,470px)] lg:shrink-0">
        {backgroundGradient}
        {/* Indexing */}
        <div className="flex w-[10%] select-none   flex-col text-center font-inter font-bold text-richBlack-400 ">
          <p>1</p>
          <p>2</p>
          <p>3</p>
          <p>4</p>
          <p>5</p>
          <p>6</p>
          <p>7</p>
          <p>8</p>
          <p>9</p>
          <p>10</p>
          <p>11</p>
        </div>

        {/* Codes */}
        <div
          className={`flex w-[90%] flex-col gap-2 font-mono font-bold ${codeColor} pr-1`}
        >
          <TypeAnimation
            sequence={[codeblock, 1000, ""]}
            cursor={true}
            repeat={Infinity}
            style={{
              whiteSpace: "pre-line",
              display: "block",
            }}
            omitDeletionAnimation={true}
          />
        </div>
      </div>
    </div>
  );
};

export default codeBlocks;
