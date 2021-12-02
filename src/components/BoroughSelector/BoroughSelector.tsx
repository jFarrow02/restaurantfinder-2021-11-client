import { ReactElement } from 'react';
import './BoroughSelector.css';
import config from '../../config/env';
import RestaurantService from '../../services/restaurantService';

const BoroughSelector = (props: any):ReactElement => {

    const { BOROUGHS } = config;

    const fetchRestaurants = async(borough: string) => {
        const restaurants = await RestaurantService.findRestaurantsByBorough(borough);
        // console.log(restaurants);
        props.fetchRestaurantsByBorough(borough, restaurants);
    }
    
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
                // onClick={() => { props.fetchRestaurantsByBorough(borough.displayName); }}
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