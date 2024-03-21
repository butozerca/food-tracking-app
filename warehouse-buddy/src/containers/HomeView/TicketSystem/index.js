import './index.css';
import { Button, useDisclosure, Flex, Spacer, Divider } from '@chakra-ui/react'

import{Modal, ModalOverlay, ModalContent, ModalHeader, ModalFooter, ModalBody, ModalCloseButton} from '@chakra-ui/react'
import { Textarea } from '@chakra-ui/react'
import { Select } from '@chakra-ui/react'
import { useSelector, useDispatch } from 'react-redux';
import { sendTicket } from '../../../redux/openai_api/actions';
import React, { useState, useCallback, useRef } from 'react';
// import { WebcamScreenshot } from './WebcameraScreenshot';
import Webcam from "react-webcam"

export const TicketSystem = () => {
    const dispatch = useDispatch();
    const { isOpen, onOpen, onClose } = useDisclosure()
    const [selectedCategory, setSelectedCategory] = useState('');
    const [issue, setIssue] = useState('');

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
    }, [webcamRef]);

    const onSend = () => {
            // Send data to the backend via POST
            let new_ticket = {
                "category": selectedCategory,
                "description": issue
            }

            setIssue('');

            dispatch(sendTicket(new_ticket));
            onClose();
    }

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
                                <div class="photo-button">
                                    <Button class="listen-button" onClick={() => setImg(null)}><div class="button"><div class="dot-pulse"></div></div><div class="button">Done</div></Button>
                                </div>
                                </>
                            )}
                        </div>
                        {/* <Select class="select-ticket-type" placeholder='Wybierz kategorię zgłoszenia'onChange={handleChange} value={selectedCategory}>
                            {list}
                        </Select>  */}
                        {/* <Divider id="ticket-divider"/>  
                        <Textarea placeholder='Write your description here.' size='md' h='calc(20vh)' onChange={handleChangeInput} value={issue}/> */}
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