import { useState } from "react";
import toast from "react-hot-toast";
import { AiOutlineArrowLeft } from "react-icons/ai";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";

import HomeLayout from "../../layouts/HomeLayout";
import { CreateNewCourse } from "../../redux/slices/courseSlice";
const CreateCourse = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [userInput, setUserInput] = useState({
    title: "",
    description: "",
    category: "",
    createdBy: "",
    thumbnail: null, // file
    previewImage: "",
  });

  function handleImageUpload(e) {
    e.preventDefault();
    const uploadedImage = e.target.files[0];
    if (uploadedImage) {
      const fileReader = new FileReader();
      fileReader.readAsDataURL(uploadedImage);
      fileReader.addEventListener("load", function () {
        setUserInput({
          ...userInput,
          thumbnail: uploadedImage,
          previewImage: this.result,
        });
      });
    }
  }

  function handleUserInput(e) {
    const { name, value } = e.target;
    setUserInput({
      ...userInput,
      [name]: value,
    });
  }

  async function onFormSubmit(e) {
    e.preventDefault();
    if (
      !userInput.title ||
      !userInput.description ||
      !userInput.category ||
      !userInput.createdBy ||
      !userInput.thumbnail
    ) {
      toast.error("All fields are required!");
      return;
    }

    const response = await dispatch(CreateNewCourse(userInput));
    console.log("Res",response)
    if (response?.payload?.success) {
      setUserInput({
        title: "",
        description: "",
        category: "",
        createdBy: "",
        thumbnail: null, // file
        previewImage: "",
      });
      navigate("/courses");
    }
  }

  return (
    <HomeLayout>
      <div className="h-[100vh] flex justify-center items-center">
        <form
          onSubmit={onFormSubmit}
          className="flex flex-col justify-center gap-5 rounded-lg p-4 text-white w-[700px] h-[530px] my-10 shadow-[0_0_10px_black] relative"
        >
          <Link
            onClick={() => navigate(-1)}
            className="absolute top-5 text-2xl link text-accent"
          >
            <AiOutlineArrowLeft />
          </Link>
          <h1 className="text-center text-2xl font-bold">Create new course</h1>
          <main className="grid grid-cols-2 gap-x-10">
            {/* left */}
            <div className="gap-y-6">
              <div>
                <label htmlFor="image_uploads" className="cursor-pointer">
                  {userInput?.previewImage ? (
                    <img
                      src={userInput?.previewImage}
                      className="w-full h-44 m-auto border"
                    />
                  ) : (
                    <div className="w-full h-44 m-auto flex justify-center items-center border ">
                      <h1 className="text-lg font-bold">
                        {" "}
                        Upload course thumbnail
                      </h1>
                    </div>
                  )}
                </label>
                <input
                  type="file"
                  name="image_uploads"
                  id="image_uploads"
                  className="hidden"
                  accept=".jpg, .png, .jpeg, .svg"
                  onChange={handleImageUpload}
                />
              </div>
              <div className="flex flex-col gap-1">
                <label htmlFor="title" className="text-lg font-semibold">
                  Course title
                </label>
                <input
                  required
                  type="text"
                  name="title"
                  id="title"
                  placeholder="Enter title of the course"
                  onChange={handleUserInput}
                  value={userInput.title}
                  className="bg-transparent px-2 py-1 border "
                />
              </div>
            </div>
            {/* right */}
            <div className="flex flex-col gap-1">
              <div className="flex flex-col gap-1">
                <label htmlFor="createdBy" className="text-lg font-semibold">
                  Instructor
                </label>
                <input
                  required
                  type="text"
                  name="createdBy"
                  id="createdBy"
                  placeholder="Enter name of the Instructor"
                  onChange={handleUserInput}
                  value={userInput.createdBy}
                  className="bg-transparent px-2 py-1 border "
                />
              </div>
              <div className="flex flex-col gap-1">
                <label htmlFor="category" className="text-lg font-semibold">
                  Course Category
                </label>
                <input
                  required
                  type="text"
                  name="category"
                  id="category"
                  placeholder="Enter category of the course"
                  onChange={handleUserInput}
                  value={userInput.category}
                  className="bg-transparent px-2 py-1 border "
                />
              </div>
              <div className="flex flex-col gap-1">
                <label htmlFor="description" className="text-lg font-semibold">
                  Description
                </label>
                <textarea
                  required
                  type="text"
                  name="description"
                  id="description"
                  placeholder="Enter description of the course"
                  onChange={handleUserInput}
                  value={userInput.description}
                  className="bg-transparent px-2 py-1 border h-24 resize-none overflow-y-scroll "
                />
              </div>
            </div>
          </main>
          <button
            type="submit"
            className="w-full h-12 rounded-sm font-semibold text-lg cursor-pointer bg-yellow-500 border border-yellow-500 hover:bg-transparent hover:text-yellow-500 transition-all ease-in-out duration-300"
          >Create Course</button>
        </form>
      </div>
    </HomeLayout>
  );
};

export default CreateCourse;
