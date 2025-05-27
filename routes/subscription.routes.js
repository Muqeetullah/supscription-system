import { Router } from "express";
import authorize from "../middlewares/auth.middleware.js";
import {
  createSubscription,
  getUsersSubscriptions,
  updateSubscription,
  cancelSubscription,
} from "../controllers/subscription.controller.js";

const subscriptionRouter = Router();

subscriptionRouter.get("/", (req, res) => {
  res.send({ title: "Get all subscriptions" });
});
subscriptionRouter.get("/upcoming-renewals", (req, res) => {
  res.send({ title: "Get upcoming renewals" });
});
subscriptionRouter.get("/:id", (req, res) => {
  res.send({ title: "Get subscription by id" });
});
subscriptionRouter.post("/", authorize, createSubscription);
subscriptionRouter.put("/:id", authorize, updateSubscription);
subscriptionRouter.delete("/:id", (req, res) => {
  res.send({ title: "Delete subscription" });
});
subscriptionRouter.get("/user/:id", authorize, getUsersSubscriptions);
subscriptionRouter.post("/:id/cancel", authorize, cancelSubscription);

export default subscriptionRouter;
