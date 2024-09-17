export enum NotificationVariantTypes {
	info = 'info',
	success = 'success',
	warning = 'warning',
	error = 'error',
}

export const NOTIFICATION_POSITIONS = {
	topRight: 'top-right',
	topLeft: 'top-left',
	bottomRight: 'bottom-right',
	bottomLeft: 'bottom-left',
	topCenter: 'top-center',
	bottomCenter: 'bottom-center',
} as const;

export const NOTIFY_CLASSNAME = 'notify';
