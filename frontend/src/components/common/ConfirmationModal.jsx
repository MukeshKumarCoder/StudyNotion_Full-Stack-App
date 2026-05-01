import React from "react";
import IconBtn from "./IconBtn";

const ConfirmationModal = ({ modalData }) => {
  return (
    <div className="fixed inset-0 z-[1000] !mt-0 grid place-items-center overflow-y-auto bg-white/10 px-4 backdrop-blur-sm">
      
      <div className="w-full max-w-[420px] rounded-lg border border-richBlack-400 bg-richBlack-800 p-5 sm:p-6">
        
        {/* Heading */}
        <p className="text-xl font-semibold text-richBlack-5 sm:text-2xl">
          {modalData?.text1}
        </p>

        {/* Description */}
        <p className="mt-3 mb-6 text-sm leading-6 text-richBlack-200 sm:text-base">
          {modalData?.text2}
        </p>

        {/* Buttons */}
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
          
          <IconBtn
            onclick={modalData?.btn1Handler}
            text={modalData?.btn1Text}
            customClasses="sm:w-auto"
          />

          <button
            className="
              w-full rounded-md bg-richBlack-200 
              px-5 py-2 
              font-semibold text-richBlack-900
              sm:w-auto
            "
            onClick={modalData?.btn2Handler}
          >
            {modalData?.btn2Text}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmationModal;