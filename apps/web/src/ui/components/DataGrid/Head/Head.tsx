import { HeadCell } from '../HeadCell';
import type { GridColumn } from '../types';
import { Container } from './styles';

type DataGridHeaderProps<T, K = keyof T> = {
	columns: GridColumn<T, K>[];
	rowHeight: number;
	sortBy?: { key: K; order: 'asc' | 'desc' };
	onSort?: (sort: { key: K; order: 'asc' | 'desc' }) => void;
};

export function Head<T, K>({
	columns,
	sortBy,
	onSort,
	rowHeight,
}: DataGridHeaderProps<T, K>) {
	return (
		<Container columns={columns}>
			{columns.map((col) => (
				<HeadCell
					key={col.title}
					rowHeight={rowHeight}
					column={col}
					sortBy={sortBy}
					onSort={onSort}
				/>
			))}
		</Container>
	);
}
