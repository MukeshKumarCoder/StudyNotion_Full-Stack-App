import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import IconBtn from "../../../common/IconBtn";
import { buyCourse } from "../../../../services/operations/studentFeaturesAPI";

const RenderTotalAmount = () => {
  const { total, cart } = useSelector((state) => state.cart);
  const { token } = useSelector((state) => state.auth);
  const { user } = useSelector((state) => state.profile);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleBuyCourse = () => {
    const courses = cart.map((course) => course._id);
    buyCourse(token, courses, user, navigate, dispatch);
  };
  return (
    <div className="w-full min-w-0 max-w-full rounded-md border border-richBlack-700 bg-richBlack-800 p-4 sm:p-6 lg:sticky lg:top-4 lg:min-w-[280px] lg:max-w-sm lg:shrink-0">
      <p className="mb-1 text-sm font-medium text-richBlack-300">Total:</p>
      <p className="mb-4 text-2xl font-medium text-yellow-100 sm:mb-6 sm:text-3xl">
        ₹ {total}
      </p>
      <IconBtn
        text="Buy Now"
        onclick={handleBuyCourse}
        customClasses="w-full justify-center"
      />
    </div>
  );
};

export default RenderTotalAmount;
