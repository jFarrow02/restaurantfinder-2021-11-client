import { useState, useEffect } from 'react';
import './Pagination.css';
import config from '../../config/env';
import RestaurantInterface from '../../models/RestaurantInterface';

interface PaginationPropsInterface {
    restaurantsList: RestaurantInterface[],
}

const Pagination = (props:PaginationPropsInterface):JSX.Element => {

    const [ currentPage, setCurrentPage ] = useState('a');
    const [ currentPageNumber, setCurrentPageNumber ] = useState(1);
    const [ currentResultsByPageLength, setCurrentResultsByPageLength ] = useState(0);
    const [ totalResultsLength, setTotalResultsLength ] = useState(0);

    useEffect(() => {
        setCurrentResultsByPageLength(props.restaurantsList.filter((r:RestaurantInterface) => {
            return r.name.substring(0, 1).toLowerCase() === 'a';
        }).length);
    }, [props.restaurantsList]);

    const { ALPHABET, RESULTS_PER_PAGE } = config;
    const {
        restaurantsList
    } = props;

    const selectPage = (page:string):void => {
        setCurrentPage(page);
        setCurrentPageNumber(1);
        const currentResultsByPage = restaurantsList.filter((r:RestaurantInterface) => {
            return currentPage === 'special' ? ALPHABET.indexOf(r.name.substring(0, 1).toLowerCase()) === -1 :
                r.name.substring(0, 1).toLowerCase() === currentPage;
        });
        setCurrentResultsByPageLength(currentResultsByPage.length);
    };

    const paginateResults = (currentPageNumber:number):void => {
        setCurrentPageNumber(currentPageNumber);  
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
            {restaurantsList.length > 0 && links}
            {restaurantsList.length > 0 && numbers}
        </section>
    )
};

export default Pagination;