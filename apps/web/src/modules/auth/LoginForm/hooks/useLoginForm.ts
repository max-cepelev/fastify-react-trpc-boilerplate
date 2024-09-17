import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

export const loginSchema = z.object({
	email: z.string().email('Неверный формат email'),
	password: z
		.string()
		.min(6, 'минимум 6 символов')
		.max(30, 'максимум 30 символов'),
});

export type LoginSchema = z.infer<typeof loginSchema>;

export function useLoginForm() {
	return useForm<LoginSchema>({
		resolver: zodResolver(loginSchema),
		defaultValues: {
			email: '',
			password: '',
		},
	});
}
