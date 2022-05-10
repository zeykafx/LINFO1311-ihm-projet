import {Box, Button, Flex, FormControl, FormLabel, useToast, Input, InputGroup, InputLeftElement, Text, Textarea, useColorModeValue, VStack} from "@chakra-ui/react";
import {BsPerson, AiOutlineMail} from "react-icons/all";
import React, { useState } from "react";

export const Contact = (props) => {

    const [name, setName] = useState("");
    const [mail, setMail] = useState("");
    const [message, setMessage] = useState("");

    const [isSending, setIsSending] = useState(false);
    const toast = useToast();

    const isFormValid = () => {
        return name && mail && message &&
               name!=="" && mail !== "" && message != "" &&
               mail.includes("@")
    }

    const sendMessage = () => {
        setIsSending(true);

        if (!isFormValid()){
            toast({
                title: "Please fill all the inputs",
                description: "",
                status: "error",
                position: "bottom-left",
                duration: 15000,
                isClosable: true,
            });
            setIsSending(false);
            return;
        }

        const data = {
            name: name,
            mail: mail,
            message: message,
        };

        fetch("/api/contact/send", {
            method: "POST",
            headers: {'Content-Type': 'application/json'}, 
            body: JSON.stringify(data)
        }).then(res => res.json().then((response) => {
            
            if (response.status){
                toast({
                    title: "The message has been sent successfully",
                    description: "",
                    status: "success",
                    position: "bottom-left",
                    duration: 15000,
                    isClosable: true,
                  });
            } else {
                toast({
                    title: "Error, the message has not been sent",
                    description: "Error message: " + response.message,
                    status: "error",
                    position: "bottom-left",
                    duration: 15000,
                    isClosable: true,
                  });
            }

            setIsSending(false);

        }));

    }

    return (
        <Flex
            align="center"
            justify="center"
            width={'100vw'}
            height={'100vh'}
            bg='#eee'
            maxW={"100%"}
            >
            <Box
                borderRadius={"lg"}
                m={{base: 5, md: 16, lg: 10}}
                p={{base: 5, lg: 16}}>
                <VStack spacing={{base: 4, md: 8, lg: 20}}>
                    <Text fontSize={"3xl"} color={"black"} fontWeight={'bold'} textAlign={'center'} m={2}>Get in touch</Text>

                    <Box
                        bg={useColorModeValue('white', 'gray.700')}
                        borderRadius="lg"
                        p={8}
                        color={useColorModeValue('gray.700', 'whiteAlpha.900')}
                        shadow="base">
                        <VStack spacing={5}>

                            <FormControl isRequired>
                                <FormLabel>Name</FormLabel>

                                <InputGroup>
                                    <InputLeftElement children={<BsPerson/>}/>
                                    <Input type="text" name="name" placeholder="Your Name"
                                    value={name}
                                    onChange={(event) => setName(event.target.value)}
                                    />
                                </InputGroup>
                            </FormControl>

                            <FormControl isRequired>
                                <FormLabel>Email</FormLabel>

                                <InputGroup>
                                    <InputLeftElement children={<AiOutlineMail/>}/>
                                    <Input
                                        type="email"
                                        name="email"
                                        placeholder="Your Email"
                                        value={mail}
                                        onChange={(event) => setMail(event.target.value)}
                                    />
                                </InputGroup>
                            </FormControl>

                            <FormControl isRequired>
                                <FormLabel>Message</FormLabel>

                                <Textarea
                                    name="message"
                                    placeholder="Your Message"
                                    rows={6}
                                    resize="none"
                                    value={message}
                                    onChange={(event) => setMessage(event.target.value)}
                                />
                            </FormControl>

                            <Button
                                colorScheme="blue"
                                bg="blue.400"
                                color="white"
                                _hover={{
                                    bg: 'blue.500',
                                }}
                                isLoading={isSending}
                                loadingText='Sending...'
                                isFullWidth
                                onClick={() => sendMessage()}
                                >
                                Send Message
                            </Button>
                        </VStack>
                    </Box>
                </VStack>
            </Box>
        </Flex>
    );
};