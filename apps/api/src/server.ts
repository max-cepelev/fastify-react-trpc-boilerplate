import { fastifyCookie } from '@fastify/cookie';
import { fastifyTRPCPlugin } from '@trpc/server/adapters/fastify';
import fastify from 'fastify';
import { notificationModule } from './modules';
import {
	configPlugin,
	corsPlugin,
	cronPlugin,
	helmetPlugin,
	mailerPlugin,
	prismaPlugin,
	redisPlugin,
	trpcPlugin,
} from './plugins';
import { createAppRouter } from './router';

export async function createServer() {
	const server = fastify({
		disableRequestLogging: process.env.NODE_ENV === 'production',
		maxParamLength: 5000,
		logger: {
			transport: {
				target: 'pino-pretty',
				options: {
					translateTime: 'SYS:dd-mm-yyyy HH:MM:ss',
					ignore: 'pid, hostname',
				},
			},
		},
	});

	const plugins = [
		configPlugin,
		corsPlugin,
		helmetPlugin,
		cronPlugin,
		mailerPlugin,
		redisPlugin,
		prismaPlugin,
		trpcPlugin,
	];

	const modules = [notificationModule];

	for await (const component of plugins) {
		await server.register(component);
	}

	await server.register(fastifyCookie, {
		secret: server.config.COOKIES_SECRET,
	});

	for await (const component of modules) {
		await server.register(component);
	}

	const router = createAppRouter(server);

	server.register(fastifyTRPCPlugin, {
		prefix: '/trpc',
		trpcOptions: {
			router,
			createContext: server.trpc.createContext,
		},
	});

	await server.ready();

	return server;
}
