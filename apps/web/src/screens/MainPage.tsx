import { useAuth } from '@modules/auth';
import { NotificationContainer, trpc } from '@shared/services';
import { Container } from '@ui/components';
import { useEffect } from 'react';

export default function MainPage() {
	const { initUser } = useAuth();

	useEffect(() => {
		initUser();
	}, [initUser]);

	return (
		<Container
			height='clamp(350px, 100svh, 100vh)'
			justifyContent='center'
			alignItems='center'
		>
			<p>Привет</p>
			<NotificationContainer />
		</Container>
	);
}
