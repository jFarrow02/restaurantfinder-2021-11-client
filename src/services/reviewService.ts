import { HttpUtilsService } from ".";
import ReviewInterface from "../models/ReviewInterface";
import config from '../config/env';

const { 
    API_URL,
    HTTP_METHODS,
    HEADERS_DEFAULT,
} = config;

const ReviewService = {

    async getReviewsByRestaurantId(restaurantId:string):Promise<ReviewInterface[]>{
        const reviews = await fetch(`${API_URL}/reviews/find/restaurantId/${restaurantId}`,
            {
                method: HTTP_METHODS.GET,
                headers: HEADERS_DEFAULT,
            }
        );
        return await HttpUtilsService.handleFetchResponse(reviews);
    },

    async createReview(review:ReviewInterface):Promise<ReviewInterface>{

        const created = await fetch(`${API_URL}/reviews/create`,
            {
                method: HTTP_METHODS.POST,
                headers: HEADERS_DEFAULT,
                body: JSON.stringify(review),
            }
        );
        return await HttpUtilsService.handleFetchResponse(created);
    } 
};

export default ReviewService;