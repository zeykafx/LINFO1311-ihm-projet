import React, { useState, useEffect } from 'react';

import CButton from '../form/buttons/CButton';
import CPressableIcon from '../form/buttons/CPressableIcon';

import AdminModifyAccountForm from '../form/AdminModifyAccountForm';
import AdminDeleteAccountForm from '../form/AdminDeleteAccountForm';


import { accountTypes } from '../../Constants/account.js';

import "./AdminAccountsViewer.css";
import "../modal.css";
import Loader from '../misc/Loader';

function AdminAccountsViewer({}) {

    const [accountList, setAccountList] = useState([]);
    
    const [usernameToModify, setUsernameToModify] = useState(false);
    const [usernameToDelete, setUsernameToDelete] = useState(false);

    const [visibleModifyModal, setVisibleModifyModal] = useState(false);
    const [visibleDeleteModal, setVisibleDeleteModal] = useState(false);

    const [loading, setLoading] = useState(true);

    const [responseVerification, setResponseVerification] = useState("");

    useEffect(() => {
        setLoading(true);

        setTimeout(() => {
            fetch("/api/account/get")
            .then((res) => res.json())
            .then((response) => {
                if(response.status){
                    setAccountList(response["message"]);
                } else {
                    // show error?
                    setAccountList([]);
                }

                setLoading(false);
            });
        }, 1000); // Le timeout est pas obligatoire, c'est juste plus beau qu'un flash sur la page

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
                    <AdminDeleteAccountForm accountUsername={usernameToDelete}/>
                </div>
            </div>
            }
        </div>
        }
        
        <div className="AAV-container">
            { loading 
            ? <Loader color="rgb(94, 94, 94)" size={30} noAspectRatio={true} label="Fetching the accounts..."/>
            :
            <>
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
            </>
            }
        </div>
        </>
    )

}
export default AdminAccountsViewer;