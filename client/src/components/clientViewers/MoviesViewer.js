import React, { useState, useEffect } from 'react';

import "../../Constants/vars.css";
import "../../Constants/font.css";

import "./TVShowsViewer.css";
import Loader from '../misc/Loader';

import { Box, Flex, Center, Text } from '@chakra-ui/react'


function MoviesViewer({
    maxNumberOfMovies=-1
}) {

    const [MoviesList, setMoviesList] = useState([]);
    const [selectedMovie, setSelectedMovie] = useState(undefined);

    const [loading, setLoading] = useState(true);
    const [response, setResponse] = useState("");

    const getReadableDateFromMilliTime = (dateInMilli) => {
        const dateObject = new Date(parseInt(dateInMilli));
        return dateObject.getDate() + "/" + (dateObject.getMonth() + 1) + "/" + dateObject.getFullYear();
    }

    const extractWebsiteName = (rawURL) => {
        let result = "";

        let positionWWW = rawURL.indexOf("www.");
        if(positionWWW===-1) positionWWW = 0;

        let startRegisteringDot = false;

        for (let index = positionWWW; index < rawURL.length; index++) {
            const letter = rawURL[index];
            
            if(startRegisteringDot){
                if(letter==="/"){
                    break;
                }
            } else {
                if(letter==="."){
                    startRegisteringDot = true;
                }
            }

            result += letter;

        }

        return result;
    }

    useEffect(() => {

        setLoading(true);
        setResponse("");

        const data = {
            maxNumberOfMovies: maxNumberOfMovies
        };

        fetch("/api/movies/client/get", {
            method: "POST",
            headers: {'Content-Type': 'application/json'}, 
            body: JSON.stringify(data)
        }).then(res => res.json().then((response) => {
            
            if (response.status){
                setMoviesList(response.message);
                setSelectedMovie(response.message[0]);
                console.log(response.message[0]);
            } else {
                setResponse(response.message);
            }

            setLoading(false);

        }));

    }, []);

    const getNumberOfMovies = () => {
        return MoviesList.length
    }       
    
    const genCoActorBubbles = (coActors) => {
        return coActors.map((actor, index) => {
            let separator = "";
            if(index !== (coActors.length - 1)){
                separator = index===(coActors.length - 2) ? " and " : ", ";
            }
            return <b className="actorBubble">{actor}{separator}</b>
        })
    }

    return (
        <Flex
            direction={'column'}
            height={{base:"100vh", lg:"90vh"}}
            overflow="hidden"
            width={'100vw'}
        >
            <Text fontSize={"3xl"} color={"gray.500"} fontWeight={'bold'} textAlign={'center'} mt={'25px'} mb={'25px'}>Discover her best movies</Text>
            <Box
                height={'30vh'}
                width={'100%'}
                bg={'gray.200'}
                overflowY={"hidden"}
                overflowX={"auto"}
                style={{flexShrink: 0}}
                flexShrink={0}
            >
                <div className="horizontalScroller"
                style={{width: 172*getNumberOfMovies()+50+"px"}}
                >
                { response!=="" ?
                    <div itemId={0} className="errorContainer">
                        <h3>{response}</h3>
                    </div>
                    :
                    <>
                    { loading 
                    ? <Loader itemId={0} color="rgb(94, 94, 94)" size={30} noAspectRatio={true} label="Fetching the movies..."/>
                    :
                    <>
                        <Box flex={1}></Box>
                        {MoviesList.map((movie) =>
                            <Flex
                            itemId={movie.id}
                            key={movie.id}
                            direction={'column'}
                            height='25vh'
                            width='17vh'
                            padding={{base:"5px", lg:"10px"}}
                            cursor='pointer'
                            className="onHoverPoster"
                            onClick={() => setSelectedMovie(movie)}
                            >
                                <Flex 
                                    flex={1}
                                    overflow={"hidden"}
                                    borderRadius={"8px"}
                                    mb={"5px"}
                                    opacity={selectedMovie.id==movie.id ? "1" : ".8"}
                                    shadow={selectedMovie.id==movie.id ? "xl" : "md"}
                                    style={
                                        selectedMovie.id==movie.id ? {
                                            border: "solid 2px gray"
                                        } : {}
                                    }
                                >
                                    <img className="posterImg" src={"/photos/"+movie.filename}/>
                                </Flex>
                                <Text 
                                color={
                                    selectedMovie.id==movie.id ? "black" : "gray.500"
                                }
                                fontWeight='500' 
                                fontSize="sm"
                                height={{base:"0px", lg:"25px"}}
                                display={{base:"none", lg:"block"}}
                                textAlign={"center"}
                                >
                                    {movie.name}
                                </Text>
                            </Flex>
                        )}
                        <Box flex={1}></Box>
                    </>
                    }
                    </>    
                }
                </div>
            </Box>
            <Center 
                display={'flex'}
                flex={1}
                bg={"#eee"}
                justifyContent={'center'}
                alignItems={'center'}
                height={0}
                position='relative'
                overflow={"hidden"}
            >
                {(selectedMovie !== undefined) &&
                <>
                <Flex
                    zIndex={5}
                    width={{base:"94%", lg:"40%"}}
                    maxH={{base:"94%", lg:"90%"}}
                    direction={'column'}
                    >
                        <Flex direction={'column'} bg='white' padding={5} shadow={'sm'} borderWidth={'1'} borderColor={'#eee'} overflowY={"auto"} maxH={'100%'}>
                            <Text color='gray.800' fontWeight='bold' fontSize="3xl" marginBottom='10px'>{selectedMovie.name}</Text>
                            <Text color='gray.600' fontWeight='500' fontSize="sm" marginBottom='2px'>Playing as <b>{selectedMovie.actorRole}</b></Text>
                            <Text color='gray.600' fontWeight='500' fontSize="sm" marginBottom='2px'>Directed by <b>{selectedMovie.director}</b></Text>
                            <Text color='gray.600' fontWeight='500' fontSize="sm" marginBottom='2px'>Released on the <b>{getReadableDateFromMilliTime(selectedMovie.releaseDate)}</b></Text>
                            <Text color='gray.600' fontWeight='500' fontSize="sm" marginBottom='8px'>With {genCoActorBubbles(selectedMovie.coActors)}</Text>
                            <Text color='gray.700' fontWeight='bold' fontSize="sm" marginBottom='2px'>DESCRIPTION</Text>
                            <Text color='gray.500' fontWeight='500' fontSize="sm" marginBottom='8px'>
                                {selectedMovie.description}
                            </Text>
                        </Flex>
                        <Box bg={'#dedede'} width={'100%'} height={"1px"} margin={'10px 0'}></Box>
                        <Flex
                            direction={'row'}
                            justifyContent={'space-evenly'}
                        >
                            <Flex direction={'column'} alignItems={'center'}>
                                <Text color='gray.700' fontWeight='bold' fontSize="sm" marginBottom='2px'>LANGUAGES</Text>
                                <Flex wrap={'wrap'} direction={'row'} mb={'8px'}>
                                    { selectedMovie.languages.map((language) => {
                                        return <Text color='white' fontWeight='bold' fontSize="sm" bg={'black'} borderRadius={"5px"}  m={"5px"} padding={'3px 8px'}>{language}</Text>
                                    })}
                                </Flex>
                            </Flex>
                            <Box bg={'#dedede'} width={"1px"} margin={'10px 0'}></Box>
                            <Flex direction={'column'} alignItems={'center'}>
                                <Text color='gray.700' fontWeight='bold' fontSize="sm" marginBottom='2px'>TICKET AT</Text>
                                <Flex wrap={'wrap'} direction={'row'} mb={'8px'}>
                                    { selectedMovie.ticketLinks.map((link) => {
                                        return <Text color='white' fontWeight='bold' fontSize="sm" bg={'black'} borderRadius={"5px"}  m={"5px"} padding={'3px 8px'}>{extractWebsiteName(link)}</Text>
                                    })}
                                </Flex>
                            </Flex>
                        </Flex>
                </Flex>
                </>
                }
            </Center>
        </Flex>
    );
}
export default MoviesViewer;