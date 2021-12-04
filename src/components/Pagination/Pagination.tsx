import { useState } from 'react';
import './Pagination.css';
import config from '../../config/env';
import RestaurantInterface from '../../models/RestaurantInterface';

interface PaginationPropsInterface {
    restaurantsList: RestaurantInterface[],
}

const Pagination = (props:PaginationPropsInterface):JSX.Element => {

    const [ currentPage, setCurrentPage ] = useState('a');
    const { ALPHABET, RESULTS_PER_PAGE } = config;
    const {
        restaurantsList
    } = props;

    // const totalPagesNumber = Math.ceil(paginatedResultCount / RESULTS_PER_PAGE);

    const links = ALPHABET.map((char, idx) => {
        return(
            <button
                key={`pagination-${idx}`}
                onClick={() => {setCurrentPage(char)}}
            >
                {char.toUpperCase()}
            </button>
        );
    });

    // const numbers: JSX.Element[] = [];
    // for(let i = 0; i < totalPagesNumber; i+= 1) {
    //     numbers.push(
    //     <button 
    //         key={`page-number-${i + 1}`}
    //         onClick={() => {paginateRestaurants(currentPage, i + 1)}}
    //     >
    //         {i + 1}
    //     </button>);
    // };

    return(
        <section className="Pagination">
            {links}
            {/* {links}
            {numbers} */}
        </section>
    )
};

export default Pagination;