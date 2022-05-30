import { Request, Response } from "express"
import { AppError, handleError } from "../../errors/AppError"
import updateRatingService from "../../services/rating/updateRating.service"

const updateRatingController = async (req:Request,res:Response)=>{
    try {
        const {ratingId} = req.params
        const {message,rating_score} = req.body

        const userId= req.user.id

        const updatedRating = await updateRatingService({ratingId,message,rating_score,userId})        

        res.json(updatedRating)

    } catch (error) {
        if(error instanceof AppError){
            handleError(error,res)
        }
    }

}

export default updateRatingController