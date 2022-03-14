import React from 'react';
import "./CPressableIcon.css";
import "../commonStyle.css";

import { FaTimes, FaCheck } from 'react-icons/fa';

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
            case "success":
                return <FaCheck color={color} size={size}/>
            case "error":
                return <FaTimes color={color} size={size}/>
            default:
                return <></>
        }
    }

    const getStyle = () => {
        return {
            width: size,
            height: size
        }
    }

    return (
        <button className={`CPressableIcon`} style={getStyle()} onClick={onPress}>
            <h3>{getIcon(iconName)}</h3>
        </button>
    )

}
export default CPressableIcon;