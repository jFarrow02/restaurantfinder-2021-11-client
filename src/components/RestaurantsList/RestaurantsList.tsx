import './RestaurantsList.css';
import RestaurantInterface from '../../models/RestaurantInterface';
import { RestaurantCard, Map } from '../index';

interface RestaurantListProps {
    restaurantsList: RestaurantInterface[],
};

const RestaurantsList = (props:RestaurantListProps):JSX.Element => {
    const {
        restaurantsList
    } = props;

    return(
        <section className="RestaurantsList">
            <div className='map'>
                <Map
                    restaurantsList={restaurantsList}
                />
            </div>
            <div className='restaurants'>
                {
                    restaurantsList.map((r, idx) => {
                        return (
                            <RestaurantCard key={`restaurant-card-${idx}`} restaurant={r}/>
                        );
                    })
                }
            </div>
        </section>
    );
};

export default RestaurantsList;