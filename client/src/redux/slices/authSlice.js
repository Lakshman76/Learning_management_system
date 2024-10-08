import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import toast from "react-hot-toast";

import axiosInstance from "../../config/axiosInstance";

const initialState = {
  isLoggedIn: localStorage.getItem("isLoggedIn") || false,
  role: localStorage.getItem("role") || "",
  data:
    localStorage.getItem("data") && localStorage.getItem("data") !== "undefined"
      ? JSON.parse(localStorage.getItem("data"))
      : {},
};

export const createAccount = createAsyncThunk("/auth/signup", async (data) => {
  try {
    const response = axiosInstance.post("user/register", data);
    toast.promise(response, {
      loading: "Wait! creating your account",
      success: (data) => {
        return data?.data?.message;
      },
      error: "Failed to create your account",
    });
    return await response;
  } catch (error) {
    console.log(error);
    toast.error(error?.response?.data?.message);
  }
});

export const login = createAsyncThunk("/auth/signin", async (data) => {
  try {
    const response = axiosInstance.post("user/login", data);
    toast.promise(response, {
      loading: "Wait! authenticating your account",
      success: (data) => {
        return data?.data?.message;
      },
      error: "Failed to autheticate your account",
    });
    return await response;
  } catch (error) {
    console.log(error);
    toast.error(error?.response?.data?.message);
  }
});

export const logout = createAsyncThunk("/auth/logout", async () => {
  try {
    const response = axiosInstance.get("user/logout");
    toast.promise(response, {
      loading: "Wait! logging off your account",
      success: (data) => {
        return data?.data?.message;
      },
      error: "Failed to logout your account",
    });
    return await response;
  } catch (error) {
    console.log(error);
    toast.error(error?.response?.data?.message);
  }
});

export const updateProfile = createAsyncThunk(
  "/auth/update-profile",
  async (data) => {
    try {
      const response = axiosInstance.put(`user/update/${data[0]}`, data[1]);
      toast.promise(response, {
        loading: "Wait! updating your account",
        success: (data) => {
          return data?.data?.message;
        },
        error: "Failed to update your account",
      });
      return (await response).data;
    } catch (error) {
      console.log(error);
      toast.error(error?.response?.data?.message);
    }
  }
);

export const getUserData = createAsyncThunk("/auth/getData", async () => {
  try {
    const response = axiosInstance.get("user/me");

    return (await response).data;
  } catch (error) {
    console.log(error);
    toast.error(error?.message);
  }
});

export const changePassword = createAsyncThunk(
  "/auth/changePassword",
  async (data) => {
    try {
      const response = axiosInstance.post("user/change-password", data);

      toast.promise(response, {
        success: "Password changed successfully",
        loading: "Wait! changing password",
        error: "Failed to change password",
      });
      return await response;
    } catch (err) {
      console.log(err);
    }
  }
);

export const forgetPassword = createAsyncThunk(
  "/auth/forgetPassword",
  async (data) => {
    try {
      const response = axiosInstance.post("user/reset", data);
      toast.promise(response, {
        success: "Done! Please check your mail",
        loading: "Wait! Sending mail",
        error: "Failed to reset",
      });
      return await response;
    } catch (err) {
      console.log(err);
    }
  }
);

export const resetPassword = createAsyncThunk("/auth/reset", async (data) => {
  try {
    const response = axiosInstance.post(`/user/reset/${data[0]}`, data[1]);
    toast.promise(response, {
      success: "Password successfully setted",
      loading: "Wait! setting password",
      error: "Failed to set password",
    });
    return await response;
  } catch (err) {
    console.log(err);
  }
});

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(login.fulfilled, (state, action) => {
        localStorage.setItem(
          "data",
          JSON.stringify(action?.payload?.data?.user)
        );
        localStorage.setItem("isLoggedIn", true);
        localStorage.setItem("role", action?.payload?.data?.user?.role);
        state.isLoggedIn = true;
        state.role = action?.payload?.data?.user?.role;
        state.data = action?.payload?.data?.user;
      })
      .addCase(logout.fulfilled, (state) => {
        localStorage.clear();
        state.isLoggedIn = false;
        state.role = "";
        state.data = {};
      })
      .addCase(getUserData.fulfilled, (state, action) => {
        if (!action?.payload?.user) return;
        localStorage.setItem("data", JSON.stringify(action?.payload?.user));
        localStorage.setItem("isLoggedIn", true);
        localStorage.setItem("role", action?.payload?.user?.role);
        state.isLoggedIn = true;
        state.role = action?.payload?.user?.role;
        state.data = action?.payload?.user;
      });
  },
});
export default authSlice.reducer;
