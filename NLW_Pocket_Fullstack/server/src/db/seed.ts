/*
  Arquivo para popular o banco de dados com dados fictícios, para 
  auxiliar no caso de alguém tentar testar o projeto e não existir nada
  cadastrado no banco de dados.
*/

import { client, db } from ".";
import { goalCompletions, goals } from "./schema";
import dayjs from "dayjs";

async function seed() {
	// limpando o DB
	await db.delete(goalCompletions);
	await db.delete(goals);

	const result = await db
		.insert(goals)
		.values([
			{ title: "Acordar cedo", desiredWeeklyFrequency: 5 },
			{ title: "Estudar Python", desiredWeeklyFrequency: 5 },
			{ title: "Ir a academia", desiredWeeklyFrequency: 4 },
			{ title: "Meditar", desiredWeeklyFrequency: 2 },
		])
		.returning(); // retornando os dados inseridos

	// retorna o startOfWeek, que será uma referencia do primeiro
	// dia da semana, no caso o primeiro domingo que antecede o dia de hoje.
	const startOfWeek = dayjs().startOf("week");

	await db.insert(goalCompletions).values([
		{ goalId: result[0].id, createdAt: startOfWeek.toDate() },
		{ goalId: result[1].id, createdAt: startOfWeek.add(1, "day").toDate() },
	]);
}

seed().finally(() => {
	client.end();
});
