import { useState } from "react";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";

import HomeLayout from "../../layouts/HomeLayout";
import { changePassword } from "../../redux/slices/authSlice";

const ChangePassword = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [inputValue, setInputValue] = useState({
    oldPassword: "",
    newPassword: "",
  });

  function onInputChange(e) {
    const { name, value } = e.target;
    setInputValue({
      ...inputValue,
      [name]: value,
    });
  }

  async function onFormSubmit(e) {
    e.preventDefault();
    if (!inputValue.oldPassword || !inputValue.newPassword) {
      toast.error("Please fill all the Details");
      return;
    }
    await dispatch(changePassword(inputValue));
    navigate("/user/profile");
  }
  return (
    <HomeLayout>
      <div className="h-[90vh] flex justify-center items-center">
        <form
          onSubmit={onFormSubmit}
          className="flex flex-col justify-center gap-5 rounded-lg p-4 text-white w-80 min-h-[26rem] shadow-[0_0_10px_black]"
        >
          <h1 className="text-center text-2xl font-semibold">
            Change Password
          </h1>
          <div className="flex flex-col gap-1">
            <label htmlFor="oldPassword">Enter old password</label>
            <input
              type="password"
              id="oldPassword"
              name="oldPassword"
              className="bg-transparent px-2 py-1 border"
              value={inputValue.oldPassword}
              onChange={onInputChange}
            />
          </div>
          <div className="flex flex-col gap-1">
            <label htmlFor="newPassword">Enter new password</label>
            <input
              type="password"
              id="newPassword"
              name="newPassword"
              className="bg-transparent px-2 py-1 border"
              value={inputValue.newPassword}
              onChange={onInputChange}
            />
          </div>
          <button
            type="submit"
            className="w-full py-2  rounded-sm font-semibold  cursor-pointer bg-yellow-500 border border-yellow-500 hover:bg-transparent hover:text-yellow-500 transition-all ease-in-out duration-300"
          >
            Change Password
          </button>
          <Link to="/user/profile">
            <p className="w-full link text-accent flex justify-center items-center gap-2">
              Go back to profile
            </p>
          </Link>
        </form>
      </div>
    </HomeLayout>
  );
};

export default ChangePassword;
