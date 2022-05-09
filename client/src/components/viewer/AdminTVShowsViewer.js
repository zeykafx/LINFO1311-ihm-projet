import React, { useState, useEffect } from "react";

import CButton from "../form/buttons/CButton";

import "./AdminTVShowsViewer.css";
import Loader from "../misc/Loader";
import ModalWrapper from "../misc/ModalWrapper";

import AdminModifyTVShowForm from "../form/TVShows/AdminModifyTVShowForm";
import AdminDeleteTVShowForm from "../form/TVShows/AdminDeleteTVShowForm";

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

function AdminTVShowsViewer({}) {
  const [TVShowsList, setTVShowsList] = useState([]);

  const [visibleModifyModal, setVisibleModifyModal] = useState(false);
  const [visibleDeleteModal, setVisibleDeleteModal] = useState(false);

  const [selectedTVShow, setSelectedTVShow] = useState({});
  // const [TVShowToDelete, setTVShowToDelete] = useState({});

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

  useEffect(() => {
    setLoading(true);

    setTimeout(() => {
      fetch("/api/tvshows/get")
        .then((res) => res.json())
        .then((response) => {
          if (response.status) {
            setTVShowsList(response["message"]);

          } else {
            
            setTVShowsList([]);

            toast({
                title: "Couldn't fetch the tv shows",
                description: "Error message: " + response.message,
                status: 'error',
                position: 'bottom-left',
                duration: 15000,
                isClosable: true,
            })
          }

          setLoading(false);
        });
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
          <ModalHeader>{(visibleModifyModal ? "Modify " :  "Delete ") + selectedTVShow.name}</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            {visibleModifyModal ? (
              <AdminModifyTVShowForm TVShowData={selectedTVShow} />
            ) : (
              <AdminDeleteTVShowForm TVShowData={selectedTVShow} />
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
            label="Fetching the TV Shows..."
          />
        ) : (
          <>
            {TVShowsList.map((tvshow) => (
              <div className="TVShowSmallViewer">
                <div className="TVShowInfosContainer">
                  <div className="TVShowImageContainer">
                    <div className="TVShowPoster">
                      <img src="https://images.immediate.co.uk/remote/m.media-amazon.com/images/M/MV5BNWE3Mzc2YzUtZDAyYS00MmQ4LWFhZmItYTA5MTYyYjgxMTQ4XkEyXkFqcGdeQXVyNDgxMDU4NTU@._V1_.jpg?quality=90&webp=true&resize=650,911" />
                    </div>
                  </div>
                  <div className="TVShowTextContainer">
                    <h1>{tvshow.name}</h1>

                    <h2>Informations:</h2>
                    <div className="twoInfosContainer">
                      <h3>Playing {tvshow.actorRole}</h3>
                      <h3>Directed by {tvshow.director}</h3>
                    </div>
                    <div className="twoInfosContainer">
                      <h3>With {genCoActorBubbles(tvshow.coActors)}</h3>
                      <h3>
                        Released on the{" "}
                        {getReadableDateFromMilliTime(tvshow.releaseDate)}
                      </h3>
                    </div>

                    <h2>Languages:</h2>
                    <div className="languagesContainer">
                      {tvshow.languages.map((language) => {
                        return <div className="languageBubble">{language}</div>;
                      })}
                    </div>

                    <h2>TV channels:</h2>
                    <div className="tvChannelsContainer">
                      {tvshow.tv_channels.map((tv_channel) => {
                        return (
                          <div className="tvChannelBubble">{tv_channel}</div>
                        );
                      })}
                    </div>

                    <h2>Steaming services:</h2>
                    <div className="streamingServicesContainer">
                      {tvshow.streaming_services.map((streaming_service) => {
                        return (
                          <div className="streamingServiceBubble">
                            {streaming_service}
                          </div>
                        );
                      })}
                    </div>

                    <h2>Description:</h2>
                    <p>{tvshow.description.slice(0, 300)}...</p>
                  </div>
                </div>
                <div className="TVShowButtonsContainer">
                  <CButton
                    text="Modify"
                    type="positive"
                    onPress={() => {
                      onOpen();
                      setSelectedTVShow(tvshow);
                      setVisibleModifyModal(true);
                    }}
                  />
                  <CButton
                    text="Delete"
                    type="negative"
                    onPress={() => {
                      onOpen();
                      setSelectedTVShow(tvshow);
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
export default AdminTVShowsViewer;
