export default {
  mapToMermaidGantt: (tasks) => {
    let syntax = 'gantt\ntitle Project Timeline\ndateFormat YYYY-MM-DD\n';
    tasks.forEach(task => {
      // Use MDESC for the task name, MDAYS for duration, and start_date for the date
      syntax += `${task.MDESC} :${task.MSTATUS}, ${task.start_date}, ${task.MDAYS}d\n`;
    });
    return syntax;
  }
}
