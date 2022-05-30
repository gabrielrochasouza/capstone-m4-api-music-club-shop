import AppDataSource from "../../data-source"
import { Rating } from "../../entities/rating.entity"
import { User } from "../../entities/user.entity"
import { AppError } from "../../errors/AppError"

interface IDeleteRatingService{
    ratingId:string,
    userId:string
}

const deleteRatingService = async({ratingId,userId}:IDeleteRatingService)=>{
    const ratingRepository = AppDataSource.getRepository(Rating)
    const userRepository = AppDataSource.getRepository(User)

    const rating = await ratingRepository.findOne({where:{id:ratingId}})
    if(!rating){
        throw new AppError(404,'Rating not found')
    }
    if(rating.user_id!==userId){
        throw new AppError(409,'You cant delete another user rating')
    }
    await ratingRepository.delete({id:ratingId})


}

export default deleteRatingService