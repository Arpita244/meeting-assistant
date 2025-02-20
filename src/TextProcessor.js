import nlp from "compromise";
import { parse, format } from "date-fns";

export const extractActions = (text) => {
  let tasks = [];
  let date = "Not Found";
  let time = "Not Found";
  let summary = "No summary available";
  let calendarEvent = "No event scheduled";

  let doc = nlp(text);

  let taskRegex = /\b(will|need to|should|Make sure to|assign|schedule|send|prepare|remind|plan|complete|review|submit|call|email|organize|arrange|write|meet|update|follow up|fix|check|attend|discuss|resolve|notify|purchase)\b\s.+?(\.|$)/gi;
  let taskMatch = text.match(taskRegex);
  if (taskMatch) {
    tasks = taskMatch.map(task => task.trim());
  }

  let dateRegex = /\b(\d{1,2}(st|nd|rd|th)?\s+(January|February|March|April|May|June|July|August|September|October|November|December)|tomorrow|next\s(?:Monday|Tuesday|Wednesday|Thursday|Friday|Saturday|Sunday|weekend)|this\s(?:Monday|Tuesday|Wednesday|Thursday|Friday|Saturday|Sunday|weekend))\b/i;
  let dateMatch = text.match(dateRegex);
  if (dateMatch) {
    const rawDate = dateMatch[0].toLowerCase();
    const today = new Date();

    if (rawDate === "tomorrow") {
      date = format(new Date(today.getTime() + 86400000), "MMMM do");
    } else if (/next\s|this\s(Monday|Tuesday|Wednesday|Thursday|Friday|Saturday|Sunday|weekend)/i.test(rawDate)) {
      const dayOfWeek = rawDate.split(" ")[1];
      let dayOffset = (["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"].indexOf(dayOfWeek) - today.getDay() + 7) % 7 || 7;
      date = format(new Date(today.getTime() + dayOffset * 86400000), "MMMM do");
    } else {
      try {
        date = format(parse(rawDate, "d MMMM", new Date()), "MMMM do");
      } catch (e) {
        date = rawDate;
      }
    }
  }

  let timeRegex = /\b(by|before|at)?\s?(\d{1,2}:\d{2}\s?(AM|PM|am|pm)?|morning|afternoon|evening|night|midnight|noon)\b/i;
  let timeMatch = text.match(timeRegex);
  if (timeMatch) {
    time = timeMatch[0].replace(/by|before|at/i, "").trim();
  }

  let summaryMatch = doc.sentences().out("array");
  if (summaryMatch.length > 0) {
    summary = summaryMatch.find(s => s.length > 10) || summaryMatch[0];
  }

  if (date !== "Not Found" && time !== "Not Found") {
    calendarEvent = `Meeting scheduled on ${date} at ${time}`;
  }

  return {
    tasks: tasks.length > 0 ? tasks : ["No tasks found"],
    date,
    time,
    summary,
    calendarEvent,
  };
};
