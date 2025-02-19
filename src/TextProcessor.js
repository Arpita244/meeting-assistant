export const extractActions = (text) => {
    let tasks = [];
    
    // Improved date regex (detects both 'Monday' and 'Feb 14' formats)
    let dateMatch = text.match(/\b(Monday|Tuesday|Wednesday|Thursday|Friday|Saturday|Sunday|\d{1,2} (Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec))\b/);
    
    // Improved time regex (detects both 12-hour and 24-hour formats)
    let timeMatch = text.match(/\b(\d{1,2}:\d{2} (AM|PM|am|pm))\b/);
  
    // Extract sentences that mention a task
    let taskMatch = text.match(/(?:we|I) (will|need to|should|must|plan to|have to) (.*?)\b(by|on|before|at)?\b/gi);
    
    if (taskMatch) {
      tasks = taskMatch.map(task => task.trim());
    }
  
    return {
      tasks: tasks.length > 0 ? tasks : ["No tasks found"],
      date: dateMatch ? dateMatch[0] : "Not Found",
      time: timeMatch ? timeMatch[0] : "Not Found",
    };
  };
  
  