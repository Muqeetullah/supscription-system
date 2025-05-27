import { JWT_SECRET } from "../config/env.js";
import jwt from "jsonwebtoken";
import User from "../models/user.model.js";

const authorize = async (req, res, next) => {
  try {
    let token;
    if (
      req?.headers?.authorization &&
      req?.headers?.authorization?.startsWith("Bearer")
    ) {
      token = req.headers.authorization.split(" ")[1];
    }
    if (!token) {
      const error = new Error("Not authorized to access this route");
      error.statusCode = 401;
      throw error;
    }
    const decoded = jwt.verify(token, JWT_SECRET);
    req.user = await User.findById(decoded.userId);
    if (!req.user) {
      const error = new Error("User not found");
      error.statusCode = 404;
      throw error;
    }

    next();
  } catch (error) {
    res.status(401).json({
      success: false,
      error: error.message,
    });
  }
};
export default authorize;
