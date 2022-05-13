import React from "react";
import "./Biography.css";

import {
  Box,
  Flex,
  Center,
  Text,
  Square,
  Skeleton,
} from "@chakra-ui/react";

import ChakraUIRenderer from "chakra-ui-markdown-renderer";
import ReactMarkdown from 'react-markdown'


function Biography({biography}) {

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
          size={{ base: "100%", lg: "30%" }}
          height={{ base: "40%", lg: "auto" }}
          m={{ base: "0%", lg: "1%" }}
          bg="#eee"
          borderRadius={5}
          display={{ base: "none", lg: "flex" }}
        >
          <img
            className="image"
            src="/images/slide1.png"
            alt={"image of medeea marinescu"}
          />
        </Square>
        <Box
          overflow={"hidden"}
          width={{ base: "98%", lg: "auto" }}
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
          
          <Skeleton isLoaded={biography !== null}>
            
            <ReactMarkdown
                components={ChakraUIRenderer()}
                children={biography}
                skipHtml
            />
          </Skeleton>
        </Box>
      </Flex>
    </Center>
  );
}
export default Biography;
