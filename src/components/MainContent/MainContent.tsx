import { useState } from 'react';
import './MainContent.css';
import { BoroughSelector, AttributeSelector, RestaurantsList, Pagination } from '..';
import RestaurantInterface from '../../models/RestaurantInterface';
import config from '../../config/env';

const { ALPHABET, RESULTS_PER_PAGE } = config;

const MainContent = (): JSX.Element => {
    let r: RestaurantInterface[] = [];

    const [ fetchedRestaurants, setFetchedRestaurants ] = useState(r);
    const [ paginatedRestaurants, setPaginatedRestaurants ] = useState(r);
    const [ searchParam, setSearchParam ] = useState('');
    const [ currentPage, setCurrentPage ] = useState('a');
    const [ currentPageNumber, setCurrentPageNumber ] = useState(1);
    const [ currentStartIndex, setCurrentStartIndex ] = useState(0);
    const [ currentEndIndex, setCurrentEndIndex ] = useState(0);
    const [ resultByPageCount, setResultByPageCount ] = useState(0);
    const [ totalResultCount, setTotalResultCount ] = useState(0);

    const fetchRestaurantsBySearchParam = (searchBy: string, searchValue: string, restaurants: any):void => {
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
        
        setPaginatedRestaurants(paginatedRestaurants.slice(0, RESULTS_PER_PAGE));
        setTotalResultCount(restaurants.length);
        setCurrentStartIndex(1);
        setCurrentEndIndex(paginatedRestaurants.length);
    };

    // const filterRestaurantsByCurrentPage = (currentPage:string, currentPageNumber:number):void => {
    //     setCurrentPage(currentPage);

    //     /**TODO: 12/03/2021 21:36 EST Use currentPageNumber to calculate numbered paginated results */
    //     const paginatedRestaurants = fetchedRestaurants.filter((r:RestaurantInterface) => {
    //         return currentPage === 'special' ? ALPHABET.indexOf(r.name.substring(0, 1).toLowerCase()) === -1 :
    //             r.name.substring(0, 1).toLowerCase() === currentPage;
    //     });
    //     setCurrentStartIndex((fetchedRestaurants.indexOf(paginatedRestaurants[0])) + 1);
    //     setCurrentEndIndex((fetchedRestaurants.indexOf(paginatedRestaurants[0])) + paginatedRestaurants.length);
    //     setPaginatedRestaurants(paginatedRestaurants);
    // };

    // const filterRestaurantsByCurrentPage = (currentPage:string, currentPageNumber:number):void => {
    //     setCurrentPage(currentPage);
    //     setCurrentPageNumber(currentPageNumber);

    //     // const allRestaurantsForCurrentPage = fetchedRestaurants.filter((r:RestaurantInterface) => {
    //     //     return currentPage === 'special' ? ALPHABET.indexOf(r.name.substring(0, 1).toLowerCase()) === -1 :
    //     //         r.name.substring(0, 1).toLowerCase() === currentPage;
    //     // });
    //     // let paginatedRestaurants:RestaurantInterface[] = [];

    //     // if(currentPageNumber < 1) {
    //     //     throw new Error('page number should not be < 1');
    //     // }
    //     // paginatedRestaurants =  currentPageNumber > 1 ? [] : allRestaurantsForCurrentPage.slice((RESULTS_PER_PAGE * currentPageNumber) -1, RESULTS_PER_PAGE + 1);   // currentPageNumber > 1
    //     // allRestaurantsForCurrentPage.slice(0, RESULTS_PER_PAGE + 1); // currentPageNumber === 1
        
    //     setCurrentStartIndex((fetchedRestaurants.indexOf(paginatedRestaurants[0])) + 1);
    //     setCurrentEndIndex((fetchedRestaurants.indexOf(paginatedRestaurants[0])) + RESULTS_PER_PAGE);
    //     setPaginatedRestaurants([]);
    // };
    
    const filterRestaurantsByCurrentPage = (currentPage:string, currentPageNumber:number) => {
        setCurrentPage(currentPage);
        setCurrentPageNumber(currentPageNumber);// restart paginated results at page number 1 when selecting new ABC results
    
        const allRestaurantsForCurrentPage = fetchedRestaurants.filter((r:RestaurantInterface) => {
            return currentPage === 'special' ? ALPHABET.indexOf(r.name.substring(0, 1).toLowerCase()) === -1 :
                r.name.substring(0, 1).toLowerCase() === currentPage;
        });

        const paginatedForCurrentPage = currentPageNumber > 1 ? allRestaurantsForCurrentPage.slice((currentPageNumber * RESULTS_PER_PAGE) - 1, ((currentPageNumber * RESULTS_PER_PAGE) - 1) + RESULTS_PER_PAGE):  // currentPageNumber > 1
            allRestaurantsForCurrentPage.slice(0, RESULTS_PER_PAGE ); // currentPageNumber === 1


        setPaginatedRestaurants(paginatedForCurrentPage);
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
                paginatedResultCount={paginatedRestaurants.length}
                currentPage={currentPage}
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