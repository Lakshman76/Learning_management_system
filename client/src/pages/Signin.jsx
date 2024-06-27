import { useState } from "react";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";

import { isValidEmail } from "../helpers/regexMatcher";
import HomeLayout from "../layouts/HomeLayout";
import { login } from "../redux/slices/authSlice";

const Signin = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [signinDetails, setsigninDetails] = useState({
    email: "",
    password: "",
  });

  async function onFormSubmit(e) {
    e.preventDefault();
    // console.log(signinDetails);
    if (!signinDetails.email || !signinDetails.password) {
      toast.error("Please fill all the Details");
      return;
    }

    if (!isValidEmail(signinDetails.email)) {
      toast.error("Invalid email provided");
      return;
    }

    const response = await dispatch(login(signinDetails));
    console.log("Hello", response);
    if (response?.payload?.data) {
      navigate("/");
    }
    setsigninDetails({
      email: "",
      password: "",
    });
  }

  function handleUserInput(e) {
    const { name, value } = e.target;

    setsigninDetails({
      ...signinDetails,
      [name]: value,
    });
  }

  return (
    <HomeLayout>
      <div className="flex overflow-x-auto items-center justify-center h-[100vh]">
        <form
          onSubmit={onFormSubmit}
          noValidate
          className="flex flex-col justify-center gap-3 rounded-lg p-4 text-white"
        >
          <h1 className="text-2xl text-center font-bold">Login Form</h1>

          <div className="flex flex-col gap-1">
            <label htmlFor="email" className="font-semibold">
              Email
            </label>
            <input
              onChange={handleUserInput}
              value={signinDetails.email}
              type="email"
              name="email"
              placeholder="Enter email"
              id="email"
              className="bg-transparent px-2 py-1 border"
              required
            />
            <label htmlFor="password" className="font-semibold">
              Password
            </label>
            <input
              onChange={handleUserInput}
              value={signinDetails.password}
              type="password"
              name="password"
              placeholder="Enter password"
              id="password"
              className="bg-transparent px-2 py-1 border"
              required
            />
          </div>
          <button className="mt-2 py-2 text-lg font-semibold bg-yellow-700 hover:bg-yellow-600 transition-all ease-in-out duration-300 ">
            Login
          </button>
          <p>
            Don&apos;t have an account ?{" "}
            <Link to="/signup" className="text-accent">
              Sign Up
            </Link>
          </p>
        </form>
      </div>
    </HomeLayout>
  );
};

export default Signin;
