import { useState, useEffect } from 'react';
import './AttributeSelector.css';
import { CuisineService, ZipcodeService, RestaurantService } from '../../services';
import CuisineTypeInterface from '../../models/CuisineTypeInterface';
import ZipcodeInterface from '../../models/ZipcodeInterface';
import config from '../../config/env';
import { AttributeSelectorInput } from '../index';

interface AttributeSelectorPropsInterface {
    fetchRestaurantsBySearchParam: Function,
}

const { SEARCH_PARAMS, AVG_GRADES } = config;

const AttributeSelector = (props:AttributeSelectorPropsInterface):JSX.Element => {

    const initialCuisineTypeList: CuisineTypeInterface[] = [];
    
    const initialAttributeFetchResults:{[key: string]: {[key: string] : boolean }} = {
            cuisine: { success: false },
            name: { success: true },
            avg_grade: { success: true },
            zip: { success: false }
    };
    const initialZipcodesList: ZipcodeInterface[] = [];

    const [ currentSearchParam, setCurrentSearchParam ] = useState('');
    const [ currentSearchValue, setCurrentSearchValue ] = useState('');
    const [ cuisineTypesList, setCuisineTypesList ] = useState(initialCuisineTypeList);
    const [ attributeFetchResults, setAttributeFetchResults ] = useState(initialAttributeFetchResults);
    const [ zipcodesList, setZipcodesList ] = useState(initialZipcodesList);
    // const [ foundRestaurants, setFoundRestaurants ] = useState(initialFoundRestaurants);


    const {
        fetchRestaurantsBySearchParam // (searchBy: string, searchValue: string, restaurants: any)
    } = props;

    const fetchSearchParameters = async():Promise<void> => {
        const copy = { ...attributeFetchResults };
        let cuisineTypes;
        let zipCodes;
        let errorMessage = '';
        try{
            cuisineTypes = await CuisineService.getCuisineTypes();
            zipCodes = await ZipcodeService.fetchAllZipcodes();
            if(cuisineTypes.length < 1) {
                errorMessage += 'Failed to fetch cuisine types ';
            } else if(zipCodes.length < 1) {
                errorMessage += 'Failed to fetch zipcodes';
            }
            if(errorMessage.length > 0){
                throw new Error(errorMessage);
            }
            setCuisineTypesList(cuisineTypes);
            setZipcodesList(zipCodes);
            copy.cuisine = { success: true };
            copy.zip = { success: true };
            setAttributeFetchResults(copy);
        } catch(err:any) { // TODO: Create custom error to throw here
            console.log('err:', err.message);
            if(!cuisineTypes){
                copy.cuisine = { success: false };
            }
            if(!zipCodes) {
                copy.zip = { success: false };
            }
            setAttributeFetchResults(copy);
        }
    }

    const fetchRestaurantsByParamAndValue = async () => {
       try {
           const restaurants = await RestaurantService.findRestaurantsByParamAndValue(currentSearchParam, currentSearchValue);
           // console.log(restaurants); // OK

       } catch(err) {
           console.log('err:', err);
       }
    };

    useEffect(() => {
        fetchSearchParameters();
    }, [attributeFetchResults]);

    const buildOptionsList = (searchParameter:string):any[] => {
        let optionsList: any[] = [];
        switch(searchParameter) {
            case 'cuisine':
                optionsList = cuisineTypesList;
                break;
            case 'avg_grade':
                optionsList = AVG_GRADES;
                break;
            case 'zip':
                optionsList = zipcodesList;
                break;
            default:
                optionsList = [];
        }
        return optionsList;
    };

    const attributeSelectors = SEARCH_PARAMS.map((paramObject, idx) => {
        let optionsList = buildOptionsList(paramObject.value);
        return attributeFetchResults[paramObject.value].success ? (
            <AttributeSelectorInput
                key={`attribute-selector-input-${idx}`}
                name='restaurant-search'
                label={paramObject.displayName}
                onRadioValueChange={setCurrentSearchParam}
                onInputValueChange={setCurrentSearchValue}
                inputType={paramObject.inputType}
                optionsList={optionsList}
                radioValue={paramObject.value}
                currentSearchParam={currentSearchParam}
            />
        ) : (<div key={`attribute-selector-error-${idx}`}>Unavailable</div>)
    });
    
    return(
        <section className="AttributeSelector">
            {attributeSelectors}
            <button
                onClick={()=>{fetchRestaurantsByParamAndValue()}}
                disabled={currentSearchParam.length < 1 || currentSearchValue.length < 1}
            >
                Search Restaurants
            </button>
        </section>
    );
};

export default AttributeSelector;