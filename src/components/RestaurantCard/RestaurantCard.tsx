import RestaurantInterface from '../../models/RestaurantInterface';
import './RestaurantCard.css';

interface RestaurantCardPropsInterface {
    restaurant: RestaurantInterface,
    currentRestaurantId: string,
    index: number,
    setCurrentRestaurantId: Function,
}
const RestaurantCard = (props:RestaurantCardPropsInterface):JSX.Element => {

    const {
        restaurant,
        currentRestaurantId,
        index,
        setCurrentRestaurantId,
    } = props;

    const {
        borough,
        cuisine,
        street,
        building,
        latitude,
        longitude,
        name,
        restaurantId
    } = restaurant;

    const handleClick = () => {
        setCurrentRestaurantId(restaurantId);
    };

    return (
        <div 
            className={currentRestaurantId === restaurantId ? 'RestaurantCard current' : 'RestaurantCard'}
            onClick={() => {handleClick()}}
        >
            <h5>{`${index}: ${name}`}</h5>
            <p>{cuisine}</p>
            <p>{borough}</p>
        </div>
    );
};

export default RestaurantCard;