import nlp from "compromise";
import { parse, format } from "date-fns";

// Function to extract tasks, dates, and times
export const extractActions = (text) => {
  let tasks = [];
  let date = "Not Found";
  let time = "Not Found";

  // ✅ NLP Processing
  let doc = nlp(text);

  // ✅ Extract Task (Full Action)
  let taskMatch = doc.sentences().out("array").filter(sentence =>
    /I will|We need to|Let's|You should|We should|Plan to|Have to|Schedule|Arrange|Organize/i.test(sentence)
  );

  if (taskMatch.length > 0) {
    tasks = taskMatch;
  }

  // ✅ Extract Date
  let dateMatch = text.match(/(\b\d{1,2}(st|nd|rd|th)?\s+(January|February|March|April|May|June|July|August|September|October|November|December)\b)/i);
  if (dateMatch) {
    const rawDate = dateMatch[0];
    try {
      date = format(parse(rawDate, "d MMMM", new Date()), "MMMM do"); // Example: "15 August" → "August 15th"
    } catch (e) {
      date = rawDate; // Fallback to raw text
    }
  }

  // ✅ Extract Time (Matches "10:30 AM", "3:00 PM", "midnight", etc.)
  let timeMatch = text.match(/\b(\d{1,2}:\d{2}\s?(AM|PM|am|pm)?|morning|afternoon|evening|night|midnight)\b/i);
  if (timeMatch) {
    time = timeMatch[0];
  }

  return {
    tasks: tasks.length > 0 ? tasks : ["No tasks found"],
    date: date,
    time: time,
  };
};
