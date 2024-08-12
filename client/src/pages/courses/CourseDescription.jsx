import { useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";

import HomeLayout from "../../layouts/HomeLayout";

const CourseDescription = () => {
  const { state } = useLocation();
  const navigate = useNavigate();
  const { role, data } = useSelector((state) => state.auth);

  return (
    <HomeLayout>
      <div className="min-h-[90vh] pt-12 px-20 flex flex-col justify-center items-center text-white ">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 py-10 relative">
          <div className="space-y-5">
            <img
              src={state?.thumbnail?.secure_url}
              alt="thumbnail"
              className="w-full h-64 "
            />
            <div className="space-y-4">
              <div className="flex flex-col justify-between items-center text-xl">
                <p className="font-semibold">
                  <span className="font-bold text-yellow-500">
                    Total lectures:{" "}
                  </span>
                  {state?.numberOfLectures}
                </p>
                <p className="font-semibold">
                  <span className="font-bold text-yellow-500">
                    Instructor:{" "}
                  </span>
                  {state?.createdBy}
                </p>
              </div>
              {role === "ADMIN" || data?.subscription?.status === "active" ? (
                <button
                  className="bg-yellow-500 text-xl rounded-md font-bold px-5 py-3 w-full border border-yellow-500 hover:bg-transparent hover:text-yellow-500 transition-all ease-in-out duration-300"
                  onClick={() =>
                    navigate("/courses/displayLectures", {
                      state: { ...state },
                    })
                  }
                >
                  Watch lectures
                </button>
              ) : (
                <button
                  className="bg-yellow-500 text-xl rounded-md font-bold px-5 py-3 w-full border border-yellow-500 hover:bg-transparent hover:text-yellow-500 transition-all ease-in-out duration-300"
                  onClick={() => navigate("/checkout")}
                >
                  Subscribe
                </button>
              )}
            </div>
          </div>
          <div className="space-y-2 text-xl">
            <h1 className="text-3xl font-bold text-yellow-500 mb-5 text-center">
              {state?.title}
            </h1>
            <p className="text-yellow-500 font-semibold">
              Course description:{" "}
            </p>
            <p>{state?.description}</p>
            <p>
              <span className="text-yellow-500 font-semibold">
                Instructor:{" "}
              </span>
              {state?.createdBy}
            </p>
          </div>
        </div>
      </div>
    </HomeLayout>
  );
};

export default CourseDescription;
