import { Request, Response } from "express"
import { AppError, handleError } from "../../errors/AppError"
import deleteRatingService from "../../services/rating/deleteRating.service"

const deleteRatingController = async (req:Request,res:Response)=>{
    try {
        const {ratingId}= req.params
        
        const userId = req.user.id

        await deleteRatingService({ratingId,userId})

        res.status(204).json()

    } catch (error) {
        if(error instanceof AppError){
            handleError(error,res)
        }
    }

}

export default deleteRatingController