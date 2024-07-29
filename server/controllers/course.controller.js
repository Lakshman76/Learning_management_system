import Course from "../models/course.model.js";
import AppError from "../utils/appError.js";
import cloudinary from "cloudinary";
import fs from "fs/promises";

export const getAllCourses = async (req, res, next) => {
  try {
    const courses = await Course.find({}).select("-lectures");
    res.status(200).json({
      success: true,
      message: "All courses",
      courses,
    });
  } catch (err) {
    return next(new AppError(err.message, 500));
  }
};

export const getLecturesByCourseId = async (req, res, next) => {
  try {
    const { courseId } = req.params;
    const course = await Course.findById(courseId);

    if (!course) {
      return next(new AppError("Invalid course Id!", 400));
    }

    res.status(200).json({
      success: true,
      message: "Course lectures fetched successfully",
      lectures: course.lectures,
    });
  } catch (err) {}
};

export const createCourse = async (req, res, next) => {
  try {
    const { title, description, category, createdBy } = req.body;

    if (!title || !description || !category || !createdBy) {
      return next(new AppError("ALl fields are required!", 400));
    }

    const course = await Course.create({
      title,
      description,
      category,
      createdBy,
      thumbnail: {
        public_id: "DUMMY",
        secure_url: "DUMMY",
      },
    });

    if (!course) {
      return next(new AppError("Failed to create course!"));
    }

    if (req.file) {
      const result = await cloudinary.v2.uploader.upload(req.file.path, {
        folder: "LEARNING_MANAGEMENT_SYSTEM",
      });
      if (result) {
        course.thumbnail.public_id = result.public_id;
        course.thumbnail.secure_url = result.secure_url;

        fs.rm(`uploads/${req.file.filename}`);
      }
    }

    await course.save();

    res.status(200).json({
      success: true,
      message: "Course created successfully",
      course,
    });
  } catch (err) {
    return next(new AppError(err.message, 500));
  }
};

export const updateCourse = async (req, res, next) => {
  try {
    const { courseId } = req.params;

    const course = await Course.findByIdAndUpdate(
      courseId,
      {
        $set: req.body,
      },
      {
        runValidators: true,
      }
    );

    if (!course) {
      return next(new AppError("Invalid course Id!", 400));
    }

    res.status(200).json({
      success: true,
      message: "Course updated successfully",
      course,
    });
  } catch (err) {
    return next(new AppError(err.message, 500));
  }
};

export const deleteCourse = async (req, res, next) => {
  try {
    const { courseId } = req.params;

    const course = await Course.findById(courseId);

    if (!course) {
      return next(new AppError("Courese does not find by given id!"));
    }

    await Course.findByIdAndDelete(courseId);

    res.status(200).json({
      success: true,
      message: "Course deleted successfully",
    });
  } catch (err) {
    return next(new AppError(err.message, 500));
  }
};

export const addLecturesToCourseById = async (req, res, next) => {
  try {
    const { title, description } = req.body;
    const { courseId } = req.params;

    console.log("req body", req.body);

    if (!title || !description) {
      return next(new AppError("All fields are required", 400));
    }

    const course = await Course.findById(courseId);

    if (!course) {
      return next(new AppError("Course does not exist by given id!", 400));
    }

    const lectureData = {
      title,
      description,
      lecture: {
        public_id: "DUMMY",
        secure_url: "DUMMY",
      },
    };

    if (req.file) {
      const result = await cloudinary.v2.uploader.upload(req.file.path, {
        folder: "LEARNING_MANAGEMENT_SYSTEM",
        resource_type: "auto", 
      });
      if (result) {
        lectureData.lecture.public_id = result.public_id;
        lectureData.lecture.secure_url = result.secure_url;

        fs.rm(`uploads/${req.file.filename}`);
      }
    }

    course.lectures.push(lectureData);
    course.numberOfLectures = course.lectures.length;

    await course.save();

    res.status(200).json({
      success: true,
      message: "Lecture added successfully!",
      course,
    });
  } catch (err) {
    return next(new AppError(err.message, 500));
  }
};

export const deleteLecturesByIndex = async (req, res, next) => {
  try {
    const { index } = req.body;
    const { courseId } = req.params;

    if (!index) {
      return next(new AppError("Please provide index!", 400));
    }

    const course = await Course.findById(courseId);

    if (!course) {
      return next(new AppError("Invalid course Id", 400));
    }

    course.lectures.splice(index, 1);

    course.numberOfLectures = course.lectures.length;

    await course.save();

    res.status(200).json({
      success: true,
      message: "Lecture deleted successfully!",
      course,
    });
  } catch (err) {
    return next(new AppError(err.message, 500));
  }
};
