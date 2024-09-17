import { fastifyRedis } from '@fastify/redis';
import { fastifyPlugin } from 'fastify-plugin';

export const redisPlugin = fastifyPlugin((app, _, next) => {
	app.register(fastifyRedis, {
		host: '127.0.0.1',
		port: 6379, // Redis port
		family: 4, // 4 (IPv4) or 6 (IPv6)
	});

	next();
});
