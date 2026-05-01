import { Link } from "react-router-dom";

const CTAButton = ({ linkTo, children, active }) => {
  return (
    <Link to={linkTo} className="block w-full min-[500px]:inline-block min-[500px]:w-auto">
      <div
        className={`w-full min-[500px]:w-auto text-center text-[13px] sm:text-[16px] px-6 py-3 rounded-md font-bold shadow-[2px_2px_0px_0px_rgba(255,255,255,0.18)] ${
          active ? "bg-yellow-50 text-black " : "bg-richBlack-800"
        } transition-all duration-200 hover:scale-95 motion-reduce:hover:scale-100 hover:shadow-none `}
      >
        {children}
      </div>
    </Link>
  );
};

export default CTAButton;
