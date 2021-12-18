import RestaurantInterface from "../models/RestaurantInterface";
import config from '../config/env';

const {
    ALPHABET,
    RESULTS_PER_PAGE,
} = config;

const getCurrentResultsByPageLetter = (results:RestaurantInterface[], currentPage:string):RestaurantInterface[] => {
    return results.filter((r:RestaurantInterface) => {
        return currentPage === 'special' ? ALPHABET.indexOf(r.name.substring(0, 1).toLowerCase()) === -1 :
            r.name.substring(0, 1).toLowerCase() === currentPage;
    });
};

const getCurrentResultsByPageAndNumber = (resultsByPage:RestaurantInterface[], currentPageNumber:number) => {
    return resultsByPage.slice(((currentPageNumber - 1) * RESULTS_PER_PAGE), (((currentPageNumber - 1) * RESULTS_PER_PAGE) + RESULTS_PER_PAGE));
};

const calculateCurrentStartIndex = (currentPageNumber:number, paginatedResults:RestaurantInterface[], restaurantsSupersetList:RestaurantInterface[]):number => {
    const firstPaginatedItem = getCurrentResultsByPageAndNumber(paginatedResults, currentPageNumber)[0];
    return restaurantsSupersetList.indexOf(firstPaginatedItem);
};

const calculateCurrentEndIndex = (currentPageNumber:number, paginatedResults:RestaurantInterface[], restaurantsSupersetList:RestaurantInterface[]):number => {
    const pageAndNumber = getCurrentResultsByPageAndNumber(paginatedResults, currentPageNumber);
    const lastPaginatedItem = getCurrentResultsByPageAndNumber(paginatedResults, currentPageNumber)[pageAndNumber.length - 1];
    return restaurantsSupersetList.indexOf(lastPaginatedItem);
};

export default {
    calculateCurrentEndIndex,
    calculateCurrentStartIndex,
    getCurrentResultsByPageAndNumber,
    getCurrentResultsByPageLetter,
};

