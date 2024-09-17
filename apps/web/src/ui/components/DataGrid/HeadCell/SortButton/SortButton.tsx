import { Button } from '@ui/lib';
import { ArrowUpDown } from 'lucide-react';
import type { HeadCellProps } from '../HeadCell';

export const SortButton = <TData, TSortKey>({
	column,
	sortBy,
	onSort,
}: Omit<HeadCellProps<TData, TSortKey>, 'rowHeight'>) => {
	const handleClick = (key?: TSortKey) => {
		if (!onSort || !key) return;
		if (sortBy && sortBy.key === key) {
			onSort({ key, order: sortBy.order === 'asc' ? 'desc' : 'asc' });
		} else {
			onSort({ key, order: sortBy?.order || 'asc' });
		}
	};

	return (
		<Button variant='ghost' onClick={() => handleClick()}>
			Email
			<ArrowUpDown
				color={column.sortKey !== sortBy?.key ? 'gray' : 'primary'}
				className='ml-2 h-4 w-4'
			/>
		</Button>
	);
};
