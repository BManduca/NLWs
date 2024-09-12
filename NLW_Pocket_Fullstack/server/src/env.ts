import z from "zod";

const envSchema = z.object({
	DATABASE_URL: z.string().url(),
});

// process.env -> de onde vem as variaveis de ambiente
// parse serve para verificar se o process.env, esta seguindo o formato envSchema
export const env = envSchema.parse(process.env);
