import React, { useState, useEffect } from 'react';

import CButton from '../form/buttons/CButton';
import CPressableIcon from '../form/buttons/CPressableIcon';

import AdminLoginForm from '../form/AdminLoginForm';
import AdminModifyAccountForm from '../form/AdminModifyAccountForm';

import { accountTypes } from '../../Constants/account.js';

import "./AdminAccountsViewer.css";
import "../modal.css";

function AdminAccountsViewer({}) {

    const [accountList, setAccountList] = useState([]);
    
    const [usernameToModify, setUsernameToModify] = useState(false);
    const [usernameToDelete, setUsernameToDelete] = useState(false);

    const [visibleModifyModal, setVisibleModifyModal] = useState(false);
    const [visibleDeleteModal, setVisibleDeleteModal] = useState(false);

    const [responseVerification, setResponseVerification] = useState("");

    useEffect(() => {
      fetch("/api/account/get")
        .then((res) => res.json())
        .then((response) => {
            if(response.status){
                setAccountList(response["message"]);
            } else {
                // show error?
                setAccountList([]);
            }
        });
    }, []);

    const transformAccountTypeKeyIntoAccountLabel = (key) => {
        for (let index = 0; index < accountTypes.length; index++) {
            const accountType = accountTypes[index];
            if(accountType.key==key) {
                return accountType.label
            }   
        }
        return "N/A"
    }
    
    const handleCredentialsVerification = (credentials) => {

        credentials.accountType = "admin";

        setResponseVerification("");

        fetch("/api/account/verify", {
            method: "POST",
            headers: {'Content-Type': 'application/json'}, 
            body: JSON.stringify(credentials)
        }).then(res => res.json().then((response) => {

            if (response.status){
                // Verification successful
                console.log("Verification successful");
            } else {
                // Error while trying
                setResponseVerification(response.message)
            }

        }));

    }

    return (
        <>

        { (visibleModifyModal || visibleDeleteModal) &&
        <div className="modal-container">
            { visibleModifyModal &&
            <div className="modal">
                <div className="modal-title">
                    <h2>Modify account - {usernameToModify}</h2>
                    <CPressableIcon 
                        iconName="close"
                        color="black"
                        size={25}
                        onPress={() => {setVisibleModifyModal(false); setUsernameToModify("")}}
                    />
                </div>
                <div className="modal-content">
                    <AdminModifyAccountForm accountUsername={usernameToModify}/>
                </div>
            </div>
            }

            { visibleDeleteModal &&
            <div className="modal">
                <div className="modal-title">
                    <h2>Delete account - {usernameToDelete}</h2>
                    <CPressableIcon 
                        iconName="close"
                        color="black"
                        size={25}
                        onPress={() => {setVisibleDeleteModal(false); setUsernameToDelete("")}}
                    />
                </div>
                <div className="modal-content">
                    <p className="modal-text">Please enter an admin account username and password to proceed with the deletion of the account "{usernameToDelete}".</p>
                    <AdminLoginForm 
                        customHandler={true}
                        feedback={(credentials) => handleCredentialsVerification(credentials)}
                        customResponse={responseVerification}
                        submitButtonText="Verify"
                    />
                </div>
            </div>
            }
        </div>
        }
        
        <div className="AAV-container">
            {accountList.map((account) =>
                <div className="smallAccountViewer" key={account.username}>
                    <div className="smallAccountViewer-textContainer">
                        <h2>{account.username}</h2>
                        <h3>{transformAccountTypeKeyIntoAccountLabel(account.type)}</h3>
                    </div>
                    <div className="smallAccountViewer-buttonsContainer">
                        <CButton 
                            text="Modify"
                            onPress={() => {setVisibleModifyModal(true); setUsernameToModify(account.username)}}
                        />
                        <CButton 
                            text="Delete"
                            type="negative"
                            onPress={() => {setVisibleDeleteModal(true); setUsernameToDelete(account.username); setResponseVerification("");}}
                        />
                    </div>
                </div>
            )}
        </div>
        </>
    )

}
export default AdminAccountsViewer;