import type { JWT } from '@fastify/jwt';
import type { FastifyRedis } from '@fastify/redis';
import type { FastifyBaseLogger } from 'fastify';

import type { Permission } from '@prisma/client';
import { hashPassword, random, validatePassword } from '../../utils';
import type { NotificationService } from '../notifications';
import type { UserService } from '../users';
import type {
	AuthInput,
	JwtPayload,
	RegistrationInput,
	UpdatePasswordInput,
} from './dto';

export class AuthService {
	private readonly jwt: JWT;
	private readonly notificationService: NotificationService;
	private readonly userService: UserService;
	private readonly redis: FastifyRedis;
	private readonly logger: FastifyBaseLogger;
	constructor(
		jwt: JWT,
		notificationService: NotificationService,
		userService: UserService,
		redis: FastifyRedis,
		logger: FastifyBaseLogger,
	) {
		this.jwt = jwt;
		this.notificationService = notificationService;
		this.userService = userService;
		this.redis = redis;
		this.logger = logger;
	}

	private getJwtPayload(data: {
		id: string;
		username: string;
		isAdmin: boolean;
		permissions: Permission[];
		fileSizeLimit: number;
	}) {
		return {
			userId: data.id,
			username: data.username,
			isAdmin: data.isAdmin,
			permissions: data.permissions,
			fileSizeLimit: data.fileSizeLimit,
		};
	}

	/*
	 * Регистрация
	 */
	async registration(input: RegistrationInput): Promise<string> {
		const { email } = input;
		const candidate = await this.userService.findByEmail(email);

		if (candidate) {
			throw new Error(`Пользователь c email ${email} уже зарегистрирован`);
		}
		const randomCode = random(100000, 999999).toString();
		try {
			await this.notificationService.sendConfirmationEmail(email, randomCode);
			await this.redis.set(randomCode, JSON.stringify(input), 'EX', 86400);
		} catch (error) {
			this.logger.error(error);
			throw new Error('Не удалось отправить код');
		}

		return `Код подтверждения отправлен на ${email}`;
	}

	/*
	 * Подтверждение регистрации
	 */
	async confirmRegister(randomCode: string) {
		if (!randomCode || randomCode.length !== 6) {
			throw new Error('Неверный код');
		}
		const data = await this.redis.get(randomCode);
		if (!data) {
			throw new Error('Срок действия кода истек');
		}
		const { email, password, name, phone } = JSON.parse(
			data,
		) as RegistrationInput;
		const hash = await hashPassword(password);
		const user = await this.userService.create({
			username: email.split('@')[0],
			email,
			password: hash,
			name,
			phone,
		});
		const payload = this.getJwtPayload(user);
		const token = this.jwt.sign(payload, {
			expiresIn: '30m',
		});
		const refreshToken = this.jwt.sign(payload, {
			expiresIn: '30d',
		});
		await this.redis.del(randomCode);

		this.logger.info(`Пользователь ${user.username} подтвердил регистрацию`);

		return {
			user: payload,
			token,
			refreshToken,
		};
	}

	/*
	 * Логин
	 */
	async login({ email, password }: AuthInput) {
		const candidate = await this.userService.findByEmail(email);
		if (!candidate) {
			throw new Error('Пользователь не найден');
		}
		const isPassEquals = await validatePassword(password, candidate.password);
		if (!isPassEquals) {
			throw new Error('Неверный пароль');
		}
		const payload = this.getJwtPayload(candidate);
		const token = this.jwt.sign(payload, {
			expiresIn: '30m',
		});
		const refreshToken = this.jwt.sign(payload, {
			expiresIn: '30d',
		});

		this.logger.info(`Пользователь ${candidate.username} вошел в систему`);

		return {
			user: payload,
			token,
			refreshToken,
		};
	}

	/*
	 * Обновление токена
	 */
	async refresh(refreshToken?: string | null) {
		if (!refreshToken) {
			throw new Error('Не авторизован');
		}
		const decoded = this.jwt.verify<JwtPayload>(refreshToken);
		const user = await this.userService.findByUsername(decoded.username);

		if (!user) {
			throw new Error('Пользователь не найден');
		}

		const payload = this.getJwtPayload(user);

		const token = this.jwt.sign(payload, {
			expiresIn: '30m',
		});

		const newRefreshToken = this.jwt.sign(payload, {
			expiresIn: '30d',
		});

		return {
			user: payload,
			token,
			refreshToken: newRefreshToken,
		};
	}

	/*
	 * Восстановление пароля
	 */
	recoverPassword = async ({ email, newPassword }: UpdatePasswordInput) => {
		const dbUser = await this.userService.findByEmail(email);

		if (!dbUser) {
			throw new Error('Пользователь с указанным email не найден');
		}

		const randomCode = random(100000, 999999).toString();

		// Store the recovery token in Redis with an expiration time (24 hours)
		await this.redis.set(
			randomCode,
			JSON.stringify({
				userId: dbUser.id,
				email,
				username: dbUser.username,
				newPassword,
			}),
			'EX',
			86400,
		);

		// await app.mailer.sendMail({
		//   to: email,
		//   subject: 'Восстановление пароля на сайте test.link-share.ru',
		//   from: 'info@link-share.ru',
		//   html: `
		//   <h1>Восстановление пароля на сайте link-share.ru</h1>
		//   <p>Для восстановления пароля перейдите по ссылке</p>
		//   <a href="${app.config.CLIENT_URL}/recover/${recoveryToken}">Восстановить пароль</a>
		//   `,
		// });

		this.logger.info(`Пользователь ${email} запросил восстановление пароля`);

		return {
			message: `Код для сброса пароля отправлен на ${email}`,
		};
	};

	/*
	 * Обновление пароля
	 */
	updatePassword = async (code: string) => {
		const data = await this.redis.get(code);
		if (!data) {
			throw new Error('Срок действия кода истек');
		}
		const { userId, email, newPassword } = JSON.parse(data) as {
			email: string;
			userId: string;
			username: string;
			newPassword: string;
		};
		const hash = await hashPassword(newPassword);
		await this.userService.update(userId, { password: hash });
		await this.redis.del(code);

		this.logger.info(`Пользователь ${email} обновил пароль`);

		return {
			message: 'Пароль успешно изменен',
		};
	};
}
