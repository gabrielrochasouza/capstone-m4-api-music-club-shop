import { Request, Response } from "express"
import { AppError, handleError } from "../../errors/AppError"
import listRatingService from "../../services/rating/listRating.service"

const listRatingController = async (req:Request,res:Response)=>{
    try {
        const ratings = await listRatingService()

        res.json(ratings)

    } catch (error) {
        if(error instanceof AppError){
            handleError(error,res)
        }
    }

}

export default listRatingController