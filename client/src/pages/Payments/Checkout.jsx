import { useEffect } from "react";
import toast from "react-hot-toast";
import { BiRupee } from "react-icons/bi";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import HomeLayout from "../../layouts/HomeLayout";
import {
  getRazorpayId,
  purchaseCourseBundle,
  verifyUserPayment,
} from "../../redux/slices/razorpaySlice";

const Checkout = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const razorpayKey = useSelector((state) => state.razorpay.key);
  const subscription_id = useSelector(
    (state) => state.razorpay.subscription_id
  );

  const paymentDetails = {
    payment_id: "",
    subscription_id: "",
    payment_signature: "",
  };

  async function handleSubscription(e) {
    e.preventDefault();
    if (!razorpayKey || !subscription_id) {
      toast.error("Something went wrong!");
      return;
    }
    const options = {
      key: razorpayKey,
      subscription_id: subscription_id,
      name: "Lakshman . pvt ltd",
      description: "subscription",
      theme: {
        color: "#F37254",
      },
      handler: async function (response) {
        paymentDetails.payment_id = response.payment_id;
        paymentDetails.subscription_id = response.subscription_id;
        paymentDetails.payment_signature = response.payment_signature;
        toast.success("Payment successful");

        const res = await dispatch(verifyUserPayment(paymentDetails));
        res?.payload?.success
          ? navigate("/checkout/success")
          : navigate("/checkout/fail");
      },
    };
    const paymentOptions = new window.Razorpay(options);
    paymentOptions.open();
  }

  async function load() {
    await dispatch(getRazorpayId());
    await dispatch(purchaseCourseBundle());
  }

  useEffect(() => {
    load();
  }, []);

  return (
    <HomeLayout>
      <form
        onSubmit={handleSubscription}
        className="min-h-[90vh] flex justify-center items-center text-white"
      >
        <div className="relative w-96 h-[26rem] flex flex-col justify-center shadow-[0_0_10px_black] rounded-lg ">
          <h1 className="bg-yellow-500 absolute top-0 w-full text-center py-4 text-2xl font-bold rounded-t-lg">
            Subscription bundle
          </h1>
          <div className="px-4 space-y-5 text-center">
            <p className="text-[17px]">
              This purchase will allow you to access all the available courses
              on our platform for{" "}
              <span className="font-bold text-yellow-500">1 yr duratrion</span>{" "}
              All the existing and new launched courses will be available
            </p>
            <p className="flex items-center justify-center gap-1 text-2xl font-bold text-yellow-500">
              <BiRupee />
              <span>499</span>only
            </p>
            <div className="text-gray-200">
              <p>100% refund on cancellation</p>
              <p>Terms and conditions apply *</p>
            </div>

            <button
              type="submit"
              className="bg-yellow-500 hover:bg-transparent hover:text-yellow-500 border border-yellow-500 transition-all ease-in-out duration-300 absolute bottom-0 w-full left-0 text-xl font-bold rounded-b-lg py-2"
            >
              Buy now
            </button>
          </div>
        </div>
      </form>
    </HomeLayout>
  );
};

export default Checkout;
