import React from "react";
import Select from "react-select";
import makeAnimated from 'react-select/animated';
import {sharedPeopleActions} from "../store";


const animatedComponents = makeAnimated();
const AutoCompleteSearchBarComponent = ({dispatch, setData, options}) => {
    const HandleOnChange = (event) => {
        if (dispatch)
            dispatch(sharedPeopleActions.addAll(event.map(evt => evt.value)))
        else
            setData(event.map(evt => evt.value))
    };
    return (
        <div style={{textAlign: "left", color: "black"}}>
            <Select
                onChange={HandleOnChange}
                isClearable
                closeMenuOnSelect={false}
                components={animatedComponents}
                isMulti={true}
                options={options}
            />
        </div>

    );
}
export default AutoCompleteSearchBarComponent;