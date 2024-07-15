import Course from "../models/course.model.js";
import AppError from "../utils/appError.js";

export const getAllCourses = async (req, res, next) => {
  try {
    const courses = Course.find({}).select("-lectures");
    res.status(200).json({
        success: true,
        message: "All courses",
        courses
    })
  } catch (err) {
    return next(new AppError(err.message, 500));
  }
};
