export async function createGoalCompletion(goalId: string) {
	await fetch("http://localhost:3333/goal-completion", {
		method: "POST",
		// informando ao back-end que no corpo, estou enviando um JSON
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify({
			goalId,
		}),
	});
}
