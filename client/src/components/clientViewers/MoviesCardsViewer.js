import React, { useState, useEffect } from "react";

import "./MoviesCardsViewer.css";
import Loader from "../misc/Loader";

import {
  Box,
  Flex,
  Spacer,
  Center,
  Text,
  Square,
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  useDisclosure,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
} from "@chakra-ui/react";

function MoviesCardsViewer({ maxNumberOfMovies = -1 }) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [moviesList, setMoviesList] = useState([]);

  const [selectedMovie, setSelectedMovie] = useState({});

  const [loading, setLoading] = useState(true);
  const [response, setResponse] = useState("");

  const getReadableDateFromMilliTime = (dateInMilli) => {
    const dateObject = new Date(parseInt(dateInMilli));
    return (
      dateObject.getDate() +
      "/" +
      (dateObject.getMonth() + 1) +
      "/" +
      dateObject.getFullYear()
    );
  };

  useEffect(() => {
    setLoading(true);
    setResponse("");

    const data = {
      maxNumberOfMovies: maxNumberOfMovies,
    };

    fetch("/api/movies/client/get", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    }).then((res) =>
      res.json().then((response) => {
        if (response.status) {
          // Movie fetching successful
          if (response.message.length > maxNumberOfMovies) {
            setMoviesList(response.message.slice(0, maxNumberOfMovies));
          } else {
            setMoviesList(response.message);
          }
          setSelectedMovie(response.message[0]);
        } else {
          // Error while trying
          setResponse(response.message);
          
        }

        setLoading(false);
      })
    );
  }, []);

  const genCoActorBubbles = (coActors) => {
    return coActors.map((actor, index) => {
      let separator = "";
      if (index !== coActors.length - 1) {
        separator = index === coActors.length - 2 ? ", and " : ", ";
      }
      return (
        <b className="actorBubble">
          {actor}
          {separator}
        </b>
      );
    });
  };

  const extractWebsiteName = (rawURL) => {
    let result = "";

    let positionWWW = rawURL.indexOf("www.");
    if (positionWWW === -1) positionWWW = 0;

    let startRegisteringDot = false;

    for (let index = positionWWW; index < rawURL.length; index++) {
      const letter = rawURL[index];

      if (startRegisteringDot) {
        if (letter === "/") {
          break;
        }
      } else {
        if (letter === ".") {
          startRegisteringDot = true;
        }
      }

      result += letter;
    }

    return result;
  };

  return (
    <Flex direction={"row"}>
      {response !== "" ? (
        <Center>
          <Text color="red" fontWeight="bold" fontSize="xl">
            {response}
          </Text>
        </Center>
      ) : (
        <>
          {loading ? (
            <Loader
              color="rgb(94, 94, 94)"
              size={30}
              noAspectRatio={true}
              label="Fetching the movies..."
            />
          ) : (
            <>
              <Modal
                isOpen={isOpen}
                onClose={onClose}
                isCentered
                scrollBehavior={"inside"}
                size={"xl"}
              >
                <ModalOverlay />
                <ModalContent>
                  <ModalHeader>{selectedMovie.name}</ModalHeader>
                  <ModalCloseButton />
                  <ModalBody>
                    <Text
                      color="gray.600"
                      fontWeight="500"
                      fontSize="sm"
                      marginBottom="2px"
                    >
                      Playing as <b>{selectedMovie.actorRole}</b>
                    </Text>
                    <Text
                      color="gray.600"
                      fontWeight="500"
                      fontSize="sm"
                      marginBottom="2px"
                    >
                      Directed by <b>{selectedMovie.director}</b>
                    </Text>
                    <Text
                      color="gray.600"
                      fontWeight="500"
                      fontSize="sm"
                      marginBottom="2px"
                    >
                      Released on the{" "}
                      <b>
                        {getReadableDateFromMilliTime(
                          selectedMovie.releaseDate
                        )}
                      </b>
                    </Text>
                    <Text
                      color="gray.600"
                      fontWeight="500"
                      fontSize="sm"
                      marginBottom="8px"
                    >
                      With {genCoActorBubbles(selectedMovie.coActors)}
                    </Text>
                    <Text
                      color="gray.700"
                      fontWeight="bold"
                      fontSize="sm"
                      marginBottom="2px"
                    >
                      DESCRIPTION
                    </Text>
                    <Text
                      color="gray.500"
                      fontWeight="500"
                      fontSize="sm"
                      marginBottom="8px"
                    >
                      {selectedMovie.description}
                    </Text>
                    <Text
                      color="gray.700"
                      fontWeight="bold"
                      fontSize="sm"
                      marginBottom="2px"
                    >
                      LANGUAGES
                    </Text>
                    <Flex wrap={"wrap"} direction={"row"} mb={"8px"}>
                      {selectedMovie.languages.map((language) => {
                        return (
                          <Text
                            color="white"
                            fontWeight="bold"
                            fontSize="sm"
                            bg={"black"}
                            borderRadius={"5px"}
                            mr={"5px"}
                            padding={"3px 8px"}
                          >
                            {language}
                          </Text>
                        );
                      })}
                    </Flex>
                    <Text
                      color="gray.700"
                      fontWeight="bold"
                      fontSize="sm"
                      marginBottom="2px"
                    >
                      TICKETS
                    </Text>
                    <Flex wrap={"wrap"} direction={"row"}>
                      {selectedMovie.ticketLinks.map((ticketLink) => {
                        return (
                          <Text
                            color="white"
                            fontWeight="bold"
                            fontSize="sm"
                            bg={"black"}
                            borderRadius={"5px"}
                            mr={"5px"}
                            padding={"3px 8px"}
                          >
                            {extractWebsiteName(ticketLink)}
                          </Text>
                        );
                      })}
                    </Flex>
                  </ModalBody>

                  <ModalFooter>
                    <Button
                      colorScheme="teal"
                      variant={"outline"}
                      onClick={onClose}
                    >
                      Close
                    </Button>
                  </ModalFooter>
                </ModalContent>
              </Modal>

              {moviesList.map((movie) => (
                <Box
                  bg={"white"}
                  height="250px"
                  overflow={"hidden"}
                  borderRadius={5}
                  boxShadow="xl"
                  borderWidth={"1px"}
                  borderColor={"#dedede"}
                  marginRight={5}
                >
                  <Flex key={movie.id} direction={"row"}>
                    <Flex height="250px" width="170px" overflow={"hidden"}>
                      <img
                        className="posterImg"
                        src={"/photos/"+movie.filename}
                      />
                    </Flex>
                    <Square size="250px">
                      <Flex
                        direction={"column"}
                        padding={"4"}
                        height={"100%"}
                        width={"100%"}
                      >
                        <Text color="black" fontWeight="bold" fontSize="lg">
                          {movie.name}
                        </Text>
                        <Text
                          color="gray.600"
                          fontWeight="500"
                          fontSize="sm"
                          marginBottom="5px"
                        >
                          Playing as {movie.actorRole}
                        </Text>
                        <Text
                          color="gray.500"
                          fontWeight="500"
                          fontSize="sm"
                          marginBottom="8px"
                        >
                          {movie.description.slice(0, 125) + "..."}
                        </Text>
                        <Spacer />
                        <Button
                          colorScheme="teal"
                          size="md"
                          variant="outline"
                          alignSelf={"flex-start"}
                          onClick={() => {
                            onOpen();
                            setSelectedMovie(movie);
                          }}
                        >
                          Learn more
                        </Button>
                      </Flex>
                    </Square>
                  </Flex>
                </Box>
              ))}
            </>
          )}
        </>
      )}
    </Flex>
  );
}
export default MoviesCardsViewer;
