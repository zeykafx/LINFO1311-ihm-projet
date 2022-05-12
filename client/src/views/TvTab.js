import {
    Flex,
    Box,
    Grid,
    GridItem,
    Text,
    AspectRatio,
    useToast,
  } from "@chakra-ui/react";
  import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
  
  export const TvTab = (props) => {
    const [tvShows, setTvShows] = useState([]);
  
    const navigate = useNavigate();

    const toast = useToast();
  
    useEffect(() => {

      const data = {
          maxNumberOfTVShows: 1000
      };

      fetch("/api/tvshows/client/get", {
          method: "POST",
          headers: {'Content-Type': 'application/json'}, 
          body: JSON.stringify(data)
      }).then(res => res.json().then((response) => {

          if (response.status){
              setTvShows(response.message);
          } else {
            toast({
              title: "Couldn't fetch the TV Shows",
              description: "Error message: " + response.message,
              status: "error",
              position: "bottom-left",
              duration: 15000,
              isClosable: true,
            });
          }

      }));

    }, []);

  
    return (
      <>
        <Flex
          align="center"
          justify="center"
          width={"100vw"}
          minHeight={"100vh"}
          bg="#eee"
          maxW={"100%"}
          flexDirection={"column"}
        >
          <Text
            fontSize={"4xl"}
            color="black"
            fontWeight={"500"}
            margin={"40px 0px"}
          >
            Television
          </Text>
          <Grid
            width={"94%"}
            height={"100%"}
            margin={"0% 3%"}
            templateColumns={{
              base: "repeat(1, 1fr)",
              sm: "repeat(2, 1fr)",
              md: "repeat(3, 1fr)",
              lg: "repeat(5, 1fr)",
            }}
            gap={"10px"}
          >
            {tvShows.map((tvShow) => (
              <GridItem
                w="100%"
                height="fit-content"
                pos={"relative"}
                cursor={"pointer"}
                borderWidth="1px"
                borderColor="#eee"
                _hover={{
                  shadow: "sm",
                  borderWidth: "1px",
                  borderColor: "gray.700",
                }}
                onClick={() => navigate(`/tvShow/${tvShow.id}`)}
              >
                <AspectRatio
                  ratio={0.66}
                  bg="#dedede"
                  display={"flex"}
                  justifyContent={"center"}
                  alignItems={"center"}
                >
                  <img
                    style={{
                      width: "100%",
                    }}
                    src={"/photos/" + tvShow.posterImage}
                  />
                </AspectRatio>
                <Box
                  pos={"absolute"}
                  bottom={"10px"}
                  width={"90%"}
                  mr={"5%"}
                  ml={"5%"}
                  padding={"5px"}
                  bg="white"
                  borderRadius={"5px"}
                  shadow="md"
                  textAlign={"center"}
                >
                  <Text fontWeight={"500"} color="black" fontSize={"sm"}>
                    {tvShow.name}
                  </Text>
                </Box>
              </GridItem>
            ))}
          </Grid>
          <Box h={"100px"}></Box>
        </Flex>
      </>
    );
  };
  