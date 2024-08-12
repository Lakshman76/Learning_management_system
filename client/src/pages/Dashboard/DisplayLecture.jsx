import { useEffect, useState } from "react";
import { RiDeleteBin6Line } from "react-icons/ri";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";

import HomeLayout from "../../layouts/HomeLayout";
import {
  deleteCourseLecture,
  getCourseLecture,
} from "../../redux/slices/lectureSlice";

const DisplayLecture = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { state } = useLocation();
  const { lectures } = useSelector((state) => state.lecture);
  const { role } = useSelector((state) => state.auth);

  const [currentVideo, setCurrentVideo] = useState(0);

  async function onLectureDelete(cid, lid) {
    await dispatch(deleteCourseLecture({ courseId: cid, lectureId: lid }));
    await dispatch(getCourseLecture(state._id));
  }

  useEffect(() => {
    if (!state) navigate("/courses");
    dispatch(getCourseLecture(state._id));
  }, []);
  return (
    <HomeLayout>
      <div className="flex flex-col justify-center items-center gap-10 min-h-[90vh] py-10 text-white mx-[5%] ">
        <div className="text-center font-semibold text-2xl text-yellow-500">
          Course Name: {state?.title}
        </div>
        {lectures && lectures.length > 0 && (
          <div className=" flex md:flex-row flex-col md:justify-center gap-10 w-full h-full">
            <div className="space-y-5 w-[28rem] p-2 rounded-lg shadow-[0_0_10px_black] ">
              <video
                src={lectures[currentVideo]?.lecture?.secure_url}
                className="object-fill rounded-t-lg w-full"
                controls
                disablePictureInPicture
                controlsList="nodownload"
                muted
              ></video>
              <h1>
                <span className="text-yellow-500">Title: </span>
                {lectures[currentVideo]?.title}
              </h1>
              <p>
                <span className="text-yellow-500">Description: </span>
                {lectures[currentVideo]?.description}
              </p>
            </div>
            <ul className="w-[28rem] p-2 rounded-lg shadow-[0_0_10px_black] space-y-5">
              <li className="font-semibold text-xl text-yellow-500 flex items-center justify-between">
                Lectures list
                {role === "ADMIN" && (
                  <button
                    onClick={() =>
                      navigate("/course/addlecture", { state: { ...state } })
                    }
                    className="btn btn-primary  rounded-md font-semibold text-sm"
                  >
                    Add new lecture
                  </button>
                )}
              </li>
              {lectures.map((lecture, idx) => {
                return (
                  <li className="space-y-2 border " key={lecture._id}>
                    <p
                      className="p-2 cursor-pointer flex justify-between items-center"
                      onClick={() => setCurrentVideo(idx)}
                    >
                      <span
                        className={
                          currentVideo === idx
                            ? "font-bold text-lg "
                            : "" + "transition-all ease-in-out duration-300"
                        }
                      >
                        Lecture {idx + 1}: {lecture?.title}
                      </span>

                      {role === "ADMIN" && (
                        <button
                          onClick={() => onLectureDelete(state._id, idx)}
                          title="delete"
                          className="w-8 h-8 flex justify-center items-center bg-accent text-black rounded-md"
                        >
                          <RiDeleteBin6Line />
                        </button>
                      )}
                    </p>
                  </li>
                );
              })}
            </ul>
          </div>
        )}
      </div>
    </HomeLayout>
  );
};

export default DisplayLecture;
