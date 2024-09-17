import { z } from 'zod';
import type { PriceWithRelations } from './PriceSchema';
import { PriceWithRelationsSchema } from './PriceSchema';
import type { UserWithRelations } from './UserSchema';
import { UserWithRelationsSchema } from './UserSchema';

/////////////////////////////////////////
// CUSTOMER SCHEMA
/////////////////////////////////////////

export const CustomerSchema = z.object({
	id: z.string(),
	name: z.string(),
	phone: z.string().nullable(),
	email: z.string().nullable(),
	inn: z.string().nullable(),
	createdAt: z.coerce.date(),
	updatedAt: z.coerce.date(),
});

export type Customer = z.infer<typeof CustomerSchema>;

/////////////////////////////////////////
// CUSTOMER RELATION SCHEMA
/////////////////////////////////////////

export type CustomerRelations = {
	users: UserWithRelations[];
	prices: PriceWithRelations[];
};

export type CustomerWithRelations = z.infer<typeof CustomerSchema> &
	CustomerRelations;

export const CustomerWithRelationsSchema: z.ZodType<CustomerWithRelations> =
	CustomerSchema.merge(
		z.object({
			users: z.lazy(() => UserWithRelationsSchema).array(),
			prices: z.lazy(() => PriceWithRelationsSchema).array(),
		}),
	);

export default CustomerSchema;
