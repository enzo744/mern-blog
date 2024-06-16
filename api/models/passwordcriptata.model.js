import mongoose from "mongoose";

const passwordcriptataSchema = new mongoose.Schema(
  {
    password: {
      type: String,
    },
  },
  { timestamps: true }
);

const PasswordCriptata = mongoose.model(
  "PasswordCriptata",
  passwordcriptataSchema
);

export default PasswordCriptata;
