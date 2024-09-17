import { z } from 'zod';

export const ProfileScalarFieldEnumSchema = z.enum([
	'id',
	'userId',
	'about',
	'telegram',
	'photo',
	'dateOfBirth',
	'careerStartDate',
	'createdAt',
	'updatedAt',
]);

export default ProfileScalarFieldEnumSchema;
