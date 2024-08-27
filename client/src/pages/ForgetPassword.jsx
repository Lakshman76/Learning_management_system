import { useState } from "react";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";

import HomeLayout from "../layouts/HomeLayout";
import { forgetPassword } from "../redux/slices/authSlice";

const ForgetPassword = () => {
  const dispatch = useDispatch();

  const [email, setEmail] = useState("");
  const [emailSent, setEmailSent] = useState(false);
  async function onFormSubmit(e) {
    e.preventDefault();
    if (!email) {
      toast.error("Email is required");
    }
    const res = await dispatch(forgetPassword({ email }));
    if (res?.payload?.data?.success) {
      setEmailSent(true);
      setTimeout(() => {
        setEmailSent(false);
      }, 20000);
    }
  }
  return (
    <HomeLayout>
      <div className="h-[90vh] flex justify-center items-center text-white">
        {!emailSent ? (
          <form
            onSubmit={onFormSubmit}
            className="flex flex-col justify-center gap-5 rounded-lg p-4 text-white w-80 min-h-[15rem] shadow-[0_0_10px_black]"
          >
            <h1 className="text-center text-2xl font-semibold">
              Forget Password
            </h1>
            <div className="flex flex-col gap-1">
              <label htmlFor="email">Enter your Email</label>
              <input
                type="email"
                id="email"
                name="email"
                className="bg-transparent px-2 py-1 border"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <button
              type="submit"
              className="border border-yellow-500 bg-yellow-500 hover:bg-transparent hover:text-yellow-500 py-1"
            >
              Reset
            </button>
          </form>
        ) : (
          <div>
            <h1 className="text-xl ">
              ✉️ Please Check your registered email id{" "}
            </h1>
          </div>
        )}
      </div>
    </HomeLayout>
  );
};

export default ForgetPassword;
