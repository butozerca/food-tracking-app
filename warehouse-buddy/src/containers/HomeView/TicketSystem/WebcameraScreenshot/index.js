import './index.css';
import React, { useCallback, useRef, useState } from "react";
import { Button, useDisclosure, Flex, Spacer, Divider } from '@chakra-ui/react'
import { useSelector, useDispatch } from 'react-redux';
import { sendTicket } from '../../../../redux/openai_api/actions';
import Webcam from "react-webcam";  

export const WebcamScreenshot = () => {
  const dispatch = useDispatch();
  const { isOpen, onOpen, onClose } = useDisclosure()
  const [selectedCategory, setSelectedCategory] = useState('');
  const [issue, setIssue] = useState('');
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
    
    let new_picture = {
        "picture": imageSrc
    }

    setIssue('');

    dispatch(sendTicket(new_picture));
  }, [webcamRef]);


  return (
    <div className="webcam-container">
      {/* {img === null ? ( */}
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
                <Button colorScheme='facebook' size="sm" variant="outline" onClick={capture}>Capture</Button>
            </div>
        </>
      {/* // ) : (
      //   <>
      //     <img src={img} alt="screenshot" />
      //     <div class="photo-button">
      //       <Button colorScheme='facebook' size="sm" variant="solid" onClick={onSend}>Accept</Button>
      //     </div>
      //   </>
      // )} */}
    </div>
  );

}