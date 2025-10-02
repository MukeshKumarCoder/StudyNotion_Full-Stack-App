import React from "react";
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
      className={`flex ${position} my-20 justify-between flex-col lg:gap-10 gap-10`}
    >
      {/* section 1 */}
      <div className="flex w-[100%] flex-col gap-8 lg:w-[50%]">
        {heading}

        {/* Sub Heading */}
        <div className="-mt-3 w-[85%] text-base font-bold text-richBlack-300">
          {subHeading}
        </div>

        {/* Button Group */}
        <div className="mt-7 flex gap-7">
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
      <div className="code-border relative flex h-fit w-[100%] flex-row py-3 text-[10px] leading-[18px] sm:text-sm sm:leading-6 lg:w-[470px]">
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
