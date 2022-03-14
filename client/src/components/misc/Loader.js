import React from 'react';

import { TailSpin } from  'react-loader-spinner'


import "./Loader.css";

function Loader({
    color,
    size,
    label=""
}) {

    return (
        <div className="loaderContainer">
            <TailSpin color={color} height={size} width={size} />
            { label!=="" &&
                <h4>{label}</h4>
            }
        </div>
    )

}
export default Loader;