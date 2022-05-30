import AppDataSource from "../../data-source"
import { Rating } from "../../entities/rating.entity"
import { User } from "../../entities/user.entity"
import { AppError } from "../../errors/AppError"

interface IUpdateRatingService{
    ratingId:string,
    userId:string,
    message:string,
    rating_score:number
}

const updateRatingService = async({ratingId,userId,message,rating_score}:IUpdateRatingService)=>{
    const ratingRepository = AppDataSource.getRepository(Rating)

    const rating = await ratingRepository.findOne({where:{id:ratingId}})
    if(!rating){
        throw new AppError(404,'Rating not found')
    }
    if(rating.user_id!==userId){
        throw new AppError(409,'You cant update another user rating')
    }
    if(rating_score>5 && rating_score<0){
        throw new AppError(409,'Rating score must be between 0 and 5')
    }
    message ? rating.message=message : rating.message
    rating_score ? rating.rating_score=rating_score : rating.rating_score
    
    const updatedRating = await ratingRepository.save(rating)

    return updatedRating

}

export default updateRatingService