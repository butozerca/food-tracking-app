import './index.css';
import { useDisclosure, Button, Stack, Box, ButtonGroup, Wrap, WrapItem, useBreakpointValue, } from "@chakra-ui/react";
import { useEffect, useState } from 'react';
import { CheckIcon } from '@chakra-ui/icons'
import { useSelector, useDispatch } from 'react-redux';
import { loadingSelector, responseSelector } from '../../../redux/openai_api/selectors';
import { getResponse, setLoading } from '../../../redux/openai_api/actions';
import { useSpeechRecognition } from 'react-speech-kit';
import { useSpeechSynthesis } from 'react-speech-kit';
import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    CircularProgress
} from '@chakra-ui/react'


export const FastPromptSection = ({ tasks }) => {
    const [fast_prompts, setFastPrompts] = useState([])

    const setFastPromptsData = () => {
        fetch("http://localhost:5000/fast_prompts")
            .then(response => {
                return response.json()
            })
            .then(data => {
                console.log('fetched tasks:');
                console.log(tasks);
                if (tasks.length === 0) {
                    setFastPrompts(data);
                } else {
                    let cat = tasks[0].category;
                    let f = data.filter((x) => x.category === cat);
                    setFastPrompts(f);
                    console.log(f)
                }
            })
    }

    useEffect(() => {
        setFastPromptsData()
    }, [tasks])

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
        dispatch(getResponse({ "prompt": prompt, "tasks": tasks }));
        onOpen();
    }

    const { listen, listening, stop } = useSpeechRecognition({
        onResult: (result) => {
            setInput(result);
        },
        lang: 'en'
    });

    const handleMouseUp = () => {
        getChatResponse(input, dispatch);
        stop();
    }

    const { speak, speaking, cancel } = useSpeechSynthesis();
    const [talk, setTalk] = useState(true);

    const isMobile = useBreakpointValue({ base: true, md: false })
    const rows = isMobile ? 6 : 3;

    if (talk && response && !loading && response.length !== 0) {
        const voices = window.speechSynthesis.getVoices();
        const englishVoice = voices.find((voice) => voice.lang === 'pl');

        console.log(englishVoice);

        speak({ text: response, voice: englishVoice });
        setTalk(false);
        console.log("dupa");
    }

    return (
        <div className="fast-prompt-container">
            <Stack spacing="4">
                {fast_prompts.slice(0, rows).map((prompt, index) => (
                    <ButtonGroup key={index} flexDirection={isMobile ? "column" : "row"} borderRadius="md">
                        <Button
                            onClick={() => getChatResponse(prompt.fast_prompt_text, dispatch)}
                            flex={isMobile ? "none" : "1"}
                            colorScheme="blue"
                            borderRadius="md"
                            whiteSpace="normal"
                            wordWrap="break-word"
                            style={{ boxShadow: "0 2px 4px 0 rgba(0,0,0,0.8)" }}
                            height="3.5rem">
                            {prompt.fast_prompt_text}
                        </Button>
                        {fast_prompts[index + 1] && !isMobile &&
                            <Button
                                onClick={() => getChatResponse(fast_prompts[index + 1].fast_prompt_text, dispatch)}
                                flex="1"
                                colorScheme="yellow"
                                borderRadius="md"
                                whiteSpace="normal"
                                wordWrap="break-word"
                                style={{ boxShadow: "0 2px 4px 0 rgba(0,0,0,0.8)" }}
                                height="3.5rem"
                            >
                                {fast_prompts[index + 1].fast_prompt_text}
                            </Button>
                        }
                    </ButtonGroup>
                ))}
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
