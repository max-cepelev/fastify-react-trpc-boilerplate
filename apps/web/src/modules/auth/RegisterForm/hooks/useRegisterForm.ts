import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

// Пароль должен содержать цифру, спецсимвол (#?!@$%^&*-), строчную и заглавную букву
// const passwordValidation = new RegExp(
//   /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/
// );

const passwordValidation = new RegExp(
	/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9]).*$/,
);

export const registerSchema = z
	.object({
		email: z.string().email('Неверный формат email'),
		password: z
			.string()
			.min(8, 'Пароль должен содержать минимум 8 символов')
			.max(30, 'Пароль должен содержать максимум 30 символов')
			.regex(
				passwordValidation,
				'Пароль должен содержать цифру, строчную и заглавную букву',
			),
		passwordConfirm: z
			.string()
			.max(30, 'Пароль должен содержать максимум 30 символов'),
	})
	.superRefine(({ password, passwordConfirm }, ctx) => {
		if (password !== passwordConfirm) {
			ctx.addIssue({
				code: 'custom',
				message: 'Пароли не совпадают',
				path: ['passwordConfirm'],
			});
		}
	});

export type RegisterSchema = z.infer<typeof registerSchema>;

export function useRegisterForm() {
	return useForm<RegisterSchema>({
		resolver: zodResolver(registerSchema),
		defaultValues: {
			email: '',
			password: '',
			passwordConfirm: '',
		},
	});
}
