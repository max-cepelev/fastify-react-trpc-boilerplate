import { z } from 'zod';
import { JwtPayloadDto } from './jwt-payload';

export const AuthResponseDto = z.object({
	token: z.string(),
	user: JwtPayloadDto,
});

export type AuthResponse = z.infer<typeof AuthResponseDto>;
