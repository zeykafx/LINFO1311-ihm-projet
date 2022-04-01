import React, { useEffect } from 'react';
import { useState } from 'react';
import CPressableIcon from '../form/buttons/CPressableIcon';

import "./AdminAccountVerificationFeedback.css";

function AdminAccountVerificationFeedback({
    isAdminAccountVerified
}) {

    const getTitle = () => {
        return isAdminAccountVerified 
            ? "Your admin account has been verified"
            : "Your admin account has not been verified"
    }

    const getIcon = () => {
        return isAdminAccountVerified
            ? <CPressableIcon iconName="success" color="green" size={40}/>
            : <CPressableIcon iconName="error" color="red" size={40}/>
    }

    return (
        <div className="AAVF-Container">
            <div className="AAVF-IconContainer">
                <h2>{getIcon()}</h2>
            </div>
            <div className="AAVF-TextContainer">
                <h2>{getTitle()}</h2>
            </div>
        </div>
    )

}
export default AdminAccountVerificationFeedback;