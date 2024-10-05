import { Link } from "react-router-dom";

import homePageMainImage from "../assets/images/homePageMainImage.png";
import HomeLayout from "../layouts/HomeLayout";

const Home = () => {
  return (
    <HomeLayout>
      <div className="md:py-10 py-7 mb-10 text-white flex md:flex-row flex-col-reverse items-center justify-center md:gap-10 gap-7 md:px-16 px-6 min-h-[85.5vh]">
        <div className="md:w-1/2 w-full space-y-7">
          <h1 className="lg:text-5xl font-semibold md:text-2xl sm:text-xl">
            Find out best{" "}
            <span className="text-yellow-500 font-bold">Online courses</span>
          </h1>
          <p className="lg:text-xl text-gray-200 md:text-sm">
            We have a large library of courses taught by highly skilled and
            qualified faculties at a very affordable cost.
          </p>
          <div className="space-x-6">
            <Link to={"/courses"}>
              <button className="border border-yellow-500 bg-yellow-500 px-5 py-3 rounded-md font-semibold lg:text-lg cursor-pointer hover:bg-transparent hover:text-yellow-500 transition-all ease-in-out duration-300 sm:text-sm">
                Explore courses
              </button>
            </Link>
            <Link to={"/contact"}>
              <button className=" border border-yellow-500 text-yellow-500 px-5 py-3 rounded-md font-semibold lg:text-lg cursor-pointer hover:bg-yellow-500 hover:text-white transition-all ease-in-out duration-300 sm:text-sm">
                Contact Us
              </button>
            </Link>
          </div>
        </div>
        <div className="lg:w-1/2 flex items-center justify-center sm:w-11/12 md:w-9/12">
          <img src={homePageMainImage} alt="" />
        </div>
      </div>
    </HomeLayout>
  );
};

export default Home;
