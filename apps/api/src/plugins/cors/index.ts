import { fastifyCors } from '@fastify/cors';
import { fastifyPlugin } from 'fastify-plugin';

export const corsPlugin = fastifyPlugin((app, _, next) => {
	const origin = ['http://localhost:3001'];

	if (app.config.NODE_ENV === 'development') {
		origin.push('http://localhost:5173');
	}
	app.register(fastifyCors, {
		origin,
		credentials: true,
	});

	next();
});
