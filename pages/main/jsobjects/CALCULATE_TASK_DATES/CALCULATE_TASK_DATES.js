export default {
  calculateTaskDates: (tasks, firstTaskStartDate = "2025-06-01") => {
    // Sort tasks by MGSEQ and MSEQ
    const sorted = [...tasks].sort((a, b) => 
      a.MGSEQ - b.MGSEQ || a.MSEQ - b.MSEQ
    );

    let groupEndDates = {}; // Track end date per group
    let lastGroupEndDate = firstTaskStartDate;
    let currentMGSEQ = null;

    return sorted.map((task, idx) => {
      let startDate;
      if (task.MSEQ === 1) {
        // New group: start after previous group's last end
        startDate = lastGroupEndDate;
      } else {
        // Continue within group
        startDate = groupEndDates[task.MGSEQ];
      }

      // Calculate end date for this task
      const mdays = Number(task.MDAYS) || 0;
      const end = new Date(startDate);
      end.setDate(end.getDate() + mdays);
      const endDate = end.toISOString().split('T')[0];

      // Update group end date
      groupEndDates[task.MGSEQ] = endDate;
      // If this is the last in the group, update lastGroupEndDate
      if (
        idx === sorted.length - 1 ||
        sorted[idx + 1].MGSEQ !== task.MGSEQ
      ) {
        lastGroupEndDate = endDate;
      }

      return { ...task, start_date: startDate };
    });
  }
}
