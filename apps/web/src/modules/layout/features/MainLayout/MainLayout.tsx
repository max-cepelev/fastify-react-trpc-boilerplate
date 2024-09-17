import { useEffect } from '@shared/hooks';

import { useAuth } from '@modules/auth';
import { NotificationContainer } from '@shared/services';
import { DashboardLayout } from '@ui/components';
import React from 'react';
import { Outlet } from 'react-router-dom';
import { Header } from './Header';
import { Sidebar } from './Sidebar';

export function MainLayout() {
	const { initUser, isInitPending } = useAuth();

	useEffect(() => {
		initUser();
	}, [initUser]);

	if (isInitPending) {
		return '....';
	}

	return (
		<DashboardLayout
			isOpen={true}
			main={
				<React.Fragment>
					<Outlet />
					<NotificationContainer />
				</React.Fragment>
			}
			sidebar={<Sidebar />}
			header={<Header />}
		/>
	);
}
