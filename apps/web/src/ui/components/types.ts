export type {
	SyntheticEvent,
	CSSProperties,
	MouseEvent as ReactMouseEvent,
	ReactNode,
	HTMLAttributes,
	ChangeEventHandler,
	ChangeEvent,
	KeyboardEvent,
	DetailedHTMLProps,
	InputHTMLAttributes,
	FC,
} from 'react';

export type StyledComponent<T> = React.DetailedHTMLProps<
	React.HTMLAttributes<T>,
	T
>;
