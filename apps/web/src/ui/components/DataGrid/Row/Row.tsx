import { useCallback } from 'react';
import { Cell } from '../Cell';
import type { GridColumn } from '../types';
import { Root } from './styles';

type RowProps<T, K = keyof T> = {
	row: T;
	columns: GridColumn<T, K>[];
	rowIndex: number;
	rowHeight: number;
	onSelect?: (row: T) => void;
};
export function Row<T, K>({
	row,
	rowHeight,
	onSelect,
	columns,
	rowIndex,
}: RowProps<T, K>) {
	const handleSelect = useCallback(() => {
		onSelect?.(row);
	}, [onSelect, row]);

	const getGridColumns = () => {
		const columnWidths = columns.map((column) => {
			if (typeof column.width === 'number') {
				return `${column.width}px`;
			}
			return column.width || '1fr';
		});

		return columnWidths.join(' ');
	};

	return (
		<Root
			onClick={handleSelect}
			isSelectable={Boolean(onSelect)}
			gridColumns={getGridColumns()}
		>
			{columns.map((column) => (
				<Cell
					row={row}
					rowIndex={rowIndex}
					column={column}
					key={column.title}
					rowHeight={rowHeight}
				/>
			))}
		</Root>
	);
}
