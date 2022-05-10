import {
    Stack,
    Tabs,
    TabList,
    Tab,
    TabPanels,
    TabPanel,
    Heading,
    Text,
  } from "@chakra-ui/react";
  import React from "react";
import GalleryEditor from "./Components/GalleryEditor";
  
import ImageUploadPage from "./Components/ImageUploadPage";
  
  export default function AdminGalleryPage() {
    return (
      <>
        <Tabs isFitted variant="enclosed" m={1}>
          <TabList mb="1em">
            <Tab>Upload Images</Tab>
            <Tab>Edit Images</Tab>
          </TabList>
  
          <TabPanels>
            
            <TabPanel>
              <ImageUploadPage />
            </TabPanel>
  
           
            <TabPanel>
              <Heading>Edit Images</Heading>
              <Text>
                You can edit the images that appear on the gallery from here.
              </Text>
              <GalleryEditor />
            </TabPanel>
          </TabPanels>
        </Tabs>
      </>
    );
  }
  