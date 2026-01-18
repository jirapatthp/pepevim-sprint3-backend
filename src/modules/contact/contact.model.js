import mongoose from "mongoose";

const contactSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
      trim: true,
      minlength: 2,
    },
    lastName: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      lowercase: true,
      trim: true,
      maxlength: 254,
      match: [/^\S+@\S+\.\S+$/, "Invalid email format"],
    },
    message: {
      type: String,
      required: true,
      trim: true,
      minlength: 2,
      maxlength: 254,
    },
  },
  { timestamps: true }
);

export const Contact = mongoose.model("Contact", contactSchema);
