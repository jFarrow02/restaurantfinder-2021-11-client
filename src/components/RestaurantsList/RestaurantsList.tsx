import { useState } from 'react';
import './RestaurantsList.css';
import RestaurantInterface from '../../models/RestaurantInterface';

interface RestaurantListProps {
    restaurantsList: RestaurantInterface[],
    searchParam: string,
    totalResultCount: number,
};

const RestaurantsList = (props:RestaurantListProps):JSX.Element => {
    const [ searchResultsMessage, setSearchResultsMessage ] = useState('');

    return(
        <section className="RestaurantsList">
            <h3>Showing results # - # of {props.totalResultCount} for {props.searchParam}</h3>
        </section>
    );
};

export default RestaurantsList;