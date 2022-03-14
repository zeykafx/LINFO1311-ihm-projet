import React, { useEffect } from 'react';
import { useState } from 'react';

import { accountTypes } from '../../Constants/account.js';

import CButton from './buttons/CButton';
import CTextInput from './inputs/CTextInput';
import CSelectList from './inputs/CSelectList';
import CCheckBox from './inputs/CCheckBox';

import "./commonStyle.css";

function AdminModifyAccountForm({
    accountUsername
}) {

    const [username, setUsername] = useState("");

    const [shouldEditPassword, setShouldEditPassword] = useState(false);
    const [password, setPassword] = useState("");
    const [passwordVerif, setPasswordVerif] = useState("");

    const [accountType, setAccountType] = useState("editor");

    const [response, setResponse] = useState("");

    useEffect(() => {

        const data = {
            username: accountUsername,
        };

        fetch("/api/account/getAccountDataByUsername", {
            method: "POST",
            headers: {'Content-Type': 'application/json'}, 
            body: JSON.stringify(data)
        }).then(res => res.json().then((response) => {
            
            if (response.status){
                setUsername(response.message.username);

                setPassword("");
                setPasswordVerif("");
                setShouldEditPassword(false);

                setAccountType(response.message.type)
            } else {
                // Error while trying
                setResponse(response.message)
            }

        }));

    }, [accountUsername])

    const handleSubmit = (e) => {
        e.preventDefault();
        setResponse("");

        const data = {
            username: username,
            password: password,
            passwordVerif: passwordVerif,
            accountType: accountType
        };

        fetch("/api/account/create", {
            method: "POST",
            headers: {'Content-Type': 'application/json'}, 
            body: JSON.stringify(data)
        }).then(res => res.json().then((response) => {
            
            if (response.status){
                // Account creation successful
            } else {
                // Error while trying
                setResponse(response.message)
            }

        }));

    }

    const canSubmit = () => {
        if (shouldEditPassword){
            return !(username!=="" && password !=="" && passwordVerif !=="")
        } else {
            return !(username!=="")
        }
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

            <hr />

            <CCheckBox 
                label="Should the password be edited ?"
                value={shouldEditPassword}
                feedback={(value) => setShouldEditPassword(value)}
            />

            <CTextInput 
                label="Password"
                hidden={true}
                placeholder="Please enter your password"
                value={password}
                feedback={(value) => setPassword(value)}
                maxSize={256}
            />

            <CTextInput 
                label="Password verification"
                hidden={true}
                placeholder="Please enter your password"
                value={passwordVerif}
                feedback={(value) => setPasswordVerif(value)}
                maxSize={256}
            />

            <hr />

            <CSelectList 
                label="Account type"
                placeholder="Please enter your account type"
                value={accountType}
                feedback={(value) => setAccountType(value)}
                options={accountTypes}
            />

            <CButton 
                disabled={canSubmit()}
                text="Modify"
                type="submit"
            />

        </form>
    )

}
export default AdminModifyAccountForm;