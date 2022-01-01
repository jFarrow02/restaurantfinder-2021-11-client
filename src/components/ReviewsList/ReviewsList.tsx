import { useState, useEffect } from 'react';
import './ReviewsList.css';
import ReviewInterface from '../../models/ReviewInterface';
import RestaurantInterface from '../../models/RestaurantInterface';
import { Review } from '../index';
import { ReviewService } from '../../services';

interface ReviewsListPropsInterface {
    currentRestaurant: RestaurantInterface;
}

const ReviewsList = (props:ReviewsListPropsInterface) => {

    const { 
        currentRestaurant
    } = props;

    const [ reviewList, setReviewList ] = useState<ReviewInterface[]>([]);
    const [ mostRecentIdx, setMostRecentIdx ] = useState(0);
    const [ mostHelpfulIdx, setMostHelpfulIdx ] = useState(0);

    const fetchReviewsForRestaurant = async () => {
        const id = currentRestaurant.restaurantId || '0';
        const reviews = await ReviewService.getReviewsByRestaurantId(id);
        if(reviews[0]) {
            const {
                mostRecentIndex,
                mostHelpfulIndex,
            } = ReviewService.findMostRecentReviewIndexAndMostHelpfulIndex(reviews);
            setReviewList(reviews);
            setMostRecentIdx(mostRecentIndex);
            setMostHelpfulIdx(mostHelpfulIndex);
        }
    };

    useEffect(() => {
        fetchReviewsForRestaurant();
    }, [currentRestaurant])
    

    const reviewCards = reviewList.map((review, idx) => {
        return (
            <Review review={review} key={`review-${idx}`}/>
        );
    });

    return (
        <article className='ReviewsList'>
            <div className='notable-reviews-container'>
                <section className='review-most-recent'>
                    <h4>Most Recent Review:</h4>
                    {reviewList[mostRecentIdx] && <Review review={reviewList[mostRecentIdx]}/>}
                </section>
                <section className='review-most-helpful'>
                <h4>Most Helpful Review:</h4>
                    {reviewList[mostHelpfulIdx] && <Review review={reviewList[mostHelpfulIdx]}/>}
                </section>
            </div>
            <p>{reviewList.length} total reviews. <a href='/'>See all reviews</a></p> 
            <div className='reviews-container'>
                {reviewCards}
            </div>
        </article>
    );
};

export default ReviewsList;