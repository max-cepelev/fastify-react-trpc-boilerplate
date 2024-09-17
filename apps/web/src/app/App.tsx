import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import './index.css';

import {
	QueryClientProvider,
	ReactQueryDevtools,
	queryClient,
	trpc,
	trpcClient,
} from '@shared/services';
import { routes } from './router';

const router = createBrowserRouter(routes);

export const App = () => (
	<trpc.Provider client={trpcClient} queryClient={queryClient}>
		<QueryClientProvider client={queryClient}>
			<RouterProvider router={router} />
			<ReactQueryDevtools initialIsOpen={false} />
		</QueryClientProvider>
	</trpc.Provider>
);
