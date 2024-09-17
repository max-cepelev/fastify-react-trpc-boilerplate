import { z } from 'zod';

export const PermissionSchema = z.enum(['Edit', 'View', 'Admin', 'Delete']);

export type PermissionType = `${z.infer<typeof PermissionSchema>}`;

export default PermissionSchema;
