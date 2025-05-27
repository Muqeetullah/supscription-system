import { createRequire } from "module";
import Subscription from "../models/subscription.model.js";
import dayjs from "dayjs";
const require = createRequire(import.meta.url);
const { serve } = require("@upstash/workflow/express");

const REMINDERS = [7, 5, 3, 1];

export const sentReminders = serve(async (context) => {
  const { subscriptionId } = context.requestPayload;
  const subscription = await fetchSubscription(context, subscriptionId);

  if (!subscription || subscription.status !== "active") return;

  const renewalData = dayjs(subscription.renewalDate);
  if (renewalData.isBefore(dayjs())) {
    console.log("Subscription is already expired");
    return;
  }

  for (const daysBefore of REMINDERS) {
    const reminderDate = renewalData.subtract(daysBefore, "day");
    if (reminderDate.isAfter(dayjs())) {
      await sleepUntilReminder(
        context,
        `reminder-${daysBefore} days before`,
        reminderDate
      );
    }
    await triggerReminder(context, `reminder-${daysBefore} days before`);
  }
});

const fetchSubscription = async (context, subscriptionId) => {
  return await context.run("get subscription", () => {
    return Subscription.findById(subscriptionId).populate("user", "name email");
  });
};

const sleepUntilReminder = async (context, label, date) => {
  console.log(`Sleeping until ${date.format("YYYY-MM-DD")}`);
  await context.sleepUntil(label, date.toDate());
};

const triggerReminder = async (context, label) => {
  return await context.run(label, () => {
    console.log(`Triggering reminder for ${label}`);
    // Here you can send the reminder to the user
  });
};
