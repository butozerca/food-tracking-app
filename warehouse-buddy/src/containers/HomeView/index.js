import {useEffect} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {useState} from 'react';
import {ChatInput} from './ChatInput';
import {FastPromptSection} from './FastPromptSection';
import {TaskBanner} from './TaskBanner';
import {SpeechToText} from './ChatInput/SpeechToText';
import {
    Button,
    Card,
    CardBody,
    CardHeader,
    Container,
    CardFooter,
    Heading,
    Divider,
    Stack,
    HStack,
    Text,
    Spacer,
    Flex,
    Box,
    Progress,
    Avatar,
    WrapItem
} from '@chakra-ui/react'
import {Icon} from '@chakra-ui/react'
import {CiDroplet} from "react-icons/ci";
import {FaDroplet} from "react-icons/fa6";
import { CiGlass } from "react-icons/ci";
import './index.css';
import {TicketSystem} from './TicketSystem';

export const HomeView = ({tasks}) => {
    const [countWaterDone,
        setCountWaterDone] = useState(0); // Fixed: useState should be used with destructuring
    const waterTotal = 8;
    const [countCalorieDone,
        setCountCalorieDone] = useState(0); // Fixed: useState should be used with destructuring
    const calorieTotal = 1800;
    

    // Function to handle clicking the "Water!" button
    const handleWaterClick = () => {
        setCountWaterDone(prevCount => Math.min(prevCount + 1, waterTotal));
    };
    const increaseCalorieCount = () => {
        setCountCalorieDone(prevCount => Math.min(prevCount + 350, calorieTotal));
    };    

    // Generate an array for the amount of water drank (FaDroplet icons)
    const waterDoneIcons = [...Array(countWaterDone)].map((_, index) => (<Icon key={`done-${index}`} as={FaDroplet} color='blue.500' boxSize={6}/>));

    // Generate an array for the remaining water (CiDroplet icons)
    const waterRemainingIcons = [...Array(waterTotal - countWaterDone)].map((_, index) => (<Icon key={`remaining-${index}`} as={CiDroplet} color='blue.500' boxSize={6}/>));

    return (
        <Card overflow='hidden' variant='outline' h="100vh" w="100vw">
            <CardHeader>
                <Flex direction='row' justifyContent={'end'}>
                <WrapItem>
                    <Avatar size='md' name='' />
                </WrapItem>
                </Flex>
                <Heading marginBottom={8} fontSize={35} >Vitaleaty 🍏</Heading>
                <Divider/>
            </CardHeader>
            <CardBody>
                <Container marginBottom={4} marginTop={-6}>
                    <Stack spacing={5}>
                        <Box width="100%">
                            <Heading size='md' marginBottom={3}>
                                Your current calorie intake: {countCalorieDone} / {calorieTotal}
                            </Heading>
                            <Progress hasStripe value={countCalorieDone/calorieTotal * 100}  />
                        </Box>
                        <HStack>
                            {waterDoneIcons}
                            {waterRemainingIcons}
                        </HStack>
                    </Stack>
                </Container>
                <Divider  marginBottom={9}/>
                <Stack spacing={4} marginTop={15} marginBottom={-15}>
                    <Flex direction='row' justifyContent='center'>
                        <Button colorScheme='blue' variant='solid' fontSize={60} onClick={handleWaterClick} width="83%" h="150px">
                            💧+
                        </Button>
                    </Flex>
                        {/* <Spacer/> */}
                        {/* Submitting a photo of the food currently increases always by 350 calories */}
                        {/* <TicketSystem mealType={"snack"} increaseCalorie={increaseCalorieCount}/> */}
                    <Flex direction='row' justifyContent='center'>
                        <TicketSystem mealType={"🍽️"} increaseCalorie={increaseCalorieCount}/>
                    </Flex>
                </Stack>
            </CardBody>
            <CardFooter>
                <Button colorScheme='gray' variant='solid' fontSize={50} width="80px" h="80px">
                    📊
                </Button>
            </CardFooter>
        </Card>
    );
}