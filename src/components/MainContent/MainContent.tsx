import { useState } from 'react';
import './MainContent.css';
import { BoroughSelector, AttributeSelector, RestaurantsList, Pagination } from '..';
import RestaurantInterface from '../../models/RestaurantInterface';

const MainContent = (): JSX.Element => {
    const [ fetchedRestaurants, setFetchedRestaurants ] = useState([]);
    const [ paginatedRestaurants, setPaginatedRestaurants ] = useState([]);
    const [ searchParam, setSearchParam ] = useState('');
    const [ searchValue, setSearchValue ] = useState('');
    const [ currentPage, setCurrentPage ] = useState('a');
    const [ totalResultCount, setTotalResultCount ] = useState(0);

    const fetchRestaurantsBySearchParam = (searchBy: string, searchValue: string, restaurants: any) => {
        setSearchValue(searchValue);
        setSearchParam(`${searchBy} = "${searchValue}"`);
        setFetchedRestaurants(restaurants);
        setPaginatedRestaurants(restaurants.filter((r:RestaurantInterface) => {
            return r.name.substring(0, 1).toLowerCase() === currentPage;
        }));
        setTotalResultCount(restaurants.length);

    };

    const filterRestaurantsByCurrentPage = (currentPage:string):void => {
        setCurrentPage(currentPage);
        const paginatedRestaurants = fetchedRestaurants.filter((r:RestaurantInterface) => {
            return r.name.substring(0, 1).toLowerCase() === currentPage;
        });
        setPaginatedRestaurants(paginatedRestaurants);
    };
    
    return (
        <section className="MainContent">
            Current Page: {currentPage} Total Result Count: {totalResultCount}
            <BoroughSelector
                fetchRestaurantsByBorough={fetchRestaurantsBySearchParam}
            />
            <div className="divider">OR</div>
            <AttributeSelector/>
            <Pagination
                paginateRestaurants={filterRestaurantsByCurrentPage}
            />
            <RestaurantsList
                restaurantsList={paginatedRestaurants}
                searchParam={searchParam}
                totalResultCount={totalResultCount}
            />
        </section>
    )
};

export default MainContent;