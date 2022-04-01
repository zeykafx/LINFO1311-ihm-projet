import React, { useState } from 'react';
import AdminLoginForm from '../form/AdminLoginForm';
import AdminAccountVerificationFeedback from './AdminAccountVerificationFeedback';

import "./AdminAccountVerificator.css";
import Loader from './Loader';

function AdminAccountVerificator({
    feedback
}) {

    const [isAdminAccountVerified, setIsAdminAccountVerified] = useState(false);
    const [responseVerification, setResponseVerification] = useState("");
    const [loading, setLoading] = useState(false);

    const handleCredentialsVerification = (credentials) => {

        credentials.accountType = "admin";

        setResponseVerification("");
        setIsAdminAccountVerified(false);
        setLoading(true);

        fetch("/api/account/verify", {
            method: "POST",
            headers: {'Content-Type': 'application/json'}, 
            body: JSON.stringify(credentials)
        }).then(res => res.json().then((response) => {

            setIsAdminAccountVerified(response.status);

            if (response.status){
                feedback();
            } else {
                setResponseVerification(response.messsage);
            }

            setLoading(false);

        }));

    }

    return (
        <>
            { loading 
            ? 
            <Loader color="rgb(94, 94, 94)" size={30} label="Processing the given credentials..."/>
            : 
            <>
                <AdminAccountVerificationFeedback isAdminAccountVerified={isAdminAccountVerified} />
                { !isAdminAccountVerified &&
                    <AdminLoginForm 
                        customHandler={true}
                        feedback={(credentials) => handleCredentialsVerification(credentials)}
                        customResponse={responseVerification}
                        submitButtonText="Verify"
                    />
                }
            </>
            }
        </>
    )

}
export default AdminAccountVerificator;