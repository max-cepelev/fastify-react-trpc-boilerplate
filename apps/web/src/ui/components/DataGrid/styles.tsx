import clsx from 'clsx';
import styles from './DataGrid.module.css';

export const Container = ({
	children,
	maxHeight,
	className,
}: {
	children: React.ReactNode;
	maxHeight?: number | string;
	className?: string;
}) => (
	<div style={{ maxHeight }} className={clsx(styles.container, className)}>
		{children}
	</div>
);

export const DataGridWrapper = ({
	children,
	rowHeight,
	className,
}: {
	rowHeight: number;
	children: React.ReactNode;
	className?: string;
}) => (
	<div
		style={{ gridTemplateRows: `${rowHeight}px 1fr` }}
		className={clsx(styles.wrapper, className)}
	>
		{children}
	</div>
);

export const DisabledDataGridWrapper = ({
	children,
	rowHeight,
}: {
	children: React.ReactNode;
	rowHeight: number;
}) => (
	<DataGridWrapper className={styles.disabled} rowHeight={rowHeight}>
		{children}
	</DataGridWrapper>
);
