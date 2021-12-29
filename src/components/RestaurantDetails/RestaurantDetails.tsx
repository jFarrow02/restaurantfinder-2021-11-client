import { useState, useEffect } from 'react';
import './RestaurantDetails.css';
import RestaurantInterface from '../../models/RestaurantInterface';
import { Map } from '../index';
import { useNavigate } from 'react-router-dom';

interface RestaurantDetailsPropsInterface {
    indicesList?: number[],
}

interface RestaurantDetailsStateInterface {
    restaurant: RestaurantInterface | null,
}

const initialRestaurant: RestaurantInterface = {
    name: '',
    building: '',
    street: '',
    zipcode: '',
    latitude: 0,
    longitude: 0,
    cuisine: '',
    restaurantId: '',
    borough: '',
};

const RestaurantDetails = (props: RestaurantDetailsPropsInterface, state: RestaurantDetailsStateInterface):JSX.Element => {
    const navigate = useNavigate();

    const [ currentRestaurant, setCurrentRestaurant ] = useState(initialRestaurant);

    useEffect(() => {
        const restaurant = window.localStorage.getItem('currentRestaurant');
        if(restaurant){
            setCurrentRestaurant(JSON.parse(restaurant));
        }
    }, []);

    const {
        indicesList,
    } = props;

    const restaurantsList: RestaurantInterface[] | null = currentRestaurant ? [currentRestaurant] : null;

    const handleClick = () => {
    };

    const returnToRestaurantResults = () => {
        window.localStorage.removeItem('currentRestaurant');
        navigate('/restaurants');
    };

    return (
        <article className='RestaurantDetails'>
            <div className='map-container'>
                {
                    currentRestaurant.restaurantId !== '' && (
                        <Map
                            // @ts-ignore
                            restaurantsList={restaurantsList}
                            clickHandler={() => {handleClick()}}
                            indicesList={indicesList}
                        />
                    )
                }
                {
                    currentRestaurant.restaurantId === '' && (
                        <div>No restaurant found</div>
                    )
                }
            </div>
            <div className='details-container'>
                <h2 className='details-container-header'>{currentRestaurant.name}</h2>
                <h3 className='details-container-address'>{currentRestaurant.building} {currentRestaurant.street}</h3>
                <i>{currentRestaurant.borough}, NY</i>
                <p>Cuisine: {currentRestaurant.cuisine}</p>
                <button
                    onClick={() => {returnToRestaurantResults();}}
                > 
                    &lt; &lt; Back To Restaurants List
                </button>
            </div>
        </article>
    );
};

export default RestaurantDetails;