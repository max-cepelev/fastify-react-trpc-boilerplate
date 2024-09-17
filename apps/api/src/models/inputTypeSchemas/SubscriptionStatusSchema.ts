import { z } from 'zod';

export const SubscriptionStatusSchema = z.enum([
	'Active',
	'Canceled',
	'Inactive',
]);

export type SubscriptionStatusType =
	`${z.infer<typeof SubscriptionStatusSchema>}`;

export default SubscriptionStatusSchema;
