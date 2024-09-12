import dayjs from "dayjs";
import { db } from "../db";
import { goalCompletions, goals } from "../db/schema";
import { and, count, eq, gte, lte, sql } from "drizzle-orm";

export async function getWeekPendingGoals() {
	// Implement this function to fetch and return the week's pending goals

	//  retornar o primeiro dia da semana (domingo)
	const firstDayOfWeek = dayjs().startOf("week").toDate();
	//  retornar o último dia da semana
	const lastDayOfWeek = dayjs().endOf("week").toDate();

	// todas as metas criadas até a semana atual
	const goalsCreatedUpToWeek = db.$with("goals_created_up_to_week").as(
		db
			.select({
				id: goals.id,
				title: goals.title,
				desiredWeeklyFrequency: goals.desiredWeeklyFrequency,
				createdAt: goals.createdAt,
			})
			.from(goals)
			.where(lte(goals.createdAt, lastDayOfWeek)),
	);

	// retornar a contagem de metas concluídas na semana atual
	const goalCompletionCounts = db.$with("goal_completion_counts").as(
		db
			.select({
				goalId: goalCompletions.goalId,
				// calculo de quantas vezes aquela meta foi concluída
				completionCount: count(goalCompletions.id).as("completionCount"),
			})
			.from(goalCompletions)
			.where(
				and(
					gte(goalCompletions.createdAt, firstDayOfWeek),
					lte(goalCompletions.createdAt, lastDayOfWeek),
				),
			)
			.groupBy(goalCompletions.goalId), //agrupando pelo ID da meta
	);

	// criando uma querie que vai utilizar as duas CTEs criadas anterioremente
	const pendingGoals = await db
		.with(goalsCreatedUpToWeek, goalCompletionCounts)
		.select({
			id: goalsCreatedUpToWeek.id,
			title: goalsCreatedUpToWeek.title,
			desiredWeeklyFrequency: goalsCreatedUpToWeek.desiredWeeklyFrequency,
			// o COALESCE dentro do sql, permite realizar um if, caso a varíavel
			// não exista ou seja NULL, será devolvido um valor default
			completionCount: sql /*sql*/`
				COALESCE(${goalCompletionCounts.completionCount}, 0)
			`.mapWith(Number),
		})
		.from(goalsCreatedUpToWeek)
		.leftJoin(
			goalCompletionCounts,
			eq(goalCompletionCounts.goalId, goalsCreatedUpToWeek.id),
		);

	return { pendingGoals };
}
