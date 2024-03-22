import './index.css';
import { Button, useDisclosure, Flex, Box, Center, Spacer } from '@chakra-ui/react'
import { Stack } from '@chakra-ui/layout'

import{IconButton, Modal, ModalOverlay, ModalContent, ModalHeader, ModalFooter, ModalBody, ModalCloseButton, Popover, PopoverTrigger, PopoverContent, PopoverArrow, PopoverCloseButton, PopoverHeader, PopoverBody} from '@chakra-ui/react'
import { Textarea, Avatar, Heading } from '@chakra-ui/react'
import React, { useState, useEffect, useCallback, useRef } from 'react';
// import { WebcamScreenshot } from './WebcameraScreenshot';
import Webcam from "react-webcam"
import { Congrats } from './congrats';
import { useSpeechRecognition } from 'react-speech-kit';
import { IoEarOutline } from "react-icons/io5";
import { FaQuestion } from "react-icons/fa";
import { IoCamera } from "react-icons/io5";

export const MealFlow = ({mealType, increaseCalorie }) => {
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

    const {isOpen, onOpen, onClose} = useDisclosure()

    const [img, setImg] = useState(null);
    const webcamRef = useRef(null);

    const videoConstraints = {
        width: 420,
        height: 420,
        facingMode: "user",
    };

    // show congrats message
    const [congrats, setCongrats] = useState(null);

    const msg = new SpeechSynthesisUtterance();
    console.log(msg);
    msg.text = "Welcome to Vitality.";

    useEffect(() => {
        if (congrats === true) {
            const msg = new SpeechSynthesisUtterance();
            msg.text = "Congratulations, thank you very much! Your pasta looks very good, it has enough calories, but you can add more protein next time by adding a fish.";
            window.speechSynthesis.speak(msg);
        }
    }, [congrats]);

    useEffect(() => {
        if (img !== null) {
            const msg = new SpeechSynthesisUtterance();
            msg.text = "Great picture! Please tell me, what you have on plate? When you're done, press the button Done.";
            window.speechSynthesis.speak(msg);
        }
    }, [img]);

    const sendData = () => {
        setCongrats(true);
        updateCalories();
        stop();
        console.log(listening);
    }

    const [recordTextValue, setRecordTextValue] = useState('');
    const { listen, listening, stop } = useSpeechRecognition({
      onResult: (result) => {
        setRecordTextValue(result);
      },
    });

    const capture = useCallback(() => {
        const imageSrc = webcamRef.current.getScreenshot();
        setImg(imageSrc);

        listen();
    }, [webcamRef]);

    const updateCalories = () => {
        if (typeof increaseCalorie === 'function') {
            increaseCalorie();
        } else {
            console.error('increaseCalorie is not a function', increaseCalorie);
        }
    }

    const onExit = () => {
        setCongrats(null);
        setImg(null);
        setRecordTextValue('');
        onClose();
    }

    return (
        <div class="ticket-system-container">
            <Button id="ticket-button" onClick={onOpen} colorScheme="yellow" variant="solid">{mealType}</Button>
            <Modal size="full" isOpen={isOpen} onClose={onExit}>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader backgroundColor='green.500' paddingTop={5} marginBottom={5}>
                        <Flex direction='row' justifyContent={'space-between'}>
                            <Heading marginBottom={-10} fontSize={35} color='gray.50' >VitalEaty 🍎</Heading>
                            <Avatar size='md' name='Anna Stawiska' />
                        </Flex>
                    </ModalHeader>
                    <ModalBody>
                        <div class="webcam-container">
                            {congrats === null ? (
                                <>
                                {img === null ? (
                                    <Stack direction='column'>
                                        <Heading>Take a photo of your meal</Heading>
                                        <br/>
                                        <Box>
                                            <Webcam
                                                audio={false}
                                                mirrored={true}
                                                height={'100%'}
                                                width={'100%'}
                                                ref={webcamRef}
                                                screenshotFormat="image/jpeg"
                                                videoConstraints={videoConstraints}
                                            />
                                        </Box>
                                        <div id="plate"></div>
                                        <Spacer />
                                        <br/>
                                        <Center alignItems='center' height={20}>
                                            <IconButton
                                                    variant='solid'
                                                    colorScheme='green'
                                                    fontSize='60px'
                                                    size='lg'
                                                    width="100%"
                                                    height="100px"
                                                    onClick={capture}
                                                    icon={<IoCamera />}
                                            />
                                        </Center>
                                    </Stack>
                                ) : (
                                    <Box h="100%" w="100%">
                                        <Flex
                                        mt="15px"
                                        height="100%" // Adjust this value as needed to fill the desired area
                                        width="100%" // Adjust this value as needed to fill the desired area
                                        justifyContent="center"
                                        alignItems="center"
                                        mb="15px"
                                        >
                                            <IoEarOutline  className="pulse" style={{ height: '150px', width: '150px' }} />
                                        </Flex>
                                        <Popover >
                                        <PopoverTrigger>
                                            <Button colorScheme='green' size="lg" mt="40px" mb="10px">
                                                <FaQuestion />
                                            </Button>
                                        </PopoverTrigger>
                                        <PopoverContent >
                                            <PopoverArrow />
                                            <PopoverCloseButton />
                                            <PopoverBody fontSize="3xl" borderWidth="2px" borderColor='gray.400' bg='gray.200'>I made pasta with tomato sauce and a spoon of cheese on top</PopoverBody>
                                        </PopoverContent>
                                        </Popover>
                                        
                                        <Textarea
                                            mt="10px"
                                            placeholder='Describe your meal'
                                            size="lg"
                                            height="200px"
                                            fontSize="3xl"
                                            class="recorded-text"
                                            value={recordTextValue}
                                            onChange={(event) => setRecordTextValue(event.target.value)}
                                            w="100%"
                                        />       
                                        <Button lineBreak="anywhere" fontSize="4xl" size="lg" mt="17px" variant='solid' colorScheme='green' w="100%" height="100px" onClick={sendData}>
                                            Done                                     
                                        </Button>                                     
                                    </Box>
                            
                            )} </> ) : (
                                <Congrats onCloseExit={onExit}/>
                            )}
                        </div>                       
                    </ModalBody>
                </ModalContent>
                
            </Modal>
        </div>
    );
}