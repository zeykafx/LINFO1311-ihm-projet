import React, { useState } from "react";
import Compressor from "compressorjs";
import "./PhotoUploader.css";

export default function PhotoUploader({
  labelText,
  disabled = false,
  inheritedErrorMessageExistence = false,
  inheritedErrorMessage = "",
  filenameFunction,
}) {
  const [errorMessage, setErrorMessage] = useState("");

  let handleFileUpload = (e) => {
    const image = e.target.files[0];
    // create a compressed version of the image then upload it to the server
    new Compressor(image, {
      quality: 0.8,
      success: (result) => {
        uploadToServer(result, `${result.name}-${Date.now()}`, result.type.split("/")[1]);
      },
    });
  };

  let uploadToServer = (image, name, ext) => {
    let formData = new FormData();
    formData.append("image", image, name); // append the file and the filename to the form data, the form data is required if we want multer to parse the file correctly
    fetch("/api/upload", {
      headers: {
        Accept: "multipart/form-data",
      },
      body: formData,
      method: "POST",
    }).then((res) => {
      if (res.status !== 200) {
        setErrorMessage("Couldn't updload the image, please try again...");
      } else {
        // send the name of the file back up to the form so that we can link the name of the file to the movie/tv series in the database
        filenameFunction(name+"." + ext);
      }
    });
  };

  return (
    <div className={"PhotoUploaderContainer" + (disabled ? " disabled" : "")}>
        <label className="PhotoUploader-label" for="PhotoUploaderInput">{labelText}</label>
        {inheritedErrorMessageExistence && inheritedErrorMessage !== "" && (
          <h3 className="InputErrorMessage">{inheritedErrorMessage}</h3>
        )}
        {errorMessage !== "" && (
          <h3 className="InputErrorMessage">{errorMessage}</h3>
        )}
      <input
        className={
          errorMessage ? "PhotoUploaderInput error" : "PhotoUploaderInput"
        }
        id="PhotoUploaderInput"
        accept="image/*,capture=camera"
        capture="”camera"
        type="file"
        onChange={(event) => handleFileUpload(event)}
      />
    </div>
  );
}
