import { useState, useEffect } from 'react';
import './RestaurantDetails.css';
import RestaurantInterface from '../../models/RestaurantInterface';
import { Map } from '../index';
import { useNavigate } from 'react-router-dom';
import { DirectionsRequestInterface } from '../../models/DirectionsRequestInterface';
import { ReviewService } from '../../services';

interface RestaurantDetailsPropsInterface {
    indicesList?: number[],
    setRestaurantReviews: Function,
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
    const [ currentRestaurantReviews, setCurrentRestaurantReviews ] = useState([]);
    const [ currentDirectionsRequest, setCurrentDirectionsRequest ] = useState(initialDirectionsRequest);
    const [ showErrorHandling, setShowErrorHandling ] = useState(false);

    const fetchReviewsForCurrentRestaurant = async (restaurantId: string) => {
        try{
            const reviews = await ReviewService.getReviewsByRestaurantId(restaurantId);
            setRestaurantReviews(reviews);
        } catch(err) {
            console.log(err);
            setShowErrorHandling(true);
        }
        
    };

    const {
        indicesList,
        setRestaurantReviews,
    } = props;

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
        window.localStorage.removeItem('currentRestaurantReviews');
        setCurrentRestaurantReviews([]);
        navigate('/restaurants');
    };

    const fakeRequest = {
        origin: { latitude: 41.850033, longitude: -87.6500523 },
        destination: { latitude: currentRestaurant.latitude, longitude: currentRestaurant.longitude },
        travelMode: travelModes[0],
    }

    const reviews = currentRestaurantReviews.length > 0 ? currentRestaurantReviews.map((review, idx) => <div key={`review-${idx}`}>Review {idx}</div>)
        : (
            <div>No reviews yet</div>
        )
    return !showErrorHandling ? (
        <article className='RestaurantDetails'>
            <section className='map-container'>
                {
                    currentRestaurant.restaurantId !== '' && (
                        <Map
                            // @ts-ignore
                            restaurantsList={restaurantsList}
                            clickHandler={() => {handleClick()}}
                            indicesList={indicesList}
                            request={currentDirectionsRequest}
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
                <p>{currentRestaurant.borough}, NY {currentRestaurant.zipcode}</p>
                <p>Cuisine: {currentRestaurant.cuisine}</p>
                <div className='details-avg-grade'>Average Grade:</div>
                <div className='details-reviews'>
                    <p>Reviews:</p> 
                    {reviews}
                </div>
                <section className='details-directions'>
                    <h4>Get Directions</h4>
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
                </section>
                <button
                    onClick={() => {returnToRestaurantResults()}}
                > 
                    &lt; &lt; Back To Restaurants List
                </button>
            </section>
        </article>
    ) : (
        <div>Error</div>
    );
};

export default RestaurantDetails;