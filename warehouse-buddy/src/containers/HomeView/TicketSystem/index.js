import './index.css';
import { Button, useDisclosure, Flex, Spacer, Divider } from '@chakra-ui/react'

import{Modal, ModalOverlay, ModalContent, ModalHeader, ModalFooter, ModalBody, ModalCloseButton} from '@chakra-ui/react'
import { Textarea } from '@chakra-ui/react'
import { Select } from '@chakra-ui/react'
import { useSelector, useDispatch } from 'react-redux';
import { sendTicket } from '../../../redux/openai_api/actions';
import React, { useState, useEffect, useCallback, useRef } from 'react';
// import { WebcamScreenshot } from './WebcameraScreenshot';
import Webcam from "react-webcam"
import { Congrats } from './Congrats/congrats';
import { useSpeechRecognition } from 'react-speech-kit';

export const TicketSystem = ({mealType, increaseCalorie }) => {
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

    // let categories = ["Bezpieczeństwo", "Załadunek", "Rozładunek", "Czystość i ergonomia", "Lokalizacja w magazynie", "Inne"]
    // const list = categories.map((el) => {
    //     return <option value={el} key={el}>{el}</option>;
    // });

    const [img, setImg] = useState(null);
    const webcamRef = useRef(null);

    const videoConstraints = {
        width: 420,
        height: 420,
        facingMode: "user",
    };

    // randomly mocked each image
    let user_id = 0 + Math.random() * (1000000 - 0);

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
        // let new_ticket = {
        //     "category": selectedCategory,
        //     "description": issue
        // }

        // setIssue('');

        // dispatch(sendTicket(new_ticket));
        // onClose();
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

        let apiUrl = 'http://localhost:5000/save_image';
        let imageData = imageSrc.replace(/^data:image\/png;base64,/, '');
        let req = {
        method: 'POST',
        mode: 'no-cors',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'No-Auth': 'True'
        },
        body: JSON.stringify({ image_data: imageData, id: user_id }),
        }
        user_id = user_id + 1;
        fetch(apiUrl, req)
        .then(response => {
            console.log(response);
        })
        .catch(error => {
            console.error(error);
        });

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
            <Button id="ticket-button" onClick={onOpen} colorScheme="red" variant="solid">{mealType}</Button>
            <Modal isOpen={isOpen} onClose={onExit}>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader />
                    {/* <ModalCloseButton /> */}
                    <ModalBody>
                        <div className="webcam-container">
                            {congrats === null ? (
                                <>
                                {img === null ? (
                                    <>
                                        <Webcam
                                            audio={false}
                                            mirrored={true}
                                            height={400}
                                            width={400}
                                            ref={webcamRef}
                                            screenshotFormat="image/jpeg"
                                            videoConstraints={videoConstraints}
                                        />
                                        <div class="photo-button">
                                            <Button class="capture-button"
                                                    onClick={capture}>
                                                <div class="button"><bf>Capture</bf></div>
                                            </Button>
                                        </div>
                                    </>
                                ) : (
                                    <>
                                    
                                    <div class="photo">
                                        <img src={img} alt="screenshot" />
                                        <div class="centered"><div class="dot-pulse"></div></div>
                                    </div>
                                    <div class="photo-button">
                                        <Button class="listen-button" onClick={sendData}><div class="button"><bf>Done</bf></div></Button>
                                    </div>
                                    <div>
                                        <textarea class="recorded-text"
                                        value={recordTextValue}
                                        onChange={(event) => setRecordTextValue(event.target.value)}
                                        />
                                    </div>
                                    </>
                                )}
                                </>
                            ) : (
                                Congrats()
                            )}
                        </div>
                        {/* <Select class="select-ticket-type" placeholder='Wybierz kategorię zgłoszenia'onChange={handleChange} value={selectedCategory}>
                            {list}
                        </Select>  */}
                        {/* <Divider id="ticket-divider"/>  
                        <Textarea placeholder='Write your description here<div class="dot-pulse"></div></div>.' size='md' h='calc(20vh)' onChange={handleChangeInput} value={issue}/> */}
                    </ModalBody>
                    <ModalFooter>
                        {/* <Button colorScheme='facebook' mr={3} onClick={capture}>
                            Picture
                        </Button> */}
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </div>
    );
}