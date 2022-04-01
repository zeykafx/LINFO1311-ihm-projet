import React, { useEffect, useState } from 'react';
import "./CTextInput.css";
import "../commonStyle.css";

function CTextInput({
    label,
    placeholder, 
    value, 
    feedback,
    maxSize=0,
    hidden=false,
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

                setErrorMessage(`The inputted text can't be longer than ${maxSize} caracters`);
            }
        }
        setLocalValue(toBeSetValue);
        feedback(toBeSetValue);
    }

    return (
        <div className={"CTextInputContainer " + (disabled ? "disabled" : "")}>
            <div className="CTextInput-TextElements">
                <label className="CTextInputLabel">{label}</label>
                {(inheritedErrorMessageExistence && inheritedErrorMessage!=="") &&
                <h3 className="InputErrorMessage">{inheritedErrorMessage}</h3>
                }
                {errorMessage!=="" &&
                <h3 className="InputErrorMessage">{errorMessage}</h3>
                }
            </div>
            <input
                className={errorMessage ? "CTextInput error" : "CTextInput"}
                type={hidden ? "password" : "text"}
                placeholder={placeholder}
                value={localValue}
                onChange={updateLocalValue}
            />
        </div>
    )

}
export default CTextInput;