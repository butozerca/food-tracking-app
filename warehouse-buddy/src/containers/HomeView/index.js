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
    Progress
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
                <Heading size='lg'>Your diet</Heading>
            </CardHeader>
            <CardBody>
                <Stack spacing={4}>
                    <Flex direction='row'>
                        <Button id="ticket-button" colorScheme='blue' variant='solid' size='lg' onClick={handleWaterClick} h="70px"  // Add onClick handler here
                        >
                            <CiGlass boxSize="20px"/>
                            Water!</Button>
                        <Spacer/>
                        {/* Submitting a photo of the food currently increases always by 350 calories */}
                        <TicketSystem mealType={"snack"} increaseCalorie={increaseCalorieCount}/>
                    </Flex>
                    <TicketSystem mealType={"Add a meal"} increaseCalorie={increaseCalorieCount}/>
                </Stack>
            </CardBody>
            <CardFooter>
                <Stack spacing={2}>
                <Heading size='md'>
                    </Heading>
                    <HStack>
                        {waterDoneIcons}
                        {waterRemainingIcons}
                    </HStack>
                   
                    <Progress hasStripe value={countCalorieDone/calorieTotal * 100}  /> 
                    {calorieTotal}
                </Stack>
            </CardFooter>
        </Card>
    );
}