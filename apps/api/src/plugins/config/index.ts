import { fastifyPlugin } from 'fastify-plugin';
import { z } from 'zod';

const envSchema = z.object({
	NODE_ENV: z.enum(['development', 'production']).default('development'),
	PORT: z.string().transform(Number).default('3000'), // Преобразуем строку в число
	DATABASE_URL: z.string().url(), // Должно быть валидным URL
	DEBUG_MODE: z.boolean().optional(), // Необязательная переменная, булевое значение
	COOKIES_SECRET: z.string(), // Секрет для cookie
	JWT_SECRET: z.string(), // Секрет для JWT
	TELEGRAM_BOT_TOKEN: z.string(), // Токен бота Telegram
	OPENAI_KEY: z.string(), // API-ключ для OpenAI
	UPLOAD_PATH: z.string(), // Путь для загрузки файлов
	SMTP_HOST: z.string(), // SMTP-хост для почты
	SMTP_PORT: z.string().transform(Number), // Порт для SMTP
	SMTP_USER: z.string(), // Логин для SMTP
	SMTP_PASSWORD: z.string(), // Пароль для SMTP
});

declare module 'fastify' {
	interface FastifyInstance {
		config: z.infer<typeof envSchema>;
	}
}

export const configPlugin = fastifyPlugin((app, _, next) => {
	const result = envSchema.safeParse(process.env);
	if (result.success) {
		app.decorate('config', result.data);
		next();
	} else {
		app.log.error(result.error.format());
	}
});
