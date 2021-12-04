import './RestaurantsList.css';
import RestaurantInterface from '../../models/RestaurantInterface';

interface RestaurantListProps {
    restaurantsList: RestaurantInterface[],
    searchParam: string,
    totalResultCount: number,
    currentStartIndex: number,
    currentEndIndex: number,
};

const RestaurantsList = (props:RestaurantListProps):JSX.Element => {
    const {
        currentEndIndex,
        currentStartIndex,
        totalResultCount,
    } = props;

    return(
        <section className="RestaurantsList">
            {
                totalResultCount > 0 ? <h3>Showing results # - # of {props.totalResultCount} for {props.searchParam}</h3> : ''
                // totalResultCount > 0 ? <h3>Showing results {currentStartIndex} - {currentEndIndex} of {props.totalResultCount} for {props.searchParam}</h3> : ''
            }
        </section>
    );
};

export default RestaurantsList;