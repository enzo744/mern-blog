import Psw from "../models/psw.model.js";
import { errorHandler } from "../utils/error.js";

export const create = async (req, res, next) => {
  if (!req.user.isAdmin) {
    return next(
      errorHandler(403, "Non sei autorizzato a creare la pagina Psw")
    );
  }
  if (!req.body.title) {
    return next(errorHandler(400, "Il campo Titolo e' obbligatorio"));
  }

  const slug = req.body.title
    .split(" ")
    .join("-")
    .toLowerCase()
    .replace(/[^a-zA-Z0-9-]/g, "");

  const newPsw = new Psw({
    ...req.body,
    slug,
    userId: req.user.id,
  });

  try {
    const savedPsw = await newPsw.save();
    res.status(201).json(savedPsw);
  } catch (error) {
    next(error);
  }
};
