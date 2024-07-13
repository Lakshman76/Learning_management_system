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
    return next(new AppError("UnAuthenticated, please login!", 401));
  }
};

export { isLoggedIn };
