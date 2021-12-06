import { useState, useEffect } from 'react';
import './AttributeSelector.css';
import { CuisineService } from '../../services';
import CuisineTypeInterface from '../../models/CuisineTypeInterface';
import config from '../../config/env';

interface AttributeSelectorPropsInterface {
    fetchRestaurantsBySearchParam: Function,
}

interface AttributeFetchResultsInterface {
    fetchResults: {[key: string]: {[key: string] : boolean } }
}
const { SEARCH_PARAMS, AVG_GRADES } = config;

const AttributeSelector = (props:AttributeSelectorPropsInterface):JSX.Element => {

    const initialCuisineTypeList: CuisineTypeInterface[] = [];
    const initialAttributeFetchResults: AttributeFetchResultsInterface = {
        fetchResults: {
            [SEARCH_PARAMS[0].value]: { status: false },
            [SEARCH_PARAMS[1].value]: { status: true },
            [SEARCH_PARAMS[2].value]: { status: true },
            [SEARCH_PARAMS[3].value]: { status: false },
        }
    }

    const [ currentSearchParam, setCurrentSearchParam ] = useState(SEARCH_PARAMS[0].value);
    const [ cuisineTypesList, setCuisineTypesList ] = useState(initialCuisineTypeList);
    const [ attributeFetchResults, setAttributeFetchResults ] = useState(initialAttributeFetchResults);

    const {
        fetchRestaurantsBySearchParam
    } = props;

    const fetchCuisineTypes = async() => {
        try {
            const cuisineTypes = await CuisineService.getCuisineTypes();
            setCuisineTypesList(cuisineTypes);
            const copy = { ...attributeFetchResults };
            copy.fetchResults[SEARCH_PARAMS[0].value] = { status: true };
            setAttributeFetchResults(copy);
        } catch (err) {
            /**
             * TODO: 12/6/2021 14:21 EST
             * COME UP WITH BETTER ERROR HANDLING FOR API CALL ERRORS
             */
            console.log('err:', err);
        }
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
        const element = attributeFetchResults.fetchResults[param.value].status ? (
            <div className="AttributeSelector" key={`attr-selector-${idx}`}>
                <input
                name='restaurant-search'
                type='radio'
                disabled={!attributeFetchResults.fetchResults[param.value].status}
                checked={param.value === currentSearchParam}
                value={param.value}
                onChange={() => setCurrentSearchParam(param.value)}
                />
                {param.displayName}
                {
                    param.inputType === 'select' ? (
                        <select className={param.value === currentSearchParam ? 'show' : 'hide'}>
                            {param.value === 'cuisine' ? cuisineTypesOptions : []}
                            {param.value === 'avg_grade' ? avgGradeOptions : []}
                        </select>) : (
                        <input
                        className={param.value === currentSearchParam ? 'show' : 'hide'}
                        />
                    )
                }
            </div>
        ) : <div className='AttributeSelector' key={`attr-selector-${idx}`}><span>Unavailable</span></div>;
        return element;
    });

    return(
        <section className="AttributeSelector">
            {radioButtons}
            <button>Search Restaurants</button>
        </section>
    );
};

export default AttributeSelector;