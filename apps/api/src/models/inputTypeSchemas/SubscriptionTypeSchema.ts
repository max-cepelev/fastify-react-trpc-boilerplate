import { z } from 'zod';

export const SubscriptionTypeSchema = z.enum(['Free', 'Basic', 'Premium']);

export type SubscriptionTypeType = `${z.infer<typeof SubscriptionTypeSchema>}`;

export default SubscriptionTypeSchema;
