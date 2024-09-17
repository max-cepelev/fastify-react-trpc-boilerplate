import clsx from 'clsx';
import styles from './Row.module.css';

export const Root = ({
	children,
	gridColumns,
	isSelectable,
	onClick,
}: {
	children: React.ReactNode;
	gridColumns: string;
	isSelectable?: boolean;
	onClick?: () => void;
}) => {
	return (
		// biome-ignore lint/a11y/useKeyWithClickEvents: <explanation>
		<li
			onClick={isSelectable ? onClick : undefined}
			style={{ gridTemplateColumns: gridColumns }}
			className={clsx(styles.root, { selectable: isSelectable })}
		>
			{children}
		</li>
	);
};
