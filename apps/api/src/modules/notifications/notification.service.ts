import type { MailerPlugin } from '../../plugins';
import { getConfirmationTemplate } from './templates/confirmation';

export class NotificationService {
	private readonly mailer;
	constructor(mailer: MailerPlugin) {
		this.mailer = mailer;
	}

	async sendConfirmationEmail(email: string, code: string) {
		const formatCode = () => `000000${code}`.slice(-6);

		await this.mailer.sendMail({
			to: email,
			subject: 'Регистрация в сервисе',
			from: 'info@permnovostroy.ru',
			html: getConfirmationTemplate(formatCode()),
		});
	}
}
