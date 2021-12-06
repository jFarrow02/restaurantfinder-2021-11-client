import { useState, useEffect } from 'react';
import './AttributeSelector.css';
import config from '../../config/env';

interface AttributeSelectorPropsInterface {
    fetchRestaurantsBySearchParam: Function, // searchBy: string, searchValue: string, restaurants: any
}

const { SEARCH_PARAMS } = config;

const AttributeSelector = (props:AttributeSelectorPropsInterface):JSX.Element => {

    const [ currentSearchParam, setCurrentSearchParam ] = useState(SEARCH_PARAMS[0].value);
    const {
        fetchRestaurantsBySearchParam
    } = props;

    const radioButtons = SEARCH_PARAMS.map((param, idx) => {
        return (
            <>
                <input
                name='restaurant-search'
                type='radio'
                checked={param.value === currentSearchParam}
                value={param.value}
                key={`attr-selector-${idx}`}
                onClick={() => setCurrentSearchParam(param.value)}
                ></input>
                {param.displayName}
                {
                    param.inputType === 'select' ? (
                        <select className={param.value === currentSearchParam ? 'show' : 'hide'}>

                        </select>) : (
                        <input
                        className={param.value === currentSearchParam ? 'show' : 'hide'}
                        ></input>)
                }
            </>
        )
    })
    return(
        <section className="AttributeSelector">
            {radioButtons}
            <button>Search Restaurants</button>
        </section>
    )
};

export default AttributeSelector;