import { useState, useEffect } from 'react';
import './Pagination.css';
import config from '../../config/env';
import RestaurantInterface from '../../models/RestaurantInterface';
import { RestaurantsList } from '../index';
import { useAppSelector } from '../../store/hooks';

interface PaginationPropsInterface {
    restaurantsList: RestaurantInterface[],
}

const { ALPHABET, RESULTS_PER_PAGE } = config;
const initialResultsByPage:RestaurantInterface[] = [];
const initialEmptyIndices:number[] = [];

const Pagination = (props:PaginationPropsInterface):JSX.Element => {

    const [ currentPage, setCurrentPage ] = useState('a');
    const [ currentPageNumber, setCurrentPageNumber ] = useState(1);
    const [ emptyResultsByIndex, setEmptyResultsByIndex ] = useState(initialEmptyIndices);
    const [ currentResultsByPageLetter, setCurrentResultsByPageLetter ] = useState(initialResultsByPage);
    const [ currentResultsByPageLetterLength, setCurrentResultsByPageLetterLength ] = useState(0);
    const [ totalResultsLength, setTotalResultsLength ] = useState(0);
    const [ currentStartIndex, setCurrentStartIndex ] = useState(0);
    const [ currentEndIndex, setCurrentEndIndex ] = useState(RESULTS_PER_PAGE);
    const [ testList, setTestList ] = useState('');

    const {
        restaurantsList // TODO 2021-12-14 11:39 EST Set restaurantsList as STATE or GLOBAL STATE to preserve on page refresh
    } = props;

    const fullList = useAppSelector((state) => state.restaurantList.fullList);
   
    useEffect(() => {
        setCurrentResultsByPageLetterLength(restaurantsList.filter((r:RestaurantInterface) => {
            return r.name.substring(0, 1).toLowerCase() === 'a';
        }).length);
        setTotalResultsLength(restaurantsList.length);
        setCurrentResultsByPageLetter(getCurrentResultsByPageLetter(restaurantsList, 'a'));
        const restaurantsListCopy = [...restaurantsList];
        const sortedRestaurantsByLetter: [RestaurantInterface[]] = [[]];
        const emptyIndices: number[] = [];

        ALPHABET.map((char, idx) => {
            const byChars:RestaurantInterface[] = [];
            const specialChars:RestaurantInterface[] = [];
            restaurantsListCopy.forEach((r) => {
                if(r.name.substring(0, 1).toLowerCase() !== 'special'){
                    if(r.name.substring(0,1).toLowerCase() === char) {
                        byChars.push(r);
                    }
                } else {
                    specialChars.push(r);
                }
            });
            sortedRestaurantsByLetter[idx] = idx < 26 ? byChars : specialChars;
            if(sortedRestaurantsByLetter[idx].length === 0) {
                emptyIndices.push(idx);
            }
            setEmptyResultsByIndex(emptyIndices);
            setTestList(JSON.stringify(restaurantsList));
        });
    }, [restaurantsList]);
    

    const getCurrentResultsByPageLetter = (results:RestaurantInterface[], currentPage:string):RestaurantInterface[] => {
        return results.filter((r:RestaurantInterface) => {
            return currentPage === 'special' ? ALPHABET.indexOf(r.name.substring(0, 1).toLowerCase()) === -1 :
                r.name.substring(0, 1).toLowerCase() === currentPage;
        });
    };

    const getCurrentResultsByPageAndNumber = (resultsByPage:RestaurantInterface[], currentPageNumber:number) => {
        return resultsByPage.slice(((currentPageNumber - 1) * RESULTS_PER_PAGE), (((currentPageNumber - 1) * RESULTS_PER_PAGE) + RESULTS_PER_PAGE));
    }

    const calculateCurrentStartIndex = (currentPageNumber:number, paginatedResults:RestaurantInterface[]):number => {
        const firstPaginatedItem = getCurrentResultsByPageAndNumber(paginatedResults, currentPageNumber)[0];
       return restaurantsList.indexOf(firstPaginatedItem);
        
    };

    const calculateCurrentEndIndex = (currentPageNumber:number, paginatedResults:RestaurantInterface[]):number => {
        const pageAndNumber = getCurrentResultsByPageAndNumber(paginatedResults, currentPageNumber);
        const lastPaginatedItem = getCurrentResultsByPageAndNumber(paginatedResults, currentPageNumber)[pageAndNumber.length - 1];
        return restaurantsList.indexOf(lastPaginatedItem);
    };

    const selectPage = (page:string):void => {
        const currentResultsByPageLetter = getCurrentResultsByPageLetter(restaurantsList, page);
        setCurrentResultsByPageLetterLength(currentResultsByPageLetter.length);
        setCurrentPage(page);
        setCurrentResultsByPageLetter(getCurrentResultsByPageLetter(restaurantsList, page));
        setCurrentPageNumber(1);
        setCurrentStartIndex(calculateCurrentStartIndex(1, currentResultsByPageLetter));
        setCurrentEndIndex(calculateCurrentEndIndex(1, currentResultsByPageLetter));
    };

    const paginateResults = (currentPageNumber:number):void => {
        const currentResultsByPageLetter = getCurrentResultsByPageLetter(restaurantsList, currentPage);
        setCurrentPageNumber(currentPageNumber);
        setCurrentResultsByPageLetter(getCurrentResultsByPageLetter(restaurantsList, currentPage));
        setCurrentStartIndex(calculateCurrentStartIndex(currentPageNumber, currentResultsByPageLetter));
        setCurrentEndIndex(calculateCurrentEndIndex(currentPageNumber, currentResultsByPageLetter));
    };

    const links = ALPHABET.map((char, idx) => {
        return emptyResultsByIndex.indexOf(idx) === -1 ? (
            <button
                key={`pagination-${idx}`}
                className={char === currentPage ? 'current-page' : ''}
                onClick={() => {selectPage(char)}}
            >
                {char.toUpperCase()}
            </button>
        ) : null;
    });

    const numbers: JSX.Element[] = []; 

    for(let i = 0; i < Math.ceil(currentResultsByPageLetterLength / RESULTS_PER_PAGE); i+= 1) {
        numbers.push(
        <button 
            key={`page-number-${i + 1}`}
            className={(i + 1) === currentPageNumber ? 'current-page' : ''}
            onClick={() => {paginateResults(i + 1)}}
        >
            {i + 1}
        </button>);
    };

    return(
        <section className="Pagination">
            {restaurantsList.length > 0 && <h4>Showing results {currentStartIndex + 1} through {currentEndIndex + 1} of {totalResultsLength}</h4>}
            {restaurantsList.length > 0 && links}
            {currentResultsByPageLetter.length > 0 && (
                <RestaurantsList
                    restaurantsList={getCurrentResultsByPageAndNumber(currentResultsByPageLetter, currentPageNumber)}
                    currentStartIndex={currentStartIndex}
                    currentEndIndex={currentEndIndex}
                />
            )}
            {restaurantsList.length > 0 && numbers}
            {restaurantsList.length < 1 && <h4>No restaurants found</h4>}
        </section>
    )
};

export default Pagination;