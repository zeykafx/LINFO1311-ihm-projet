// @flow
import {Box, Heading, Text, VStack} from "@chakra-ui/react";
import ImageGallery from 'react-image-gallery';
import React from "react";

const images = [
    {
        original: 'https://picsum.photos/id/1018/1000/600/',
        thumbnail: 'https://picsum.photos/id/1018/250/150/',
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

type Props = {

};

export const Gallery = (props: Props) => {
    return (
        <VStack margin={3} marginBottom={10}>
            <Text fontSize={"xl"} color={"white"} textAlign={'center'} m={2}>Image Gallery</Text>

            <Box maxH={"600px"} maxW={"85%"} borderWidth='1px' borderRadius='lg' overflow='hidden' display='flex' align="center" justify="center">
                <ImageGallery items={images} />
            </Box >
        </VStack>

    );
};