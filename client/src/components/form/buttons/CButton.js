import React from 'react';
import "./CButton.css";
import "../commonStyle.css";

function CButton({
    disabled=false,
    text,
    type="",
    onPress=()=>{},
    buttonType="submit"
}) {

    return (
        <button className={`CButton ${type} ${disabled ? "disabled" : ""}`} onClick={onPress} type={buttonType}>
            {text}
        </button>
    )

}
export default CButton;