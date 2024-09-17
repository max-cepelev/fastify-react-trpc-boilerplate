import { z } from 'zod';
import { AuthInput, AuthInputDto } from './auth-input';

export const RegistrationInputDto = AuthInputDto.extend({
	name: z.string().nullable().optional(),
	phone: z.string().nullable().optional(),
}).strict();

export type RegistrationInput = z.infer<typeof RegistrationInputDto>;
