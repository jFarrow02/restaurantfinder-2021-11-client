import RestaurantInterface from '../../models/RestaurantInterface';
import './RestaurantCard.css';

interface RestaurantCardPropsInterface {
    restaurant: RestaurantInterface,
}
const RestaurantCard = (props:RestaurantCardPropsInterface):JSX.Element => {

    const {
        borough,
        cuisine,
        street,
        building,
        latitude,
        longitude,
        name
    } = props.restaurant
    return (
        <div className="RestaurantCard">
            <h5>{name}</h5>
            <p>{cuisine}</p>
            <p>{borough}</p>
        </div>
    );
};

export default RestaurantCard;