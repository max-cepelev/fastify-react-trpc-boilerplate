import { ProtectedRoute } from '@modules/auth';
import { MainLayout } from '@modules/layout';
import ConfirmationPage from '@screens/ConfirmationPage';
import ErrorPage from '@screens/ErrorPage';
import LoginPage from '@screens/LoginPage';
import NoAccess from '@screens/NoAccess';
import NoActivate from '@screens/NoActivate';
import UsersPage from '@screens/UsersPage';
import { UserPermissions } from '@shared/enums';
import { Container } from '@ui/components';
import type { RouteObject } from 'react-router-dom';

export const routes: RouteObject[] = [
	{
		path: '/',
		element: <MainLayout />,
		errorElement: <ErrorPage />,
		children: [
			{
				index: true,
				element: (
					<Container
						height={'100%'}
						justifyContent='center'
						alignItems='center'
					>
						Привет
					</Container>
				),
			},
			{
				path: 'users',
				element: (
					<ProtectedRoute
						page={<UsersPage />}
						permission={UserPermissions.Users}
					/>
				),
				handle: {
					title: 'Пользователи',
					permission: UserPermissions.Users,
				},
			},
			{
				path: 'no-activate',
				element: <NoActivate />,
			},
			{
				path: 'no-access',
				element: <NoAccess />,
			},
		],
	},
	{
		path: '/login',
		element: <LoginPage />,
	},
	{
		path: '/confirmation',
		element: <ConfirmationPage />,
	},
];
