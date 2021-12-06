import { useState, useEffect } from 'react';
import './AttributeSelector.css';
import { CuisineService } from '../../services';
import CuisineTypeInterface from '../../models/CuisineTypeInterface';
import ErrorResponseInterface from '../../models/ErrorResponseInterface';
import config from '../../config/env';

interface AttributeSelectorPropsInterface {
    fetchRestaurantsBySearchParam: Function, // searchBy: string, searchValue: string, restaurants: any
}

const { SEARCH_PARAMS, AVG_GRADES } = config;

const AttributeSelector = (props:AttributeSelectorPropsInterface):JSX.Element => {

    const initialCuisineTypeList: CuisineTypeInterface[] = [];

    const [ currentSearchParam, setCurrentSearchParam ] = useState(SEARCH_PARAMS[0].value);
    const [ cuisineTypesList, setCuisineTypesList ] = useState(initialCuisineTypeList);

    const {
        fetchRestaurantsBySearchParam
    } = props;

    const fetchCuisineTypes = async() => {
        const cuisineTypes = await CuisineService.getCuisineTypes();
        setCuisineTypesList(cuisineTypes);
    }

    useEffect(() => {
        fetchCuisineTypes();
    }, []);

    const cuisineTypesOptions = cuisineTypesList.map((type, idx) => {
        return <option key={`cuisine-option-${idx}`} value={type.cuisineType}>{type.cuisineType}</option>
    });

    const avgGradeOptions = AVG_GRADES.map((grade, idx) => {
        return <option key={`avg-grade-option-${idx}`} value={grade}>{grade.toUpperCase()}</option>
    })
    const radioButtons = SEARCH_PARAMS.map((param, idx) => {
        return (
            <div className="AttributeSelector"
                key={`attr-selector-${idx}`}
            >
                <input
                name='restaurant-search'
                type='radio'
                checked={param.value === currentSearchParam}
                value={param.value}
                onChange={() => setCurrentSearchParam(param.value)}
                ></input>
                {param.displayName}
                {
                    param.inputType === 'select' ? (
                        <select className={param.value === currentSearchParam ? 'show' : 'hide'}>
                            {param.value === 'cuisine' ? cuisineTypesOptions : []}
                            {param.value === 'avg_grade' ? avgGradeOptions : []}
                        </select>) : (
                        <input
                        className={param.value === currentSearchParam ? 'show' : 'hide'}
                        ></input>)
                }
            </div>
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