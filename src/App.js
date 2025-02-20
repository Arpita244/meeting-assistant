import React, { useState, useEffect } from "react";
import SpeechToText from "./SpeechToText";
import { extractActions } from "./TextProcessor";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import "./App.css";

function App() {
  const [transcript, setTranscript] = useState("");
  const [meetingNotes, setMeetingNotes] = useState({ tasks: [], date: "", time: "", summary: "" });
  const [selectedDate, setSelectedDate] = useState(new Date());
  
  useEffect(() => {
    const formattedDate = selectedDate.toLocaleDateString("en-CA");
    const savedNotes = JSON.parse(localStorage.getItem(formattedDate));
    if (savedNotes) {
      setMeetingNotes(savedNotes);
    } else {
      setMeetingNotes({ tasks: [], date: formattedDate, time: "", summary: "" });
    }
  }, [selectedDate]);
  
  const handleTranscriptUpdate = (newTranscript) => {
    setTranscript(newTranscript);
    const extractedData = extractActions(newTranscript);
    extractedData.date = selectedDate.toLocaleDateString("en-CA");
    setMeetingNotes(extractedData);
    localStorage.setItem(extractedData.date, JSON.stringify(extractedData));
  };
  
  const deleteMeetingNotesByDate = () => {
    localStorage.removeItem(selectedDate.toLocaleDateString("en-CA"));
    setMeetingNotes({ tasks: [], date: selectedDate.toLocaleDateString("en-CA"), time: "", summary: "" });
  };

  const downloadNotes = () => {
    const content = `Meeting Notes\n----------------\nSummary: ${meetingNotes.summary}\nTasks:\n${meetingNotes.tasks.map(task => `- ${task}`).join("\n")}\nDate: ${meetingNotes.date}\nTime: ${meetingNotes.time}`;
    const blob = new Blob([content], { type: "text/plain" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = "Meeting_Notes.txt";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const shareNotes = () => {
    const content = `Meeting Notes\nSummary: ${meetingNotes.summary}\nTasks:\n${meetingNotes.tasks.map(task => `- ${task}`).join("\n")}\nDate: ${meetingNotes.date}\nTime: ${meetingNotes.time}`;
    navigator.share({
      title: "Meeting Notes",
      text: content
    }).catch((err) => console.log("Sharing failed", err));
  };

  return (
    <div style={{ textAlign: "center", padding: "20px" }}>
      <h1>Smart Voice Assistant</h1>
      <div style={{ display: "flex", justifyContent: "center", marginBottom: "20px" }}>
        <Calendar onChange={setSelectedDate} value={selectedDate} tileContent={() => null} />
      </div>
      <SpeechToText onTranscriptChange={handleTranscriptUpdate} />
      <h2>Meeting Notes</h2>
      <p><strong>Date:</strong> {meetingNotes.date}</p>
      <p><strong>Time:</strong> {meetingNotes.time}</p>
      <h3>Summary</h3>
      <p>{meetingNotes.summary}</p>
      <h3>Tasks</h3>
      <ul>
        {meetingNotes.tasks.map((task, index) => (
          <li key={index}>{task}</li>
        ))}
      </ul>
      <button onClick={downloadNotes} style={{ marginTop: "10px", padding: "10px", cursor: "pointer" }}>Download Notes</button>
      <button onClick={shareNotes} style={{ marginTop: "10px", padding: "10px", cursor: "pointer", backgroundColor: "blue", color: "white" }}>Share Notes</button>
      <button onClick={deleteMeetingNotesByDate} style={{ marginTop: "10px", padding: "10px", cursor: "pointer", backgroundColor: "red", color: "white" }}>Delete Notes for {meetingNotes.date}</button>
    </div>
  );
}

export default App;
