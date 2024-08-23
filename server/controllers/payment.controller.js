import Payment from "../models/payment.model.js";
import User from "../models/user.model.js";
import { razorpay } from "../server.js";
import AppError from "../utils/appError.js";

export const getRazorpayApiKey = async (req, res, next) => {
  try {
    res.status(200).json({
      success: true,
      message: "Razorpay API key",
      key: process.env.RAZORPAY_KEY_ID,
    });
  } catch (e) {
    return next(new AppError(e.message, 500));
  }
};

export const buySubscription = async (req, res, next) => {
  try {
    const { id } = req.user;
    const user = await User.findById(id);

    if (!user) {
      return next(new AppError("Unauthorized, please login", 500));
    }

    if (user.role === "ADMIN") {
      return next(new AppError("Admin cannot purchase subscription", 400));
    }

    const subscription = await razorpay.subscriptions.create({
      plan_id: process.env.RAZORPAY_PLAN_ID,
      customer_notify: 1,
    });

    user.subscription.id = subscription.id;
    user.subscription.status = subscription.status;

    await user.save();

    res.status(200).json({
      success: true,
      message: "Subscribed successfully",
    });
  } catch (e) {
    return next(new AppError(e.message, 500));
  }
};

export const verifySubscription = async (req, res, next) => {
  try {
    const { id } = req.user;
    const user = await User.findByID(id);

    if (!user) {
      return next(new AppError("Unauthorized, please login", 500));
    }

    const { payment_id, payment_signature, subscription_id } = req.body;

    const generatedSignature = crypto
      .createHmac("sha256", process.env.RAZORPAY_SECRET)
      .update(`${payment_id} | ${subscription_id}`);

    if (generatedSignature !== payment_signature) {
      return next(new AppError("Payment not verified, please try again", 500));
    }

    await Payment.create({
      payment_id,
      payment_signature,
      subscription_id,
    });

    user.subscription.status = "active";
    await user.save();

    res.status(200).json({
      success: true,
      message: "Payment verified successfully",
    });
  } catch (e) {
    return next(new AppError(e.message, 500));
  }
};

export const cancelSubscription = async (req, res, next) => {
  try {
    const { id } = req.user;
    const user = await User.findByID(id);

    if (!user) {
      return next(new AppError("Unauthorized, please login", 500));
    }

    if (user.role === "ADMIN") {
      return next(new AppError("Admin cannot cancel subscription", 400));
    }

    const subscriptionId = user.subscription.id;
    const subscription = await razorpay.subscriptions.cancel(subscriptionId);

    user.subscription.status = subscription.status;

    await user.save();

    res.status(200).json({
        success: true,
        message: "Subscription cancelled!"
    })
  } catch (e) {
    return next(new AppError(e.message, 500));
  }
};

export const getAllPayments = async (req, res, next) => {
  try {
    const { count } = req.query;
    const subscriptions = await razorpay.subscriptions.all({
        count: count || 10
    })

    res.status(200).json({
        success: true,
        message: "All payment details",
        payments: subscriptions
    })
  } catch (e) {
    return next(new AppError(e.message, 500));
  }
};
