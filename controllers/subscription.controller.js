import { SERVER_URL } from "../config/env.js";
import Subscription from "../models/subscription.model.js";
import workflowClient from "../config/upstash.js";

export const createSubscription = async (req, res, next) => {
  try {
    const subscription = await Subscription.create({
      ...req.body,
      user: req.user.id,
    });

    // await workflowClient.trigger({
    //   url: `${SERVER_URL}/api/v1/workflows/subscription/reminders`,
    //   // body,
    //   // headers,
    //   // workflowRunId,
    //   // retries,
    // });
  } catch (error) {
    next(error);
  }
};

export const getUsersSubscriptions = async (req, res, next) => {
  try {
    if (req.user.id !== req.params.id) {
      const error = new Error("You are not authorized to access this route");
      error.statusCode = 401;
      throw error;
    }
    const subscriptions = await Subscription.find({ user: req.user.id });

    res.status(200).json({
      success: true,
      data: subscriptions,
    });
  } catch (error) {
    next(error);
  }
};

export const updateSubscription = async (req, res, next) => {
  try {
    const subscription = await Subscription.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
        runValidators: true,
      }
    );

    res.status(200).json({
      success: true,
      data: subscription,
    });
  } catch (error) {
    next(error);
  }
};

export const cancelSubscription = async (req, res, next) => {
  try {
    const subscription = await Subscription.findByIdAndUpdate(
      req.params.id,
      { status: "cancelled" },
      {
        new: true,
        runValidators: true,
      }
    );

    res.status(200).json({
      success: true,
      data: subscription,
    });
  } catch (error) {
    next(error);
  }
};
