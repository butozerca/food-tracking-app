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
    const waterDoneIcons = [...Array(countWaterDone)].map((_, index) => (<Icon key={`done-${index}`} as={FaDroplet} color='blue.500' boxSize={8}/>));

    // Generate an array for the remaining water (CiDroplet icons)
    const waterRemainingIcons = [...Array(waterTotal - countWaterDone)].map((_, index) => (<Icon key={`remaining-${index}`} as={CiDroplet} color='blue.500' boxSize={8}/>));

    return (
        <Card overflow='hidden' variant='outline' h="100vh" w="100vw">
            <CardHeader backgroundColor='green.500' height={20}>
                <Flex direction='row' justifyContent={'space-between'}>
                    <Heading marginBottom={8} fontSize={35} color='gray.50' >VitalEaty 🍎</Heading>
                    <Avatar size='md' name='Anna Stawiska' />
                </Flex>
            </CardHeader>
            <Divider/>
            <CardBody>
                <Container marginBottom={4}>
                    <Stack spacing={5}>
                        <Box width="100%">
                            <Heading size='md' marginBottom={3}>
                                Your daily calorie goal: {countCalorieDone} / {calorieTotal}
                            </Heading>
                            <Progress hasStripe value={countCalorieDone/calorieTotal * 100} height={5} borderWidth={3}/>
                        </Box>
                        <HStack spacing={1}>
                            {waterDoneIcons}
                            {waterRemainingIcons}
                        </HStack>
                    </Stack>
                </Container>
                <Divider  marginBottom={12}/>
                <Stack spacing={4} marginTop={15} marginBottom={-15}>
                    <Flex direction='row' justifyContent='center'>
                        <Button colorScheme='blue' variant='solid' fontSize={30} onClick={handleWaterClick} width="58%" h="80px">
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
                <Button colorScheme='gray' variant='solid' marginTop={5} fontSize={50} width="80px" h="80px">
                    📊
                </Button>
            </CardBody>
            <CardFooter>

            </CardFooter>
        </Card>
    );
}