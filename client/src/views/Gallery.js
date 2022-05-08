import {Box, Heading, Text, VStack} from "@chakra-ui/react";
import ImageGallery from 'react-image-gallery';
import React from "react";

const images = [
    {
        original: 'https://picsum.photos/id/1018/1000/1500/',
        thumbnail: 'https://picsum.photos/id/1018/1000/1500/',
    },
    {
        original: 'https://picsum.photos/id/1015/1000/600/',
        thumbnail: 'https://picsum.photos/id/1015/250/150/',
    },
    {
        original: 'https://picsum.photos/id/1019/1000/600/',
        thumbnail: 'https://picsum.photos/id/1019/250/150/',
    },
];


export const Gallery = (props) => {
    return (
        <VStack 
        height={{base: "100vh", lg:"auto"}}
        width={{base: "100vw", lg:"90vw"}}
        margin={{base: "0", lg:"8vh 5vw"}}
        >
            <Box>
                <ImageGallery 
                    items={images}
                 />
            </Box >
        </VStack>

    );
};