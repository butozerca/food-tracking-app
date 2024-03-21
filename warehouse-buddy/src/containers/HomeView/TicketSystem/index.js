import './index.css';
import {
    Button,
    useDisclosure,
    Flex,
    Spacer,
    Divider,
    Card,
    Box,
    CardBody
} from '@chakra-ui/react'

import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton
} from '@chakra-ui/react'
import {Textarea} from '@chakra-ui/react'
import {Select} from '@chakra-ui/react'
import {useSelector, useDispatch} from 'react-redux';
import {sendTicket} from '../../../redux/openai_api/actions';
import React, {useState, useEffect} from 'react';
import {WebcamScreenshot} from './WebcameraScreenshot';
import {Congrats} from './Congrats/congrats';
import { useSpeechSynthesis } from 'react-speech-kit';    


export const TicketSystem = ({mealType, increaseCalorie}) => {
    // Set talk to true when the screen with nutrition feedback gets displayed Talk
    // will be set back to false when the talking finishes
    const { speak, speaking, cancel } = useSpeechSynthesis();
    const [congrats, setCongrats] = useState(false);
    const feedbackAfterMeal = "Your pasta had enough calories, good job! Maybe next time try to increase the amount of protein, for example by adding cheese"

    useEffect(() => {
        console.log(increaseCalorie);
    }, [increaseCalorie]);

    useEffect(() => {
        const handleVoicesChanged = () => {
            const voices = window.speechSynthesis.getVoices();
            console.log(voices);
            // Optionally, find and set the voice you need here
        };
    
        window.speechSynthesis.onvoiceschanged = handleVoicesChanged;
    
        // Clean up the event listener when the component unmounts
        return () => {
            window.speechSynthesis.onvoiceschanged = null;
        };
    }, []);

    const dispatch = useDispatch();
    const {isOpen, onOpen, onClose} = useDisclosure()
    const [selectedCategory,
        setSelectedCategory] = useState('');
    const [issue,
        setIssue] = useState('');

    const handleChange = (event) => {
        setSelectedCategory(event.target.value);
    }

    const handleChangeInput = (event) => {
        setIssue(event.target.value);
    }

    let categories = [
        "Bezpieczeństwo",
        "Załadunek",
        "Rozładunek",
        "Czystość i ergonomia",
        "Lokalizacja w magazynie",
        "Inne"
    ]
    const list = categories.map((el) => {
        return <option value={el} key={el}>{el}</option>;
    });


    const Talk = (message) => {
        const voices = window.speechSynthesis.getVoices();

        console.log(voices);
        const englishVoice = voices.find((voice) => voice.lang === 'en-US' || voice.lang.startsWith('en-'));

        console.log(englishVoice);

        if (englishVoice) {
            speak({
                text: message,
                voice: englishVoice,
                // onEnd: () => {
                //     finishTalking(); // Call finishTalking to update the state if needed
                // }
            });
        }
    }

    const onSend = () => {
        if (typeof increaseCalorie === 'function') {
            increaseCalorie();
        } else {
            console.error('increaseCalorie is not a function', increaseCalorie);
        }
        setCongrats(true);

        // onClose();
    }

    return (
        <Box >
            <Button
                id="ticket-button"
                onClick={onOpen}
                colorScheme='teal'
                variant='outline'
                size='lg'>{mealType}</Button>

            <Modal isOpen={isOpen} onClose={onClose}>
                <ModalOverlay/>
                <ModalContent>
                    <ModalHeader/>
                    <ModalCloseButton/>
                    <ModalBody>
                        <WebcamScreenshot/>
                        <Select
                            class="select-ticket-type"
                            placeholder='Wybierz kategorię zgłoszenia'
                            onChange={handleChange}
                            value={selectedCategory}>
                            {list}
                        </Select>
                        <Divider id="ticket-divider"/>
                        <Textarea
                            placeholder='Write your description here.'
                            size='md'
                            h='calc(20vh)'
                            onChange={handleChangeInput}
                            value={issue}/>
                            {congrats === true ? (
                                <Congrats TalkFunction={Talk}></Congrats>
                            ) : (
                                <></>
                            )
                            }
                    </ModalBody>
                    <ModalFooter>
                        <Button colorScheme='facebook' mr={3} onClick={onSend}>
                            Submit
                        </Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </Box>
    );
}