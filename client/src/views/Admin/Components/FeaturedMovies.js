import {
  Skeleton,
  Text,
  Heading,
  useToast,
  Divider,
  Grid,
  Badge,
  GridItem,
} from "@chakra-ui/react";
import React, { useState, useEffect } from "react";
import { Card } from "../Admin";

export default function FeaturedMovies() {
  const [movies, setMovies] = useState(null);
  const toast = useToast();

  // fetch the movies on first load
  useEffect(() => {
    fetch("/api/movies/get")
      .then((res) => res.json())
      .then((response) => {
        if (response.status) {
          setMovies(response["message"]);
        } else {
          setMovies([]);

          toast({
            title: "Couldn't fetch the movies",
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
      <Skeleton isLoaded={movies !== null}>
      <Heading size="md">Featured Movies:</Heading>
        {movies !== null ? (
          movies.map((movie) => (
            <>
              <Grid templateColumns={"0.2fr 3fr"}>
                <GridItem colSpan={1}>
                  <Badge variant="subtle" colorScheme="green">
                    {movie.id}
                  </Badge>
                </GridItem>

                <GridItem colSpan={1}>
                  <Text>
                    Title:{" "}
                    <Text as={"i"} fontSize="md" color="gray.700">
                      {movie.name}
                    </Text>
                  </Text>
                  <Text>
                    Role:{" "}
                    <Text as={"i"} fontSize="md" color="gray.700">
                      {movie.actorRole}
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
