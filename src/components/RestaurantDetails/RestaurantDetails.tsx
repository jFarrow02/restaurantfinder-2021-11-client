import { useState, useEffect } from 'react';
import './RestaurantDetails.css';
import RestaurantInterface from '../../models/RestaurantInterface';
import { Map, ReviewsList } from '../index';
import { useNavigate } from 'react-router-dom';
import { DirectionsRequestInterface } from '../../models/DirectionsRequestInterface';
import ReviewInterface from '../../models/ReviewInterface';
import { ReviewService } from '../../services';

interface RestaurantDetailsPropsInterface {
    indicesList?: number[],
    setRestaurantReviews: Function,
    reviews: ReviewInterface[],
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
    phone: '',
};

const initialDirectionsRequest:DirectionsRequestInterface = {
    origin: { latitude: 0, longitude: 0},
    destination: { latitude: 0, longitude: 0},
    travelMode: '',
}
const travelModes = [
    'DRIVING',
    'TRANSIT',
    'BICYCLING',
    'WALKING',
];

const RestaurantDetails = (props: RestaurantDetailsPropsInterface, state: RestaurantDetailsStateInterface):JSX.Element => {
    const navigate = useNavigate();

    const [ currentRestaurant, setCurrentRestaurant ] = useState(initialRestaurant);
    const [ currentDirectionsRequest, setCurrentDirectionsRequest ] = useState(initialDirectionsRequest);
    const [ showErrorHandling, setShowErrorHandling ] = useState(false);

    const {
        indicesList,
        setRestaurantReviews,
    } = props;

    const fetchReviewsForCurrentRestaurant = async (restaurantId: string) => {
        try{
            const reviews = await ReviewService.getReviewsByRestaurantId(restaurantId);
            setRestaurantReviews(reviews);
        } catch(err) {
            console.log(err);
            setShowErrorHandling(true);
        }
        
    };

    useEffect(() => {
        const restaurant = window.localStorage.getItem('currentRestaurant');
        if(restaurant){
            setCurrentRestaurant(JSON.parse(restaurant));
        }
       
        //@ts-ignore
        fetchReviewsForCurrentRestaurant(JSON.parse(restaurant).restaurantId);
    }, []);

    const restaurantsList: RestaurantInterface[] | null = currentRestaurant ? [currentRestaurant] : null;

    const handleClick = () => {
    };

    const returnToRestaurantResults = () => {
        window.localStorage.removeItem('currentRestaurant');
        navigate('/restaurants');
    };

    const fakeRequest = {
        origin: { latitude: 41.850033, longitude: -87.6500523 },
        destination: { latitude: currentRestaurant.latitude, longitude: currentRestaurant.longitude },
        travelMode: travelModes[0],
    }

    return !showErrorHandling ? (
        <article className='RestaurantDetails'>
            <section className='details-container'>
                <h2 className='details-header'>{currentRestaurant.name}</h2>
                <h3 className='details-address'>{currentRestaurant.building} {currentRestaurant.street}</h3>
                <p>{currentRestaurant.borough}, NY {currentRestaurant.zipcode}</p>
                <p>Phone: {currentRestaurant.phone}</p>
                <p>Cuisine: {currentRestaurant.cuisine}</p>
                <div className='details-avg-grade'>Average Grade:</div>
                <button
                    onClick={() => {returnToRestaurantResults()}}
                > 
                    &lt; &lt; Back To Restaurants List
                </button>
            </section>
            <section className='map-container'>
                {
                    currentRestaurant.restaurantId !== '' && (
                        <>
                            <h3>Map</h3>
                            {

                                    travelModes.map((mode, idx) => {
                                        return(
                                            <button
                                                key={`travel-mode-${idx}`}
                                                onClick={() => {setCurrentDirectionsRequest(fakeRequest)}}
                                            >
                                                {mode}
                                            </button>
                                        );
                                    })
                                
                            }
                            <Map
                                // @ts-ignore
                                restaurantsList={restaurantsList}
                                clickHandler={() => {handleClick()}}
                                indicesList={indicesList}
                                request={currentDirectionsRequest}
                            />
                        </>
                    )
                }
                {
                    currentRestaurant.restaurantId === '' && (
                        <div>No restaurant found</div>
                    )
                }
            </section>
            <section className='details-reviews'>
                <h3>Reviews</h3>
                <ReviewsList currentRestaurant={currentRestaurant}/>
            </section>
        </article>
    ) : (
        <div>Error</div>
    );
};

export default RestaurantDetails;