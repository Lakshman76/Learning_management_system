import { useState } from "react";
import toast from "react-hot-toast";
import { BsPersonCircle } from "react-icons/bs";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";

import HomeLayout from "../../layouts/HomeLayout";
import { getUserData, updateProfile } from "../../redux/slices/authSlice";

const EditProfile = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [data, setData] = useState({
    fullName: "",
    previewImage: "",
    avatar: null,
    userId: useSelector((state) => state?.auth?.data?._id),
  });

  function handleImageUpload(e) {
    e.preventDefault();
    const uploadedImage = e.target.files[0];
    if (uploadedImage) {
      const fileReader = new FileReader();
      fileReader.readAsDataURL(uploadedImage);
      fileReader.addEventListener("load", function () {
        setData({
          ...data,
          previewImage: this.result,
          avatar: uploadedImage,
        });
      });
    }
  }
  function handleUserInput(e) {
    const { name, value } = e.target;
    setData({
      ...data,
      [name]: value,
    });
  }
  async function onFormSubmit(e) {
    e.preventDefault();
    if (data.fullName.length < 5) {
      toast.error("Name cannot be less than five character");
      return;
    }
    const formData = new FormData();
    formData.append("fullName", data.fullName);
    formData.append("avatar", data.avatar);

    await dispatch(updateProfile([data.userId, formData]));
    await dispatch(getUserData());
    navigate("/user/profile");
  }
  return (
    <HomeLayout>
      <div className="flex items-center justify-center h-[90vh]">
        <form
          onSubmit={onFormSubmit}
          className="flex flex-col justify-center gap-5 rounded-lg p-4 text-white w-80 min-h-[26rem] shadow-[0_0_10px_black]"
        >
          <h1 className="text-center text-2xl font-semibold">Edit Profile</h1>
          <label htmlFor="image_uploads" className="cursor-pointer">
            {data.previewImage ? (
              <img
                src={data.previewImage}
                alt="user profile"
                className="w-28 h-28 rounded-full m-auto"
              />
            ) : (
              <BsPersonCircle className="w-28 h-28 rounded-full m-auto" />
            )}
          </label>
          <input
            type="file"
            name="image_uploads"
            id="image_uploads"
            className="hidden"
            onChange={handleImageUpload}
            accept=".jpg, .jpeg, .svg, .png"
          />
          <div className="flex flex-col gap-1">
            <label htmlFor="fullName" className="text-lg font-semibold">
              Full name
            </label>
            <input
              type="text"
              name="fullName"
              id="fullName"
              placeholder="Enter your name"
              onChange={handleUserInput}
              value={data.fullName}
              className="bg-transparent px-2 py-1 border "
            />
          </div>
          <button
            type="submit"
            className="w-full py-2  rounded-sm font-semibold  cursor-pointer bg-yellow-500 border border-yellow-500 hover:bg-transparent hover:text-yellow-500 transition-all ease-in-out duration-300"
          >
            Update Profile
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

export default EditProfile;
