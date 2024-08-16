import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import toast from "react-hot-toast";

import axiosInstance from "../../config/axiosInstance";

const initialState = {
  key: "",
  subscription_id: "",
  isPaymentVerified: false,
  allPayments: {},
  finalMonths: {},
  monthlySalesRecord: {},
};

export const getRazorpayId = createAsyncThunk("/razorpay/getId", async () => {
  try {
    const response = await axiosInstance.get("/payments/razorpay-key");
    return response?.data;
  } catch (error) {
    toast.error("Failed to load data");
  }
});

export const courseBundle = createAsyncThunk("purchaseCourse", async () => {
  try {
    const response = await axiosInstance.post("/payments/subscribe");
    return response?.data;
  } catch (error) {
    toast.error(error?.response?.data?.message);
  }
});

export const verifyUserPayment = createAsyncThunk(
  "/payments/verify",
  async (data) => {
    try {
      const response = await axiosInstance.post("/payments/verify", {
        payment_id: data.razorpay_payment_id,
        subscription_id: data.razorpay_subscription_id,
        payment_signature: data.razorpay_signature,
      });
      return response?.data;
    } catch (error) {
      toast.error(error?.response?.data?.message);
    }
  }
);

export const getPaymentRecord = createAsyncThunk(
  "/payment/recprd",
  async () => {
    try {
      const response = axiosInstance.get("/payments?count=100");
      toast.promise(response, {
        loading: "Getting thr payment record",
        success: (data) => data?.data?.message,
        error: "Failed to get the payment recor",
      });
      return (await response).data;
    } catch (error) {
      toast.error("Operation failed!");
    }
  }
);

export const cancelCourseBundle = createAsyncThunk(
  "/payment/cancel",
  async () => {
    try {
      const response = axiosInstance.post("/payments/unsubscribe");
      toast.promise(response, {
        loading: "Unsubscribing course bundle",
        success: (data) => data?.data?.message,
        error: "Failed to unsubscribe",
      });
      return (await response).data;
    } catch (error) {
      toast.error(error?.response?.data?.message);
    }
  }
);

const razorpaySlice = createSlice({
  name: "razorpay",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getRazorpayId.fulfilled, (state, action) => {
      state.key = action?.payload?.key;
    });
    builder.addCase(courseBundle.fulfilled, (state, action) => {
      state.subscription_id = action?.payload?.subscription_id;
    });
    builder.addCase(verifyUserPayment.fulfilled, (state, action) => {
      toast.success(action?.payload?.message);
      state.isPaymentVerified = action?.payload?.success;
    });
    builder.addCase(verifyUserPayment.failed, (state, action) => {
      toast.error(action?.payload?.message);
      state.isPaymentVerified = action?.payload?.success;
    });
    builder.addCase(getPaymentRecord.fulfilled, (state, action) => {
      state.allPayments = action?.payload?.allPayments;
      state.finalMonths = action?.payload?.finalMonths;
      state.monthlySalesRecord = action.payload.monthlySalesRecord;
    });
  },
});

export default razorpaySlice.reducer;
