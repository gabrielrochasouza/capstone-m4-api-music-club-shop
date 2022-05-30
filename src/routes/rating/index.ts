import { Router } from "express";
import createRatingController from "../../controllers/rating/createRating.controller";
import listRatingController from "../../controllers/rating/listRating.controller";
import updateRatingController from "../../controllers/rating/updateRating.controller";
import deleteRatingController from "../../controllers/rating/deleteRating.controller";
import authTokenMiddleware from "../../middlewares/authToken.middleware";

const routerRating = Router();

routerRating.get("", authTokenMiddleware, listRatingController);
routerRating.post("", authTokenMiddleware, createRatingController);

routerRating.patch("/:ratingId", authTokenMiddleware, updateRatingController);
routerRating.delete("/:ratingId", authTokenMiddleware, deleteRatingController);

export default routerRating;
