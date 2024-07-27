import User from "../models/user.model.js";
import AppError from "../utils/appError.js";
import cloudinary from "cloudinary";
import fs from "fs/promises";
import sendEmail from "../utils/sendEmail.js";
import crypto from "crypto";

const cookieoptions = {
  secure: true,
  maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
  httpOnly: true,
};

const register = async (req, res, next) => {
  const { fullName, email, password, role } = req.body;

  if (!fullName || !email || !password) {
    return next(new AppError("All fields are required", 400));
  }

  if (role && !["USER", "ADMIN"].includes(role)) {
    return next(new AppError("Invalid role", 400));
  }

  const userExists = await User.findOne({ email });
  if (userExists) {
    return next(new AppError("Email already Exists", 400));
  }

  const user = await User.create({
    fullName,
    email,
    password,
    role: role || "USER",
    avatar: {
      public_id: email,
      secure_url:
        "https://media.istockphoto.com/id/1337144146/vector/default-avatar-profile-icon-vector.jpg?s=612x612&w=0&k=20&c=BIbFwuv7FxTWvh5S3vB6bkT0Qv8Vn8N5Ffseq84ClGI=",
    },
  });

  if (!User) {
    return next(
      new AppError("User registration failed, please try again!", 400)
    );
  }

  if (req.file) {
    try {
      const result = await cloudinary.v2.uploader.upload(req.file.path, {
        folder: "LEARNING_MANAGEMENT_SYSTEM",
        width: 250,
        height: 250,
        gravity: "faces",
        crop: "fill",
      });
      if (result) {
        user.avatar.public_id = result.public_id;
        user.avatar.secure_url = result.secure_url;

        fs.rm(`uploads/${req.file.filename}`);
      }
    } catch (e) {
      return next(new AppError("File not uploaded, please try again!", 500));
    }
  }

  await user.save();

  const token = await user.generateJWTToken();

  res.cookie("token", token, cookieoptions);

  user.password = undefined;

  res.status(200).json({
    success: true,
    message: "User registered successfully",
    user,
  });
};

const login = async (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return next(new AppError("All fields are required", 400));
  }
  const user = await User.findOne({
    email,
  }).select("+password");

  if (!user || ! await user.comparePassword(password)) {
    return next(new AppError("Email or password doesnot match", 400));
  }

  const token = await user.generateJWTToken();

  user.password = undefined;

  res.cookie("token", token, cookieoptions);

  res.status(201).json({
    success: true,
    message: "User logged in",
    user,
    token
  });
};

const logout = (req, res) => {
  res.cookie("token", null, {
    secure: true,
    maxAge: 0,
    httpOnly: true,
  });

  res.status(200).json({
    success: true,
    message: "User logged out successfully",
  });
};
const getProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    res.status(200).json({
      success: true,
      message: "User Details",
      user,
    });
  } catch (err) {
    res.status(400).json({
      success: false,
      message: err.message,
    });
  }
};

const forgotPassword = async (req, res, next) => {
  const { email } = req.body;

  if (!email) {
    return next(new AppError("Email is required", 400));
  }

  const user = await User.findOne({ email });

  if (!user) {
    return next(new AppError("User not found", 400));
  }

  const resetToken = await user.generateForgotPasswordToken();

  await user.save();

  const resetPasswordUrl = `${process.env.FRONTEND_URL}/reset-password/${resetToken}`;
  const subject = "reset password";
  const message = `<h1>Reset Password</h1>
  <p>Dear user,</p>
  <p>We've received your request to reset your password. Please click the link below to reset your password:</p>
  <a href="${resetPasswordUrl}">Reset Password</a>
  <p>If you didn't request a password reset, please ignore this email and contact our support team at <b>developerlakshman26@gmail.com</b></p>
  <p>Best regards,</p>
  <p>Dev Team</p>`;

  console.log(resetPasswordUrl);
  try {
    await sendEmail(email, subject, message);

    res.status(200).json({
      success: true,
      message: `Reset password token has been sent to ${email} successfully`,
    });
  } catch (e) {
    user.forgotPasswordExpiry = undefined;
    user.forgotPasswordToken = undefined;
    await user.save();
    return next(new AppError(e.message, 500));
  }
};

const resetPassword = async (req, res, next) => {
  try {
    const { resetToken } = req.params;
    const { password } = req.body;

    const forgotPasswordToken = crypto
      .createHash("sha256")
      .update(resetToken)
      .digest("hex");

    const user = await User.findOne({
      forgotPasswordToken,
      forgotPasswordExpiry: { $gt: Date.now() },
    });
    if (!user) {
      return next(new AppError("Token is invalid or expires", 400));
    }

    user.password = password;
    user.forgotPasswordToken = undefined;
    user.forgotPasswordExpiry = undefined;

    await user.save();

    res.status(200).json({
      success: true,
      message: "Password changed successfully",
    });
  } catch (e) {
    return next(new AppError("Failed! to changed password", 500));
  }
};

const changePassword = async (req, res, next) => {
  try {
    const { oldPassword, newPassword } = req.body;
    const { id } = req.user;

    if (!oldPassword || !newPassword) {
      return next(new AppError("All fields are required", 400));
    }

    const user = await User.findById(id).select("+password");

    if (!user) {
      return next(new AppError("User not found!", 400));
    }

    const isPasswordValid = await user.comparePassword(oldPassword);

    if (!isPasswordValid) {
      return next(new AppError("Password doesn't match!", 400));
    }

    user.password = newPassword;
    await user.save();

    user.password = undefined;

    res.status(200).json({
      success: true,
      message: "Password changed successfully",
    });
  } catch (err) {
    return next(new AppError("Failed to change password!", 400));
  }
};

const updateUser = async (req, res, next) => {
  const { fullName } = req.body;
  const { id } = req.user;

  const user = await User.findById(id);

  if (!user) {
    return next(new AppError("User doesn't exit", 400));
  }

  if (fullName) {
    user.fullName = fullName;
  }

  if (req.file) {
    await cloudinary.v2.uploader.destroy(user.avatar.public_id);

    const result = await cloudinary.v2.uploader.upload(req.file.path, {
      folder: "LEARNING_MANAGEMENT_SYSTEM",
      width: 250,
      height: 250,
      gravity: "faces",
      crop: "fill",
    });
    if (result) {
      user.avatar.public_id = result.public_id;
      user.avatar.secure_url = result.secure_url;

      fs.rm(`uploads/${req.file.filename}`);
    }
  }

  await user.save();

  res.status(200).json({
    success: true,
    message: "User details updated successfully"
  })
};

export {
  register,
  login,
  logout,
  getProfile,
  forgotPassword,
  resetPassword,
  changePassword,
  updateUser,
};
