import { defineConfig } from 'drizzle-kit'
import { env } from './src/env'
export default defineConfig({
  schema: "./schema.ts",
  // nome da pasta aonde ficara os arquivos
  // de migrations(definir linha do tempo)
  out: './.migrations',
  dialect: 'postgresql',
  dbCredentials: {
    url: env.DATABSE_URL,
  }
})