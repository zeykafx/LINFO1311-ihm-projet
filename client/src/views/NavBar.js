import React from "react";
import {
    Box,
    Flex,
    Avatar,
    HStack,
    Link,
    IconButton,
    Button,
    Menu,
    MenuButton,
    MenuList,
    MenuItem,
    MenuDivider,
    useDisclosure,
    useColorModeValue,
    Stack,
} from '@chakra-ui/react';
import { HamburgerIcon, CloseIcon } from '@chakra-ui/icons';

export const Links = ["Movies", "TV Shows", "Gallery", "Contact us"]

const NavLink = ({ children }) => (
    <Link
        px={2}
        py={1}
        rounded={'md'}
        _hover={{
            textDecoration: 'none',
            bg: useColorModeValue('gray.200', 'gray.700'),
        }}
        // onClick={onClose}
        href={'/#' + children.toString().replace(" ", "-").toLowerCase()}>
        {children}
    </Link>
);

export default function NavBar() {
    const { isOpen, onOpen, onClose } = useDisclosure();

    return (
        <>
            <Box bg={useColorModeValue('gray.100', 'gray.900')} paddingBottom={isOpen ? 2 : '60px'}> {/* don't add padding at the top of the navbar if the mobile menu is opened */}
                <Flex
                    px={2}
                    alignItems={'center'}
                    justifyContent={'space-between'}
                    as={'header'}
                    pos="fixed"
                    top="0"
                    w={'full'}
                    minH={'60px'}
                    boxShadow={'sm'}
                    zIndex="999"
                    justify={'center'}
                    css={{
                        // backdropFilter: 'saturate(180%) blur(5px)',
                        backgroundColor: useColorModeValue(
                            'rgba(255, 255, 255, 1)',
                            'rgba(26, 32, 44, 1)'
                        ),
                    }}
                >
                    <IconButton
                        size={'md'}
                        icon={isOpen ? <CloseIcon /> : <HamburgerIcon />}
                        aria-label={'Open Menu'}
                        display={{ md: 'none' }} // shows and hides the button based on the 'md' breakpoint
                        onClick={isOpen ? onClose : onOpen}
                    />
                    <HStack spacing={8} alignItems={'center'}>
                        <Link
                            px={2}
                            py={1}
                            rounded={'md'}
                            _hover={{
                                textDecoration: 'none',
                                // bg: useColorModeValue('gray.200', 'gray.700'),
                            }}
                            href={'/'}>
                            Logo
                        </Link>

                        {/* All the links */}
                        <HStack
                            as={'nav'}
                            spacing={4}
                            display={{ base: 'none', md: 'flex' }}>
                            {Links.map((link) => (
                                <NavLink key={link}>{link}</NavLink>
                            ))}
                        </HStack>
                    </HStack>

                    {/* ADMIN  ICON */}
                    {/* TODO: SHOW ONLY IF USER IS ADMIN */}
                    <Flex alignItems={'center'}>
                        <Menu>
                            <MenuButton
                                as={Button}
                                rounded={'full'}
                                variant={'link'}
                                cursor={'pointer'}
                                minW={0}>
                                <Avatar
                                    size={'sm'}
                                />
                            </MenuButton>
                            <MenuList>
                                <MenuItem>
                                    <Link
                                        _hover={{
                                            textDecoration: 'none',
                                        }}
                                        href={'/admin'}
                                    >
                                        Admin Panel
                                    </Link>
                                </MenuItem>
                                <MenuDivider />

                                {/*! TODO: HANDLE SIGN OUT*/}
                                <MenuItem>Sign Out</MenuItem>
                            </MenuList>
                        </Menu>
                    </Flex>
                </Flex>

                {/* popup menu for mobile */}
                {isOpen ? (
                    <Box paddingTop={'60px'} display={{ md: 'none' }}>
                        <Stack as={'nav'} spacing={4}>
                            {Links.map((link) => (
                                <NavLink key={link}>{link}</NavLink>
                            ))}
                        </Stack>
                    </Box>
                ) : null}
            </Box>
        </>
    );
}