import { useState } from "react";
import toast from "react-hot-toast";
import { BsPersonCircle } from "react-icons/bs";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";

import { isValidEmail, isValidPassword } from "../helpers/regexMatcher";
import HomeLayout from "../layouts/HomeLayout";
import { createAccount } from "../redux/slices/authSlice";

const Signup = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [signupDetails, setSignupDetails] = useState({
    fullName: "",
    email: "",
    password: "",
    avatar: "",
  });

  const [previewImage, setPreviewImage] = useState("");

  async function onFormSubmit(e) {
    e.preventDefault();
    if (
      !signupDetails.fullName ||
      !signupDetails.email ||
      !signupDetails.password ||
      !signupDetails.avatar
    ) {
      toast.error("Please fill all the Details");
      return;
    }
    if (signupDetails.fullName.length < 5) {
      toast.error("Name should be atleat of five character");
      return;
    }
    if (!isValidEmail(signupDetails.email)) {
      toast.error("Invalid email provided");
      return;
    }
    if (!isValidPassword(signupDetails.password)) {
      toast.error(
        "Password should be 6-16 character long with atleast one number and a special character"
      );
      return;
    }

    const formData = new FormData();
    formData.append("fullName", signupDetails.fullName);
    formData.append("email", signupDetails.email);
    formData.append("password", signupDetails.password);
    formData.append("avatar", signupDetails.avatar);

    const response = await dispatch(createAccount(formData));
    console.log("Response",response);
    if (response?.payload?.data) {
      navigate("/");
    }
    setSignupDetails({
      fullName: "",
      email: "",
      password: "",
      avatar: "",
    });
    setPreviewImage("");
  }

  function handleUserInput(e) {
    const { name, value } = e.target;

    setSignupDetails({
      ...signupDetails,
      [name]: value,
    });
  }
  function handleImage(e) {
    e.preventDefault();
    const uploadedImage = e.target.files[0];
    if (!uploadedImage) return;

    setSignupDetails({
      ...signupDetails,
      avatar: uploadedImage,
    });
    const fileReader = new FileReader();
    fileReader.readAsDataURL(uploadedImage);
    fileReader.addEventListener("load", function () {
      setPreviewImage(this.result);
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
          <h1 className="text-2xl text-center font-bold">Registration Form</h1>
          <label htmlFor="image_uploads" className="cursor-pointer">
            {previewImage ? (
              <img
                className="w-24 h-24 rounded-full m-auto"
                src={previewImage}
              />
            ) : (
              <BsPersonCircle className="w-24 h-24 rounded-full m-auto" />
            )}
          </label>
          <input
            onChange={handleImage}
            className="hidden"
            type="file"
            name="image_uploads"
            id="image_uploads"
            accept="*"
          />
          <div className="flex flex-col gap-1">
            <label htmlFor="fullName" className="font-semibold">
              Name
            </label>
            <input
              onChange={handleUserInput}
              value={signupDetails.fullName}
              type="text"
              name="fullName"
              placeholder="Enter username"
              id="fullName"
              className="bg-transparent px-2 py-1 border"
              required
            />
            <label htmlFor="email" className="font-semibold">
              Email
            </label>
            <input
              onChange={handleUserInput}
              value={signupDetails.email}
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
              value={signupDetails.password}
              type="password"
              name="password"
              placeholder="Enter password"
              id="password"
              className="bg-transparent px-2 py-1 border"
              required
            />
          </div>
          <button className="mt-2 py-2 text-lg font-semibold bg-yellow-700 hover:bg-yellow-600 transition-all ease-in-out duration-300 ">
            Create Account
          </button>
          <p>
            Already have an account ?{" "}
            <Link to="/login" className="text-accent">
              Login
            </Link>
          </p>
        </form>
      </div>
    </HomeLayout>
  );
};

export default Signup;
