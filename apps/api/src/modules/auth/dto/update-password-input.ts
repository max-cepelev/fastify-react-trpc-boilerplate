import { z } from 'zod';

export type UpdatePasswordInput = {
	email: string;
	newPassword: string;
};

export const UpdatePasswordInputDto = z
	.object({
		email: z.string().email(),
		newPassword: z.string().min(6),
	})
	.strict();
