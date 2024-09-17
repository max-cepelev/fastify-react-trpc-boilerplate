import { z } from 'zod';
import type { UserWithRelations } from './UserSchema';
import { UserWithRelationsSchema } from './UserSchema';

/////////////////////////////////////////
// PROFILE SCHEMA
/////////////////////////////////////////

export const ProfileSchema = z.object({
	id: z.string(),
	userId: z.string(),
	about: z.string().nullable(),
	telegram: z.string().nullable(),
	photo: z.string().nullable(),
	dateOfBirth: z.coerce.date().nullable(),
	careerStartDate: z.coerce.date().nullable(),
	createdAt: z.coerce.date(),
	updatedAt: z.coerce.date(),
});

export type Profile = z.infer<typeof ProfileSchema>;

/////////////////////////////////////////
// PROFILE RELATION SCHEMA
/////////////////////////////////////////

export type ProfileRelations = {
	user: UserWithRelations;
};

export type ProfileWithRelations = z.infer<typeof ProfileSchema> &
	ProfileRelations;

export const ProfileWithRelationsSchema: z.ZodType<ProfileWithRelations> =
	ProfileSchema.merge(
		z.object({
			user: z.lazy(() => UserWithRelationsSchema),
		}),
	);

export default ProfileSchema;
