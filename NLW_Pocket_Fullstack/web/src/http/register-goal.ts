interface RegisterGoalRequest {
	title: string;
	desiredWeeklyFrequency: number;
}

export async function registerGoal({
	title,
	desiredWeeklyFrequency,
}: RegisterGoalRequest) {
	await fetch("http://localhost:3333/goal", {
		method: "POST",
		// informando ao back-end que no corpo, estou enviando um JSON
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify({
			title,
			desiredWeeklyFrequency,
		}),
	});
}
