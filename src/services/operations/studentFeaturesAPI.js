import { toast } from "react-hot-toast";
import { studentEndpoints } from "../apis";
import { apiConnector } from "../apiConnector";
import rzpLogo from "../../assets/Logo/rzp_logo.png";
import { setPaymentLoading } from "../../slices/courseSlice";
import { resetCart } from "../../slices/cartSlice";
const razorPayKey = import.meta.env.VITE_RAZORPAY_KEY;

const { COURSE_PAYMENT_API, COURSE_VERIFY_API, PURCHaSE_HISTORY_API } =
  studentEndpoints;

function loadScript(src) {
  return new Promise((resolve) => {
    const script = document.createElement("script");
    script.src = src;

    script.onload = () => {
      resolve(true);
    };
    script.onerror = () => {
      resolve(false);
    };
    document.body.appendChild(script);
  });
}

export async function buyCourse(
  token,
  courses,
  userDetails,
  navigate,
  dispatch
) {
  const toastId = toast.loading("Loading...");
  try {
    //load the script
    const res = await loadScript(
      "https://checkout.razorpay.com/v1/checkout.js"
    );
    if (!res) {
      toast.error("RazorPay SDK failed to load");
      return;
    }

    //initiate the order
    const orderResponse = await apiConnector(
      "POST",
      COURSE_PAYMENT_API,
      { course_id: courses[0], id: userDetails._id },
      {
        Authorization: `Bearer ${token}`,
      }
    );

    if (!orderResponse.data.success) {
      throw new Error(orderResponse.data.message);
    }

    // options
    const options = {
      key: razorPayKey,
      currency: orderResponse.data.currency,
      amount: `${orderResponse.data.amount}`,
      order_id: orderResponse.data.orderId,
      name: "StudyNotion",
      description: "Thank You for Purchasing the Course",
      image: rzpLogo,
      prefill: {
        name: `${userDetails.firstName} ${userDetails.lastName}`,
        email: userDetails.email,
      },
      handler: function (response) {
        // verify payment
        verifyPayment(
          { ...response, courses, id: userDetails._id },
          token,
          navigate,
          dispatch
        );
      },
    };

    // payment failed
    const paymentObject = new window.Razorpay(options);
    paymentObject.open();
    paymentObject.on("payment.failed", function (response) {
      toast.error("oops, payment failed");
      // console.log(response);
    });
  } catch (error) {
    // console.log("PAYMENT API ERROR.....", error);
    toast.error("Could not make Payment");
  }
  toast.dismiss(toastId);
}

// verify payment
const verifyPayment = async (bodyData, token, navigate, dispatch) => {
  const toastId = toast.loading("Verifying Payment....");
  dispatch(setPaymentLoading(true));
  try {
    const response = await apiConnector("POST", COURSE_VERIFY_API, bodyData, {
      Authorization: `Bearer ${token}`,
    });

    if (!response.data.success) {
      throw new Error(response.data.message);
    }
    toast.success("payment Successful, You are added to the course");
    navigate("/dashboard/enrolled-courses");
    dispatch(resetCart());
  } catch (error) {
    // console.log("PAYMENT VERIFY ERROR....", error);
    toast.error("Could not verify Payment");
  }
  toast.dismiss(toastId);
  dispatch(setPaymentLoading(false));
};

export const getAllPurchaseHistory = async (token) => {
  const toastId = toast.loading("Loading...");
  let result = [];
  try {
    const response = await apiConnector("GET", PURCHaSE_HISTORY_API,null, {
      Authorization: `Bearer ${token}`,
    });
    if (!response?.data?.success) {
      throw new Error("Could Not Fetch Course");
    }
    result = response?.data?.data;
  } catch (error) {
    toast.error(error.message);
  }
  toast.dismiss(toastId);
};
