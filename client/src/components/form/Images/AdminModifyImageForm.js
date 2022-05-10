import React, { useState } from "react";

import CButton from "../buttons/CButton";
import CTextInput from "../inputs/CTextInput";

import "../commonStyle.css";

import CLongTextInput from "../inputs/CLongTextInput.js";
import { useToast } from "@chakra-ui/react";

export default function AdminModifyImageForm({
  imageData,
  fetchImages,
  handleModalClose,
}) {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");

  const [responseType, setResponseType] = useState("");
  const [response, setResponse] = useState("");

  const toast = useToast();

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!canSubmit()) return;

    setResponse("");

    const data = {
      old_name: imageData.name,
      name: name,
      description: description,
    };

    fetch("/api/images/modify", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    }).then((res) =>
      res.json().then((response) => {
        if (response.status) {
          // image modification successful
          setResponseType("success");
          toast({
            title: "Success",
            description: "This image has succesfully been modified ",
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

  const canSubmit = () => {
    return name !== "" && description !== "";
  };

  return (
    <>
      <form
        onSubmit={(e) => {
          handleSubmit(e);
        }}
      >
        {response && (
          <div
            className={
              "formResponse " +
              (responseType === "success" ? "success" : "error")
            }
          >
            <h3>{response}</h3>
          </div>
        )}

        <CTextInput
          label="Image's name"
          placeholder="Please enter the image's name"
          value={name}
          feedback={(value) => setName(value)}
          maxSize={512}
        />

        <hr />

        <CLongTextInput
          label="Image's description"
          placeholder="Please enter the Image's description"
          value={description}
          feedback={(value) => setDescription(value)}
          maxSize={2000}
        />

        <CButton disabled={!canSubmit()} text="Modify" type="submit" />
      </form>
    </>
  );
}
