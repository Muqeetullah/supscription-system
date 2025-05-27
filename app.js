import express from "express";
import { PORT } from "./config/env.js";
import {
  userRouter,
  authRouter,
  subscriptionRouter,
  workflowRouter,
} from "./routes/index.js";
import connectDB from "./database/mongodb.js";
import cookieParser from "cookie-parser";
import errorMiddleware from "./middlewares/error.middleware.js";
import arcjetMiddleware from "./middlewares/arcjet.middleware.js";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(arcjetMiddleware);

app.use("/api/v1/users", userRouter);
app.use("/api/v1/auth", authRouter);
app.use("/api/v1/subscriptions", subscriptionRouter);
app.use("/api/v1/workflows", workflowRouter);

app.use(errorMiddleware);

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.listen(PORT, async () => {
  console.log(`Server is running on http://localhost:${PORT}`);
  await connectDB();
});

export default app;
