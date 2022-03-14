import React, { useState, useEffect } from 'react';
import "./CCheckBox.css";
import "../commonStyle.css";

function CCheckBox({
    label,
    value, 
    feedback
}) {

    const [localValue, setLocalValue] = useState(value);
    
    useEffect(() => {
        setLocalValue(value);
    }, [value])

    const updateLocalValue = (event) => {
        let toBeSetValue = !localValue;

        setLocalValue(toBeSetValue);
        feedback(toBeSetValue);
    }

    return (
        <div className="CCheckBoxContainer">
            <div className="CCheckBox-TextElements">
                <label className="CCheckBoxLabel">{label}</label>
            </div>
            <input
                className="CCheckBox"
                type="checkbox" 
                checked={localValue}
                onChange={(event) => updateLocalValue(event)}
            ></input>
        </div>
    )

}
export default CCheckBox;