import React, { useEffect, useState } from "react";
import { Editor } from "react-draft-wysiwyg";
import { EditorState, convertToRaw, convertFromRaw } from "draft-js";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";

import { Box, Heading, Text, useToast, Divider, HStack } from "@chakra-ui/react";

import ChakraUIRenderer from "chakra-ui-markdown-renderer";
import ReactMarkdown from "https://esm.sh/react-markdown@7";

import { draftToMarkdown, markdownToDraft } from "markdown-draft-js";

import CButton from "../../../components/form/buttons/CButton";
import { Card } from "../Admin";

export default function BioTextEditor() {
  const [editorState, setEditorState] = useState(() =>
    EditorState.createEmpty()
  );
  const [biographyText, setBiographyText] = useState(null);
  const [bioLastEdit, setBioLastEdit] = useState({ username: "", timestamp: 0 });

  const toast = useToast();

  let getBiography = () => {
    fetch("/api/biography", {
      method: "GET",
      credentials: "same-origin",
    })
      .then((res) => res.json())
      .then((json_res) => {
        if (!json_res.status) {
          toast({
            title: "Error, couldn't get the biography",
            description: "Error message: " + json_res.message,
            status: "error",
            position: "bottom-left",
            duration: 15000,
            isClosable: true,
          });
        } else {
          setBiographyText(json_res.biography.content_md);
          let draftFromMD = markdownToDraft(json_res.biography.content_md);
          let editorStateFromMD = convertFromRaw(draftFromMD);
          setEditorState(EditorState.createWithContent(editorStateFromMD));

          setBioLastEdit({
            username: json_res.biography.last_edit_username,
            timestamp: parseInt(json_res.biography.last_edit_timestamp),
          });
        }
      });
  };

  useEffect(() => {
    getBiography();
  }, []); // fetch the biography when the component is mounted

  useEffect(() => {
    let currentEditorContent = editorState.getCurrentContent();
    let rawMarkdown = draftToMarkdown(convertToRaw(currentEditorContent));
    setBiographyText(rawMarkdown);
  }, [editorState]);

  let saveBiography = () => {
    fetch("/api/biography/modify", {
      method: "POST",
      credentials: "same-origin",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ new_content: biographyText }),
    })
      .then((res) => res.json())
      .then((response) => {
        if (response.status) {
          toast({
            title: "Successfully edited the biography!",
            description: "You can now view the edit on the home page.",
            status: "success",
            position: "bottom-left",
            duration: 15000,
            isClosable: true,
          });
        } else {
          toast({
            title: "Error, couldn't edit the biography",
            description: "Error message: " + response.message,
            status: "error",
            position: "bottom-left",
            duration: 15000,
            isClosable: true,
          });
        }
      });
  };

  return (
    <Box p={3}>
      <Heading>Biography editor</Heading>
      <Text>
        You can the biography shown on the frontpage, the edits will be apparent
        on the next page load.
      </Text>
      <Box
        m={2}
        borderWidth={"1px"}
        borderColor={"blackAlpha.200"}
        boxShadow={"sm"}
        borderRadius={5}
      >
        <Editor
          editorState={editorState}
          onEditorStateChange={setEditorState}
        />
      </Box>
      <HStack spacing={2}>
        <CButton
            text="Modify"
            type="positive"
            onPress={() => {
            saveBiography();
            }}
        />
        <Text>Last edit time: <Text as={"span"} fontStyle={"italic"}>{new Date(bioLastEdit.timestamp).toLocaleString()}</Text></Text>
        <Text>by: <Text as={"span"} fontStyle={"italic"}>{bioLastEdit.username}</Text></Text>
      </HStack>
      

      <Divider />
      <Box p={2}>
        <Heading fontSize={"lg"} pb={2}>Preview your edits:</Heading>
        <Card>
            <ReactMarkdown
            components={ChakraUIRenderer()}
            children={biographyText}
            skipHtml
            />
        </Card>
      </Box>
      
    </Box>
  );
}
