import React, { useState } from "react";
import SpeechToText from "./SpeechToText";
import { extractActions } from "./TextProcessor";

const App = () => {
  const [notes, setNotes] = useState([]);

  const saveNote = (transcribedText) => {
    let extractedData = extractActions(transcribedText);
    setNotes([...notes, extractedData]);
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
    <div style={{ padding: "20px", maxWidth: "600px", margin: "auto" }}>
      <h2>Meeting Assistant</h2>
      <SpeechToText onSave={saveNote} />

      <h3>Meeting Notes</h3>
      <ul>
        {notes.map((note, index) => (
          <li key={index} style={{ padding: "10px", borderBottom: "1px solid #ddd" }}>
            <p><strong>Task:</strong> {note.tasks.length > 0 ? note.tasks.join(", ") : "None"}</p>
            <p><strong>Date:</strong> {note.date || "Not Found"}</p>
            <p><strong>Time:</strong> {note.time || "Not Found"}</p>
          </li>
        ))}
      </ul>
      <button onClick={downloadNotes} style={{ padding: "10px 20px", marginTop: "10px", fontSize: "16px" }}>
  Download Notes
</button>
    </div>
  );
};

export default App;
