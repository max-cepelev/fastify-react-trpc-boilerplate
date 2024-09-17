import { PrismaClient } from '@prisma/client';
import { fastifyPlugin } from 'fastify-plugin';

// Use TypeScript module augmentation to declare the type of server.prisma to be PrismaClient
declare module 'fastify' {
	interface FastifyInstance {
		prisma: PrismaClient;
	}
}

export const prismaPlugin = fastifyPlugin(async (server) => {
	const prisma = new PrismaClient({
		datasources: { db: { url: server.config.DATABASE_URL } },
	});

	try {
		await prisma.$connect();
	} catch (error) {
		throw new Error('not connected in db');
	}

	// Make Prisma Client available through the fastify server instance: server.prisma
	server.decorate('prisma', prisma);

	server.addHook('onClose', async (server) => {
		await server.prisma.$disconnect();
	});
});
