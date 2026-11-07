import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    emailVerified: {
      type: Boolean,
      default: false,
    },
    image: {
      type: String,
      default: null,
    },
    role: {
      type: String,
      enum: ["admin", "groupleader", "user"],
      default: "user",
    },
    plan: {
      type: String,
      default: "free",
    },
  },
  {
    timestamps: true,
    collection: "user", // Better Auth uses 'user' collection
  }
);

const User = mongoose.model("User", userSchema);

export default User;

