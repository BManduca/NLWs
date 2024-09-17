// array de objetos, passando as infos especificas das metas pendentes
type PendingGoalsResponse = {
	id: string;
	title: string;
	desiredWeeklyFrequency: number;
	completionCount: number;
}[];

/* 
  toda função async no JS retorna uma Promise

  SummaryFormatResponse -> formato do dado retornado de dentro da função async
*/

export async function getPendingGoals(): Promise<PendingGoalsResponse> {
	const response = await fetch("http://localhost:3333/pending-goals");
	const data = await response.json();
	return data.pendingGoals;
}
