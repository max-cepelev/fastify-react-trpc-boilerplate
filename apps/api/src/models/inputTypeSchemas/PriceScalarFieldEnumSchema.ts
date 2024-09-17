import { z } from 'zod';

export const PriceScalarFieldEnumSchema = z.enum([
	'slug',
	'columns',
	'source',
	'cacheTime',
	'sourceUrl',
	'title',
	'titleImg',
	'decorPrice',
	'userId',
	'customerId',
	'createdAt',
	'updatedAt',
]);

export default PriceScalarFieldEnumSchema;
