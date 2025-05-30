import dayjs from "dayjs";
import { EMAIL_USER } from "../config/env";
import { transporter } from "../config/nodemailer.js";

export const sendReminderEmail = async (to, type, subscription) => {
  if (!to || !type || !subscription) {
    throw new Error("Missing required parameters for sending email");
  }

  // const template

  const mailInfo = {
    username: subscription.user.name,
    subscriptionName: subscription.name,
    renewalDate: dayjs(subscription.renewalDate).format("MMMM D, YYYY"),
    planName: subscription.name,
    planPrice: ` ${subscription.currency} ${subscription.price} (${subscription.frequency})`,
    paymentMethodChangeEvent: subscription.paymentMethod,
  };
  // const message=   template.generateBody(mailInfo)
  // const subject = template.generateSubject(type, mailInfo);

  const mailOptions = {
    from: EMAIL_USER,
    to,
    subject,
    html: message,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error("Error sending email:", error);
      throw new Error("Failed to send email");
    } else {
      console.log("Email sent successfully:", info.response);
    }
  });
};
