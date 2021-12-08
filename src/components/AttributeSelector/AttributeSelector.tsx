import { useState, useEffect, useRef } from 'react';
import './AttributeSelector.css';
import { CuisineService, ZipcodeService, RestaurantService } from '../../services';
import CuisineTypeInterface from '../../models/CuisineTypeInterface';
import ZipcodeInterface from '../../models/ZipcodeInterface';
import ErrorResponseInterface from '../../models/ErrorResponseInterface';
import config from '../../config/env';
import RestaurantInterface from '../../models/RestaurantInterface';

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
    };
    const initialZipcodesList: ZipcodeInterface[] = [];
    // const initialFoundRestaurants: RestaurantInterface | RestaurantInterface[] | ErrorResponseInterface = [];

    const [ currentSearchParam, setCurrentSearchParam ] = useState(SEARCH_PARAMS[0].value);
    const [ currentSearchValue, setCurrentSearchValue ] = useState('');
    const [ cuisineTypesList, setCuisineTypesList ] = useState(initialCuisineTypeList);
    const [ attributeFetchResults, setAttributeFetchResults ] = useState(initialAttributeFetchResults);
    const [ zipcodesList, setZipcodesList ] = useState(initialZipcodesList);
    // const [ foundRestaurants, setFoundRestaurants ] = useState(initialFoundRestaurants);

    const searchParamSelect = useRef();
    const searchParamInput = useRef();

    const {
        fetchRestaurantsBySearchParam // (searchBy: string, searchValue: string, restaurants: any)
    } = props;

    const fetchCuisineTypes = async() => {
        try {
            const cuisineTypes = await CuisineService.getCuisineTypes();
            setCuisineTypesList(cuisineTypes);
            setCurrentSearchValue(cuisineTypes[0].cuisineType);
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
    };

    const fetchZipcodes = async() => {
        try {
            const zipcodes:ZipcodeInterface[] | ErrorResponseInterface = await ZipcodeService.fetchAllZipcodes();
            setZipcodesList(zipcodes);
            const copy = { ...attributeFetchResults };
            copy.fetchResults[SEARCH_PARAMS[3].value] = { status: true };
            setAttributeFetchResults(copy);
        } catch(err) {
            console.log('err:', err);
        }
    };

    const fetchRestaurantsByParamAndValue = async () => {
       try {
           const restaurants = await RestaurantService.findRestaurantsByParamAndValue(currentSearchParam, currentSearchValue);
           // console.log(restaurants); // OK

       } catch(err) {
           console.log('err:', err);
       }
    };

    const handleSearchParamChange = ($e:any, param:string):void => {
        console.log('e:', $e.target);
       
        setCurrentSearchParam(param);
        let currentVal;
        switch(param){
            case 'cuisine':
                currentVal = cuisineTypesList[0].cuisineType;
                break;
            case 'avg_grade':
                currentVal = 'a';
                break;
            case 'zip':
                currentVal = zipcodesList[0].zip;
                break;
            case 'name':
            default:
                currentVal = '';
        }
        setCurrentSearchValue($e?.target?.value);
    };

    useEffect(() => {
        fetchCuisineTypes();
        fetchZipcodes();
    }, []);

    const cuisineTypesOptions = cuisineTypesList.map((type, idx) => {
        return <option key={`cuisine-option-${idx}`} value={type.cuisineType}>{type.cuisineType}</option>
    });

    const avgGradeOptions = AVG_GRADES.map((grade, idx) => {
        return <option key={`avg-grade-option-${idx}`} value={grade}>{grade.toUpperCase()}</option>
    });

    const zipcodeOptions = zipcodesList.map((zip, idx) => {
        return <option key={`zipcode-option-${idx}`} value={zip.zip}>{zip.zip}</option>
    });

    const radioButtons = SEARCH_PARAMS.map((param, idx) => {
        const element = attributeFetchResults.fetchResults[param.value].status ? (
            <div className="AttributeSelector" key={`attr-selector-${idx}`}>
                <input
                name='restaurant-search'
                type='radio'
                disabled={!attributeFetchResults.fetchResults[param.value].status}
                checked={param.value === currentSearchParam}
                value={param.value}
                onChange={(e) => handleSearchParamChange(e, param.value)}
                />
                {param.displayName}
                {
                    param.inputType === 'select' ? (
                        <select
                            className={param.value === currentSearchParam ? 'show' : 'hide'}
                            onChange={(e) => {setCurrentSearchValue(e.target.value)}}
                        >
                            {param.value === 'cuisine' ? cuisineTypesOptions : []}
                            {param.value === 'avg_grade' ? avgGradeOptions : []}
                            {param.value === 'zip' ? zipcodeOptions : []}
                        </select>) : (
                        <input
                            className={param.value === currentSearchParam ? 'show' : 'hide'}
                            onChange={(e) => {setCurrentSearchValue(e.target.value)}}
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
            <button onClick={()=>{fetchRestaurantsByParamAndValue()}}>Search Restaurants</button>
        </section>
    );
};

export default AttributeSelector;