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

import AdminCreateMovieForm from "../../components/form/Movies/AdminCreateMovieForm";
import AdminCreateTVShowForm from "../../components/form/TVShows/AdminCreateTVShowForm";

export default function CreatePage() {
  return (
    <Tabs isFitted variant="enclosed" m={1}>
      <TabList mb="1em">
        <Tab>Create Movies</Tab>
        <Tab>Create TV Shows</Tab>
      </TabList>

      <TabPanels>
        {/* Create movie TAB*/}
        <TabPanel>
          <Heading>Create Movies</Heading>
          <Text>
            You can create news movies that will appear on the front page, any
            modifications will appear on the next page load.
          </Text>
          <AdminCreateMovieForm />
        </TabPanel>

        {/* create TV SHOWS TAB */}
        <TabPanel>
          <Heading>Create TV Shows</Heading>
          <Text>
            You can create new tv shows that will appear on the front page, any
            modifications will appear on the next page load.
          </Text>
          <AdminCreateTVShowForm />
        </TabPanel>
      </TabPanels>
    </Tabs>
  );
}
