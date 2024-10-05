import AppError from "../utils/appError.js";
import jwt from "jsonwebtoken";

const isLoggedIn = function (req, res, next) {
  try {
    const { token } = req.cookies;

    if (!token) {
      return next(new AppError("UnAuthenticated, please login!", 401));
    }

    const tokenDetails = jwt.verify(token, process.env.SECRET);

    if (!tokenDetails) {
      return next(new AppError("UnAuthenticated, please login!", 401));
    }
    req.user = tokenDetails;

    next();
  } catch (err) {
    if (err.name === "TokenExpiredError") {
      return next(new AppError("Token expired, please login again!", 401));
    } else if (err.name === "JsonWebTokenError") {
      return next(new AppError("Invalid token, please login again!", 401));
    } else {
      return next(new AppError(err.message, 401));
    }
  }
};

const authorizedRoles =
  (...roles) =>
  (req, res, next) => {
    const currentRole = req.user.role;

    if (!roles.includes(currentRole)) {
      return next(
        new AppError("You do not have permission to access this route"),
        403
      );
    }

    next();
  };

const authorizedSubscriber = (req, res, next) => {
  const subscriptionStatus = req.user.subscription.status;
  const currentRole = req.user.role;

  if (currentRole !== "ADMIN" && subscriptionStatus !== "active") {
    return next(new AppError("please subscribe to access this route"), 403);
  }
  next();
};

export { isLoggedIn, authorizedRoles, authorizedSubscriber };
