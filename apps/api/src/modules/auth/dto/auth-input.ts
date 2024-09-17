import { z } from 'zod';

export const AuthInputDto = z.object({
	email: z.string().email(),
	password: z.string(),
});

export type AuthInput = z.infer<typeof AuthInputDto>;
