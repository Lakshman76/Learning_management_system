import { Schema, model } from "mongoose";

const courseSchema = new Schema(
  {
    title: {
      type: String,
      required: [true, "Title is required"],
      minLength: [5, "Title must be atleast 5 character"],
      maxLength: [50, "Title must be less than 50 character"],
      trim: true,
    },
    description: {
      type: String,
      required: [true, "Description is required"],
      minLength: [5, "Description must be atleast 5 character"],
      maxLength: [200, "Description must be less than 200 character"],
      trim: true,
    },
    category: {
      type: String,
      required: true,
    },
    thumbnail: {
      public_id: {
        type: String,
        required: true,
      },
      secure_url: {
        type: String,
        required: true,
      },
    },
    lectures: [
      {
        title: String,
        description: String,
        lecture: {
          public_id: {
            type: String,
            required: true,
          },
          secure_url: {
            type: String,
            required: true,
          },
        },
      },
    ],
    numberOfLectures: {
      type: String,
      default: 0,
    },
    createdBy: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Course = model("Course", courseSchema);

export default Course;
