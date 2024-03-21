import React, { useState, useCallback } from 'react';

import { saveAs } from 'file-saver';

function AudioRecorder() {
  const [recorder, setRecorder] = useState(null);
  const [audio, setAudio] = useState(null);
  const [transcription, setTranscription] = useState(null);

  const startRecording = useCallback(() => {
    navigator.mediaDevices.getUserMedia({ audio: true }).then(stream => {
      const newRecorder = new MediaRecorder(stream);
      setRecorder(newRecorder);
      newRecorder.start();

      newRecorder.ondataavailable = e => {
        console.log("data: " + e.data)
        const url = URL.createObjectURL(e.data);
        console.log("audio in " + url)
        setAudio(url);
      };
    });
  }, []);

  const stopRecording = useCallback(() => {
    if (recorder) {
        recorder.stop();
        recorder.stream.getTracks().forEach(i => i.stop()) // Removes the recording red dot in chrome after finishing.
    }
    setRecorder(null);
  }, [recorder]);

  const downloadRecording = useCallback(() => {
    saveAs(audio, 'audio.webm');
  }, [audio]);

  const transcribeRecording = useCallback(() => {
    console.log("request: " + audio)
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
        setTranscription("Transcription will look like this")
    })
    .then(response => {
        console.log("response: " + response)
        setTranscription("Transcription will look like this")
    });
  }, [audio]);

  return (
    <div>
      <button disabled={recorder} onClick={startRecording}>Start Recording</button> <br/>
      <button disabled={!recorder} onClick={stopRecording}>Stop Recording</button> <br/>
      {audio && <audio src={audio} controls />} <br/>
      {audio && <button onClick={downloadRecording}>Download Recording</button>} <br/>
      {audio && <button onClick={transcribeRecording}>Transcribe</button>} <br/>
      {transcription}
    </div>
  );
}

export default AudioRecorder;