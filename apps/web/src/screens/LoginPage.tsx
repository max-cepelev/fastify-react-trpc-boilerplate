import { LoginScreenContent } from '@modules/auth';
import { NotificationContainer } from '@shared/services';
import { Container } from '@ui/components';

export default function LoginPage() {
	return (
		<Container
			width={'100vw'}
			height={'100vh'}
			justifyContent='center'
			alignItems='center'
		>
			<LoginScreenContent />
			<NotificationContainer />
		</Container>
	);
}
