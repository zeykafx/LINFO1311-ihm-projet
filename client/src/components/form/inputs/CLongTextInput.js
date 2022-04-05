import React, { useEffect, useState } from 'react';
import "./CLongTextInput.css";
import "../commonStyle.css";

function CLongTextInput({
    label,
    placeholder, 
    value, 
    feedback,
    maxSize=0,
    disabled=false,
    inheritedErrorMessageExistence=false,
    inheritedErrorMessage=""
}) {

    const [localValue, setLocalValue] = useState(value);
    
    const [errorMessage, setErrorMessage] = useState("");

    useEffect(() => {
        setLocalValue(value);
    }, [value])

    const updateLocalValue = (event) => {
        let toBeSetValue = event.target.value;
        if(maxSize > 0){
            if(toBeSetValue.length > maxSize) {
                toBeSetValue = toBeSetValue.slice(0, maxSize);

                setErrorMessage(`The username can't be longer than ${maxSize} caracters`);
            }
        }
        setLocalValue(toBeSetValue);
        feedback(toBeSetValue);
    }

    return (
        <div className={"CLongTextInputContainer " + (disabled ? "disabled" : "")}>
            <div className="CLongTextInput-TextElements">
                <label className="CLongTextInputLabel">{label}</label>
                {(inheritedErrorMessageExistence && inheritedErrorMessage!=="") &&
                <h3 className="InputErrorMessage">{inheritedErrorMessage}</h3>
                }
                {errorMessage!=="" &&
                <h3 className="InputErrorMessage">{errorMessage}</h3>
                }
            </div>
            <textarea
                className={errorMessage ? "CLongTextInput error" : "CTextInput"}
                placeholder={placeholder}
                value={localValue}
                onChange={updateLocalValue}
                maxLength={maxSize}
            />
            <span className="letterCounter">
                {localValue.length + "/" + maxSize}
            </span>
        </div>
    )

}
export default CLongTextInput;