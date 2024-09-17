import type { CookieSerializeOptions } from '@fastify/cookie';
import { TRPCError } from '@trpc/server';
import type { FastifyInstance } from 'fastify';
import { z } from 'zod';
import { AuthService } from './auth.service';
import {
	AuthInputDto,
	AuthResponseDto,
	RegistrationInputDto,
	UpdatePasswordInputDto,
} from './dto';

export const createAuthRouter = (app: FastifyInstance) => {
	const cookiesOptions: CookieSerializeOptions = {
		httpOnly: true,
		secure: true,
		maxAge: 30 * 24 * 60 * 60,
		sameSite: 'none',
		path: '/',
	};

	const service = new AuthService(
		app.jwt,
		app.notification,
		app.userService,
		app.redis,
		app.log,
	);

	app.get('/auth/refresh', async (req, res) => {
		const refreshToken = req.cookies.refreshToken;
		if (!refreshToken) {
			res.code(401).send(new Error('UNAUTHORIZED'));
		}

		const { token } = await service.refresh(refreshToken);

		res.code(200).send({ token });
	});

	const login = app.trpc.publicProcedure
		.input(AuthInputDto)
		.output(AuthResponseDto)
		.mutation(async ({ input, ctx }) => {
			return service
				.login(input)
				.then((response) => {
					ctx.res.setCookie(
						'refreshToken',
						response.refreshToken,
						cookiesOptions,
					);

					return {
						token: response.token,
						user: response.user,
					};
				})
				.catch((error) => {
					throw new TRPCError({
						code: 'INTERNAL_SERVER_ERROR',
						message: error.message,
						cause: error,
					});
				});
		});

	const refreshToken = app.trpc.publicProcedure
		.output(AuthResponseDto)
		.mutation(async ({ ctx }) => {
			const token = ctx?.req?.cookies?.refreshToken;
			if (!token) {
				throw new TRPCError({
					code: 'UNAUTHORIZED',
					message: 'No refresh token provided',
				});
			}
			return service
				.refresh(token)
				.then((response) => {
					ctx.res.setCookie(
						'refreshToken',
						response.refreshToken,
						cookiesOptions,
					);

					return {
						token: response.token,
						user: response.user,
					};
				})
				.catch((error) => {
					throw new TRPCError({
						code: 'INTERNAL_SERVER_ERROR',
						message: error.message,
						cause: error,
					});
				});
		});

	const registration = app.trpc.publicProcedure
		.input(RegistrationInputDto)
		.output(z.string())
		.mutation(async ({ input }) => {
			return service
				.registration(input)
				.then((response) => {
					return response;
				})
				.catch((error) => {
					throw new TRPCError({
						code: 'INTERNAL_SERVER_ERROR',
						message: error.message,
						cause: error,
					});
				});
		});

	const confirmRegistration = app.trpc.publicProcedure
		.input(z.object({ code: z.string() }))
		.mutation(async ({ input, ctx }) => {
			return service
				.confirmRegister(input.code)
				.then((response) => {
					ctx.res.setCookie(
						'refreshToken',
						response.refreshToken,
						cookiesOptions,
					);

					return {
						token: response.token,
						user: response.user,
					};
				})
				.catch((error) => {
					throw new TRPCError({
						code: 'INTERNAL_SERVER_ERROR',
						message: error.message,
						cause: error,
					});
				});
		});

	const recoverPassword = app.trpc.publicProcedure
		.input(UpdatePasswordInputDto)
		.output(z.object({ message: z.string() }))
		.mutation(async ({ input }) => {
			return service
				.recoverPassword(input)
				.then((response) => {
					return response;
				})
				.catch((error) => {
					throw new TRPCError({
						code: 'INTERNAL_SERVER_ERROR',
						message: error.message,
						cause: error,
					});
				});
		});

	const resetPassword = app.trpc.publicProcedure
		.input(z.object({ code: z.string() }))
		.output(z.object({ message: z.string() }))
		.mutation(async ({ input }) => {
			return service
				.updatePassword(input.code)
				.then((response) => {
					return response;
				})
				.catch((error) => {
					throw new TRPCError({
						code: 'INTERNAL_SERVER_ERROR',
						message: error.message,
						cause: error,
					});
				});
		});

	const logout = app.trpc.publicProcedure
		.output(z.boolean())
		.mutation(async ({ ctx }) => {
			ctx.res.clearCookie('refreshToken', {
				path: '/',
				secure: true,
				httpOnly: true,
				sameSite: 'none',
			});
			return true;
		});

	return app.trpc.router({
		login,
		refreshToken,
		registration,
		confirmRegistration,
		recoverPassword,
		resetPassword,
		logout,
	});
};
