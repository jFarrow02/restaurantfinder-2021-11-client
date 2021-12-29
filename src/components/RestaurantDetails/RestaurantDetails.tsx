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
            <button
                onClick={() => {returnToRestaurantResults();}}
            > 
                &lt; &lt; Back To Restaurants List
            </button>
            {
                currentRestaurant.restaurantId !== '' && (
                    <>
                        <Map
                            // @ts-ignore
                            restaurantsList={restaurantsList}
                            clickHandler={() => {handleClick()}}
                            indicesList={indicesList}
                        />
                        {currentRestaurant.name}
                        {currentRestaurant.building}
                        {currentRestaurant.street}
                        {currentRestaurant.borough}
                        {currentRestaurant.cuisine}
                    </>
                )
            }
            {
                currentRestaurant.restaurantId === '' && (
                    <div>No restaurant found</div>
                )
            }
        </article>
    );
};

export default RestaurantDetails;