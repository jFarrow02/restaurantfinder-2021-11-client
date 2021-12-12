import { useState, useRef } from 'react';
import './AttributeSelectorInput.css';


interface AttributeSelectorInputPropsInterface {
    onRadioValueChange: Function,
    onInputValueChange: Function,
    inputType: string,
    name: string,
    label: string,
    optionsList?: any[],
    radioValue: string,
    currentSearchParam: string,
}

const AttributeSelectorInput = (props:AttributeSelectorInputPropsInterface):JSX.Element => {
    const {
        onRadioValueChange,
        onInputValueChange,
        inputType,
        name,
        label,
        radioValue,
        currentSearchParam,
    } = props;

    let optionsList:JSX.Element[] = [];

    if(props.optionsList) {
        switch(radioValue) {
            case 'cuisine':
                optionsList = props.optionsList.map((type, idx) => {
                    return <option key={`cuisine-option-${idx}`} value={type.cuisineType}>{type.cuisineType}</option>
                });
                break;
            case 'avg_grade':
                optionsList = props.optionsList.map((grade, idx) => {
                    return <option key={`avg-grade-option-${idx}`} value={grade}>{grade.toUpperCase()}</option>
                });
                break;
            case 'zip':
                optionsList = props.optionsList.map((zip, idx) => {
                    return <option key={`zipcode-option-${idx}`} value={zip.zip}>{zip.zip}</option>
                });
                break;
            default:
                optionsList = [];
        }
    }

    const [ currentInputValue, setCurrentInputValue ] = useState('');

    const setCurrentValue = (value:string):void => {
        // console.log('value:', value);
        setCurrentInputValue(value);
        onInputValueChange(value);
    };

    const selectInputRef = useRef<HTMLSelectElement>(null);

    const setCurrentSearchParam = ():void => {
        let val:string = '';
        
        switch(inputType){
            case 'select':
                // @ts-ignore
                // val = radioValue === 'avg_grade' ? props.optionsList[0] : props.optionsList[0].value;
                switch(radioValue) {
                    case 'avg_grade':
                        // @ts-ignore
                        val = props.optionsList[0];
                        break;
                    case 'cuisine':
                        // @ts-ignore
                        val = props.optionsList[0].cuisineType;
                        break;
                    case 'zip':
                        // @ts-ignore
                        val = props.optionsList[0].zip;
                        break;
                    default:
                        val = '';
                }
                break;
            default:
                val = currentInputValue;
        }
        if(inputType === 'select') {
            // @ts-ignore
            selectInputRef.current.selectedIndex = 0;
        }
        
        setCurrentValue(val);
        onRadioValueChange(radioValue);
    }

    const input = inputType === 'select' ? (
        <select
            onChange={(e) => {setCurrentValue(e.target.value);}}
            ref={selectInputRef}
            disabled={currentSearchParam !== radioValue}
        >
           {optionsList}
        </select>
    ) : (
        <input
            type='text'
            onChange={(e) => {(setCurrentValue(e.target.value));}}
            // onChange={(e) => {onInputValueChange(e.target.value)}}
            disabled={currentSearchParam !== radioValue}
        />
    );

    return (
        <div className='AttributeSelectorInput'>
            <label>{label}</label>
            <input 
                type='radio'
                name={name}
                onChange={() => {setCurrentSearchParam()}}
                value={radioValue}
                checked={currentSearchParam === radioValue}
            />
            {input}
        </div>
    );
};

export default AttributeSelectorInput;