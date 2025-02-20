import React, { useState, useEffect } from "react";

const SpeechToText = ({ onTranscriptChange }) => {
  const [isRecording, setIsRecording] = useState(false);
  const [transcript, setTranscript] = useState("");

  useEffect(() => {
    
    const savedTranscript = localStorage.getItem("meetingTranscript");
    if (savedTranscript) {
      setTranscript(savedTranscript);
      onTranscriptChange(savedTranscript);
    }
  }, [onTranscriptChange]);

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
      localStorage.setItem("meetingTranscript", speechText); 
    };

    recognition.onerror = (event) => {
      console.error("Speech Recognition Error:", event.error);
    };

    recognition.onend = () => {
      setIsRecording(false);
    };

    recognition.start();
  };

  const clearTranscript = () => {
    setTranscript("");
    localStorage.removeItem("meetingTranscript"); 
    onTranscriptChange("");
  };

  return (
    <div>
      <button onClick={startListening} disabled={isRecording}>
        {isRecording ? "Recording..." : "Start Recording"}
      </button>
      <button onClick={clearTranscript} style={{ marginLeft: "10px" }}>Clear</button>
      <p><strong>Transcript:</strong> {transcript}</p>
    </div>
  );
};

export default SpeechToText;