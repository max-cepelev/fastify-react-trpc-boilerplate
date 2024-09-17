import { ConfirmationCard, useAuth } from '@modules/auth';
import { useLocation } from '@shared/hooks';
import { NotificationContainer } from '@shared/services';
import { Container } from '@ui/components';

export default function ConfirmationPage() {
	return (
		<Container height='100svh' justifyContent='center' alignItems='center'>
			<ConfirmationCard />
			<NotificationContainer />
		</Container>
	);
}
