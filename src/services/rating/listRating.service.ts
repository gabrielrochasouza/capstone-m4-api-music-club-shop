import AppDataSource from "../../data-source"
import { Rating } from "../../entities/rating.entity"

const listRatingService = async()=>{
    const ratingRepository = AppDataSource.getRepository(Rating)

    const ratings = await ratingRepository.find()

    return ratings

}
export default listRatingService