import { configureStore } from "@reduxjs/toolkit";

import authReducer from "./slices/authSlice";
import courseReducer from "./slices/courseSlice";
import lectureReducer from "./slices/lectureSlice"

const store = configureStore({
  reducer: {
    auth: authReducer,
    course: courseReducer,
    lecture: lectureReducer
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({serializableCheck: false}),
  devTools: true,
});
export default store;