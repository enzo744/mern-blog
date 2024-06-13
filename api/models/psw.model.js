import mongoose from "mongoose";

const pswSchema = new mongoose.Schema(
  {
    userId: {
      type: String,
      required: true,
    },
    title: {
      type: String,
      required: true,
      unique: true,
    },
    email: {
      type: String,
    },
    password: {
      type: String,
    },
    commento: {
      type: String,
    },
    category: {
      type: String,
      default: "Nessuna categoria",
    },
    slug: {
      type: String,
      required: true,
      unique: true,
    },
  },
  { timestamps: true }
);

const Psw = mongoose.model("Psw", pswSchema);

export default Psw;
