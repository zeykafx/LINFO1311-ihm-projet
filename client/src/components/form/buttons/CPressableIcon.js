import React from 'react';
import "./CPressableIcon.css";
import "../commonStyle.css";

import { FaTimes } from 'react-icons/fa';

function CPressableIcon({
    iconName,
    color="black",
    onPress=()=>{},
    size=18
}) {

    const getIcon = (iconName) => {
        switch(iconName){
            case "close":
                return <FaTimes color={color} size={size}/>
            default:
                return <></>
        }
    }

    return (
        <button className={`CPressableIcon`} onClick={onPress}>
            <h3>{getIcon(iconName)}</h3>
        </button>
    )

}
export default CPressableIcon;