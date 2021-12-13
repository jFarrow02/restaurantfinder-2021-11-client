import './RestaurantsList.css';
import RestaurantInterface from '../../models/RestaurantInterface';
import { RestaurantCard } from '../index';

interface RestaurantListProps {
    restaurantsList: RestaurantInterface[],
    // searchParam: string,
    // totalResultCount: number,
    // currentStartIndex: number,
    // currentEndIndex: number,
};

const RestaurantsList = (props:RestaurantListProps):JSX.Element => {
    const {
        // currentEndIndex,
        // currentStartIndex,
        // totalResultCount,
        restaurantsList
    } = props;

    return(
        <section className="RestaurantsList">
           {
               restaurantsList.map((r, idx) => {
                   return (
                       <RestaurantCard key={`restaurant-card-${idx}`} restaurant={r}/>
                   )
               })
           }
        </section>
    );
};

export default RestaurantsList;