import type { FastifyInstance } from 'fastify';
import { createAuthRouter, createUserRouter } from '../modules';

export const createAppRouter = (app: FastifyInstance) => {
	return app.trpc.router({
		users: createUserRouter(app),
		auth: createAuthRouter(app),
	});
};

export type AppRouter = ReturnType<typeof createAppRouter>;
