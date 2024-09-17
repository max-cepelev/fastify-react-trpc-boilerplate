import type { GridColumn } from '../types';
import styles from './Head.module.css';

export const Container = <T, K>(props: {
	children: React.ReactNode;
	columns: GridColumn<T, K>[];
}) => {
	const getGridColumns = () => {
		return props.columns
			.map((column) => {
				if (typeof column.width === 'number') {
					return `${column.width}px`;
				}
				return column.width || '1fr';
			})
			.join(' ');
	};

	return (
		<header
			className={styles.root}
			style={{ gridTemplateColumns: getGridColumns() }}
		>
			{props.children}
		</header>
	);
};
