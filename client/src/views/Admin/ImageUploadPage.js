import React, { useState } from "react";
import {
  Box,
  Heading,
  Text,
  useToast,
  Divider,
  Link,
  HStack,
} from "@chakra-ui/react";
import { Link as ReactRouterLink } from "react-router-dom";
import PhotoUploader from "../../components/form/inputs/PhotoUploader";
import CButton from "../../components/form/buttons/CButton";
import CTextInput from "../../components/form/inputs/CTextInput";
import CLongTextInput from "../../components/form/inputs/CLongTextInput";


export default function ImageUploadPage() {
  const [filename, setFilename] = useState("");
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");

  const [response, setResponse] = useState("");
  const toast = useToast();

  const isFormComplete = () => {
    return  name!=="" &&
            description !== "" &&
            filename !== "";
  }

  
  const handleSubmit = (e) => {
    e.preventDefault();
    setResponse("");

    if(!isFormComplete()) return;

    const data = {
        name: name,
        description: description,
        filename: filename
    };

    fetch("/api/image/upload", {
        method: "POST",
        headers: {'Content-Type': 'application/json'}, 
        body: JSON.stringify(data)
    }).then(res => res.json().then((response) => {
        
        if (response.status){
            // upload successful
            toast({
                title: "Success",
                description: "This image has been added to the gallery",
                status: "success",
                position: "bottom-left",
                duration: 15000,
                isClosable: true,
              });
        } else {
            // Error while trying
            setResponse(response.message)
        }

    }));

}


  return (
    <Box p={3}>
      <Heading>Upload Images</Heading>
      <Text>
        You can upload images to the{" "}
        <Link as={ReactRouterLink} to={"/gallery"} color={"blue.500"}>
          gallery
        </Link>{" "}
        using this form.
      </Text>

      <form
        onSubmit={(e) => {
          handleSubmit(e);
        }}
      >
        {response && (
          <div className="formResponse">
            <h3>{response}</h3>
          </div>
        )}

        <CTextInput
          label="Title"
          placeholder="Please enter the name/title that will be shown in the gallery"
          value={name}
          feedback={(value) => setName(value)}
          maxSize={512}
        />

        <PhotoUploader
          label="Image"
          disabled={false}
          inheritedErrorMessageExistence={false}
          filenameFunction={(filename) => setFilename(filename)}
        />

        <CLongTextInput
          label="Image description"
          placeholder="Please enter the image's description"
          value={description}
          feedback={(value) => setDescription(value)}
          maxSize={2000}
        />

        <CButton disabled={!isFormComplete()} text="Create" type="submit" />
      </form>
    </Box>
  );
}
