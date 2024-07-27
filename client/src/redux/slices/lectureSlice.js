import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import toast from "react-hot-toast";

import axiosInstance from "../../config/axiosInstance";

const initialState = {
  lectures: [],
};

export const getCourseLecture = createAsyncThunk(
  "/course/lecture/get",
  (courseId) => {
    try {
      const response = axiosInstance.get(`/courses/${courseId}`);
      toast.promise(response, {
        loading: "Wait! fetching course lectures",
        success: "Successfully fetched course lectures",
        error: "Failed to load the lecture!",
      });
    } catch (error) {
      toast.error(error?.data?.response?.message);
    }
  }
);

export const addCourseLecture = createAsyncThunk(
  "/course/lecture/add",
  (data) => {
    try {
      const formData = new FormData();
      formData.append("lecture", data.lecture);
      formData.append("title", data.title);
      formData.append("description", data.description);

      const response = axiosInstance.post(`/courses/${data.id}`, formData);
      toast.promise(response, {
        loading: "Wait! adding course lectures",
        success: "Successfully added course lectures",
        error: "Failed to add the lecture!",
      });
    } catch (error) {
      toast.error(error?.data?.response?.message);
    }
  }
);

export const deleteCourseLecture = createAsyncThunk(
    "/course/lecture/delete",
    (courseId) => {
      try {  
        const response = axiosInstance.delete(`/courses/lecture/${courseId}`,);
        toast.promise(response, {
          loading: "Wait! adding course lectures",
          success: "Successfully added course lectures",
          error: "Failed to add the lecture!",
        });
      } catch (error) {
        toast.error(error?.data?.response?.message);
      }
    }
  );

const lectureSlice = createSlice({
  name: "lecture",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getCourseLecture.fulfilled,(state, action) => {
        state.lectures = action?.payload?.lectures;
    }),
    builder.addCase(addCourseLecture.fulfilled,(state, action) => {
        state.lectures = action?.payload?.course?.lectures;
    })
  },
});

export default lectureSlice.reducer;
