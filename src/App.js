import React, { useState } from "react";
import SpeechToText from "./SpeechToText";
import { extractActions } from "./TextProcessor";
import "./App.css";

function App() {
  const [transcript, setTranscript] = useState("");
  const [meetingNotes, setMeetingNotes] = useState({ tasks: [], date: "", time: "" });

  const handleTranscriptUpdate = (newTranscript) => {
    setTranscript(newTranscript);
    const extractedData = extractActions(newTranscript);
    setMeetingNotes(extractedData);
  };

  // ✅ Function to Download Notes as a .txt file
  const downloadNotes = () => {
    const content = `Meeting Notes\n----------------\nTask: ${meetingNotes.tasks.join(", ")}\nDate: ${meetingNotes.date}\nTime: ${meetingNotes.time}`;
    const blob = new Blob([content], { type: "text/plain" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
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

      {/* ✅ Download Button */}
      <button onClick={downloadNotes} style={{ marginTop: "10px", padding: "10px", cursor: "pointer" }}>
        Download Notes
      </button>
    </div>
  );
}

export default App;
