import './RestaurantDetails.css';
import RestaurantInterface from '../../models/RestaurantInterface';
import { Map } from '../index';
import { useNavigate } from 'react-router-dom';

interface RestaurantDetailsPropsInterface {
    restaurant: RestaurantInterface,
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
        restaurant: {
            name,
            building,
            street,
            latitude,
            longitude,
            borough,
            cuisine,
            restaurantId,
        },
    } = props;

    const propsList: RestaurantInterface[] = [props.restaurant];

    const handleClick = () => {
        console.log(restaurantId);
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
            <Map
                restaurantsList={propsList}
                clickHandler={() => {handleClick()}}
                indicesList={indicesList}
            />
            {name}
            {building}
            {street}
            {borough}
            {cuisine}
        </article>
    );
};

export default RestaurantDetails;