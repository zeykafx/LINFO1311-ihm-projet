import React, { useEffect, useState } from 'react';
import "./CDateInput.css";
import "../commonStyle.css";

function CDateInput({
    label,
    value, 
    feedback,
    minDate=0,
    maxDate=-1,
    disabled=false,
    inheritedErrorMessageExistence=false,
    inheritedErrorMessage=""
}) {

    const [localValue, setLocalValue] = useState(null);    
    const [errorMessage, setErrorMessage] = useState("");

    useEffect(() => {
        if(localValue===null){
            setLocalValue(getActualDate());
        }
    }, [])
    
    const getActualDate = () => {
        const actualDate = new Date();
        return actualDate.getTime();
    }

    const transformIntValueIntoHTMLDate = (IntValue) => {
        const JSDate = new Date(IntValue);

        // YYYY-MM-DD
        let YYYY    = (JSDate.getFullYear()).toString();
        let MM      = (JSDate.getMonth()+1).toString();
        let DD      = (JSDate.getDate()).toString();

        if (MM.length==1) MM = "0"+MM;
        if (DD.length==1) DD = "0"+DD;
        while (YYYY.length < 4){
            YYYY = "0"+YYYY;
        }

        return YYYY+"-"+MM+"-"+DD;

    }

    useEffect(() => {
        setLocalValue(value);
    }, [value])

    const updateLocalValue = (event) => {
        let HTMLDate = event.target.value;
        if (HTMLDate==="") return;

        const JSDate = new Date(HTMLDate);

        const toBeSetValue = JSDate.getTime();
        
        setLocalValue(toBeSetValue);
        feedback(toBeSetValue);
    }

    return (
        <div className={"CDateInputContainer " + (disabled ? "disabled" : "")}>
            <div className="CDateInput-TextElements">
                <label className="CDateInputLabel">{label}</label>
                {(inheritedErrorMessageExistence && inheritedErrorMessage!=="") &&
                <h3 className="InputErrorMessage">{inheritedErrorMessage}</h3>
                }
                {errorMessage!=="" &&
                <h3 className="InputErrorMessage">{errorMessage}</h3>
                }
            </div>
            <input
                className={errorMessage ? "CDateInput error" : "CDateInput"}
                type="date"
                value={transformIntValueIntoHTMLDate(localValue)}
                onChange={updateLocalValue}
            />
        </div>
    )

}
export default CDateInput;