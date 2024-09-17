import type { CSSProperties } from '@ui/components';
import { Toaster } from 'sonner';
import { NOTIFICATION_POSITIONS } from '../constants';

type NotificationsProps = {
	position?: keyof typeof NOTIFICATION_POSITIONS;
	className?: string;
	style?: CSSProperties;
};

export const NotificationContainer = ({
	position = 'topCenter',
	...props
}: NotificationsProps) => (
	<Toaster
		richColors
		duration={3000}
		closeButton
		position={NOTIFICATION_POSITIONS[position]}
		{...props}
	/>
);
