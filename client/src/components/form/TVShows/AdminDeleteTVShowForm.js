import { useToast } from "@chakra-ui/react";
import React from "react";
import { useState } from "react";

import CButton from "../buttons/CButton";

import "../commonStyle.css";
import "./AdminDeleteTVShowForm.css";

function AdminDeleteTVShowForm({ TVShowData, fetchTVShows, handleModalClose }) {
  const [responseType, setResponseType] = useState("");
  const [response, setResponse] = useState("");
  const toast = useToast();

  const deleteTVShow = () => {

    setResponse("");

    const data = {
      id: TVShowData.id,
    };

    fetch("/api/tvshows/delete", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    }).then((res) =>
      res.json().then((response) => {
        if (response.status) {
          // TV Show deletion successful
          setResponseType("success");
          // setResponse("This TV show has succesfully been deleted");
          toast({
            title: "Success",
            description: "This TV Show has succesfully been deleted",
            status: "success",
            position: "bottom-left",
            duration: 15000,
            isClosable: true,
          });
          fetchTVShows();
          handleModalClose();
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
        Once pressed, the TV Show with the name <b>"{TVShowData.name}"</b> will
        be permanently deleted. It won't be recoverable nor accessible.
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
          text="Delete this TV Show permanently"
          type="negative"
          onPress={() => deleteTVShow()}
        />
      </div>
    </>
  );
}
export default AdminDeleteTVShowForm;
