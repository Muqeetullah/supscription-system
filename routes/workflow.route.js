import { Router } from "express";
import { sentReminders } from "../controllers/workflow.controller.js";

const workflowRouter = Router();

workflowRouter.post("/subscription/reminders", sentReminders);
export default workflowRouter;
