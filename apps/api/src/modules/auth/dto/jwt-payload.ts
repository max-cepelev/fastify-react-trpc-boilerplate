import { Permission } from '@prisma/client';
import { z } from 'zod';

export const JwtPayloadDto = z.object({
	userId: z.string(),
	username: z.string(),
	isAdmin: z.boolean(),
	permissions: z.nativeEnum(Permission).array(),
	fileSizeLimit: z.number(),
});

export type JwtPayload = z.infer<typeof JwtPayloadDto>;
