import { fastifyPlugin } from 'fastify-plugin';
import { NotificationService } from './notification.service';

declare module 'fastify' {
	export interface FastifyInstance {
		notification: NotificationService;
	}
}

export const notificationModule = fastifyPlugin(
	async (app) => {
		const service = new NotificationService(app.mailer);

		app.decorate('notification', service);
	},
	{
		name: 'notifications',
	},
);
