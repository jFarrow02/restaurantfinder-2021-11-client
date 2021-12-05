import { useState, useEffect } from 'react';
import './Pagination.css';
import config from '../../config/env';
import RestaurantInterface from '../../models/RestaurantInterface';

interface PaginationPropsInterface {
    restaurantsList: RestaurantInterface[],
}

const { ALPHABET, RESULTS_PER_PAGE } = config;
const initialResultsByPage:RestaurantInterface[] = [];

const Pagination = (props:PaginationPropsInterface):JSX.Element => {

    const [ currentPage, setCurrentPage ] = useState('a');
    const [ currentPageNumber, setCurrentPageNumber ] = useState(1);
    const [ currentResultsByPage, setCurrentResultsByPage ] = useState(initialResultsByPage);
    const [ currentResultsByPageLength, setCurrentResultsByPageLength ] = useState(0);
    const [ totalResultsLength, setTotalResultsLength ] = useState(0);
    const [ currentStartIndex, setCurrentStartIndex ] = useState(0);
    const [ currentEndIndex, setCurrentEndIndex ] = useState(RESULTS_PER_PAGE);

    useEffect(() => {
        setCurrentResultsByPageLength(props.restaurantsList.filter((r:RestaurantInterface) => {
            return r.name.substring(0, 1).toLowerCase() === 'a';
        }).length);
        setTotalResultsLength(restaurantsList.length);
        setCurrentResultsByPage(getCurrentResultsByPage(restaurantsList, 'a', 1));
    }, [props.restaurantsList]);

    const {
        restaurantsList
    } = props;

    // const getCurrentResultsByPage = (results:RestaurantInterface[], currentPage:string):RestaurantInterface[] => {
    //     return results.filter((r:RestaurantInterface) => {
    //         return currentPage === 'special' ? ALPHABET.indexOf(r.name.substring(0, 1).toLowerCase()) === -1 :
    //             r.name.substring(0, 1).toLowerCase() === currentPage;
    //     });
    // };

    const getCurrentResultsByPage = (results:RestaurantInterface[], currentPage:string, currentPageNumber:number):RestaurantInterface[] => {
        return results.filter((r:RestaurantInterface) => {
            return currentPage === 'special' ? ALPHABET.indexOf(r.name.substring(0, 1).toLowerCase()) === -1 :
                r.name.substring(0, 1).toLowerCase() === currentPage;
        }).slice(((currentPageNumber - 1) * RESULTS_PER_PAGE), (((currentPageNumber - 1) * RESULTS_PER_PAGE) + RESULTS_PER_PAGE));

    };

    const calculateCurrentStartIndex = (currentPage:string, currentPageNumber:number, paginatedResults:RestaurantInterface[]):number => {
        /**
         * currentPageResults[{}, {}, {}...]
         * if currentPage === 1
         * currentStart = start at 0 indexed item
         * currentEnd = RESULTS_PER_PAGE
         * 
         * if currentPage === 2
         * currentStart = (currentPage - 1) * RESULTS_PER_PAGE
         * */ 
        // const currentStart = restaurantsList.indexOf(currentResultsByPage[0]) + 1;
        // const firstPaginatedItem = paginatedResults[0];
        const firstPaginatedItem = currentPageNumber === 1 ? paginatedResults[0] : 
            paginatedResults[(((currentPageNumber - 1) * RESULTS_PER_PAGE)) - 1];
        return restaurantsList.indexOf(firstPaginatedItem);
        
    };

    const calculateCurrentEndIndex = ():number => {
        return -1;
    }
    const selectPage = (page:string):void => {
        const currentResultsByPage = getCurrentResultsByPage(restaurantsList, page, 1);
        setCurrentResultsByPageLength(currentResultsByPage.length);
        setCurrentPage(page);
        setCurrentResultsByPage(getCurrentResultsByPage(restaurantsList, page, 1));
        setCurrentPageNumber(1);
        setCurrentStartIndex(0);
        // setCurrentEndIndex(restaurantsList.indexOf(currentResultsByPage[currentResultsByPage.length - 1]));
        
    };

    const paginateResults = (currentPageNumber:number):void => {
        // const currentResultsByPage = getCurrentResultsByPage(restaurantsList);
        setCurrentPageNumber(currentPageNumber);
        setCurrentResultsByPage(getCurrentResultsByPage(restaurantsList, currentPage, currentPageNumber));
        setCurrentStartIndex(calculateCurrentStartIndex(currentPage, currentPageNumber, getCurrentResultsByPage(restaurantsList, currentPage, currentPageNumber)));
        // setCurrentEndIndex(restaurantsList.indexOf(currentResultsByPage[currentResultsByPage.length - 1]));
    }

    const links = ALPHABET.map((char, idx) => {
        return(
            <button
                key={`pagination-${idx}`}
                onClick={() => {selectPage(char)}}
            >
                {char.toUpperCase()}
            </button>
        );
    });

    const numbers: JSX.Element[] = []; 

    for(let i = 0; i < Math.ceil(currentResultsByPageLength / RESULTS_PER_PAGE); i+= 1) {
        numbers.push(
        <button 
            key={`page-number-${i + 1}`}
            onClick={() => {paginateResults(i + 1)}}
        >
            {i + 1}
        </button>);
    };

    return(
        <section className="Pagination">
            <h4>Showing results {'#'} - {'#'} of {totalResultsLength}</h4>
            {restaurantsList.length > 0 && links}
            {restaurantsList.length > 0 && numbers}
            {/* {
                restaurantsList.length > 0 &&
                 <RestaurantsList
                restaurantsList={paginatedRestaurants}
                searchParam={searchParam}
                totalResultCount={totalResultCount}
                currentEndIndex={currentEndIndex}
                currentStartIndex={currentStartIndex}
                />
            } */}
        </section>
    )
};

export default Pagination;