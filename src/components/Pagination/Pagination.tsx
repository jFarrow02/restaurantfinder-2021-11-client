import { useState, useEffect } from 'react';
import './Pagination.css';
import config from '../../config/env';
import RestaurantInterface from '../../models/RestaurantInterface';
import { RestaurantsList, RestaurantDetails } from '../index';
import { PaginationService } from '../../services';

const { ALPHABET, RESULTS_PER_PAGE } = config;
const initialResultsByPage:RestaurantInterface[] = [];
const initialEmptyIndices:number[] = [];

const {
    getCurrentResultsByPageLetter,
    getCurrentResultsByPageAndNumber,
    calculateCurrentStartIndex,
    calculateCurrentEndIndex,
} = PaginationService;

const Pagination = ():JSX.Element => {

    const [ currentPage, setCurrentPage ] = useState('a');
    const [ currentPageNumber, setCurrentPageNumber ] = useState(1);
    const [ emptyResultsByIndex, setEmptyResultsByIndex ] = useState(initialEmptyIndices);
    const [ currentResultsByPageLetter, setCurrentResultsByPageLetter ] = useState(initialResultsByPage);
    const [ currentResultsByPageLetterLength, setCurrentResultsByPageLetterLength ] = useState(0);
    const [ totalResultsLength, setTotalResultsLength ] = useState(0);
    const [ currentStartIndex, setCurrentStartIndex ] = useState(0);
    const [ currentEndIndex, setCurrentEndIndex ] = useState(RESULTS_PER_PAGE);
    const [ showRestaurantDetails, setShowRestaurantDetails ] = useState(false);
    const [ currentRestaurantId, setCurrentRestaurantId ] = useState('');

    let localStorageRestaurantList = window.localStorage.getItem('fetchedRestaurantsBySearchParam');
    let localStorageCurrentPage = window.localStorage.getItem('currentPage');
    let localStorageCurrentPageNumber = window.localStorage.getItem('currentPageNumber');

    // @ts-ignore
    const restaurantsList = JSON.parse(localStorageRestaurantList);

    useEffect(() => {
        setCurrentResultsByPageLetterLength(restaurantsList.filter((r:RestaurantInterface) => {
            return localStorageCurrentPage && localStorageCurrentPage!== 'a' ? r.name.substring(0, 1).toLowerCase() === localStorageCurrentPage :
                r.name.substring(0, 1).toLowerCase() === 'a';
        }).length);
        setTotalResultsLength(restaurantsList.length);

        let pageLetter = localStorageCurrentPage ? localStorageCurrentPage : 'a';
        let pageNumber = localStorageCurrentPageNumber ? Number.parseInt(localStorageCurrentPageNumber) : 1;

        if(!localStorageCurrentPage) {
            setCurrentResultsByPageLetter(getCurrentResultsByPageLetter(restaurantsList, pageLetter));
            
        } else {
            setCurrentPage(pageLetter);
            setCurrentResultsByPageLetter(getCurrentResultsByPageLetter(restaurantsList, pageLetter));
        }

        setCurrentPageNumber(pageNumber);

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
        });

        setCurrentStartIndex(calculateCurrentStartIndex(pageNumber, getCurrentResultsByPageLetter(restaurantsList, pageLetter), restaurantsList));
        setCurrentEndIndex(calculateCurrentEndIndex(pageNumber, getCurrentResultsByPageLetter(restaurantsList, pageLetter), restaurantsList));
    }, [
            window.localStorage.getItem('fetchedRestaurantsBySearchParam'),
            window.localStorage.getItem('currentPage'),
            window.localStorage.getItem('currentPageNumber')
        ]
    );

    const selectPage = (page:string):void => {
        const currentResultsByPageLetter = getCurrentResultsByPageLetter(restaurantsList, page);
        setCurrentResultsByPageLetterLength(currentResultsByPageLetter.length);
        setCurrentPage(page);

        window.localStorage.setItem('currentPage', page);

        setCurrentResultsByPageLetter(getCurrentResultsByPageLetter(restaurantsList, page));
        setCurrentPageNumber(1);
        setCurrentStartIndex(calculateCurrentStartIndex(1, currentResultsByPageLetter, restaurantsList));
        setCurrentEndIndex(calculateCurrentEndIndex(1, currentResultsByPageLetter, restaurantsList));
    };

    const paginateResults = (currentPageNumber:number):void => {
        const currentResultsByPageLetter = getCurrentResultsByPageLetter(restaurantsList, currentPage);
        setCurrentPageNumber(currentPageNumber);

        window.localStorage.setItem('currentPageNumber', currentPageNumber.toString());

        setCurrentResultsByPageLetter(getCurrentResultsByPageLetter(restaurantsList, currentPage));
        setCurrentStartIndex(calculateCurrentStartIndex(currentPageNumber, currentResultsByPageLetter, restaurantsList));
        setCurrentEndIndex(calculateCurrentEndIndex(currentPageNumber, currentResultsByPageLetter, restaurantsList));
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

    return !showRestaurantDetails ? (
        <section className="Pagination">
            {restaurantsList.length > 0 && <h4>Showing results {currentStartIndex + 1} through {currentEndIndex + 1} of {totalResultsLength}</h4>}
            {restaurantsList.length > 0 && links}
            {currentResultsByPageLetter.length > 0 && (
                <RestaurantsList
                    restaurantsList={getCurrentResultsByPageAndNumber(currentResultsByPageLetter, currentPageNumber)}
                    currentStartIndex={currentStartIndex}
                    currentEndIndex={currentEndIndex}
                    setShowRestaurantDetails={setShowRestaurantDetails}
                    currentRestaurantId={currentRestaurantId}
                    setCurrentRestaurantId={setCurrentRestaurantId}
                />
            )}
            {restaurantsList.length > 0 && numbers}
            {restaurantsList.length < 1 && <h4>No restaurants found</h4>}
        </section>
    ) : (
        <RestaurantDetails
            restaurant={currentResultsByPageLetter.filter((r) => r.restaurantId === currentRestaurantId)[0]}
            setCurrentRestaurantId={setCurrentRestaurantId}
            setShowRestaurantDetails={setShowRestaurantDetails}
            indicesList={
                [
                    restaurantsList.indexOf(restaurantsList.filter((r:RestaurantInterface) => r.restaurantId === currentRestaurantId)[0])
                ]
            }
        />
    )
};

export default Pagination;