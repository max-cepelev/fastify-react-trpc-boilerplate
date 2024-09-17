import { createServer } from './server';

export type { AppRouter } from './router';

async function bootstrap() {
	const app = await createServer();
	app.listen({ port: app.config?.PORT || 8080 }, (err) => {
		if (err) {
			app.log.error(err);
			process.exit(1);
		}
	});
}
bootstrap();
