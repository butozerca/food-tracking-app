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

export const TicketSystem = ({mealType, increaseCalorie }) => {
    useEffect(() => {
        console.log(increaseCalorie);
    }, [increaseCalorie]);
    
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

    const onSend = () => {
        if (typeof increaseCalorie === 'function') {
            increaseCalorie();
        } else {
            console.error('increaseCalorie is not a function', increaseCalorie);
        }

        onClose();
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