export default {
generateMermaidGanttWithSections: (tasks)=> {
  let syntax = 'gantt\ntitle Project Timeline\ndateFormat YYYY-MM-DD\n\n';

  // Group tasks by MAJOR
  let sections = [];
  let currentSection = null;

  tasks.forEach(task => {
    if (task.MTYPE === "MAJOR") {
      // Start a new section
      currentSection = {
        title: task.MDESC,
        tasks: []
      };
      sections.push(currentSection);
    } else if (task.MTYPE === "MINOR" && currentSection) {
      currentSection.tasks.push(task);
    }
  });

  // Build Mermaid syntax
  sections.forEach(section => {
    syntax += `section ${section.title}\n`;
    section.tasks.forEach(task => {
      // Add status if present, otherwise leave blank
      let status = task.status ? `${task.status.toLowerCase()}, ` : '';
      syntax += `${task.MDESC} :${status}${task.start_date}, ${task.MDAYS}d\n`;
    });
    syntax += '\n';
  });

  return syntax;
}

}