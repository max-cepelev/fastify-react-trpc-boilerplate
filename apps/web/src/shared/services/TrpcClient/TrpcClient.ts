import type { AppRouter } from '@monorepo/api';
import { API_BASE_URL } from '@shared/constants';
import { httpBatchLink } from '@trpc/client';
import { createTRPCReact } from '@trpc/react-query';
import superjson from 'superjson';
import { localStorageService } from '../LocalStorageService';

export const trpc = createTRPCReact<AppRouter>();

export type TRPCServer = AppRouter;

export const trpcClient = trpc.createClient({
	transformer: superjson,
	links: [
		httpBatchLink({
			url: `${API_BASE_URL}/trpc`,
			async fetch(url, options) {
				let response = await fetch(url, { ...options, credentials: 'include' });

				// Проверка на 401 ошибку
				if (response.status === 401) {
					const refreshResponse = await fetch(`${API_BASE_URL}/auth/refresh`, {
						method: 'GET',
						credentials: 'include',
					});

					if (refreshResponse.ok) {
						const data = await refreshResponse.json();

						// Сохраняем новый токен
						localStorageService.setToken(data.token);

						// Добавляем новый токен в заголовки
						const newHeaders = new Headers(options?.headers);
						newHeaders.set('Authorization', `Bearer ${data.token}`);

						// Повторный запрос с обновленным токеном
						response = await fetch(url, {
							...options,
							headers: newHeaders,
							credentials: 'include',
						});
					} else {
						// Если обновление токена не удалось, перенаправляем на логин
						window.open('/login', '_self');
					}
				}

				return response;
			},
			headers() {
				return {
					authorization: `Bearer ${localStorageService.getToken() || ''}`,
				};
			},
		}),
	],
});
