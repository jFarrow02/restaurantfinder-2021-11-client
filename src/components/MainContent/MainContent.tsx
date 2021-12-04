import { useState } from 'react';
import './MainContent.css';
import { BoroughSelector, AttributeSelector, RestaurantsList, Pagination } from '..';
import RestaurantInterface from '../../models/RestaurantInterface';
import config from '../../config/env';

const { ALPHABET } = config;

const MainContent = (): JSX.Element => {
    let r: RestaurantInterface[] = [];

    const [ fetchedRestaurants, setFetchedRestaurants ] = useState(r);
    const [ paginatedRestaurants, setPaginatedRestaurants ] = useState(r);
    const [ searchParam, setSearchParam ] = useState('');
    const [ currentPage, setCurrentPage ] = useState('a');
    const [ currentStartIndex, setCurrentStartIndex ] = useState(0);
    const [ currentEndIndex, setCurrentEndIndex ] = useState(0);
    const [ totalResultCount, setTotalResultCount ] = useState(0);

    const fetchRestaurantsBySearchParam = (searchBy: string, searchValue: string, restaurants: any) => {
        const specialCharNames:RestaurantInterface[] = restaurants.filter((r:RestaurantInterface) => {
            return ALPHABET.indexOf(r.name.substring(0, 1).toLowerCase()) === -1; 
        }).sort((a:RestaurantInterface, b:RestaurantInterface) => {
            if(a.name < b.name) {
                return -1;
            } else if(a.name > b.name) {
                return 1;
            }
            return 0;
        });

        const alphaCharNames:RestaurantInterface[] = restaurants.filter((r:RestaurantInterface) => {
            return ALPHABET.indexOf(r.name.substring(0, 1).toLowerCase()) !== -1; 
        }).sort((a:RestaurantInterface, b:RestaurantInterface) => {
            if(a.name < b.name) {
                return -1;
            } else if(a.name > b.name) {
                return 1;
            }
            return 0;
        });

        const sortedCharNames:RestaurantInterface[] = [...alphaCharNames, ...specialCharNames ];
        
        setSearchParam(`${searchBy} = "${searchValue}"`);
        setFetchedRestaurants(sortedCharNames);

        const paginatedRestaurants = restaurants.filter((r:RestaurantInterface) => {
            return r.name.substring(0, 1).toLowerCase() === currentPage;
        });

        setPaginatedRestaurants(paginatedRestaurants);
        setTotalResultCount(restaurants.length);
        setCurrentStartIndex(1);
        setCurrentEndIndex(paginatedRestaurants.length);
    };

    const filterRestaurantsByCurrentPage = (currentPage:string):void => {
        setCurrentPage(currentPage);
        const paginatedRestaurants = fetchedRestaurants.filter((r:RestaurantInterface) => {
            return currentPage === 'special' ? ALPHABET.indexOf(r.name.substring(0, 1).toLowerCase()) === -1 :
                r.name.substring(0, 1).toLowerCase() === currentPage;
        });
        setCurrentStartIndex((fetchedRestaurants.indexOf(paginatedRestaurants[0])) + 1);
        setCurrentEndIndex((fetchedRestaurants.indexOf(paginatedRestaurants[0])) + paginatedRestaurants.length);
        setPaginatedRestaurants(paginatedRestaurants);
    };
    
    return (
        <section className="MainContent">
            Current Page: {currentPage}
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
                currentEndIndex={currentEndIndex}
                currentStartIndex={currentStartIndex}
            />
        </section>
    )
};

export default MainContent;