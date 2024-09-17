import { QueryClient } from '@tanstack/react-query';
import type { TRPCClientError } from '@trpc/client';
import type { TRPCServer } from '../TrpcClient';

declare module '@tanstack/react-query' {
	interface Register {
		defaultError: TRPCClientError<TRPCServer>;
	}
}

export const queryClient = new QueryClient({
	defaultOptions: {
		queries: {
			retry: 600,
			retryDelay: 300,
			staleTime: Number.POSITIVE_INFINITY,
		},
	},
});
