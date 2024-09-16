type SummaryFormatResponse = {
	totalGoalsCompleted: number;
	totalGoals: number;
	goalsPerDay: Record<
		string,
		{
			id: string;
			title: string;
			completedAt: string;
		}[]
	>;
};

/* 
  toda função async no JS retorna uma Promise

  SummaryFormatResponse -> formato do dado retornado de dentro da função async
*/

export async function getSummary(): Promise<SummaryFormatResponse> {
	const response = await fetch("http://127.0.0.1:3333/summary");
	const data = await response.json();
	return data.summary;
}
