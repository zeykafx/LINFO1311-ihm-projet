import React from 'react';
import "./CButton.css";
import "../commonStyle.css";
import {Button} from "@chakra-ui/react";

function CButton({
    disabled=false,
    text,
    type="",
    onPress=()=>{},
    buttonType="submit"
}) {

    return (
        // <button className={`CButton ${type} ${disabled ? "disabled" : ""}`} onClick={onPress} type={buttonType}>
        //     {text}
        // </button>
        <Button
            className={type}
            color={"white"}
            backgroundColor={"rgb(94, 94, 94)"}
            padding={"12px 25px"}
            margin={"10px"}
            isDisabled={disabled}
            onClick={onPress}
            type={buttonType}>
                {text}
        </Button>
    )

}
export default CButton;