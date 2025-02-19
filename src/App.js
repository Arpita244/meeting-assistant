import React, { useState } from "react";
import SpeechToText from "./SpeechToText";
import { extractActions } from "./TextProcessor";

function App() {
  const [transcript, setTranscript] = useState("");
  const [meetingNotes, setMeetingNotes] = useState({ tasks: [], date: "", time: "" });

  const handleTranscriptUpdate = (newTranscript) => {
    setTranscript(newTranscript);
    const extractedData = extractActions(newTranscript);
    setMeetingNotes(extractedData);
  };

  const downloadNotes = () => {
    const data = notes.map((note, index) => 
      `Note ${index + 1}:\nTask: ${note.tasks.join(", ") || "None"}\nDate: ${note.date || "Not Found"}\nTime: ${note.time || "Not Found"}\n\n`
    ).join("");
  
    const blob = new Blob([data], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "Meeting_Notes.txt";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };
  
  return (
    <div style={{ textAlign: "center", padding: "20px" }}>
      <h1>Meeting Assistant</h1>
      <SpeechToText onTranscriptChange={handleTranscriptUpdate} />
      <h2>Meeting Notes</h2>
      <p><strong>Task:</strong> {meetingNotes.tasks.join(", ")}</p>
      <p><strong>Date:</strong> {meetingNotes.date}</p>
      <p><strong>Time:</strong> {meetingNotes.time}</p>
      
    </div>
  );
}

export default App;
