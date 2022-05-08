import React, { useState } from 'react';
import "./Biography.css";

import { Box, Flex, Spacer, Center, Text, Square, Button } from '@chakra-ui/react'

function Biography({}) {

    const [BiographyText, setBiographyText] = useState("Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem. Nulla consequat massa quis enim. Donec pede justo, fringilla vel, aliquet nec, vulputate eget, arcu. In enim justo, rhoncus ut, imperdiet a, venenatis vitae, justo. Nullam dictum felis eu pede mollis pretium. Integer tincidunt. Cras dapibus. Vivamus elementum semper nisi. Aenean vulputate eleifend tellus. Aenean leo ligula, porttitor eu, consequat vitae, eleifend ac, enim. Aliquam lorem ante, dapibus in, viverra quis, feugiat a, tellus. Phasellus viverra nulla ut metus varius laoreet. Quisque rutrum. Aenean imperdiet. Etiam ultricies nisi vel augue. Curabitur ullamcorper ultricies nisi. Nam eget dui. Etiam rhoncus. Maecenas tempus, tellus eget condimentum rhoncus, sem quam semper libero, sit amet adipiscing sem neque sed ipsum. Nam quam nunc, blandit vel, luctus pulvinar, hendrerit id, lorem. Maecenas nec odio et ante tincidunt tempus. Donec vitae sapien ut libero venenatis faucibus. Nullam quis ante. Etiam sit amet orci eget eros faucibus tincidunt. Duis leo. Sed fringilla mauris sit amet nibh. Donec sodales sagittis magna. Sed consequat, leo eget bibendum sodales, augue velit cursus nunc, quis gravida magna mi a libero. Fusce vulputate eleifend sapien. Vestibulum purus quam, scelerisque ut, mollis sed, nonummy id, metus. Nullam accumsan lorem in dui. Cras ultricies mi eu turpis hendrerit fringilla. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; In ac dui quis mi consectetuer lacinia. Nam pretium turpis et arcu. Duis arcu tortor, suscipit eget, imperdiet nec, imperdiet iaculis, ipsum. Sed aliquam ultrices mauris. Integer ante arcu, accumsan a, consectetuer eget, posuere ut, mauris. Praesent adipiscing. Phasellus ullamcorper ipsum rutrum nunc. Nunc nonummy metus. Vestibulum volutpat pretium libero. Cras id dui. Aenean ut eros et nisl sagittis vestibulum. Nullam nulla eros, ultricies sit amet, nonummy id, imperdiet feugiat, pede. Sed lectus. Donec mollis hendrerit risus. Phasellus nec sem in justo pellentesque facilisis. Etiam imperdiet imperdiet orci. Nunc nec neque. Phasellus leo dolor, tempus non, auctor et, hendrerit quis, nisi. Curabitur ligula sapien, tincidunt non, euismod vitae, posuere imperdiet, leo. Maecenas malesuada. Praesent congue erat at massa. Sed cursus turpis vitae tortor. Donec posuere vulputate arcu. Phasellus accumsan cursus velit. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Sed aliquam, nisi quis porttitor congue, elit erat euismod orci, ac placerat dolor lectus quis orci. Phasellus consectetuer vestibulum elit. Aenean tellus metus, bibendum sed, posuere ac, mattis non, nunc. Vestibulum fringilla pede sit amet augue. In turpis. Pellentesque posuere. Praesent turpis. Aenean posuere, tortor sed cursus feugiat, nunc augue blandit nunc, eu sollicitudin urna dolor sagittis lacus. Donec elit libero, sodales nec, volutpat a, suscipit non, turpis. Nullam sagittis. Suspendisse pulvinar, augue ac venenatis condimentum, sem libero volutpat nibh, nec pellentesque velit pede quis nunc. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Fusce id purus. Ut varius tincidunt libero. Phasellus dolor. Maecenas vestibulum mollis");

    return (
        <Center 
            display={'flex'}
            flex={1}
            bg={"white"}
            justifyContent={'center'}
            alignItems={'center'}
            height={{base:'100vh', lg:'60vh'}}
            position='relative'
        >
            <Flex
                width={{base:"94%", lg:"1100px"}}
                maxH={{base:"94%", lg:"90%"}}
                bg='white'
                overflowY={'hidden'}
                direction={{base: 'column', lg: 'row'}}
                borderRadius={5}
                boxShadow='xl'
                borderWidth={'1px'}
                borderColor={'#dedede'}
            >
                <Square 
                    justifyContent={'center'}
                    alignItems={'center'}
                    overflow={'hidden'}
                    size={{base:'100%', lg: '48%'}}
                    height={{base:'40%', lg: 'auto'}}
                    m={{base: '0%', lg: '1%'}}
                    bg='#eee'
                    borderRadius={5}
                    display={{base:"none", lg:"flex"}}
                >
                    <img className="image" src="http://localhost:3000/images/slide1.png"/>
                </Square>
                <Box 
                    overflow={'hidden'}
                    width={{base:'98%', lg: '48%'}}
                    height={{base:'60%', lg: 'auto'}}
                    m={'1%'}
                    borderRadius={5}
                    overflowY={"auto"}
                >   
                    <Text color='black' fontWeight='bold' fontSize="35px" textAlign={'center'} m='8px' h={'70px'} lineHeight={'70px'}>My biography</Text>
                    <Box bg={'#dedede'} width={'100%'} height={"1px"} margin={'10px 0'} opacity={0.5}></Box>
                    <Text color='gray.500' fontWeight='500' fontSize="sm" m='8px'>
                        {BiographyText}
                    </Text>
                </Box>
            </Flex>
        </Center>
    )

}
export default Biography;