import {
    Box,
    Container,
    Stack,
    Text,
    Link,
    useColorModeValue,
} from '@chakra-ui/react';
import { Links } from "../../views/NavBar.js";
import React from "react";

export default function Footer() {
    let currentYear = new Date().getFullYear();
    return (
        <Box
            bg={useColorModeValue('gray.50', 'gray.900')}
            color={useColorModeValue('gray.700', 'gray.200')}>
            <Container
                as={Stack}
                maxW={'6xl'}
                py={4}
                direction={{ base: 'column', md: 'row' }}
                spacing={4}
                justify={{ base: 'center', md: 'space-between' }}
                align={{ base: 'center', md: 'center' }}
                minH={'200px'}
                >
                <Stack direction={'column'} spacing={1}>
                    <Text fontWeight={"bold"} color="black" fontSize={"xl"}>Medeea Marinescu</Text>
                    {Links.map((link) => (
                        <Link fontWeight={"500"} color={"gray.500"} href={'/#' + link.toString().replace(" ", "-").toLowerCase()}>{link}</Link>
                    ))}
                </Stack>
                <Text>© {currentYear} Projet LINFO1311 </Text>
            </Container>
        </Box>
    );
}