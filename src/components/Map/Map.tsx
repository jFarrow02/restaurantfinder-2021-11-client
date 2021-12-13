import './Map.css';
import RestaurantInterface from '../../models/RestaurantInterface';

interface MapPropsInterface {
    restaurantsList: RestaurantInterface[],
}

const Map = (props: MapPropsInterface):JSX.Element => {

    return (
        <section className='Map'>
            MAP
        </section>
    );
};

export default Map;