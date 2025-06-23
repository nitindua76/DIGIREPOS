export default {
	myFun1 () {
						// 1. Fetch tasks from your data source
						const rawTasks = Select_milestones1.data; 
						
						//return rawTasks;
						// 2. Process tasks with dynamic dates
						const scheduledTasks = CALCULATE_TASK_DATES.calculateTaskDates(rawTasks);

		
						scheduledTasks.sort((a, b) => {
						// First by MGSEQ (ascending)
						if (a.MGSEQ !== b.MGSEQ) {
							return a.MGSEQ - b.MGSEQ;
						}
						// Then by MSEQ (ascending)
						return a.MSEQ - b.MSEQ;
					});

		
						//return scheduledTasks;
						// 3. Generate Mermaid syntax
						//const mermaidSyntax = CHARTDATA.mapToMermaidGantt(scheduledTasks);
						const mermaidSyntax = GROUPING_MAJOR_TASKS.generateMermaidGanttWithSections(scheduledTasks);
						return mermaidSyntax;
	},
	async myFun2 () {
		//	use async-await or promises
		//	await storeValue('varName', 'hello world')
	}
}