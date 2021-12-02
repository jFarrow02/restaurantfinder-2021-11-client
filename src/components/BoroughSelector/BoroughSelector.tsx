import './BoroughSelector.css';
import config from '../../config/env';
import RestaurantService from '../../services/restaurantService';

const BoroughSelector = (props: any):JSX.Element => {

    const { BOROUGHS } = config;

    const fetchRestaurants = async(borough: string) => {
        const restaurants = await RestaurantService.findRestaurantsByBorough(borough);
        props.fetchRestaurantsByBorough('borough', borough, restaurants);
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