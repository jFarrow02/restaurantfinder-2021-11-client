import { useState, useEffect } from 'react';
import './RestaurantDetails.css';
import RestaurantInterface from '../../models/RestaurantInterface';
import { Map } from '../index';
import { useNavigate } from 'react-router-dom';
import { DirectionsRequestInterface } from '../../models/DirectionsRequestInterface';
import { GoogleMapsLoaderService } from '../../services/googleMapsLoaderService';

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

const travelModes = [
    'DRIVING',
    'TRANSIT',
    'BICYCLING',
    'WALKING',
];

const RestaurantDetails = (props: RestaurantDetailsPropsInterface, state: RestaurantDetailsStateInterface):JSX.Element => {
    const navigate = useNavigate();

    const [ currentRestaurant, setCurrentRestaurant ] = useState(initialRestaurant);
    const [ currentRestaurantReviews, setCurrentRestaurantReviews ] = useState([]);

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

    const getDirectionsForTravelMode = async (mode:string) => {
        const google = await GoogleMapsLoaderService.getLoader()
    
        const directionsService = new google.maps.DirectionsService();
        const request:DirectionsRequestInterface = {
            origin: 'Chicago, IL',
            destination: new google.maps.LatLng(currentRestaurant.latitude, currentRestaurant.longitude),
            travelMode: 'DRIVING',
        };
        directionsService.route(request, (result:any, status:any) => {
            console.log(result);
            console.log(status);
        });
    };

    const reviews = currentRestaurantReviews.length > 0 ? currentRestaurantReviews.map((review, idx) => <div key={`review-${idx}`}>Review {idx}</div>)
        : (
            <div>No reviews yet</div>
        )
    return (
        <article className='RestaurantDetails'>
            <section className='map-container'>
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
            </section>
            <section className='details-container'>
                <h2 className='details-header'>{currentRestaurant.name}</h2>
                <h3 className='details-address'>{currentRestaurant.building} {currentRestaurant.street}</h3>
                <p>{currentRestaurant.borough}, NY</p>
                <p>Cuisine: {currentRestaurant.cuisine}</p>
                <div className='details-avg-grade'>Average Grade:</div>
                <div className='details-reviews'>
                    <p>Reviews: </p>
                    {reviews}
                </div>
                <section className='details-directions'>
                    <h4>Get Directions</h4>
                    {
                        
                            travelModes.map((mode, idx) => {
                                return(
                                    <button
                                        key={`travel-mode-${idx}`}
                                        onClick={() => {getDirectionsForTravelMode(mode)}}
                                    >
                                        {mode}
                                    </button>
                                );
                            })
                        
                    }
                </section>
                <button
                    onClick={() => {returnToRestaurantResults();}}
                > 
                    &lt; &lt; Back To Restaurants List
                </button>
            </section>
        </article>
    );
};

export default RestaurantDetails;