import React from 'react';
import { useState } from 'react';

import CButton from '../buttons/CButton';

import "../commonStyle.css";
import './AdminDeleteTVShowForm.css';
import AdminAccountVerificator from '../../misc/AdminAccountVerificator.js';

function AdminDeleteTVShowForm({
    TVShowData
}) {

    const [responseType, setResponseType] = useState("");
    const [response, setResponse] = useState("");

    const [isAdminAccountVerified, setIsAdminAccountVerified] = useState(false);

    const deleteTVShow = () => {

        if(!isAdminAccountVerified){
            return;
        }

        setResponse("");

        const data = {
            id: TVShowData.id
        };

        fetch("/api/tvshows/delete", {
            method: "POST",
            headers: {'Content-Type': 'application/json'}, 
            body: JSON.stringify(data)
        }).then(res => res.json().then((response) => {
            
            if (response.status){
                // TV Show deletion successful
                setResponseType("success");
                setResponse("This TV show has succesfully been deleted")
            } else {
                // Error while trying
                setResponseType("error");
                setResponse(response.message)
            }

        }));

    }

    return (
        <>

            <AdminAccountVerificator feedback={() => setIsAdminAccountVerified(true)}/>

            { isAdminAccountVerified &&
            <>
                <hr />

                <p className="description-text">Once pressed, the TV Show with the name <b>"{TVShowData.name}"</b> will be permanently deleted. It won't be recoverable nor accessible.</p>
                
                <hr />

                { response &&
                    <div className={"formResponse " + (responseType==="success" ? "success" : "error")}>
                        <h3>{response}</h3>
                    </div>
                }

                <div className="centerButton">
                    <CButton 
                        text="Delete this TV Show permanently"
                        type="negative"
                        onPress={() => deleteTVShow()}
                    />
                </div>

            </>
            }

        </>
    )

}
export default AdminDeleteTVShowForm;