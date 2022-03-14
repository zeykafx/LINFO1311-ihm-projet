import React from 'react';
import "./CButton.css";
import "../commonStyle.css";

function CButton({
    disabled=false,
    text,
    type="",
    onPress=()=>{}
}) {

    return (
        <button className={`CButton ${type} ${disabled ? "disabled" : ""}`} onClick={onPress} type="submit">
            {text}
        </button>
    )

}
export default CButton;