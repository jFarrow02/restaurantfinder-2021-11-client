import './Pagination.css';
import config from '../../config/env';

interface PaginationPropsInterface {
    paginateRestaurants: Function,
}

const Pagination = (props:PaginationPropsInterface):JSX.Element => {

    const { ALPHABET } = config;
    const {
        paginateRestaurants,
    } = props;

    const links = ALPHABET.map((char, idx) => {
        return(
            <button
                key={`pagination-${idx}`}
                onClick={() => {paginateRestaurants(char)}}
            >
                {char.toUpperCase()}
            </button>
        );
    });

    return(
        <section className="Pagination">
            {links}
        </section>
    )
};

export default Pagination;