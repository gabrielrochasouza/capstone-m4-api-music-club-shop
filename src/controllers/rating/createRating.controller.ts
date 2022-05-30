import { Request, Response } from "express";
import { AppError, handleError } from "../../errors/AppError";
import createRatingService from "../../services/rating/createRating.service";

const createRatingController = async (req: Request, res: Response) => {
  try {
    const { message, rating_score, productId } = req.body;

    const userId = req.user.id;

    const newRating = await createRatingService({
      message,
      rating_score,
      productId,
      userId,
    
    });

    res.status(201).json(newRating);
  } catch (error) {
    if (error instanceof AppError) {
      handleError(error, res);
    }
  }
};

export default createRatingController;
