export default {
  generateMermaidGanttWithSections: (tasks, options = {}) => {
    // Options for customization
    const chartTitle = options.title || "Project Timelines";
    let syntax = `gantt\ntitle ${chartTitle}\ndateFormat YYYY-MM-DD\n\n`;

    // Optionally, add a project deadline as a milestone if provided
    if (options.projectDeadline) {
      syntax += `section Milestones\nProject Deadline :milestone, ${options.projectDeadline}, 0d\n\n`;
    }

    // Group tasks by MAJOR
    let sections = [];
    let currentSection = null;

    tasks.forEach(task => {
      if (task.MTYPE === "MAJOR") {
        currentSection = {
          title: task.MDESC,
          tasks: []
        };
        sections.push(currentSection);
      } else if (task.MTYPE === "MINOR" && currentSection) {
        currentSection.tasks.push(task);
      }
    });

    // Build Mermaid syntax with enhanced features
    sections.forEach(section => {
      syntax += `section ${section.title}\n`;
      section.tasks.forEach(task => {
        // Use status tags for visual cues
        let status = "";
        if (task.status) {
          const allowedStatuses = ["done", "active", "crit", "milestone"];
          const tag = task.status.toLowerCase();
          status = allowedStatuses.includes(tag) ? `${tag}, ` : "";
        }
        // Optionally, add dependencies if present
        let dependsOn = task.dependsOn ? `after ${task.dependsOn}` : "";
        // Add task line
        syntax += `${task.MDESC} :${status}${task.start_date}, ${task.MDAYS}d ${dependsOn}\n`;
      });
      syntax += '\n';
    });

    // Optionally, add a today marker comment (for clarity)
    syntax += "%% The red vertical line shows today's date\n";

    return syntax;
  }
}
