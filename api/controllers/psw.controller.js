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

export const getPsws = async (req, res, next) => {
  try {
    const startIndex = parseInt(req.query.startIndex) || 0;
    const limit = parseInt(req.query.limit) || 9;
    const sortDirection = req.query.order === "asc" ? 1 : -1;
    const psws = await Psw.find({
      ...(req.query.userId && { userId: req.query.userId }),
      ...(req.query.category && { category: req.query.category }),
      ...(req.query.title && { title: req.query.title }),
      ...(req.query.slug && { slug: req.query.slug }),
      ...(req.query.pswId && { _id: req.query.pswId }),
      ...(req.query.searchTerm && {
        $or: [
          { title: { $regex: req.query.searchTerm, $options: "i" } },
          { commento: { $regex: req.query.searchTerm, $options: "i" } },
        ],
      }),
    })
      .sort({ updatedAt: sortDirection })
      .skip(startIndex)
      .limit(limit);

      const totalPsws=await Psw.countDocuments();
      const now=new Date();

      const oneMonthAgo = new Date(
        now.getFullYear(),
        now.getMonth() - 1,
        now.getDate()
      );

      const lastMonthPsws = await Psw.countDocuments({
        createdAt: { $gte: oneMonthAgo },
      });
      res.status(200).json({
        psws,
        totalPsws,
        lastMonthPsws,
      });
  } catch (error) {
    next(error);
  }
};

export const deletepsw =async (req,res,next)=>{
  if (!req.user.isAdmin || req.user.id !== req.params.userId) {
    return next(errorHandler(403, "You are not allowed to delete this psw"));
  }
  try {
    await Psw.findByIdAndDelete(req.params.pswId);
    res.status(200).json("The psw has been deleted");
  } catch (error) {
    next(error);
  }
}