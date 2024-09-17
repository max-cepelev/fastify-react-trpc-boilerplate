import type { FastifyInstance } from 'fastify';
import { UserService } from './user.service';

declare module 'fastify' {
	export interface FastifyInstance {
		userService: UserService;
	}
}

export const createUserRouter = (app: FastifyInstance) => {
	const service = new UserService(app.prisma.user);

	app.decorate('userService', service);

	return app.trpc.router({
		list: app.trpc.procedure.query(() => {
			return service.findAll({});
		}),
		init: app.trpc.procedure.mutation(({ ctx }) => {
			return service.findOne({ username: ctx.req.user?.username });
		}),
	});
};
