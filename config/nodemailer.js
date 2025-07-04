import nodemailer from "nodemailer";
import { EMAIL_PASSWORD } from "./env";

export const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: EMAIL_USER,
    pass: EMAIL_PASSWORD,
  },
});
