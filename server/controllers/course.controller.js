import Course from "../models/course.model.js";
import AppError from "../utils/appError.js";

export const getAllCourses = async (req, res, next) => {
  try {
    const courses = await Course.find({}).select("-lectures");
    res.status(200).json({
        success: true,
        message: "All courses",
        courses
    })
  } catch (err) {
    return next(new AppError(err.message, 500));
  }
};

export const getLecturesByCourseId = async (req, res, next) => {
    try {
        const { courseId } = req.params;
        const course = await Course.findById(courseId);

        if(!course){
            return next(new AppError("Invalid course Id!", 400));
        }

        res.status(200).json({
            success: true,
            message: "Course lectures fetched successfully",
            lectures: course.lectures,
        })
    } catch (err) {
        
    }

}