import {useEffect} from 'react';
import {useSelector, useDispatch} from 'react-redux';

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
    Text,
    Spacer,
    Flex,
    Box
} from '@chakra-ui/react'

import './index.css';
import {TicketSystem} from './TicketSystem';

export const HomeView = ({tasks}) => {
    return (
        <Card overflow='hidden' variant='outline' h="100vh" w="100vw">
            <CardHeader>
                <Heading size='md'>Your diet</Heading>
            </CardHeader>
            <CardBody>
                <Stack spacing={4}>
                    <Flex direction='row'>
                        <Button id="ticket-button" colorScheme='blue' variant='solid' size='lg'>Water!</Button>
                        <Spacer/>
                        <TicketSystem mealType={"snack"}/>
                    </Flex>
                    <TicketSystem mealType={"Add a meal"}/>
                </Stack>
            </CardBody>
            <CardFooter>
                <Stack spacing={2}>
                    <Text>
                        Water: 5 / 8</Text>
                    <br/>
                    <Text>
                        Your calorie intake: 1200 / 1700</Text>
                </Stack>
            </CardFooter>
        </Card>
    );
}