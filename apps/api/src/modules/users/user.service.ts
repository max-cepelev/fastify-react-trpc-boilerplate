// users.service.ts
import type { Prisma } from '@prisma/client';

export class UserService {
	constructor(private readonly repository: Prisma.UserDelegate) {}
	async findAll({
		query,
	}: {
		query?: {
			include?: Prisma.UserInclude;
			select?: Prisma.UserSelect;
		};
	}) {
		return this.repository.findMany({
			orderBy: [{ name: 'asc' }],
			...query,
		});
	}

	async findByUsername(username: string) {
		return this.repository.findUnique({
			where: { username },
			select: {
				id: true,
				email: true,
				password: true,
				isAdmin: true,
				username: true,
				permissions: true,
				fileSizeLimit: true,
			},
		});
	}

	async findByEmail(email: string) {
		return this.repository.findUnique({
			where: { email },
			select: {
				id: true,
				email: true,
				password: true,
				isAdmin: true,
				username: true,
				permissions: true,
				fileSizeLimit: true,
			},
		});
	}

	async findOne({
		query,
		userId,
		username,
	}: {
		userId?: string;
		username?: string;
		query?: {
			include?: Prisma.UserInclude;
			select?: Prisma.UserSelect;
		};
	}) {
		if (!(username || userId)) {
			throw new Error('Доступ запрещен');
		}
		return this.repository.findUnique({
			where: { id: userId, username },
			select: {
				id: true,
				email: true,
				isAdmin: true,
				username: true,
				permissions: true,
				fileSizeLimit: true,
			},
			...query,
		});
	}

	async create(data: Prisma.UserUncheckedCreateInput) {
		return this.repository.create({
			data,
			select: {
				id: true,
				username: true,
				email: true,
				isAdmin: true,
				permissions: true,
				fileSizeLimit: true,
			},
		});
	}

	async update(id: string, data: Prisma.UserUncheckedUpdateInput) {
		return this.repository.update({
			where: {
				id,
			},
			data,
		});
	}
}
