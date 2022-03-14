import React, { useEffect } from 'react';
import { useState } from 'react';

import CButton from './buttons/CButton';
import CTextInput from './inputs/CTextInput';

import "./commonStyle.css";

function AdminLoginForm({
    customHandler=false,
    feedback=()=>{},
    customResponse="",
    submitButtonText="Login"
}) {

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const [response, setResponse] = useState("");

    useEffect(() => {
        setResponse(customResponse);
    }, [customResponse]);

    const handleSubmit = (e) => {
        e.preventDefault();

        const data = {
            username: username,
            password: password
        };

        if (customHandler){
            feedback(data)
            return;
        }

        setResponse("");

        fetch("/api/account/login", {
            method: "POST",
            headers: {'Content-Type': 'application/json'}, 
            body: JSON.stringify(data)
        }).then(res => res.json().then((response) => {

            if (response.status){
                // Login successful
                console.log("Login successful");
            } else {
                // Error while trying
                setResponse(response.message)
            }

        }));

    }

    return (
        <form onSubmit={e => {handleSubmit(e)}}>

            { response &&
                <div className="formResponse">
                    <h3>{response}</h3>
                </div>
            }

            <CTextInput 
                label="Username"
                placeholder="Please enter your username"
                value={username}
                feedback={(value) => setUsername(value)}
                maxSize={25}
            />

            <CTextInput 
                label="Password"
                hidden={true}
                placeholder="Please enter your password"
                value={password}
                feedback={(value) => setPassword(value)}
                maxSize={256}
            />

            <CButton 
                disabled={!(username!=="" && password !=="")}
                text={submitButtonText}
                type="submit"
            />

        </form>
    )

}
export default AdminLoginForm;