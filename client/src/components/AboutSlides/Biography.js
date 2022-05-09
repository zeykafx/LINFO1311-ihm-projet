import React, { useState, useEffect } from "react";
import "./Biography.css";

import {
  Box,
  Flex,
  Center,
  Text,
  Square,
  Skeleton,
  useToast,
} from "@chakra-ui/react";

import ChakraUIRenderer from "chakra-ui-markdown-renderer";
import ReactMarkdown from "https://esm.sh/react-markdown@7";


function Biography({}) {
  const [BiographyText, setBiographyText] = useState(
    null
  );
  const toast = useToast();

  let getBiography = () => {
    fetch("/api/biography", {
      method: "GET",
      headers: {
        headers: {'Content-Type': 'application/json'}, 
      },
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
            setBiographyText(json_res.biography.content_md)
        }
      });
  };

  useEffect(() => {
    getBiography();
  }, []) // fetch the biography when the component is mounted
  

  return (
    <Center
      display={"flex"}
      flex={1}
      bg={"white"}
      justifyContent={"center"}
      alignItems={"center"}
      height={{ base: "100vh", lg: "60vh" }}
      position="relative"
    >
      <Flex
        width={{ base: "94%", lg: "1100px" }}
        maxH={{ base: "94%", lg: "90%" }}
        bg="white"
        overflowY={"hidden"}
        direction={{ base: "column", lg: "row" }}
        borderRadius={5}
        boxShadow="xl"
        borderWidth={"1px"}
        borderColor={"#dedede"}
      >
        <Square
          justifyContent={"center"}
          alignItems={"center"}
          overflow={"hidden"}
          size={{ base: "100%", lg: "48%" }}
          height={{ base: "40%", lg: "auto" }}
          m={{ base: "0%", lg: "1%" }}
          bg="#eee"
          borderRadius={5}
          display={{ base: "none", lg: "flex" }}
        >
          <img
            className="image"
            src="http://localhost:3000/images/slide1.png"
          />
        </Square>
        <Box
          overflow={"hidden"}
          width={{ base: "98%", lg: "48%" }}
          height={{ base: "60%", lg: "auto" }}
          m={"1%"}
          borderRadius={5}
          overflowY={"auto"}
        >
          <Text
            color="black"
            fontWeight="bold"
            fontSize="35px"
            textAlign={"center"}
            m="8px"
            h={"70px"}
            lineHeight={"70px"}
          >
            My biography
          </Text>
          {/* <Box
            bg={"#dedede"}
            width={"100%"}
            height={"1px"}
            margin={"10px 0"}
            opacity={0.5}
          >

          </Box> */}
          <Skeleton isLoaded={BiographyText !== null}>
            {/* <Text color="gray.500" fontWeight="500" fontSize="sm" m="8px">
                {BiographyText}
            </Text> */}
            
            <ReactMarkdown
                components={ChakraUIRenderer()}
                children={BiographyText}
                skipHtml
            />
          </Skeleton>
        </Box>
      </Flex>
    </Center>
  );
}
export default Biography;
