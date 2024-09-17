import { z } from 'zod';

export const SubscriptionScalarFieldEnumSchema = z.enum([
	'id',
	'userId',
	'type',
	'startDate',
	'endDate',
	'status',
]);

export default SubscriptionScalarFieldEnumSchema;
