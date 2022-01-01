import { useEffect } from 'react';
import './BoroughSelector.css';
import config from '../../config/env';
import RestaurantService from '../../services/restaurantService';
import { useNavigate } from 'react-router-dom';

interface BoroughSelectorPropsInterface {
    fetchRestaurantsByBorough: Function,
    unsetCurentRestaurantReviews: Function,
}

const BoroughSelector = (props: BoroughSelectorPropsInterface):JSX.Element => {

    const { BOROUGHS } = config;
    const {
        fetchRestaurantsByBorough,
        unsetCurentRestaurantReviews,
    } = props;

    useEffect(() => {
        unsetCurentRestaurantReviews([]);
    }, []);

    const navigate = useNavigate();

    const fetchRestaurants = async(borough: string) => {
        const searchParam = 'borough';
        try {
            const restaurants = await RestaurantService.findRestaurantsByBorough(borough);
            fetchRestaurantsByBorough(searchParam , borough, restaurants);
        } catch(err) {
            console.log(err);
            fetchRestaurantsByBorough(searchParam, borough, []);
        }
        navigate('/restaurants');
    };
    
    let boroughCards: {displayName: string, shortName: string }[] = [];
    
    for(let b in BOROUGHS) {
        boroughCards.push(BOROUGHS[b]); 
    }

    const cards = boroughCards.map((borough, idx) => {
        return (
            <button
                key={`boroughCard-${idx}`}
                value={borough.displayName}
                onClick={() => {fetchRestaurants(borough.displayName)}}
            >
                {borough.shortName}
            </button>
        );
    });
    

    return(
        <section className="BoroughSelector">
            {cards}
        </section>
    )
};

export default BoroughSelector;