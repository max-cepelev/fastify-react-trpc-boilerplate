import clsx from 'clsx';
import type { AlignVariant } from '../types';
import styles from './HeadCell.module.css';

export const Container = ({
	children,
	rowHeight,
	align,
}: {
	children: React.ReactNode;
	rowHeight: number;
	align?: AlignVariant;
}) => {
	return (
		<div
			className={clsx(styles.root, styles[align ?? 'left'])}
			style={{ height: rowHeight }}
		>
			{children}
		</div>
	);
};
