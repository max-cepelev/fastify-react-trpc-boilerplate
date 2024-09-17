import { z } from 'zod';

export const LogScalarFieldEnumSchema = z.enum([
	'id',
	'description',
	'userId',
	'createdAt',
]);

export default LogScalarFieldEnumSchema;
