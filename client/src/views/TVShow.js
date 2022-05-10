import {
    Box, 
    Text,
    Flex,
    Center,
    Spacer
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Loader from "../components/misc/Loader";

export const TVShow = (props) => {

    let { id } = useParams();

    const [selectedTVShow, setSelectedTVShow] = useState(undefined);
    const [loading, setLoading] = useState(true);

    useEffect(() => {

        setLoading(true);

        if (id==undefined) return;

        const data = {
            id: id
        };

        fetch("/api/tvshows/client/getFromID", {
            method: "POST",
            headers: {'Content-Type': 'application/json'}, 
            body: JSON.stringify(data)
        }).then(res => res.json().then((response) => {
            
            if (response.status){
                setSelectedTVShow(response.message);
            }

            setLoading(false);

        }));

    }, [id]);

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
            align="center"
            justify="center"
            width={'100vw'}
            height={'100vh'}
            bg='#eee'
            maxW={"100%"}
            >
            { loading ?
            <Loader
              color="rgb(94, 94, 94)"
              size={30}
              noAspectRatio={true}
              label="Fetching informations..."
            />
            :
            <>
            { selectedTVShow &&
            <Flex 
            width={'100%'}
            height={'100%'}
            direction={'row'}
            >
                
                <Flex 
                    height={"100%"}
                    width={"50%"}
                    maxW={'500px'}
                    display={{base:"none", lg:"flex"}}
                    overflow={"hidden"}
                    bg="#fff"
                    padding={"25px"}
                    direction={"column"}
                    justifyContent={"space-evenly"}
                    borderRightWidth={"1px"}
                    borderRightColor={"#dedede"}
                >   
                    <Text color='gray.800' fontWeight='bold' fontSize="4xl"  textAlign={"center"} marginBottom='5px'>{selectedTVShow.name}</Text>
                    <Box
                        overflow={"hidden"}
                        borderRadius={"5px"}
                        shadow={"md"}
                    >
                    <img src={"/photos/"+selectedTVShow.filename}/>
                    </Box>
                    <Box height={"50px"}/>
                </Flex>

                <Flex
                flex={1}
                zIndex={5}
                width={{base:"94%", lg:"90%"}}
                maxH={{base:"94%", lg:"90%"}}
                direction={'column'}
                justifyContent="center"
                alignItems={"center"}
                >
                    <Flex direction={'column'} bg='white' padding={5} shadow={'sm'} borderWidth={'1'} borderColor={'#eee'} overflowY={"auto"} maxH={'100%'}>
                        <Text color='gray.700' fontWeight='bold' fontSize="3xl" marginBottom='10px'>Informations</Text>
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
            </Flex>
            }
            </>
            }
        </Flex>
    );
};