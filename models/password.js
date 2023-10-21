import mongoose from "mongoose";

const resetPasswordToken = mongoose.Schema({
  user: {
    ref: "User",
    type: mongoose.Schema.Types.ObjectId,
  },
  resetToken: String,
  resetTokenExpiry: Date,
});

export const ResetPasswordToken = mongoose.model(
  "ResetPasswordToken",
  resetPasswordToken
);
