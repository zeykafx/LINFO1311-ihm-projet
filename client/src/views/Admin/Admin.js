import React, { useState } from "react";
import {
  Grid,
  Text,
  Box,
  Heading,
  HStack,
  GridItem,
  useColorModeValue,
} from "@chakra-ui/react";
import StatsCard from "./Components/StatsCard";
import QuickLinks from "./Components/QuickLinks";
import FeaturedMovies from "./Components/FeaturedMovies";
import FeaturedTVShows from "./Components/FeaturedTVShows";

export const possibleStates = {
  smooth: "running well",
  mild: "recovering/starting up",
  bad: "not running",
};

function Admin() {
  const [status, setStatus] = useState(possibleStates.smooth);

  let handleStatusChange = (newStatus) => {
    setStatus(newStatus);
  };

  return (
    <>
      <Heading
        px={3}
      >
        Everything is{" "}
        <Text
          as={"span"}
          bgClip="text"
          bgGradient={
            status == possibleStates.smooth
              ? "linear(to-r, green.300,green.500)"
              : status == possibleStates.mild
              ? "linear(to-r, orange.300,orange.500)"
              : "linear(to-r, red.300,red.500)"
          }
          fontWeight="extrabold"
        >
          {status}
        </Text>
      </Heading>

      <Grid
        templateColumns={{ md: "repeat(2, 1fr)", lg: "repeat(3, 1fr)", "2xl": "repeat(5, 1fr)"}}
        templateRows="1fr "
        gap={2}
        p={3}
      >
        
        <StatsCard setStatus={handleStatusChange} />

        <GridItem colSpan={1} rowSpan={3}>
          <QuickLinks />
        </GridItem>

        <GridItem colSpan={1} rowSpan={1}>
          <FeaturedMovies />
        </GridItem>

        <GridItem colSpan={1} rowSpan={1}>
          <FeaturedTVShows />
        </GridItem>
      </Grid>
    </>
  );
}

export function Card(props) {
  return (
    <Box
      w="xs"
      bg={useColorModeValue("white", "gray.800")}
      shadow="lg"
      rounded="lg"
      p={2}
      borderWidth={1}
    >
      {props.children}
    </Box>
  );
}

export default Admin;
