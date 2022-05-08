import React, { useState, useEffect } from 'react';

import "../../Constants/vars.css";
import "../../Constants/font.css";

import "./TVShowsViewer.css";
import Loader from '../misc/Loader';

import { Box, Flex, Center, Text } from '@chakra-ui/react'


function TVShowsViewer({
    maxNumberOfTVShows=-1
}) {

    const [TVShowsList, setTVShowsList] = useState([]);
    const [selectedTVShow, setSelectedTVShow] = useState(undefined);

    const [loading, setLoading] = useState(true);
    const [response, setResponse] = useState("");

    const getReadableDateFromMilliTime = (dateInMilli) => {
        const dateObject = new Date(parseInt(dateInMilli));
        return dateObject.getDate() + "/" + (dateObject.getMonth() + 1) + "/" + dateObject.getFullYear();
    }

    useEffect(() => {

        setLoading(true);
        setResponse("");

        const data = {
            maxNumberOfTVShows: maxNumberOfTVShows
        };

        fetch("/api/tvshows/client/get", {
            method: "POST",
            headers: {'Content-Type': 'application/json'}, 
            body: JSON.stringify(data)
        }).then(res => res.json().then((response) => {
            
            if (response.status){
                setTVShowsList(response.message);
                setSelectedTVShow(response.message[0]);
            } else {
                setResponse(response.message);
            }

            setLoading(false);

        }));

    }, []);

    const getNumberOfTvShows = () => {
        return TVShowsList.length
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
            <Text fontSize={"3xl"} color={"gray.500"} fontWeight={'bold'} textAlign={'center'} mt={'25px'} mb={'25px'}>Discover her best TV Shows</Text>
            <Box
                height={'26vh'}
                width={'100%'}
                bg={'gray.200'}
                overflowY={"hidden"}
                overflowX={"auto"}
                style={{flexShrink: 0}}
                justifyContent="center"
                display="flex"
            >
                <div className="horizontalScroller"
                style={{width: 172*getNumberOfTvShows()}}
                >
                { response!=="" ?
                    <div itemId={0} className="errorContainer">
                        <h3>{response}</h3>
                    </div>
                    :
                    <>
                    { loading 
                    ? <Loader itemId={0} color="rgb(94, 94, 94)" size={30} noAspectRatio={true} label="Fetching the TVShows..."/>
                    :
                    <>
                        {TVShowsList.map((TVShow) =>
                            <Flex
                            itemId={TVShow.id}
                            key={TVShow.id}
                            direction={'column'}
                            height='25vh'
                            width='17vh'
                            padding={{base:"5px", lg:"10px"}}
                            cursor='pointer'
                            className="onHoverPoster"
                            onClick={() => setSelectedTVShow(TVShow)}
                            >
                                <Flex 
                                    flex={1}
                                    overflow={"hidden"}
                                    borderRadius={"8px"}
                                    mb={"5px"}
                                    opacity={selectedTVShow.id==TVShow.id ? "1" : ".8"}
                                    shadow={selectedTVShow.id==TVShow.id ? "xl" : "md"}
                                    style={
                                        selectedTVShow.id==TVShow.id ? {
                                            border: "solid 2px gray"
                                        } : {}
                                    }
                                >
                                    <img className="posterImg" src="https://images.immediate.co.uk/remote/m.media-amazon.com/images/M/MV5BNWE3Mzc2YzUtZDAyYS00MmQ4LWFhZmItYTA5MTYyYjgxMTQ4XkEyXkFqcGdeQXVyNDgxMDU4NTU@._V1_.jpg?quality=90&webp=true&resize=650,911"/>
                                </Flex>
                                <Text 
                                color={
                                    selectedTVShow.id==TVShow.id ? "black" : "gray.500"
                                }
                                fontWeight='500' 
                                fontSize="sm"
                                height={{base:"0px", lg:"25px"}}
                                display={{base:"none", lg:"block"}}
                                textAlign={"center"}
                                >
                                    {TVShow.name}
                                </Text>
                            </Flex>
                        )}
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
                {(selectedTVShow !== undefined) &&
                <>
                <Flex
                    zIndex={5}
                    width={{base:"94%", lg:"40%"}}
                    maxH={{base:"94%", lg:"90%"}}
                    direction={'column'}
                    >
                        <Flex direction={'column'} bg='white' padding={5} shadow={'sm'} borderWidth={'1'} borderColor={'#eee'} overflowY={"auto"} maxH={'100%'}>
                            <Text color='gray.800' fontWeight='bold' fontSize="3xl" marginBottom='10px'>{selectedTVShow.name}</Text>
                            <Text color='gray.600' fontWeight='500' fontSize="sm" marginBottom='2px'>Playing as <b>{selectedTVShow.actorRole}</b></Text>
                            <Text color='gray.600' fontWeight='500' fontSize="sm" marginBottom='2px'>Directed by <b>{selectedTVShow.director}</b></Text>
                            <Text color='gray.600' fontWeight='500' fontSize="sm" marginBottom='2px'>Released on the <b>{getReadableDateFromMilliTime(selectedTVShow.releaseDate)}</b></Text>
                            <Text color='gray.600' fontWeight='500' fontSize="sm" marginBottom='8px'>With {genCoActorBubbles(selectedTVShow.coActors)}</Text>
                            <Text color='gray.700' fontWeight='bold' fontSize="sm" marginBottom='2px'>DESCRIPTION</Text>
                            <Text color='gray.500' fontWeight='500' fontSize="sm" marginBottom='8px'>
                                {selectedTVShow.description}
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
                                    { selectedTVShow.languages.map((language) => {
                                        return <Text color='white' fontWeight='bold' fontSize="sm" bg={'black'} borderRadius={"5px"}  m={"5px"} padding={'3px 8px'}>{language}</Text>
                                    })}
                                </Flex>
                            </Flex>
                            <Box bg={'#dedede'} width={"1px"} margin={'10px 0'}></Box>
                            <Flex direction={'column'} alignItems={'center'}>
                                <Text color='gray.700' fontWeight='bold' fontSize="sm" marginBottom='2px'>AVAILABLE ON</Text>
                                <Flex wrap={'wrap'} direction={'row'} mb={'8px'}>
                                    { selectedTVShow.tv_channels.map((tv_channel) => {
                                        return <Text color='white' fontWeight='bold' fontSize="sm" bg={'black'} borderRadius={"5px"}  m={"5px"} padding={'3px 8px'}>{tv_channel}</Text>
                                    })}
                                </Flex>
                            </Flex>
                            <Box bg={'#dedede'} width={"1px"} margin={'10px 0'}></Box>
                            <Flex direction={'column'} alignItems={'center'}>
                                <Text color='gray.700' fontWeight='bold' fontSize="sm" marginBottom='2px'>AVAILABLE ON</Text>
                                <Flex wrap={'wrap'} direction={'row'} mb={'8px'}>
                                    { selectedTVShow.streaming_services.map((streaming_service) => {
                                        return <Text color='white' fontWeight='bold' fontSize="sm" bg={'black'} borderRadius={"5px"} m={"5px"} padding={'3px 8px'}>{streaming_service}</Text>
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
export default TVShowsViewer;