import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true, // Trims any whitespace
    },
    email: {
      type: String,
      required: true,
      unique: true, // Ensures the email is unique
      lowercase: true, // Converts email to lowercase
      trim: true,
    },
    password: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const User = mongoose.model("User", userSchema);

export default User;
