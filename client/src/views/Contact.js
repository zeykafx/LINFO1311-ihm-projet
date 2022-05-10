import {Box, Button, Flex, FormControl, FormLabel, Heading, Input, InputGroup, InputLeftElement, Text, Textarea, useColorModeValue, VStack} from "@chakra-ui/react";
import {BsPerson, AiOutlineMail} from "react-icons/all";
import React from "react";


let validateForm = () => {

}

export const Contact = (props) => {
    return (
        <Flex
            align="center"
            justify="center"
            width={'100vw'}
            height={'100vh'}
            // bg='#eee'
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
                                    <Input type="text" name="name" placeholder="Your Name"/>
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
                                />
                            </FormControl>

                            <Button
                                colorScheme="blue"
                                bg="blue.400"
                                color="white"
                                _hover={{
                                    bg: 'blue.500',
                                }}
                                isFullWidth>
                                Send Message
                            </Button>
                        </VStack>
                    </Box>
                </VStack>
            </Box>
        </Flex>
    );
};