import { useToast } from "@chakra-ui/react";
import React from "react";
import { useState } from "react";

import CButton from "../buttons/CButton";

import "../commonStyle.css";
import "../Movies/AdminDeleteMovieForm.css";

function AdminDeleteImageForm({ 
    imageData,
    fetchImages,
    handleModalClose,
 }) {
  const [responseType, setResponseType] = useState("");
  const [response, setResponse] = useState("");

  const toast = useToast();

  const deleteImage = () => {
    setResponse("");

    const data = {
      name: imageData.name,
      filename: imageData.filename
    };

    fetch("/api/images/delete", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    }).then((res) =>
      res.json().then((response) => {
        if (response.status) {
          // image deletion successful
          setResponseType("success");
          toast({
            title: "Success",
            description: "This image has succesfully been deleted ",
            status: "success",
            position: "bottom-left",
            duration: 15000,
            isClosable: true,
          });
          fetchImages();
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
        Once pressed, the image with the name <b>"{imageData.name}"</b> will be
        permanently deleted. It won't be recoverable nor accessible.
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
          text="Delete this image permanently"
          type="negative"
          onPress={() => deleteImage()}
        />
      </div>
    </>
  );
}
export default AdminDeleteImageForm;
