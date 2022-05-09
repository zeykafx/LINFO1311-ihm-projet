import {
  Box,
  Container,
  Stack,
  Text,
  Link,
  useColorModeValue,
  Button,
  useDisclosure,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
} from "@chakra-ui/react";
import { links } from "../../views/NavBar/NavBar.js";
import React from "react";
import AdminLoginForm from "../form/AdminLoginForm";
import { Link as ReactRouterLink } from "react-router-dom";

// interface IFooterProps {
//     isUserAuthed: boolean;
//     setIsUserAuthed: (boolean) => void;
//     username: string;
//     setUsername: (string) => void
// }

export default function Footer(props) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { isUserAuthed, setIsUserAuthed, username, setUsername, setAccountType } = props;

  let handleClose = () => {
    onClose();
  };

  let currentYear = new Date().getFullYear();
  return (
    <Box
      bg={useColorModeValue("gray.50", "gray.900")}
      color={useColorModeValue("gray.700", "gray.200")}
    >
      <Container
        as={Stack}
        maxW={"6xl"}
        py={4}
        direction={{ base: "column", md: "row" }}
        spacing={4}
        justify={{ base: "center", md: "space-between" }}
        align={{ base: "center", md: "center" }}
      >
        <Stack direction={"row"} spacing={6}>
          {/* NAV LINKS */}
          {Object.keys(links).map((item, i) => (
            <Link
              as={ReactRouterLink}
              key={links[item]}
              to={"/#" + links[item]}
            >
              {item}
            </Link>
          ))}
        </Stack>

        <Stack direction={"row"} spacing={6}>
          {/* ADMIN PANEL SIGN IN BUTTON, only show that link/button if the user isn't connected */}
          {!isUserAuthed ? (
            <>
              <Link onClick={onOpen}>Sign in</Link>
              <Modal isOpen={isOpen} onClose={onClose}>
                <ModalOverlay />
                <ModalContent>
                  <ModalHeader>Sign In</ModalHeader>
                  <ModalCloseButton />
                  <ModalBody>
                    <AdminLoginForm
                      redirect={true}
                      closeFunction={handleClose}
                      setIsUserAuthed={setIsUserAuthed}
                      setUsername={setUsername}
                      setAccountType={setAccountType}
                    />
                  </ModalBody>
                  <ModalFooter>
                    <Button mr={3} onClick={onClose}>
                      Close
                    </Button>
                  </ModalFooter>
                </ModalContent>
              </Modal>
            </>
          ) : (
            <></>
          )}

          <Text>© {currentYear} Projet LINFO1311</Text>
        </Stack>
      </Container>
    </Box>
  );
}
