import React, { useState } from "react";

const SpeechToText = ({ onSave }) => {
  const [text, setText] = useState("");
  const [isListening, setIsListening] = useState(false);
  const recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition)();

  recognition.continuous = true;
  recognition.lang = "en-US";

  recognition.onresult = (event) => {
    const lastTranscript = event.results[event.results.length - 1][0].transcript;
    setText((prev) => prev + " " + lastTranscript);
  };

  const startListening = () => {
    setIsListening(true);
    recognition.start();
  };

  const stopListening = () => {
    setIsListening(false);
    recognition.stop();
    onSave(text);
  };

  return (
    <div style={{ padding: "20px", textAlign: "center" }}>
      <button onClick={isListening ? stopListening : startListening} style={{ padding: "10px 20px", fontSize: "16px" }}>
        {isListening ? "Stop Recording" : "Start Recording"}
      </button>
      <p>{text}</p>
    </div>
  );
};

export default SpeechToText;
