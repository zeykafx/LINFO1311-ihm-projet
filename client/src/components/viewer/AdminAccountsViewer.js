import React, { useState, useEffect } from "react";

import CButton from "../form/buttons/CButton";
import CPressableIcon from "../form/buttons/CPressableIcon";

import AdminModifyAccountForm from "../form/Accounts/AdminModifyAccountForm";
import AdminDeleteAccountForm from "../form/Accounts/AdminDeleteAccountForm";

import { accountTypes } from "../../Constants/account.js";

import "./AdminAccountsViewer.css";
import Loader from "../misc/Loader";

import {
  Button,
  useDisclosure,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  useToast,
} from "@chakra-ui/react";

function AdminAccountsViewer({}) {
  const [accountList, setAccountList] = useState([]);

  const [usernameSelected, setUsernameSelected] = useState("");

  const [visibleModifyModal, setVisibleModifyModal] = useState(false);
  const [visibleDeleteModal, setVisibleDeleteModal] = useState(false);

  const [loading, setLoading] = useState(true);

  const toast = useToast();

  const { isOpen, onOpen, onClose } = useDisclosure();

  useEffect(() => {
    setLoading(true);

    setTimeout(() => {
      fetch("/api/account/get")
        .then((res) => res.json())
        .then((response) => {
          if (response.status) {
            setAccountList(response["message"]);
          } else {
            setAccountList([]);
            toast({
              title: "Couldn't fetch the accounts",
              description: "Error message: " + response.message,
              status: "error",
              position: "bottom-left",
              duration: 15000,
              isClosable: true,
            });
          }

          setLoading(false);
        });
    }, 100); // Le timeout est pas obligatoire, c'est juste plus beau qu'un flash sur la page
  }, []);

  const transformAccountTypeKeyIntoAccountLabel = (key) => {
    for (let index = 0; index < accountTypes.length; index++) {
      const accountType = accountTypes[index];
      if (accountType.key === key) {
        return accountType.label;
      }
    }
    return "N/A";
  };

  let handleModalClose = () => {
    onClose();
    setVisibleDeleteModal(false);
    setVisibleModifyModal(false);
  };

  return (
    <>
      <Modal isOpen={isOpen} onClose={handleModalClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>
            {(visibleModifyModal ? "Modify " : "Delete ") + usernameSelected}
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            {visibleModifyModal ? (
              <AdminModifyAccountForm accountUsername={usernameSelected} />
            ) : (
              <AdminDeleteAccountForm accountUsername={usernameSelected} />
            )}
          </ModalBody>
          <ModalFooter>
            <Button mr={3} onClick={handleModalClose}>
              Close
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>

      <div className="AAV-container">
        {loading ? (
          <Loader
            color="rgb(94, 94, 94)"
            size={30}
            noAspectRatio={true}
            label="Fetching the accounts..."
          />
        ) : (
          <>
            {accountList.map((account) => (
              <div className="smallAccountViewer" key={account.username}>
                <div className="smallAccountViewer-textContainer">
                  <h2>{account.username}</h2>
                  <h3>
                    {transformAccountTypeKeyIntoAccountLabel(account.type)}
                  </h3>
                </div>

                <div className="smallAccountViewer-buttonsContainer">
                  <CButton
                    text="Modify"
                    onPress={() => {
                      onOpen();
                      setUsernameSelected(account.username);
                      setVisibleModifyModal(true);
                    }}
                  />
                  <CButton
                    text="Delete"
                    type="negative"
                    onPress={() => {
                      onOpen();
                      setUsernameSelected(account.username);
                      setVisibleDeleteModal(true);
                    }}
                  />
                </div>
              </div>
            ))}
          </>
        )}
      </div>
    </>
  );
}
export default AdminAccountsViewer;
