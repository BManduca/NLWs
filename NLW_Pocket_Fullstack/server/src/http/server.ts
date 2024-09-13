import fastify from "fastify";
import {
	serializerCompiler,
	validatorCompiler,
	type ZodTypeProvider,
} from "fastify-type-provider-zod";
import { getWeekPendingGoals } from "../functions/get-week-pending-goals";
import { createGoalRoute } from "./routes/create-goal";
import { markGoalCompletionRoute } from "./routes/mark-goal-completion";
import { getPendingGoalsRoute } from "./routes/get-pending-goals";
import { getWeekSummaryRoute } from "./routes/get-week-summary";
import fastifyCors from "@fastify/cors";

const app = fastify().withTypeProvider<ZodTypeProvider>();

app.register(fastifyCors, {
	// qualquer url(fron-end) pode acessar o back-end
	origin: "*",
});

// Add schema validator and serializer
app.setValidatorCompiler(validatorCompiler);
app.setSerializerCompiler(serializerCompiler);

app.register(createGoalRoute);
app.register(markGoalCompletionRoute);
app.register(getPendingGoalsRoute);
app.register(getWeekSummaryRoute);

app
	.listen({
		port: 3333,
	})
	.then(() => {
		console.log("HTTP server running");
	});
