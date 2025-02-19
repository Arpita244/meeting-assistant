import React, { useState } from "react";

const SpeechToText = ({ onTranscriptChange }) => {
  const [isRecording, setIsRecording] = useState(false);
  const [transcript, setTranscript] = useState("");

  const startListening = () => {
    const recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition)();
    recognition.lang = "en-US";
    recognition.interimResults = false;
    recognition.continuous = false;

    recognition.onstart = () => {
      setIsRecording(true);
    };

    recognition.onresult = (event) => {
      const speechText = event.results[0][0].transcript;
      setTranscript(speechText);
      onTranscriptChange(speechText);
    };

    recognition.onerror = (event) => {
      console.error("Speech Recognition Error:", event.error);
    };

    recognition.onend = () => {
      setIsRecording(false);
    };

    recognition.start();
  };

  return (
    <div>
      <button onClick={startListening} disabled={isRecording}>
        {isRecording ? "Recording..." : "Start Recording"}
      </button>
      <p><strong>Transcript:</strong> {transcript}</p>
    </div>
  );
};

export default SpeechToText;
