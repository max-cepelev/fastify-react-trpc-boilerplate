import { z } from 'zod';
import type { UserWithRelations } from './UserSchema';
import { UserWithRelationsSchema } from './UserSchema';

/////////////////////////////////////////
// LOG SCHEMA
/////////////////////////////////////////

export const LogSchema = z.object({
	id: z.number().int(),
	description: z.string(),
	userId: z.string(),
	createdAt: z.coerce.date(),
});

export type Log = z.infer<typeof LogSchema>;

/////////////////////////////////////////
// LOG RELATION SCHEMA
/////////////////////////////////////////

export type LogRelations = {
	user: UserWithRelations;
};

export type LogWithRelations = z.infer<typeof LogSchema> & LogRelations;

export const LogWithRelationsSchema: z.ZodType<LogWithRelations> =
	LogSchema.merge(
		z.object({
			user: z.lazy(() => UserWithRelationsSchema),
		}),
	);

export default LogSchema;
