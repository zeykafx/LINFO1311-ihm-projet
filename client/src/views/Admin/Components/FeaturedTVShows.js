import {
  Skeleton,
  Text,
  useToast,
  Heading,
  Divider,
  Grid,
  Badge,
  GridItem,
} from "@chakra-ui/react";
import React, { useState, useEffect } from "react";
import { Card } from "../Admin";

export default function FeaturedTVShows() {
  const [shows, setShows] = useState(null);
  const toast = useToast();

  // fetch the shows on first load
  useEffect(() => {
    fetch("/api/tvshows/get")
      .then((res) => res.json())
      .then((response) => {
        if (response.status) {
          setShows(response["message"]);
        } else {
          setShows([]);

          toast({
            title: "Couldn't fetch the tv shows",
            description: "Error message: " + response.message,
            status: "error",
            position: "bottom-left",
            duration: 15000,
            isClosable: true,
          });
        }
      });
  }, []);

  return (
    <Card>
      <Skeleton isLoaded={shows !== null}>
      <Heading size="md">Featured TV Shows:</Heading>
        {shows !== null ? (
          shows.map((show) => (
            <>
              <Grid templateColumns={"0.2fr 3fr"}>
                <GridItem colSpan={1}>
                  <Badge variant="subtle" colorScheme="green">
                    {show.id}
                  </Badge>
                </GridItem>

                <GridItem colSpan={1}>
                  <Text>
                    Title:{" "}
                    <Text as={"i"} fontSize="md" color="gray.700">
                      {show.name}
                    </Text>
                  </Text>
                  <Text>
                    Role:{" "}
                    <Text as={"i"} fontSize="md" color="gray.700">
                      {show.actorRole}
                    </Text>
                  </Text>
                </GridItem>
              </Grid>
              <Divider />
            </>
          ))
        ) : (
          <Text>Loading...</Text>
        )}
      </Skeleton>
    </Card>
  );
}
