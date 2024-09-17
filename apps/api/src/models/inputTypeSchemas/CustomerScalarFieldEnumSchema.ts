import { z } from 'zod';

export const CustomerScalarFieldEnumSchema = z.enum([
	'id',
	'name',
	'phone',
	'email',
	'inn',
	'createdAt',
	'updatedAt',
]);

export default CustomerScalarFieldEnumSchema;
