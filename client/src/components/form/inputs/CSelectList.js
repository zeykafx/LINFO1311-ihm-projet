import React, { useState, useEffect } from 'react';
import "./CSelectList.css";
import "../commonStyle.css";

function CSelectList({
    label,
    value, 
    feedback,
    options=[]
}) {

    const [localValue, setLocalValue] = useState(value);
    
    useEffect(() => {
        setLocalValue(value);
    }, [value])

    const updateLocalValue = (event) => {
        let toBeSetValue = event.target.value;

        setLocalValue(toBeSetValue);
        feedback(toBeSetValue);
    }

    return (
        <div className="CSelectListContainer">
            <div className="CSelectList-TextElements">
                <label className="CSelectListLabel">{label}</label>
            </div>
            <select className="CSelectList" onChange={(event) => updateLocalValue(event)} value={localValue}>
                {options.map((option) =>
                    <option
                        key={option["key"]}
                        value={option["key"]}
                    >
                        {`${option["label"]} : ${option["description"]} `}
                    </option>
                )}
            </select>
        </div>
    )

}
export default CSelectList;