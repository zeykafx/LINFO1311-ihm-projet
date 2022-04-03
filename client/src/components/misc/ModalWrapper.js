import React, { useEffect, useState } from 'react';

import {Rnd} from 'react-rnd';

import CPressableIcon from '../form/buttons/CPressableIcon';

import "./modal.css";

function ModalWrapper({
    children,
    title,
    onPressClose=()=>{},
}) {

    const [isVisible, setIsVisible] = useState(false);

    const [width, setWidth] = useState(720);
    const [height, setHeight] = useState(500);

    const [windowWidth, setWindowWidth] = useState(1000);
    const [windowHeight, setWindowHeight] = useState(1000);

    useEffect(() => {
        setWindowWidth(window.innerWidth);
        setWindowHeight(window.innerHeight); 

        if(!isVisible){
            setTimeout(() => {
                setIsVisible(true);
            }, 50);
        }

    }, [])

    const getXDefaultPos = () => { return (windowWidth/2) - (width/2); }
    const getYDefaultPos = () => { return (windowHeight/2) - (height/2); }
    const [x, setX] = useState(getXDefaultPos());
    const [y, setY] = useState(getYDefaultPos());

    useEffect(() => {
        setX( getXDefaultPos() );
        setY( getYDefaultPos() );
    }, [windowWidth, windowHeight])

    return (
        <>
        { isVisible &&
            <Rnd
            size={{ width: width,  height: height }}
            position={{ x: x, y: y }}
            onDragStop={(e, d) => { setX(d.x); setY(d.y); }}
            onResizeStop={(e, direction, ref, delta, position) => {
                setWidth(ref.style.width);
                setHeight(ref.style.height);
            }}
            minWidth={320}
            minHeight={320}
            maxWidth={windowWidth*0.9}
            maxHeight={windowHeight*0.9}
            dragHandleClassName="modal-title"
        >
            <div className="modal">
                <div className="modal-title">
                    <h2>{title}</h2>
                    <CPressableIcon 
                        iconName="close"
                        color="black"
                        size={25}
                        onPress={onPressClose}
                    />
                </div>
                <div className="modal-content">
                    {children}
                </div>
            </div>
        </Rnd>
        }
        </>
    )

}
export default ModalWrapper;