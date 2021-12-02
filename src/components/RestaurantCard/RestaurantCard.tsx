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
        <section className="RestaurantCard">
            
        </section>
    );
};

export default RestaurantCard;