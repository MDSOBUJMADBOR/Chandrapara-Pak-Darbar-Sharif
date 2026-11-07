import mongoose from "mongoose";

const anserSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "আনসারের নাম আবশ্যক"],
      trim: true,
    },
    mobile: {
      type: String,
      trim: true,
      default: "",
    },
    badgeNo: {
      type: String,
      required: [true, "ব্যাজ নং আবশ্যক"],
      trim: true,
    },
    badgeType: {
      type: String,
      default: "লাল",
      trim: true,
    },
    idNo: {
      type: String,
      trim: true,
      default: "",
    },
    codeNo: {
      type: String,
      trim: true,
      default: "",
    },
    fatherName: {
      type: String,
      trim: true,
      default: "",
    },
    motherName: {
      type: String,
      trim: true,
      default: "",
    },
    // যে ইউজার / গ্রুপ লিডার এন্ট্রি করেছেন তার তথ্য
    addedByName: {
      type: String,
      trim: true,
      default: "",
    },
    addedByEmail: {
      type: String,
      trim: true,
      default: "",
    },
  },
  {
    timestamps: true,
    collection: "anser", // collection name explicitly set to 'anser'
  }
);

const Anser = mongoose.model("Anser", anserSchema);

export default Anser;
