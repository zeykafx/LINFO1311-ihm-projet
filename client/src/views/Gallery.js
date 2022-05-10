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
    ModalHeader
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";

export const Gallery = (props) => {

    const [images, setImages] = useState([
        {
            title: "Title 1",
            filename: 'https://picsum.photos/id/1018/1000/1500/',
        },
        {
            title: "Title 2",
            filename: 'https://picsum.photos/id/1015/1000/600/',
        },
        {
            title: "Long title fahiapfhafa 6 7a46a8f4 a64f6a46a 4fa6f",
            filename: 'https://picsum.photos/id/1019/1000/600/',
        },
    ]);

    const [selectedImage, setSelectedImage] = useState({});

    const {
        isOpen: isOpen_imageViewer,
        onOpen: onOpen_imageViewer,
        onClose: onClose_imageViewer,
    } = useDisclosure();

    useEffect(() => {

        if (images.length < 25){
            for (let index = 0; index < 20; index++) {
                setImages([...images, ...images]);
            }
        }

    }, []);

    return (
        <>  
            { selectedImage &&
            <Modal
                isOpen={isOpen_imageViewer}
                onClose={onClose_imageViewer}
                isCentered
                scrollBehavior={"inside"}
                size={"xl"}
            >
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>{selectedImage.title}</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        <Box
                            w={"100%"}
                            h={"100%"}
                            display={"flex"}
                            justifyContent={"center"}
                            alignItems={"center"}
                        >
                            <img
                                style={{
                                    width: "100%"
                                }}
                                src={"/photos/"+selectedImage.filename}
                            />      
                        </Box>
                        <Box h={"20px"} />
                    </ModalBody>
                </ModalContent>
            </Modal>
            }

            <Flex
                align="center"
                justify="center"
                width={'100vw'}
                minHeight={'100vh'}
                bg='#eee'
                maxW={"100%"}
                flexDirection={"column"}
                >
                    <Text fontSize={"4xl"} color="black" fontWeight={"500"} margin={"40px 0px"}>Gallery</Text>
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
                        { images.map((image) => (
                        <GridItem 
                        w='100%' 
                        height='fit-content' 
                        pos={"relative"} 
                        cursor={"pointer"}
                        borderWidth="1px"
                        borderColor="#eee"
                        _hover={{
                            shadow: "sm",
                            borderWidth: "1px",
                            borderColor: "gray.700"
                        }}
                        onClick={() => {
                            setSelectedImage(image);
                            onOpen_imageViewer();
                        }}
                        >
                            <AspectRatio  ratio={1}
                                ratio={1}
                                bg="#dedede"
                                display={"flex"}
                                justifyContent={"center"}
                                alignItems={"center"}
                            >
                                <img
                                    style={{
                                        width: "100%"
                                }}
                                    src={"/photos/"+image.filename}
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
                                <Text fontWeight={"500"} color="black" fontSize={"sm"}>{image.title}</Text>
                            </Box>
                        </GridItem>
                        ))}
                    </Grid>
                    <Box h={"100px"}></Box>
            </Flex>

        </>
    );
};