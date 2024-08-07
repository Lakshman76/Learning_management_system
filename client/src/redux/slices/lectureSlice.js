import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import toast from "react-hot-toast";

import axiosInstance from "../../config/axiosInstance";

const initialState = {
  lectures: [],
};

export const getCourseLecture = createAsyncThunk(
  "/course/lecture/get",
  async (courseId) => {
    try {
      const response = axiosInstance.get(`/courses/${courseId}`);
      toast.promise(response, {
        loading: "Wait! fetching course lectures",
        success: "Successfully fetched course lectures",
        error: "Failed to load the lecture!",
      });
      return (await response).data.lectures;
    } catch (error) {
      toast.error(error?.data?.response?.message);
    }
  }
);

export const addCourseLecture = createAsyncThunk(
  "/course/lecture/add",
  async (data) => {
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
      return (await response)?.data;
    } catch (error) {
      toast.error(error?.data?.response?.message);
    }
  }
);

export const deleteCourseLecture = createAsyncThunk(
  "/course/lecture/delete",
  async (data) => {
    try {
      const response = axiosInstance.delete(
        `/courses/lecture/${data?.courseId}`,
        {
          data: { index: data?.lectureId },
        }
      );
      toast.promise(response, {
        loading: "Wait! deleting course lectures",
        success: "Successfully deleted course lectures",
        error: "Failed to delete the lecture!",
      });
      return await response;
    } catch (error) {
      console.log(error);
      toast.error(
        error?.response?.data?.message || "Failed to delete the lecture!"
      );
    }
  }
);

const lectureSlice = createSlice({
  name: "lecture",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getCourseLecture.fulfilled, (state, action) => {
      state.lectures = action?.payload;
    }),
      builder.addCase(addCourseLecture.fulfilled, (state, action) => {
        state.lectures = action?.payload?.course?.lectures;
      });
  },
});

export default lectureSlice.reducer;
