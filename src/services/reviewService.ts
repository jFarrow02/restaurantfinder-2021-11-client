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
    },

    findMostRecentReviewIndexAndMostHelpfulIndex(reviews:ReviewInterface[]):any{
        let mostRecentDate = reviews[0].reviewDate;
        let mostRecentIndex = 0;
        let mostHelpfulIndex = 0;
        let mostUpvotes = reviews[0].upvotes;

        for(let i = 0; i < reviews.length; i++) {
            for(let j = 0; j < reviews.length; j++) {
                if(reviews[j].reviewDate > mostRecentDate) {
                    mostRecentDate = reviews[i].reviewDate;
                    mostRecentIndex = j;
                }
                if(reviews[j].upvotes > mostUpvotes) {
                    mostHelpfulIndex = j;
                    mostUpvotes = reviews[j].upvotes;
                }
            }
        }
        return {
            mostRecentIndex,
            mostHelpfulIndex,
        }
    }
};

export default ReviewService;