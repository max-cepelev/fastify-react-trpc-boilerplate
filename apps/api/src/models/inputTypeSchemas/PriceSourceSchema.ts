import { z } from 'zod';

export const PriceSourceSchema = z.enum(['Macro', 'Spreadsheet']);

export type PriceSourceType = `${z.infer<typeof PriceSourceSchema>}`;

export default PriceSourceSchema;
