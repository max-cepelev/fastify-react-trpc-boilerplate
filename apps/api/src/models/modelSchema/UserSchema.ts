import { z } from 'zod';
import { PermissionSchema } from '../inputTypeSchemas/PermissionSchema';
import type { CustomerWithRelations } from './CustomerSchema';
import { CustomerWithRelationsSchema } from './CustomerSchema';
import type { LogWithRelations } from './LogSchema';
import { LogWithRelationsSchema } from './LogSchema';
import type { PriceWithRelations } from './PriceSchema';
import { PriceWithRelationsSchema } from './PriceSchema';
import type { ProfileWithRelations } from './ProfileSchema';
import { ProfileWithRelationsSchema } from './ProfileSchema';
import type { SubscriptionWithRelations } from './SubscriptionSchema';
import { SubscriptionWithRelationsSchema } from './SubscriptionSchema';

/////////////////////////////////////////
// USER SCHEMA
/////////////////////////////////////////

export const UserSchema = z.object({
	permissions: PermissionSchema.array(),
	id: z.string(),
	username: z.string(),
	email: z.string().nullable(),
	isAdmin: z.boolean(),
	name: z.string().nullable(),
	phone: z.string().nullable(),
	password: z.string(),
	fileSizeLimit: z.number(),
	buildingIds: z.number().int().array(),
	customerId: z.string().nullable(),
	createdAt: z.coerce.date(),
	updatedAt: z.coerce.date(),
});

export type User = z.infer<typeof UserSchema>;

/////////////////////////////////////////
// USER RELATION SCHEMA
/////////////////////////////////////////

export type UserRelations = {
	logs: LogWithRelations[];
	customer?: CustomerWithRelations | null;
	profile?: ProfileWithRelations | null;
	subscriptions: SubscriptionWithRelations[];
	prices: PriceWithRelations[];
};

export type UserWithRelations = z.infer<typeof UserSchema> & UserRelations;

export const UserWithRelationsSchema: z.ZodType<UserWithRelations> =
	UserSchema.merge(
		z.object({
			logs: z.lazy(() => LogWithRelationsSchema).array(),
			customer: z.lazy(() => CustomerWithRelationsSchema).nullable(),
			profile: z.lazy(() => ProfileWithRelationsSchema).nullable(),
			subscriptions: z.lazy(() => SubscriptionWithRelationsSchema).array(),
			prices: z.lazy(() => PriceWithRelationsSchema).array(),
		}),
	);

export default UserSchema;
