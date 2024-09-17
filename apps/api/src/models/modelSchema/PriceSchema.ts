import { z } from 'zod';
import { PriceColumnsSchema } from '../inputTypeSchemas/PriceColumnsSchema';
import { PriceSourceSchema } from '../inputTypeSchemas/PriceSourceSchema';
import type { CustomerWithRelations } from './CustomerSchema';
import { CustomerWithRelationsSchema } from './CustomerSchema';
import type { UserWithRelations } from './UserSchema';
import { UserWithRelationsSchema } from './UserSchema';

/////////////////////////////////////////
// PRICE SCHEMA
/////////////////////////////////////////

export const PriceSchema = z.object({
	columns: PriceColumnsSchema.array(),
	source: PriceSourceSchema,
	slug: z.string(),
	cacheTime: z.number().int().nullable(),
	sourceUrl: z.string().nullable(),
	title: z.string().nullable(),
	titleImg: z.string().nullable(),
	decorPrice: z.number().nullable(),
	userId: z.string(),
	customerId: z.string().nullable(),
	createdAt: z.coerce.date(),
	updatedAt: z.coerce.date(),
});

export type Price = z.infer<typeof PriceSchema>;

/////////////////////////////////////////
// PRICE RELATION SCHEMA
/////////////////////////////////////////

export type PriceRelations = {
	user: UserWithRelations;
	customer?: CustomerWithRelations | null;
};

export type PriceWithRelations = z.infer<typeof PriceSchema> & PriceRelations;

export const PriceWithRelationsSchema: z.ZodType<PriceWithRelations> =
	PriceSchema.merge(
		z.object({
			user: z.lazy(() => UserWithRelationsSchema),
			customer: z.lazy(() => CustomerWithRelationsSchema).nullable(),
		}),
	);

export default PriceSchema;
