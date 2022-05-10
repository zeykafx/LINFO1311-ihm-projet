import React, { useState, useEffect } from "react";

import CButton from "../form/buttons/CButton";

import "./AdminMoviesViewer.css";
import Loader from "../misc/Loader";
import AdminModifyMovieForm from "../form/Movies/AdminModifyMovieForm";
import AdminDeleteMovieForm from "../form/Movies/AdminDeleteMovieForm";
import {
  Button,
  useDisclosure,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  useToast,
} from "@chakra-ui/react";
function AdminMoviesViewer({}) {
  const [moviesList, setMoviesList] = useState([]);

  const [visibleModifyModal, setVisibleModifyModal] = useState(false);
  const [visibleDeleteModal, setVisibleDeleteModal] = useState(false);

  const [selectedMovie, setSelectedMovie] = useState({});
  // const [movieToDelete, setMovieToDelete] = useState({});

  const [loading, setLoading] = useState(true);

  const toast = useToast();
  const { isOpen, onOpen, onClose } = useDisclosure();


  const genCoActorBubbles = (coActors) => {
    return coActors.map((actor, index) => {
      let separator = "";
      if (index !== coActors.length - 1) {
        separator = index === coActors.length - 2 ? " and " : ", ";
      }
      return (
        <b className="actorBubble">
          {actor}
          {separator}
        </b>
      );
    });
  };

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

  let fetchMovies = () => {
    fetch("/api/movies/get")
    .then((res) => res.json())
    .then((response) => {
      if (response.status) {
        setMoviesList(response["message"]);
      } else {
        setMoviesList([]);

        toast({
            title: "Couldn't fetch the movies",
            description: "Error message: " + response.message,
            status: 'error',
            position: 'bottom-left',
            duration: 15000,
            isClosable: true,
        })
      }

      setLoading(false);
    });
  }

  useEffect(() => {
    setLoading(true);

    setTimeout(() => {
      fetchMovies();
    }, 0); // Le timeout est pas obligatoire, c'est juste plus beau qu'un flash sur la page
  }, []);

  let handleModalClose = () => {
    onClose();
    setVisibleDeleteModal(false);
    setVisibleModifyModal(false);
  }

  return (
    <>

      <Modal isOpen={isOpen} onClose={handleModalClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>{(visibleModifyModal ? "Modify " :  "Delete ") + selectedMovie.name}</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            {visibleModifyModal ? (
              <AdminModifyMovieForm movieData={selectedMovie} fetchMovies={fetchMovies} handleModalClose={handleModalClose}/>
            ) : (
              <AdminDeleteMovieForm movieData={selectedMovie} fetchMovies={fetchMovies} handleModalClose={handleModalClose}/>
            )}
          </ModalBody>
          <ModalFooter>
            <Button mr={3} onClick={handleModalClose}>
              Close
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>

      <div className="AMV-container">
        {loading ? (
          <Loader
            color="rgb(94, 94, 94)"
            size={30}
            noAspectRatio={true}
            label="Fetching the movies..."
          />
        ) : (
          <>
            {moviesList.map((movie) => (
              <div className="movieSmallViewer">
                <div className="movieInfosContainer">
                  <div className="movieImageContainer">
                    <div className="moviePoster">
                      <img src="https://images.immediate.co.uk/remote/m.media-amazon.com/images/M/MV5BNWE3Mzc2YzUtZDAyYS00MmQ4LWFhZmItYTA5MTYyYjgxMTQ4XkEyXkFqcGdeQXVyNDgxMDU4NTU@._V1_.jpg?quality=90&webp=true&resize=650,911" />
                    </div>
                  </div>
                  <div className="movieTextContainer">
                    <h1>{movie.name}</h1>

                    <h2>Informations:</h2>
                    <div className="twoInfosContainer">
                      <h3>Playing {movie.actorRole}</h3>
                      <h3>Directed by {movie.director}</h3>
                    </div>
                    <div className="twoInfosContainer">
                      <h3>With {genCoActorBubbles(movie.coActors)}</h3>
                      <h3>
                        Released on the{" "}
                        {getReadableDateFromMilliTime(movie.releaseDate)}
                      </h3>
                    </div>

                    <h2>Languages:</h2>
                    <div className="languagesContainer">
                      {movie.languages.map((language) => {
                        return <div className="languageBubble">{language}</div>;
                      })}
                    </div>

                    <h2>Ticket links:</h2>
                    <div className="ticketLinksContainer">
                      {movie.ticketLinks.map((ticketLink) => {
                        return <div className="ticketBubble">{ticketLink}</div>;
                      })}
                    </div>

                    <h2>Description:</h2>
                    <p>{movie.description.slice(0, 300)}...</p>
                  </div>
                </div>
                <div className="movieButtonsContainer">
                  <CButton
                    text="Modify"
                    type="positive"
                    onPress={() => {
                      onOpen();
                      setSelectedMovie(movie);
                      setVisibleModifyModal(true);
                    }}
                  />
                  <CButton
                    text="Delete"
                    type="negative"
                    onPress={() => {
                      onOpen();
                      setSelectedMovie(movie);
                      setVisibleDeleteModal(true);
                    }}
                  />
                </div>
              </div>
            ))}
          </>
        )}
      </div>
    </>
  );
}
export default AdminMoviesViewer;
