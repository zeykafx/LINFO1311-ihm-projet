import React, {useState} from "react";
import "./App.css";

import TVShowsViewer from "../components/clientViewers/TVShowsViewer";
import Slide1 from "../components/AboutSlides/Slide1.js";

import { Box, Flex, Spacer, Center, Text, Square, Button } from '@chakra-ui/react'

import MoviesCardsViewer from "./../components/clientViewers/MoviesCardsViewer.js";

import icon_facebook from './../icons/facebook.png';
import icon_instagram from './../icons/instagram.png';
import icon_twitter from './../icons/twitter.png';

function App({
    isSelected
}) {

    const [contentIndex, setContentIndex] = useState(0);

    const text = "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem. Nulla consequat massa quis enim. Donec pede justo, fringilla vel, aliquet nec, vulputate eget, arcu. In enim justo, rhoncus ut, imperdiet a, venenatis vitae, justo. Nullam dictum felis eu pede mollis pretium. Integer tincidunt. Cras dapibus. Vivamus elementum semper nisi. Aenean vulputate eleifend tellus. Aenean leo ligula, porttitor eu, consequat vitae, eleifend ac, enim. Aliquam lorem ante, dapibus in, viverra quis, feugiat a, tellus. Phasellus viverra nulla ut metus varius laoreet. Quisque rutrum. Aenean imperdiet. Etiam ultricies nisi vel augue. Curabitur ullamcorper ultricies nisi. Nam eget dui. Etiam";
    const [isFullTextVisible, setIsFullTextVisible] = useState(false);

    const getContent = () => {
        switch(contentIndex) {
            case 0:
                return <Slide1 />
            case 1:
                return <p>Slide 2</p>
            default:
                return <p>Slide Unk</p>
        } 
    }

    return (
        <Box bg='#eee'>
            <Box
                width={{ base: '90vw', lg: '84vw' }}
                height={{ base: '90vh', lg: '84vh' }}
                margin={{ base: '5vh 5vw', lg: '8vh 8vw' }}
                position='relative'
                zIndex={5}
            >
                

                <Flex 
                opacity={{ base: '.8', lg: '1' }}
                position={'absolute'}
                width='100%'
                height='100%'
                justifyContent={{base:'center', lg:'flex-end'}}
                zIndex={1}
                >
                    <div className="slide-bgContainer">
                        <img src="http://localhost:3000/images/slide1.png"/>
                    </div>
                </Flex>

                <Flex 
                direction="row"
                position='relative'
                zIndex={5}
                height='100%'
                width={'100%'}
                >
                    
                    <Flex
                        flex={1}
                        direction='column'
                    >

                        <Spacer />
            
                        <Flex
                            direction='column'
                            maxW={{base: '100%', lg:'40%'}}
                            bg='white'
                            padding='15px'
                            borderRadius='8px'
                            shadow='md'
                            maxHeight={{base: "100%", lg:"50%"}}
                            overflowY="auto"
                        >
                            <Text 
                            color='black' 
                            fontWeight='bold' 
                            fontSize={{ base: '5xl', lg: '6xl' }}
                            >Alia Bhatt</Text>
                            <Flex
                                direction='row'
                                height='50px'
                                alignItems='center'
                            >
                                <Text flex={1} color='gray.500' fontWeight='semibold' fontSize={{ base: 'xl', lg: '2xl' }}>Actress</Text>

                                <a href="facebook.com" className="socialLink"><Square size={{ base: '35px', lg: '50px' }} display='flex' justifyContent='center' alignItems='center'>
                                    <img className="socialIcon" src={icon_facebook}></img>
                                </Square></a>
                                <a href="twitter.com" className="socialLink"><Square size={{ base: '35px', lg: '50px' }} display='flex' justifyContent='center' alignItems='center'>
                                    <img className="socialIcon" src={icon_twitter}></img>
                                </Square></a>
                                <a href="instagram.com" className="socialLink"><Square size={{ base: '35px', lg: '50px' }} display='flex' justifyContent='center' alignItems='center'>
                                    <img className="socialIcon" src={icon_instagram}></img>
                                </Square></a>

                            </Flex>
                            <Text
                                color='gray.400' fontWeight={400} fontSize={{ base: 'md', lg: 'xl' }}
                            >
                                { isFullTextVisible 
                                ?
                                <>
                                {text + " "}
                                <span className='textAction' onClick={() => setIsFullTextVisible(false)}>Read less</span>
                                </>
                                : 
                                <>
                                    {text.slice(0,175) + "... "}
                                    <span className='textAction' onClick={() => setIsFullTextVisible(true)}>Read more</span>
                                </>
                                }
                            </Text>
                        </Flex>
                        
                        <Box
                            marginTop={"35px"}
                            height={"250px"}
                            display={{ base: 'none', lg: 'block' }}
                        >
                            <MoviesCardsViewer
                                maxNumberOfMovies={2}
                            />
                        </Box>

                    </Flex>

                </Flex>

            </Box>

            <TVShowsViewer
                maxNumberOfTVShows={5}
                height={600}
            />

        </Box>
    );
}

export default App;
