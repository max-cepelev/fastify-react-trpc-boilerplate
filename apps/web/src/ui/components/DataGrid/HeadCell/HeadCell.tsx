import type { GridColumn } from '../types';
import { SortButton } from './SortButton';

import { Container } from './styles';

export type HeadCellProps<T, K = keyof T> = {
	column: GridColumn<T, K>;
	rowHeight: number;
	sortBy?: { key: K; order: 'asc' | 'desc' };
	onSort?: (sort: { key: K; order: 'asc' | 'desc' }) => void;
};

export const HeadCell = <TData, TSortKey>({
	onSort,
	sortBy,
	column,
	rowHeight,
}: HeadCellProps<TData, TSortKey>) => {
	const isSortable = onSort && column.sortKey;
	return (
		<Container rowHeight={rowHeight} align={column.align}>
			{isSortable ? (
				<SortButton column={column} sortBy={sortBy} onSort={onSort} />
			) : (
				<p>{column.title}</p>
			)}
		</Container>
	);
};
