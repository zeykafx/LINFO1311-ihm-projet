import {
  Flex,
  Box,
  Grid,
  GridItem,
  Text,
  AspectRatio,
  useDisclosure,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalBody,
  ModalCloseButton,
  ModalHeader,
  useToast,
  Skeleton,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";

export const Gallery = (props) => {
  const [images, setImages] = useState([]);

  const [selectedImage, setSelectedImage] = useState({});

  const {
    isOpen: isOpen_imageViewer,
    onOpen: onOpen_imageViewer,
    onClose: onClose_imageViewer,
  } = useDisclosure();

  const toast = useToast();

  let fetchImages = () => {
    fetch("/api/images/get", {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    })
      .then((res) => res.json())
      .then((response) => {
        if (response.status) {
          setImages(response["message"]);
        } else {
          setImages([]);

          toast({
            title: "Couldn't fetch the images",
            description: "Error message: " + response.message,
            status: "error",
            position: "bottom-left",
            duration: 15000,
            isClosable: true,
          });
        }
      });
  };

  useEffect(() => {
    fetchImages();
  }, []);

  return (
    <>
      {selectedImage && (
        <Modal
          isOpen={isOpen_imageViewer}
          onClose={onClose_imageViewer}
          isCentered
          scrollBehavior={"inside"}
          size={"xl"}
        >
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>{selectedImage.name}</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              <Text fontWeight={"500"} fontSize="sm" color="black" mb="8px">
                {selectedImage.description}
              </Text>
              <Box
                w={"100%"}
                h={"100%"}
                display={"flex"}
                justifyContent={"center"}
                alignItems={"center"}
              >
                <img
                  style={{
                    width: "100%",
                  }}
                  src={"/photos/" + selectedImage.filename}
                />
              </Box>
              <Box h={"20px"} />
            </ModalBody>
          </ModalContent>
        </Modal>
      )}

      <Flex
        align="center"
        justify="center"
        width={"100vw"}
        minHeight={"100vh"}
        bg="#eee"
        maxW={"100%"}
        flexDirection={"column"}
      >
        <Text
          fontSize={"4xl"}
          color="black"
          fontWeight={"500"}
          margin={"40px 0px"}
        >
          Gallery
        </Text>
        <Grid
          width={"94%"}
          height={"100%"}
          margin={"0% 3%"}
          templateColumns={{
            base: "repeat(1, 1fr)",
            sm: "repeat(2, 1fr)",
            md: "repeat(3, 1fr)",
            lg: "repeat(5, 1fr)",
          }}
          gap={"10px"}
        >
          {images.map((image) => (
            <GridItem
              w="100%"
              height="fit-content"
              pos={"relative"}
              cursor={"pointer"}
              borderWidth="1px"
              borderColor="#eee"
              _hover={{
                shadow: "sm",
                borderWidth: "1px",
                borderColor: "gray.700",
              }}
              onClick={() => {
                setSelectedImage(image);
                onOpen_imageViewer();
              }}
            >
              <AspectRatio
                ratio={1}
                ratio={1}
                bg="#dedede"
                display={"flex"}
                justifyContent={"center"}
                alignItems={"center"}
              >
                <img
                  style={{
                    width: "100%",
                  }}
                  src={"/photos/" + image.filename}
                />
              </AspectRatio>
              <Box
                pos={"absolute"}
                bottom={"10px"}
                width={"90%"}
                mr={"5%"}
                ml={"5%"}
                padding={"5px"}
                bg="white"
                borderRadius={"5px"}
                shadow="md"
                textAlign={"center"}
              >
                <Text fontWeight={"500"} color="black" fontSize={"sm"}>
                  {image.name}
                </Text>
              </Box>
            </GridItem>
          ))}
        </Grid>
        <Box h={"100px"}></Box>
      </Flex>
    </>
  );
};
