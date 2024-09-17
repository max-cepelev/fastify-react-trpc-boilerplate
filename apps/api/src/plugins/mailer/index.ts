import type { FastifyInstance } from 'fastify';
import { fastifyPlugin } from 'fastify-plugin';
import { type Transporter, createTransport } from 'nodemailer';
import type SMTPTransport from 'nodemailer/lib/smtp-transport';

export type MailerPlugin = Transporter<SMTPTransport.SentMessageInfo>;

declare module 'fastify' {
	interface FastifyInstance {
		mailer: MailerPlugin;
	}
}

export const mailerPlugin = fastifyPlugin(
	async (app: FastifyInstance) => {
		try {
			const { SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASSWORD } = app.config;

			const transporter = createTransport({
				host: SMTP_HOST,
				port: SMTP_PORT,
				secure: true, // use TLS
				auth: {
					user: SMTP_USER,
					pass: SMTP_PASSWORD,
				},
			});
			app.decorate('mailer', transporter);
		} catch (error) {
			app.log.error(error);
		}
	},
	{
		name: 'fastify-mailer',
		fastify: '4.x',
	},
);
