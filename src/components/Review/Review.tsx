import './Review.css';
import ReviewInterface from '../../models/ReviewInterface';


interface ReviewPropsInterface {
    review: ReviewInterface
}

const Review = (props:ReviewPropsInterface) => {

    const {
        review: {
            reviewId,
            reviewDate,
            gradeId,
            reviewText,
            reviewer,
            upvotes,
        }
    } = props;

    const r = props.review;

    const reviewCalendarDate = new Date(reviewDate);
    const date = reviewCalendarDate.getUTCDate();
    const month = reviewCalendarDate.getUTCMonth() > 8 ? reviewCalendarDate.getUTCMonth() + 1 : `0${reviewCalendarDate.getUTCMonth() + 1}`;
    const year = reviewCalendarDate.getUTCFullYear();

    return r ?(
        <div className='Review'>
            <p>{reviewText}</p>
            <p>{`${month}/${date}/${year} by ${reviewer}`}</p>
            <p>{`${upvotes} foodies found this review helpful`}</p>
        </div>
    ) : (<div>No review found</div>);
};

export default Review;