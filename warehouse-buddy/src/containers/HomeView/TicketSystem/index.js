import './index.css';
import { Button, useDisclosure, Flex, Spacer, Divider } from '@chakra-ui/react'

import{Modal, ModalOverlay, ModalContent, ModalHeader, ModalFooter, ModalBody, ModalCloseButton} from '@chakra-ui/react'
import { useSelector, useDispatch } from 'react-redux';
import { sendTicket } from '../../../redux/openai_api/actions';
import React, { useState, useCallback, useRef } from 'react';
// import { WebcamScreenshot } from './WebcameraScreenshot';
import Webcam from "react-webcam"

export const TicketSystem = () => {
    const dispatch = useDispatch();
    const { isOpen, onOpen, onClose } = useDisclosure()

    const [img, setImg] = useState(null);
    const webcamRef = useRef(null);

    const videoConstraints = {
        width: 420,
        height: 420,
        facingMode: "user",
    };

    const capture = useCallback(() => {
        var imageSrc = webcamRef.current.getScreenshot();
        if (!imageSrc) imageSrc = "https://i.natgeofe.com/n/548467d8-c5f1-4551-9f58-6817a8d2c45e/NationalGeographic_2572187_3x2.jpg?w=1436&h=958"

        setImg(imageSrc);

        console.log("image taken!")
    }, [webcamRef]);

    const [recorder, setRecorder] = useState(null);
    const [audio, setAudio] = useState(null);
    const [transcription, setTranscription] = useState(null);

    const toggleRecording = useCallback(() => {
        if (!recorder) {
            navigator.mediaDevices.getUserMedia({ audio: true }).then(stream => {
                const newRecorder = new MediaRecorder(stream);
                setRecorder(newRecorder);
                newRecorder.start();

                newRecorder.ondataavailable = e => {
                    console.log("data: " + e.data)
                    const url = URL.createObjectURL(e.data);
                    console.log("audio in " + url)
                    setAudio(url);
                }
            })
        } else {
            recorder.stop();
            recorder.stream.getTracks().forEach(i => i.stop()) // Removes the recording red dot in chrome after finishing.
            setRecorder(null);

            fetch('http://127.0.0.1:5000/transcribe', {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    url: audio,
                })
            })
            .catch(error => {
                console.log("error " + error)
                setTranscription("Transcription will look like this (err)")
            })
            .then(response => {
                console.log("response: " + response)
                setTranscription("Transcription will look like this (demo)")
            });
        }
    }, [recorder]);

    return (
        <div class="ticket-system-container">
            <Button id="ticket-button" onClick={onOpen} colorScheme="red" variant="solid">Report Issue</Button>
            <Modal isOpen={isOpen} onClose={onClose}>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader />
                    <ModalCloseButton />
                    <ModalBody>
                        <div className="webcam-container">
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
                                        <Button class="capture-button" onClick={capture}><div class="button">Capture</div></Button>
                                    </div>
                                </>
                            ) : (
                                <>
                                <img src={img} alt="screenshot" />
                                {
                                    audio == null ? (
                                        <div class="photo-button">
                                            <Button class="listen-button" onClick={toggleRecording}>
                                                <div class="button">
                                                    <div class="dot-pulse"/>
                                                </div>
                                                <div class="button">Listen!</div>
                                            </Button>
                                        </div>
                                    ): (
                                        <audio src={audio} controls />
                                    )
                                }
                                </>
                            )}
                        </div>
                    </ModalBody>
                    <ModalFooter>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </div>
    );
}