import HighlightText from "../../core/HomePage/HighlightText";
import CTAButton from "../../core/HomePage/CTAButton";
import { LearningGridArray } from "../../../data/LearningGridData";

const LearningGrid = () => {
  return (
    <div className="mx-auto grid w-full max-w-6xl grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
      {LearningGridArray.map((card, i) => {
        return (
          <div
            key={i}
            className={`
              w-full
              ${
                i === 0
                  ? "sm:col-span-2 xl:col-span-2"
                  : ""
              }
              ${
                card.order % 2 === 1
                  ? "bg-richBlack-700"
                  : "bg-richBlack-800"
              }
              ${
                card.order === 3
                  ? "xl:col-start-2"
                  : ""
              }
              rounded-lg
              min-h-[220px]
              md:min-h-[250px]
              xl:min-h-[280px]
            `}
          >
            {card.order < 0 ? (
              <div className="flex h-full flex-col justify-center gap-4 p-5 sm:p-6 md:p-8">
                
                <div className="text-2xl text-richBlack-300 font-semibold sm:text-3xl md:text-4xl">
                  {card.heading}
                  <HighlightText text={card.highlightText} />
                </div>

                <p className="text-sm font-medium text-richBlack-300 sm:text-base">
                  {card.description}
                </p>

                <div className="mt-3 w-full sm:w-fit">
                  <CTAButton active={true} linkTo={card.BtnLink}>
                    {card.BtnText}
                  </CTAButton>
                </div>
              </div>
            ) : (
              <div className="flex h-full flex-col gap-4 p-5 sm:p-6 md:p-8">
                <h2 className="text-base font-semibold text-richBlack-5 sm:text-lg md:text-xl">
                  {card.heading}
                </h2>

                <p className="text-sm font-medium text-richBlack-300 sm:text-base">
                  {card.description}
                </p>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
};

export default LearningGrid;