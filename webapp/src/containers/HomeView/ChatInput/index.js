import './index.css';
import {
    Input,
    Stack,
    IconButton,
    Button,
    useDisclosure,
    Box,
    FormControl, Text,
    Card, CardHeader, CardBody, CardFooter
} from '@chakra-ui/react'
import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    CircularProgress,
} from '@chakra-ui/react'
import Siriwave from 'react-siriwave';

import { Search2Icon } from '@chakra-ui/icons'
import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { loadingSelector, responseSelector } from '../../../redux/openai_api/selectors';
import { getResponse, setLoading } from '../../../redux/openai_api/actions';
import { useSpeechRecognition } from 'react-speech-kit';
import { useSpeechSynthesis } from 'react-speech-kit';
import { Spinner } from "@chakra-ui/react";

export const ChatInput = ({ tasks }) => {

    console.log('in chat input');
    console.log(tasks);

    const dispatch = useDispatch();
    const { isOpen, onOpen, onClose } = useDisclosure()

    const customOnClose = () => {
        onClose();
        cancel();
        setTalk(false);
    }

    const response = useSelector(responseSelector);
    const loading = useSelector(loadingSelector);
    console.log('response');
    console.log(response);

    const [input, setInput] = useState("");
    const [prevInput, setPrevInput] = useState("");
    console.log(input);

    const getChatResponse = (prompt, dispatch) => {
        setPrevInput(input);
        setInput("");
        setTalk(true);
        dispatch(setLoading());
        dispatch(getResponse({"prompt": prompt, "tasks": tasks}));
        onOpen();
    }

    const { listen, listening, stop } = useSpeechRecognition({
        onResult: (result) => {
            setInput(result);
        },
    });

    const handleMouseUp = () => {
        getChatResponse(input, dispatch);
        stop();
    }

    const handleMicClick = () => {
        if (listening) {
            handleMouseUp();
        } else {
            listen({interimResults: true, lang: 'pl-PL'});
        }
    }

    const { speak, speaking, cancel } = useSpeechSynthesis();
    const [talk, setTalk] = useState(true);

    // useEffect, when loading changes from true to false (i.e. when the response is received)
    // run function to speak the response
    if (talk && response && !loading && response.length !== 0) {
        const voices = window.speechSynthesis.getVoices();
        const englishVoice = voices.find((voice) => voice.voiceURI === 'Google polski' && voice.lang === 'pl-PL');

        console.log(englishVoice);

        speak({ text: response, voice: englishVoice });
        setTalk(false);
    }



    return (
        <div class="chat-input-container">
            <Stack spacing={4}>
                <div class="chat-input">
                    <Input
                        onChange={(event) => {
                            setInput(event.target.value);
                        }}
                        resize="vertical"
                        placeholder='Enter question'
                        value={input}
                    />
                    <span id="space"></span>
                    <IconButton
                        aria-label='Search'
                        icon={<Search2Icon />}
                        onClick={() => getChatResponse(input, dispatch)}
                    />
                </div>

                <Button className="mic-button" colorScheme="yellow" onMouseDown={handleMicClick}>
                    {listening ? (
                        <Box className="siriwave">
                                <Spinner size="sm" color="#1c63cc" />

                        </Box>
                    ) : (
                        "Tap to speak"
                    )}
                </Button>

            </Stack>



            <Modal isOpen={isOpen} onClose={customOnClose}>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>Warehouse Buddy 😊</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        <div class="user-input-in-modal">
                            {prevInput}
                        </div>
                        {loading ? (
                            <div class="response-loader">
                                <CircularProgress isIndeterminate color='blue.300' />
                            </div>
                        ) : (
                            <div>
                                {response}
                            </div>
                        )
                        }
                    </ModalBody>

                    <ModalFooter>
                        <Button colorScheme='blue' mr={3} onClick={customOnClose}>
                            Close
                        </Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>

        </div>
    );
}