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
  ModalHeader,
  useToast,
  ModalFooter,
  Button,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import "../../../components/viewer/AdminMoviesViewer.css"
import Loader from "../../../components/misc/Loader";
import CButton from "../../../components/form/buttons/CButton";
import AdminModifyImageForm from "../../../components/form/Images/AdminModifyImageForm";
import AdminDeleteImageForm from "../../../components/form/Images/AdminDeleteImageForm";

export default function GalleryEditor() {
  const [images, setImages] = useState([]);

  const [loading, setLoading] = useState(true);

  const [selectedImage, setSelectedImage] = useState({});
  const [visibleModifyModal, setVisibleModifyModal] = useState(false);
  const [visibleDeleteModal, setVisibleDeleteModal] = useState(false);

  const toast = useToast();
  const { isOpen, onOpen, onClose } = useDisclosure();

  let fetchImages = () => {
    setLoading(true);

    fetch("/api/images/get", {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    })
      .then((res) => res.json())
      .then((response) => {
        if (response.status) {
          setImages(response["message"]);
          setLoading(false);
        } else {
          setImages([]);

          toast({
            title: "Couldn't fetch the images",
            description: "Error message: " + response.message,
            status: "error",
            position: "bottom-left",
            duration: 15000,
            isClosable: true,
          });
        }
      });
  };

  let handleModalClose = () => {
    onClose();
    setVisibleDeleteModal(false);
    setVisibleModifyModal(false);
  };

  useEffect(() => {
    fetchImages();
  }, []);

  return (
    <>
      <Modal isOpen={isOpen} onClose={handleModalClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>
            {(visibleModifyModal ? "Modify " : "Delete ") + selectedImage.name}
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            {visibleModifyModal ? (
              <AdminModifyImageForm
                imageData={selectedImage}
                fetchImages={fetchImages}
                handleModalClose={handleModalClose}
              />
            ) : (
              <AdminDeleteImageForm
                imageData={selectedImage}
                fetchImages={fetchImages}
                handleModalClose={handleModalClose}
              />
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
            label="Fetching the images..."
          />
        ) : (
          <>
              {/* Flemme de changer les noms des classes */}
            {images.map((image) => (
              <div className="movieSmallViewer">
                <div className="movieInfosContainer">
                  <div className="movieImageContainer">
                    <div className="moviePoster">
                      <img src={"/photos/" + image.filename} />
                    </div>
                  </div>
                  <div className="movieTextContainer">
                    <h1>{image.name}</h1>

                    <h2>Description:</h2>
                    <p>{image.description}</p>
                  </div>
                </div>
                <div className="movieButtonsContainer">
                  <CButton
                    text="Modify"
                    type="positive"
                    onPress={() => {
                      onOpen();
                      setSelectedImage(image);
                      setVisibleModifyModal(true);
                    }}
                  />
                  <CButton
                    text="Delete"
                    type="negative"
                    onPress={() => {
                      onOpen();
                      setSelectedImage(image);
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
