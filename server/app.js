import { config } from "dotenv";
import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import dbConnect from "./config/dbConnection.js";
import userRoutes from "./routes/user.route.js";
import courseRoutes from "./routes/course.route.js";
import paymentRoutes from "./routes/payment.route.js"
import errorMiddleware from "./middlewares/error.middleware.js";
import morgan from "morgan";

config();
dbConnect();

const app = express();

app.use(express.json());

app.use(
  cors({
    origin: [process.env.FRONTEND_URL],
    credentials: true,
  })
);

app.use(cookieParser());

app.use(morgan("dev"));


app.use("/api/v1/user", userRoutes);
app.use("/api/v1/courses", courseRoutes);
app.use("/api/v1/payments", paymentRoutes);


app.use(errorMiddleware);

export default app;
