import type { GridColumn } from '../types';
import { Container } from './styles';

export type CellProps<T, K = keyof T> = {
	row: T;
	column: GridColumn<T, K>;
	rowHeight: number;
	rowIndex: number;
};

export function Cell<T, K>({
	row,
	column,
	rowHeight,
	rowIndex,
}: CellProps<T, K>) {
	const { align, cellColor, isDisabled } = column;
	const Content = () => {
		if (column.component) {
			return column.component(row, rowIndex);
		}
		if (column.getCellValue) {
			return column.getCellValue(row) || '—';
		}
		if (column.key) {
			return `${row[column.key] || '—'}`;
		}
		return '—';
	};
	return (
		<Container
			isDisabled={isDisabled}
			align={align}
			backgroundColor={cellColor?.(row)}
			className={column.cellClassName?.(row)}
			rowHeight={rowHeight}
			isComponent={Boolean(column.component)}
		>
			<Content />
		</Container>
	);
}
