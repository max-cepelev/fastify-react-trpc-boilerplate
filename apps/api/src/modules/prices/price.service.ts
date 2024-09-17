import type { Prisma } from '@prisma/client';

export class PriceService {
	constructor(private readonly repository: Prisma.PriceDelegate) {}
}
