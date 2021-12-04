import './Pagination.css';
import config from '../../config/env';

interface PaginationPropsInterface {
    paginateRestaurants: Function,
    paginatedResultCount: number,
    currentPage: string,
}

const Pagination = (props:PaginationPropsInterface):JSX.Element => {

    const { ALPHABET, RESULTS_PER_PAGE } = config;
    const {
        paginateRestaurants,
        paginatedResultCount,
        currentPage,
    } = props;

    const totalPagesNumber = Math.ceil(paginatedResultCount / RESULTS_PER_PAGE);

    const links = ALPHABET.map((char, idx) => {
        return(
            <button
                key={`pagination-${idx}`}
                onClick={() => {paginateRestaurants(char, 1)}}
            >
                {char.toUpperCase()}
            </button>
        );
    });

    const numbers: JSX.Element[] = [];
    for(let i = 0; i < totalPagesNumber; i+= 1) {
        numbers.push(
        <button 
            key={`page-number-${i + 1}`}
            onClick={() => {paginateRestaurants(currentPage, i + 1)}}
        >
            {i + 1}
        </button>);
    };

    return(
        <section className="Pagination">
            {links}
            {numbers}
        </section>
    )
};

export default Pagination;