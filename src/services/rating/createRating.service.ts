import AppDataSource from "../../data-source"
import { Product } from "../../entities/product.entity"
import { Rating } from "../../entities/rating.entity"
import { User } from "../../entities/user.entity"
import { AppError } from "../../errors/AppError"

interface ICreateRatingService{
    message:string,
    rating_score:number,
    productId:string,
    userId:string
}

const createRatingService = async({message,rating_score,productId,userId}:ICreateRatingService)=>{

    const ratingRepository = AppDataSource.getRepository(Rating)
    const userRepository = AppDataSource.getRepository(User)
    const productRepository = AppDataSource.getRepository(Product)

    const product = await productRepository.findOne({where:{id:productId}})
    if(!product){
        throw new AppError(404,'Product not found')
    } 
    const user = await userRepository.findOne({where:{id:userId}})
    if(!user){
        throw new AppError(404,'User does not exist')
    }
    if(product.ratings.some(rate=>rate.user_id===userId)){
        throw new AppError(409,'You cannot rate a product more than once')
    }
    if(rating_score>5 && rating_score<0){
        throw new AppError(409,'Rating score must be between 0 and 5')
    }

    const newRating = ratingRepository.create({
        message,
        rating_score,
        user,
        product,
        name:user.name,
        user_id:userId
    })

    await ratingRepository.save(newRating)
    
    return newRating

}

export default createRatingService