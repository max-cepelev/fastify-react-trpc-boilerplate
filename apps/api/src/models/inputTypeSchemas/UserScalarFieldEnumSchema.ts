import { z } from 'zod';

export const UserScalarFieldEnumSchema = z.enum([
	'id',
	'username',
	'email',
	'isAdmin',
	'name',
	'phone',
	'password',
	'permissions',
	'fileSizeLimit',
	'buildingIds',
	'customerId',
	'createdAt',
	'updatedAt',
]);

export default UserScalarFieldEnumSchema;
