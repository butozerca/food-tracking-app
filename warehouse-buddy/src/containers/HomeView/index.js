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
    CardFooter,
    Heading,
    Divider,
    Stack,
    Text,
    Box
} from '@chakra-ui/react'

import './index.css';
import {TicketSystem} from './TicketSystem';

export const HomeView = ({tasks}) => {
    return (
        <Card overflow='hidden' variant='outline' >
            <CardHeader>
                <Heading size='md'>Your diet</Heading>
            </CardHeader>
            <CardBody>
                <Stack spacing={4}>
                    <Card direction='row' justifyContent="space-around">
                        <Card>
                            <CardBody>
                                <Button id="ticket-button" colorScheme='blue' variant='solid' size='lg'>Water!</Button>
                            </CardBody>
                        </Card>
                        <TicketSystem mealType={"snack"}/>
                    </Card>
                    <TicketSystem mealType={"Add a meal"}/>
                </Stack>
            </CardBody>
            <CardFooter>
                <Text>
                    Water: 5 / 8</Text>
                <br/>
                <Text>
                    Your calorie intake: 1200 / 1700</Text>
            </CardFooter>
        </Card>
    );
}