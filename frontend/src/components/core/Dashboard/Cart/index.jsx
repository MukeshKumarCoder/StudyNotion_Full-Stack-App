import { useSelector } from "react-redux";
import RenderCartCourses from "./RenderCartCourses";
import RenderTotalAmount from "./RenderTotalAmount";

export default function Cart() {
  const { total, totalItems } = useSelector((state) => state.cart);

  return (
    <>
      <h1 className="mb-6 text-2xl font-medium text-richBlack-5 sm:mb-10 sm:text-3xl md:mb-14">
        Cart
      </h1>
      <p className="border-b border-richBlack-400 pb-2 text-sm font-semibold text-richBlack-400 sm:text-base">
        {totalItems} Courses in Cart
      </p>
      {total > 0 ? (
        <div className="mt-6 flex w-full min-w-0 flex-col-reverse items-stretch gap-x-8 gap-y-6 sm:mt-8 lg:flex-row lg:items-start">
          <RenderCartCourses />
          <RenderTotalAmount />
        </div>
      ) : (
        <p className="mt-10 px-2 text-center text-xl text-richBlack-100 sm:mt-14 sm:text-2xl md:text-3xl">
          Your cart is empty
        </p>
      )}
    </>
  );
}
