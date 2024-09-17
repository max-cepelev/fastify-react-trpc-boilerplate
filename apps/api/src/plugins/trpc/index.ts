import { fastifyJwt } from '@fastify/jwt';
import type { Permission } from '@prisma/client';
import { TRPCError, initTRPC } from '@trpc/server';
import type { CreateFastifyContextOptions } from '@trpc/server/adapters/fastify';
import type { FastifyReply, FastifyRequest } from 'fastify';
import { fastifyPlugin } from 'fastify-plugin';
import superjson from 'superjson';

type JwtPayload = {
	userId: string;
	username: string;
	isAdmin: boolean;
	permissions: Permission[];
	fileSizeLimit: number;
};

type TRPCContext = {
	req: FastifyRequest;
	res: FastifyReply;
};

const t = initTRPC.context<Awaited<TRPCContext>>().create({
	transformer: superjson,
});

declare module 'fastify' {
	interface FastifyInstance {
		trpc: {
			router: (typeof t)['router'];
			publicProcedure: (typeof t)['procedure'];
			procedure: (typeof t)['procedure'];
			createContext: (
				opts: CreateFastifyContextOptions,
			) => Awaited<TRPCContext>;
		};
	}
}

declare module '@fastify/jwt' {
	interface FastifyJWT {
		user: JwtPayload | null;
	}
}

export const trpcPlugin = fastifyPlugin((app, _, next) => {
	app.register(fastifyJwt, {
		secret: app.config.JWT_SECRET,
	});
	const createContext = ({ req, res }: CreateFastifyContextOptions) => {
		return { req, res };
	};

	const t = initTRPC.context<Awaited<TRPCContext>>().create({
		transformer: superjson,
	});

	const publicProcedure = t.procedure;

	const procedure = t.procedure.use(async ({ ctx, next }) => {
		try {
			await ctx.req.jwtVerify<JwtPayload>();
			return next({
				ctx: {
					...ctx,
					user: ctx.req.user,
				},
			});
		} catch (error) {
			throw new TRPCError({ code: 'UNAUTHORIZED' });
		}
	});

	// @ts-ignore
	app.decorate('trpc', {
		procedure,
		publicProcedure,
		router: t.router,
		createContext,
	});

	next();
});
