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
    const [ currentStartIndex, setCurrentStartIndex ] = useState(1);
    const [ currentEndIndex, setCurrentEndIndex ] = useState(RESULTS_PER_PAGE);

    useEffect(() => {
        setCurrentResultsByPageLength(props.restaurantsList.filter((r:RestaurantInterface) => {
            return r.name.substring(0, 1).toLowerCase() === 'a';
        }).length);

        // const currentResultsByPage = getCurrentResultsByPage(restaurantsList);
        setTotalResultsLength(restaurantsList.length);
        setCurrentResultsByPage(getCurrentResultsByPage(restaurantsList, 'a'));
    }, [props.restaurantsList]);

    const {
        restaurantsList
    } = props;

    const getCurrentResultsByPage = (results:RestaurantInterface[], currentPage:string):RestaurantInterface[] => {
        return results.filter((r:RestaurantInterface) => {
            return currentPage === 'special' ? ALPHABET.indexOf(r.name.substring(0, 1).toLowerCase()) === -1 :
                r.name.substring(0, 1).toLowerCase() === currentPage;
        });
    };

    const selectPage = (page:string):void => {
        // const currentResultsByPage = getCurrentResultsByPage(restaurantsList);
        setCurrentResultsByPageLength(currentResultsByPage.length);
        setCurrentPage(page);
        setCurrentResultsByPage(getCurrentResultsByPage(restaurantsList, page));
        setCurrentPageNumber(1);
        // setCurrentStartIndex(restaurantsList.indexOf(currentResultsByPage[0]));
        // setCurrentEndIndex(restaurantsList.indexOf(currentResultsByPage[currentResultsByPage.length - 1]));
        
    };

    const paginateResults = (currentPageNumber:number):void => {
        // const currentResultsByPage = getCurrentResultsByPage(restaurantsList);
        setCurrentPageNumber(currentPageNumber);
        setCurrentResultsByPage(getCurrentResultsByPage(restaurantsList, currentPage));
        // setCurrentStartIndex(restaurantsList.indexOf(currentResultsByPage[0]));
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