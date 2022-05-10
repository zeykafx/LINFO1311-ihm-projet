import { useToast } from "@chakra-ui/react";
import React from "react";
import { useState } from "react";

import CButton from "../buttons/CButton";

import "../commonStyle.css";
import "./AdminDeleteMovieForm.css";

function AdminDeleteMovieForm({ movieData, fetchMovies, handleModalClose }) {
  const [responseType, setResponseType] = useState("");
  const [response, setResponse] = useState("");

  const toast = useToast();

  const deleteMovie = () => {
    setResponse("");

    const data = {
      id: movieData.id,
    };

    fetch("/api/movies/delete", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    }).then((res) =>
      res.json().then((response) => {
        if (response.status) {
          // Movie deletion successful
          setResponseType("success");
          // setResponse("This movie has succesfully been deleted");
          toast({
            title: "Success",
            description: "This movie has succesfully been deleted ",
            status: "success",
            position: "bottom-left",
            duration: 15000,
            isClosable: true,
          });
          fetchMovies();
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
        Once pressed, the movie with the name <b>"{movieData.name}"</b> will be
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
          text="Delete this movie permanently"
          type="negative"
          onPress={() => deleteMovie()}
        />
      </div>
    </>
  );
}
export default AdminDeleteMovieForm;
