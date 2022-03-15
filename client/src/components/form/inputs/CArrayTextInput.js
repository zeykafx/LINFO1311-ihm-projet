import React, { useEffect, useState } from 'react';
import "./CArrayTextInput.css";
import "../commonStyle.css";
import CTextInput from './CTextInput';
import CButton from '../buttons/CButton';
import CPressableIcon from '../buttons/CPressableIcon';

function CArrayTextInput({
    label,
    placeholder, 
    values,
    feedback,
    disabled=false,
    maxValues=-1
}) {

    const [localValues, setLocalValues] = useState(values);
    const [newValue, setNewValue] = useState("");

    const [errorMessage, setErrorMessage] = useState("");

    useEffect(() => {
        setLocalValues(values);
    }, [values])

    const changeStateValues = (values) => {
        setLocalValues(values);
        feedback(values);
    }

    const appendNewValue = () => {

        if(maxValues!==-1 && localValues.length >= maxValues) {
            setErrorMessage(`There is a maximum of ${maxValues} values for this input.`);
            return;
        }

        setErrorMessage("");
        changeStateValues([...localValues, newValue]);
        setNewValue("");

    }

    const removeValue = (index) => {

        if(index >= localValues.length) return;

        changeStateValues(localValues.filter(function(value, localIndex) {
            return localIndex !== index
        }));

    }

    return (
        <div className={"CArrayTextInputContainer " + (disabled ? "disabled" : "")}>

            <div className="CArrayTextInput-inputContainer">
                <CTextInput 
                    label={label}
                    placeholder={placeholder}
                    value={newValue}
                    feedback={(value) => setNewValue(value)}
                    inheritedErrorMessageExistence={true}
                    inheritedErrorMessage={errorMessage}
                />
                <div className="CArrayTextInput-inputContainer-buttonContainer">
                    <CButton 
                        buttonType="button"
                        text="Add"
                        type="positive"
                        onPress={() => appendNewValue()}
                    />
                </div>
            </div>

            <div className="CArrayTextInput-ValuesContainer">
                {localValues.length===0 && 
                <div className="CArrayTextInput-noValue">
                    <h2>No values added</h2>
                    { maxValues !== -1 &&
                    <p>There is a maximum of {maxValues} values.</p>
                    }
                </div>
                }
                {localValues.map((value, index) =>
                    <div className="CArrayTextInput-Value" key={index}>
                        <h3>{value}</h3>
                        <CPressableIcon 
                            iconName="delete"
                            color="red"
                            size={25}
                            onPress={() => removeValue(index)}
                        />
                    </div>
                )}
            </div>
        </div>
    )

}
export default CArrayTextInput;