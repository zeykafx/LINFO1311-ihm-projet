import React from 'react';
import { useState } from 'react';

import { accountTypes } from '../../Constants/account.js';

import CButton from './buttons/CButton';
import CTextInput from './inputs/CTextInput';
import CSelectList from './inputs/CSelectList';

import "./commonStyle.css";
import { useToast } from '@chakra-ui/react';

function AdminCreateAccountForm({}) {

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [passwordVerif, setPasswordVerif] = useState("");
    const [accountType, setAccountType] = useState("editor");

    const [response, setResponse] = useState("");
    const toast = useToast();

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
                toast({
                    title: "Successfully created new account",
                    description: "You can now log in with that account.",
                    status: "success",
                    position: "bottom-left",
                    duration: 15000,
                    isClosable: true,
                  });
            } else {
                // Error while trying
                setResponse(response.message);
                
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

            <CTextInput 
                label="Password verification"
                hidden={true}
                placeholder="Please enter your password"
                value={passwordVerif}
                feedback={(value) => setPasswordVerif(value)}
                maxSize={256}
            />

            <CSelectList 
                label="Account type"
                placeholder="Please enter your account type"
                value={accountType}
                feedback={(value) => setAccountType(value)}
                options={accountTypes}
            />

            <CButton 
                disabled={!(username!=="" && password !=="" && passwordVerif !=="")}
                text="Create"
                type="submit"
            />

        </form>
    )

}
export default AdminCreateAccountForm;