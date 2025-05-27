import mongoose from "mongoose";
const subscriptionSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Subscription name is required"],
      trim: true,
    },

    price: {
      type: Number,
      required: [true, "Price is required"],
      min: [0, "Price must be greater than 0"],
    },

    currency: {
      type: String,

      enum: ["USD", "EUR", "GBP"],
      default: "USD",
    },
    frequency: {
      type: String,
      enum: ["monthly", "yearly"],
      default: "monthly",
    },
    category: {
      type: String,
      enum: [
        "sports",
        "news",
        "entertainment",
        "lifestyle",
        "technology",
        "finance",
        "politics",
        "other",
      ],
    },
    paymentMethod: {
      type: String,
      required: true,
      trim: true,
    },
    status: {
      type: String,
      enum: ["active", "expired", "cancelled"],
      default: "active",
    },
    startDate: {
      type: Date,
      required: true,
      validate: {
        validator: function (v) {
          return v <= Date.now();
        },
        message: (props) => `Start date must be in the past `,
      },
      default: Date.now,
    },
    renewalDate: {
      type: Date,

      validate: {
        validator: function (v) {
          return v > this.startDate;
        },
        message: (props) => `Renewal date must be after start date`,
      },
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },
  },
  { timestamps: true }
);

//Auto recalculation of renewal date
subscriptionSchema.pre("save", function (next) {
  if (!this.renewalDate) {
    const renewalPeriods = {
      monthly: 30,
      yearly: 365,
    };
    this.renewalDate = new Date(this.startDate);
    this.renewalDate.setDate(
      this.renewalDate.getDate() + renewalPeriods[this.frequency]
    );
  }
  if (this.renewalDate < this.startDate) {
    this.status = "expired";
  }
  next();
});
const Subscription = mongoose.model("Subscription", subscriptionSchema);

export default Subscription;
