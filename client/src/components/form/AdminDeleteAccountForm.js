import React from "react";
import { useState } from "react";


import CButton from "./buttons/CButton";

import "./commonStyle.css";
import "./AdminDeleteAccountForm.css";

function AdminDeleteAccountForm({ accountUsername }) {
  const [responseType, setResponseType] = useState("");
  const [response, setResponse] = useState("");

  const deleteAccount = () => {

    setResponse("");

    const data = {
      username: accountUsername,
    };

    fetch("/api/account/delete", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    }).then((res) =>
      res.json().then((response) => {
        if (response.status) {
          // Account modification successful
          setResponseType("success");
          setResponse("This account has succesfully been deleted");
        } else {
          // Error while trying
          setResponseType("error");
          setResponse(response.message);
        }
      })
    );
  };

  return (
    <>
      <p className="description-text">
        Once pressed, the account with the username <b>"{accountUsername}"</b>{" "}
        will be permanently deleted. It won't be recoverable nor accessible.
      </p>

      <hr />

      {response && (
        <div
          className={
            "formResponse " + (responseType === "success" ? "success" : "error")
          }
        >
          <h3>{response}</h3>
        </div>
      )}

      <div className="centerButton">
        <CButton
          text="Delete this account permanently"
          type="negative"
          onPress={() => deleteAccount()}
        />
      </div>
    </>
  );
}
export default AdminDeleteAccountForm;
