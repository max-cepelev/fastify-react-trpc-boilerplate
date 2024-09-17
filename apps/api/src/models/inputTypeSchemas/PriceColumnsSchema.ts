import { z } from 'zod';

export const PriceColumnsSchema = z.enum([
	'DecorPrice',
	'SquarePrice',
	'DiscountPrice',
	'LayoutImg',
	'Floor',
	'Roominess',
	'TotalArea',
]);

export type PriceColumnsType = `${z.infer<typeof PriceColumnsSchema>}`;

export default PriceColumnsSchema;
