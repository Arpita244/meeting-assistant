# 📌 Smart Voice Assistant

## 🎯 Project Overview
Smart Voice Assistant is a mobile application designed for professionals to enhance meeting productivity. It records conversations, transcribes them to text, extracts action items, and converts them into tasks, calendar events, or meeting notes. The app provides a simple and intuitive UI for seamless interaction.

## ✨ Features
- 🎙 **Real-time Voice Transcription**: Converts speech into text accurately.
- ✅ **Action Item Extraction**: Identifies key points and actionable tasks.
- 📝 **Task & Event Creation**: Converts action items into tasks and calendar events.
- 🔄 **Local Storage & Firebase Integration**: Data is initially stored locally and later synced with Firebase.
- 🌙 **Dark Mode Support**: Provides a user-friendly interface for all lighting conditions.

## 🛠 Tech Stack
- **Frontend:** React Native
- **Backend:** Firebase (for data storage & authentication)
- **Speech Processing:** Web Speech API / Google Speech-to-Text API
- **Storage:** Local Storage & Firebase Firestore

## 📂 Project Structure
```
📦 SmartVoiceAssistant
├── 📂 src
│   ├── 📂 components  # Reusable UI components
│   ├── 📂 screens     # App screens (Home, Notes, Tasks, Settings)
│   ├── 📂 utils       # Utility functions (speech recognition, data handling)
│   ├── 📂 assets      # Images and icons
│   ├── App.js        # Main entry file
│   ├── index.js      # Root file
├── 📜 README.md       # Project documentation
├── 📜 package.json    # Dependencies and scripts
├── 📜 .gitignore      # Files to ignore in version control
```

## 🚀 Installation & Setup
1. **Clone the repository:**
   ```sh
   git clone https://github.com/your-username/smart-voice-assistant.git
   cd smart-voice-assistant
   ```
2. **Install dependencies:**
   ```sh
   npm install
   ```
3. **Start the application:**
   ```sh
   npm start
   ```

## 📌 Usage Guide
1. Open the app and start a new recording.
2. Speak naturally, and the app will transcribe in real-time.
3. View extracted action items and save them as tasks or events.
4. Sync your data with Firebase for cloud storage.
5. Access saved notes and tasks anytime from the app.

## 📸 Screenshots
> _[![Screenshot (139)](https://github.com/user-attachments/assets/a4e3c5d9-415d-44f0-a6ad-f2938185652d)
]_  

## 🛠 Future Enhancements
- AI-powered summarization of conversations.
- Multi-language support for global users.
- Integration with Google Calendar & Microsoft Outlook.
- Advanced filtering & searching capabilities.

## 🌐 Live Demo
🔗 [Live Application](https://meeting-assistant-sable.vercel.app/)

## 🎥 Demo Video
📺 [Watch Demo](https://drive.google.com/file/d/12-l0FZSl8dpqKQU4I39paS24OOZReTK2/view?usp=sharing)



