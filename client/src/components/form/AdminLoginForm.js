import React, {useEffect} from 'react';
import {useState} from 'react';

import CButton from './buttons/CButton';
import CTextInput from './inputs/CTextInput';
import {useToast} from '@chakra-ui/react'
import {useNavigate} from "react-router-dom";

import "./commonStyle.css";

// interface IAdminLoginFormProps {
//     setIsUserAuthed: (boolean) => void;
//     setUsername: (string) => void;
//     closeFunction: () => void;
//     redirect: boolean;
// }


function AdminLoginForm(props, {
            customHandler = false,
            feedback = () => {},
            customResponse = "",
            submitButtonText = "Login",
                        }) {
    const toast = useToast()
    let navigate = useNavigate();

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

        if (customHandler) {
            feedback(data);
            return;
        }

        setResponse("");

        fetch("/api/account/login", {
            method: "POST",
            headers: {'Content-Type': 'application/json'},
            credentials: "same-origin",
            body: JSON.stringify(data)
        }).then(res => res.json().then((response) => {

            if (response.status) {
                // Login successful
                toast({
                    title: 'Successful login!',
                    description: "You have been logged in.",
                    status: 'success',
                    position: 'bottom-left',
                    duration: 15000,
                    isClosable: true,
                })

                // close the modal
                props.closeFunction();

                // set the username and set that user is authenticated
                props.setIsUserAuthed(true);
                props.setUsername(response["username"]);
                props.setAccountType(response["type"]);

                if (props.redirect) {
                    // on redirige vers le panel admin
                    navigate("/admin", {replace: true});
                }

            } else {
                // Error while trying
                setResponse(response.message)
            }

        }));

    }

    return (
        <form onSubmit={e => {
            handleSubmit(e)
        }}>

            {response &&
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
                disabled={!(username !== "" && password !== "")}
                text={submitButtonText}
                type="submit"
            />

        </form>
    )

}

export default AdminLoginForm;