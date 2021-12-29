import './RestaurantDetails.css';
import RestaurantInterface from '../../models/RestaurantInterface';
import { Map } from '../index';
import { useNavigate } from 'react-router-dom';

interface RestaurantDetailsPropsInterface {
    restaurant: RestaurantInterface | null,
    setCurrentRestaurantId: Function,
    setShowRestaurantDetails: Function,
    indicesList?: number[],
}

const RestaurantDetails = (props:RestaurantDetailsPropsInterface):JSX.Element => {
    const navigate = useNavigate();

    const {
        setCurrentRestaurantId,
        setShowRestaurantDetails,
        indicesList,
        restaurant,
    } = props;

    let name, building, street, latitude, longitude, borough, cuisine, restaurantId;

    if(props.restaurant) {
        const { restaurant } = props;
        name = restaurant.name;
        building = restaurant.building;
        street = restaurant.street;
        latitude = restaurant.latitude;
        longitude = restaurant.longitude;
        borough = restaurant.borough;
        cuisine = restaurant.cuisine;
        restaurantId = restaurant.restaurantId;
    }

    const propsList: RestaurantInterface[] | null = props.restaurant ? [props.restaurant] : null;

    const handleClick = () => {
        // console.log(restaurantId);
    };

    const returnToRestaurantResults = () => {
        setCurrentRestaurantId('');
        setShowRestaurantDetails(false);
        navigate('/restaurants');
    };

    return (
        <article className='RestaurantDetails'>
            <button
                onClick={() => {returnToRestaurantResults();}}
            > 
                &lt; &lt; Back To Restaurants List
            </button>
            {
                restaurant && (
                    <>
                        <Map
                            // @ts-ignore
                            restaurantsList={propsList}
                            clickHandler={() => {handleClick()}}
                            indicesList={indicesList}
                        />
                        {name}
                        {building}
                        {street}
                        {borough}
                        {cuisine}
                    </>
                )
            }
            {
                !restaurant && (
                    <div>No restaurant found</div>
                )
            }
        </article>
    );
};

export default RestaurantDetails;