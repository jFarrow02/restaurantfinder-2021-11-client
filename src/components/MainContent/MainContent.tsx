import { useState } from 'react';
import './MainContent.css';
import { BoroughSelector, AttributeSelector, RestaurantsList } from '..';

export default (): JSX.Element => {

    // const [ selectedSearchValue, setSelectedSearchValue ] = useState('');
    const [ fetchedRestaurants, setFetchedRestaurants ] = useState([]);
    const [ searchParam, setSearchParam ] = useState('');

    const fetchRestaurantsBySearchParam = (searchBy: string, searchValue: string, restaurants: any) => {
        setSearchParam(`${searchBy} = "${searchValue}"`);
        // setSelectedSearchValue(searchValue);
        setFetchedRestaurants(restaurants);
    };

    return (
        <section className="MainContent">
            <BoroughSelector
                fetchRestaurantsByBorough={fetchRestaurantsBySearchParam}
            />
            <div className="divider">OR</div>
            <AttributeSelector/>
            <RestaurantsList
                restaurantsList={fetchedRestaurants}
                searchParam={searchParam}
            />
        </section>
    )
}