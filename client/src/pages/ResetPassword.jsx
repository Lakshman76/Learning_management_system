import { useState } from "react";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";

import HomeLayout from "../layouts/HomeLayout";
import { resetPassword } from "../redux/slices/authSlice";

const ResetPassword = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { resetToken } = useParams();

  const [password, setPassword] = useState("");

  async function onFormSubmit(e) {
    e.preventDefault();
    if (!password) {
      toast.error("Password required");
    }
    const res = await dispatch(resetPassword([ resetToken, {password} ]));
    if(res?.payload?.data?.success){
      navigate("/login");
    }
  }

  return (
    <HomeLayout>
      <div className="h-[90vh] flex justify-center items-center text-white">
        <form
          onSubmit={onFormSubmit}
          className="flex flex-col justify-center gap-5 rounded-lg p-4 text-white w-80 min-h-[15rem] shadow-[0_0_10px_black]"
        >
          <h1 className="text-center text-2xl font-semibold">Set Password</h1>
          <div className="flex flex-col gap-1">
            <label className="flex flex-col gap-1" htmlFor="password">
              Enter new password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              className="bg-transparent px-2 py-1 border"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <button
            type="submit"
            className="border border-yellow-500 bg-yellow-500 hover:bg-transparent hover:text-yellow-500 py-1"
          >
            Save Password
          </button>
        </form>
      </div>
    </HomeLayout>
  );
};

export default ResetPassword;
