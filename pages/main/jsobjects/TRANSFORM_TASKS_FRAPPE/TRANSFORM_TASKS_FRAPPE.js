export default {
	transformToFrappeTasks:(tasks) => {
		let frappeTasks = [];
		let idCounter = 1;

		tasks.forEach(task => {
			if (task.MTYPE === "MINOR") {
				const start = task.start_date;
				// Calculate end date by adding MDAYS to start_date
				const end = new Date(new Date(start).getTime() + (task.MDAYS - 1) * 24 * 60 * 60 * 1000)
					.toISOString().slice(0, 10);
				frappeTasks.push({
					id: `task${idCounter++}`,
					name: task.MDESC,
					start: start,
					end: end,
					progress: task.status === "done" ? 100 : (task.status === "active" ? 50 : 0),
					dependencies: "", // You can add logic for dependencies if needed
					custom_class: task.status ? task.status.toLowerCase() : ""
				});
			}
		});
		return frappeTasks;
	}

}