import RestaurantInterface from '../../models/RestaurantInterface';
import './RestaurantCard.css';

interface RestaurantCardPropsInterface {
    restaurant: RestaurantInterface,
    currentRestaurantId: string,
    index: number,
    setCurrentRestaurantId: Function,
    setShowRestaurantDetails: Function,
}
const RestaurantCard = (props:RestaurantCardPropsInterface):JSX.Element => {

    const {
        restaurant,
        currentRestaurantId,
        index,
        setCurrentRestaurantId,
        setShowRestaurantDetails,
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
        setShowRestaurantDetails(restaurantId);
        setCurrentRestaurantId(restaurantId);
        window.localStorage.setItem('currentRestaurant', JSON.stringify(restaurant)); // TODO 2021/12/17 DOES THIS STILL NEED TO BE DONE?
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