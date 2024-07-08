import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import HomeLayout from "../../layouts/HomeLayout";
import { getAllCourses } from "../../redux/slices/courseSlice";
import CourseCard from "./CourseCard";

const CourseList = () => {
  const dispatch = useDispatch();

  const { courseList } = useSelector((state) => state.course);

  async function loadCourses() {
    await dispatch(getAllCourses());
  }

  useEffect(() => {
    loadCourses();
  }, []);
  return (
    <HomeLayout>
      <div className="min-h-[90vh] pt-12 pl-20 flex flex-col gap-10 text-white">
        <h1 className="text-4xl text-center font-semibold mb-5">
          Explore courses made by{" "}
          <span className="font-bold text-yellow-500">Industry experts</span>
        </h1>
        <div className="mb-10 flex flex-wrap gap-14">
          {courseList?.map((element) => {
            return <CourseCard key={element._id} data={element} />;
          })}
        </div>
      </div>
    </HomeLayout>
  );
};

export default CourseList;
