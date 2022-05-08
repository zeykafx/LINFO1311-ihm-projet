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

import AdminTVShowsViewer from "../../components/viewer/AdminTVShowsViewer";
import AdminMoviesViewer from "../../components/viewer/AdminMoviesViewer";

export default function EditPage() {
  return (
    <Tabs isFitted variant='enclosed' m={1}>
      <TabList mb='1em'>
        <Tab>Edit Movies</Tab>
        <Tab>Edit TV Shows</Tab>
      </TabList>

      <TabPanels>
        {/* EDIT MOVIES TAB*/}
        <TabPanel>
          <Heading>Edit Movies</Heading>
          <Text>You can edit movies that appear on the front page, any modifications will appear on the next page load.</Text>
          <AdminMoviesViewer />
        </TabPanel>
        {/* EDIT TV SHOWS TAB */}
        <TabPanel>
        <Heading>Edit TV Shows</Heading>
        <Text>You can edit the tv shows that appear on the front page, any modifications will appear on the next page load.</Text>
          <AdminTVShowsViewer />
        </TabPanel>
      </TabPanels>
    </Tabs>
  );
}
