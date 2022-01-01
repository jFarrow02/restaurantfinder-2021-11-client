import './ReviewsList.css';
import ReviewInterface from '../../models/ReviewInterface';


interface ReviewsListPropsInterface {
    reviews: ReviewInterface[],
}

const ReviewsList = (props:ReviewsListPropsInterface) => {

    return (
        <article className='ReviewsList'>

        </article>
    )
};

export default ReviewsList;