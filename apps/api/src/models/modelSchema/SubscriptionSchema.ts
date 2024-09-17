import { z } from 'zod';
import { SubscriptionStatusSchema } from '../inputTypeSchemas/SubscriptionStatusSchema';
import { SubscriptionTypeSchema } from '../inputTypeSchemas/SubscriptionTypeSchema';
import type { UserWithRelations } from './UserSchema';
import { UserWithRelationsSchema } from './UserSchema';

/////////////////////////////////////////
// SUBSCRIPTION SCHEMA
/////////////////////////////////////////

export const SubscriptionSchema = z.object({
	type: SubscriptionTypeSchema,
	status: SubscriptionStatusSchema,
	id: z.number().int(),
	userId: z.string(),
	startDate: z.coerce.date(),
	endDate: z.coerce.date(),
});

export type Subscription = z.infer<typeof SubscriptionSchema>;

/////////////////////////////////////////
// SUBSCRIPTION RELATION SCHEMA
/////////////////////////////////////////

export type SubscriptionRelations = {
	user: UserWithRelations;
};

export type SubscriptionWithRelations = z.infer<typeof SubscriptionSchema> &
	SubscriptionRelations;

export const SubscriptionWithRelationsSchema: z.ZodType<SubscriptionWithRelations> =
	SubscriptionSchema.merge(
		z.object({
			user: z.lazy(() => UserWithRelationsSchema),
		}),
	);

export default SubscriptionSchema;
