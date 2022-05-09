import React, { useEffect } from "react";
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
  Text,
  useToast,
  PopoverTrigger,
  PopoverContent,
  Popover,
  SimpleGrid,
  VStack,
} from "@chakra-ui/react";
import { HamburgerIcon, CloseIcon } from "@chakra-ui/icons";
import { FiChevronDown } from "react-icons/fi";
import { FaSignOutAlt, IoIosArrowDown } from "react-icons/all";
import { useNavigate } from "react-router-dom";
import { Link as ReactRouterLink } from "react-router-dom";

import { NavLink, SubNavLink, MobileNavItem } from "./NavItems.js";

export const links = {
  "About": "",
  "Gallery": "gallery",
  "Contact": "contact"
};
export const adminLinks = [
  { name: "Admin Panel", link: "admin" },
  { name: "Edit Movies & TV Shows", link: "admin/edit-movies-shows" },
  { name: "Create Movie & TV Shows", link: "admin/create-movies-shows" },
  { name: "Accounts Settings", link: "admin/accounts-settings" },
  {name: "Biography Editor", link: "admin/bio-editor"}
];

// interface INavBarProps {
//     isUserAuthed: boolean;
//     setIsUserAuthed: (boolean) => void;
//     username: string;
//     setUsername: (string) => void;
//     accountType: string;
//     setAccountType: (string) => void;
// }

export default function NavBar(props) {
  const {
    isUserAuthed,
    setIsUserAuthed,
    username,
    setUsername,
    accountType,
    setAccountType,
  } = props;

  const { isOpen, onOpen, onClose } = useDisclosure(); // used for the mobile nav menu

  // used to control the popover (for the admin links)
  const [isPopoverOpen, setisPopoverOpen] = React.useState(false)
  const openPopover = () => setisPopoverOpen(!isPopoverOpen)
  const closePopover = () => setisPopoverOpen(false)

  const toast = useToast();
  let navigate = useNavigate();

  let logOut = () => {
    fetch("/api/account/logOut", {
      method: "GET",
      headers: {
        "Cache-Control": "no-cache",
        Pragma: "no-cache",
        Expires: "0",
      },
      credentials: "same-origin",
    }).then((res) => {
      setIsUserAuthed(false);

      toast({
        title: "Successfully logged out!",
        description: "You have been logged out.",
        status: "success",
        position: "bottom-left",
        duration: 15000,
        isClosable: true,
      });

      navigate("/", { replace: true });
    });
  };

  // when the component is mounted, fetch the login info, and if logged in, show the admin settings.
  useEffect(() => {
    fetch("/api/account/isLoggedIn", {
      method: "GET",
      headers: {
        "Cache-Control": "no-cache",
        Pragma: "no-cache",
        Expires: "0",
      },
      credentials: "same-origin",
    }).then((res) => {
      if (res.status === 200) {
        setIsUserAuthed(true);
        res.json().then((json_res) => {
          setUsername(json_res["username"]);
          setAccountType(json_res["type"]);
        });
      } else {
        setIsUserAuthed(false);
      }
    });
  }, []); // run on component mount

  return (
    <>
      <Box
        bg={useColorModeValue("gray.100", "gray.900")}
        paddingBottom={isOpen ? 2 : "60px"}
      >
        {/* don't add padding at the top of the navbar if the mobile menu is opened */}
        <Flex
          px={2}
          alignItems={"center"}
          justifyContent={"space-between"}
          as={"header"}
          pos="fixed"
          top="0"
          w={"full"}
          minH={"60px"}
          boxShadow={"sm"}
          zIndex="999"
          justify={"center"}
          css={{
            // backdropFilter: 'saturate(180%) blur(5px)', // rend le fond transparent et flout
            backgroundColor: useColorModeValue(
              "rgba(255, 255, 255, 1)",
              "rgba(26, 32, 44, 1)"
            ),
          }}
        >
          <IconButton
            size={"md"}
            icon={isOpen ? <CloseIcon /> : <HamburgerIcon />}
            aria-label={"Open Menu"}
            display={{ md: "none" }} // shows and hides the button based on the 'md' breakpoint
            onClick={isOpen ? onClose : onOpen}
          />
          <HStack spacing={8} alignItems={"center"}>

            {/* All the links */}
            <HStack
              as={"nav"}
              spacing={4}
              display={{ base: "none", md: "flex" }}
            >
              {Object.keys(links).map((item, index) => (
                <NavLink key={links[item]} name={item} link={links[item]} />
              ))}

              {isUserAuthed ? (
                <Popover
                  isOpen={isPopoverOpen}
                  onClose={closePopover}
                >
                  <PopoverTrigger>
                    <Button
                      color="blackAlpha.700"
                      display="inline-flex"
                      alignItems="center"
                      background={"white"}
                      _hover={{ bg: "gray.200" }}
                      _focus={{ boxShadow: "none" }}
                      rightIcon={<IoIosArrowDown />}
                      onClick={openPopover}
                    >
                      Admin Tools
                    </Button>
                  </PopoverTrigger>

                  <PopoverContent
                    borderWidth={1}
                    borderColor={"blackAlpha.200"}
                    boxShadow="lg"
                    _focus={{ boxShadow: "lg" }}
                    bg={"white"}
                    p={2}
                    rounded={"xl"}
                    minW={"sm"}
                  >
                    <SimpleGrid
                      columns={props.h ? { base: 1, md: 3, lg: 5 } : 1}
                      pos="relative"
                      gap={1}
                    >
                      {adminLinks.map(({ name, link }, index) => (
                        <SubNavLink
                          key={link}
                          name={name}
                          link={link}
                          admin={true}
                          closePopover={closePopover}
                        />
                      ))}
                    </SimpleGrid>
                  </PopoverContent>
                </Popover>
              ) : (
                <></>
              )}
            </HStack>
          </HStack>

          {/* ADMIN  ICON */}
          {isUserAuthed ? (
            <HStack>
              <Flex alignItems={"center"}>
                <Menu>
                  <MenuButton
                    rounded={"full"}
                    cursor={"pointer"}
                    minW={0}
                    transition="all 0.3s"
                    _focus={{ boxShadow: "none" }}
                  >
                    <HStack>
                      <Avatar size={"sm"} />

                      <VStack
                        display={{ base: "none", md: "flex" }}
                        alignItems="flex-start"
                        spacing="1px"
                        ml="2"
                      >
                        <Text fontSize="sm">Hello, {username}!</Text>
                        <Text fontSize="xs" color="gray.600">
                          {accountType}
                        </Text>
                      </VStack>
                      <Box display={{ base: "none", md: "flex" }}>
                        <FiChevronDown />
                      </Box>
                    </HStack>
                  </MenuButton>
                  <MenuList>
                    <Link
                      as={ReactRouterLink}
                      to={"/admin"}
                      style={{ textDecoration: "none" }}
                    >
                      <MenuItem>Admin Panel</MenuItem>
                    </Link>
                    <MenuDivider />

                    {/*Sign out button, destroys the session on the server */}
                    <MenuItem onClick={logOut}>
                      <Text>Sign Out</Text>
                      <Box pl={2} color={"blackAlpha.800"}>
                        <FaSignOutAlt />
                      </Box>
                    </MenuItem>
                  </MenuList>
                </Menu>
              </Flex>
            </HStack>
          ) : (
            <></>
          )}
        </Flex>
        {/* popup menu for mobile */}
        {isOpen ? (
          <Box paddingTop={"60px"} display={{ md: "none" }}>
            <Stack as={"nav"} spacing={4}>
              {/* all the other items first */}
              {Object.keys(links).map((item, index) => (
                <NavLink key={links[item]} name={item} link={links[item]} />
              ))}

              {/* And then we have the admin tools with a sub menu */}
              <MobileNavItem
                label={"Admin Tools"}
                children={adminLinks}
                href={"/admin"}
              />
            </Stack>
          </Box>
        ) : null}
      </Box>
    </>
  );
}
