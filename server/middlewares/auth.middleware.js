import AppError from "../utils/appError.js";
import jwt from "jsonwebtoken";

const isLoggedIn = function (req, res, next) {
  try {
    const { token } = req.cookies;

    if (!token) {
      return next(new AppError("UnAuthenticated, please login!", 401));
    }

    const tokenDetails = jwt.verify(token, process.env.JWT_SECRET);

    if (!tokenDetails) {
      return next(new AppError("UnAuthenticated, please login!", 401));
    }
    req.user = tokenDetails;

    next();
  } catch (err) {
    if (err.name === 'TokenExpiredError') {
      return next(new AppError("Token expired, please login again!", 401));
    } else if (err.name === 'JsonWebTokenError') {
      return next(new AppError("Invalid token, please login again!", 401));
    } else {
      return next(new AppError(err.message, 401));
    }
  }
};

export { isLoggedIn };
