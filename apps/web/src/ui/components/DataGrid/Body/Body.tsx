import { DataGridState } from '../DataGridState';
import { Row } from '../Row';
import type { GridColumn } from '../types';
import { Container } from './styles';

export type BodyProps<T, K = keyof T> = {
	noDataText?: string;
	noDataImgSrc?: string;
	isLoading?: boolean;
	isEmpty?: boolean;
	columns: GridColumn<T, K>[];
	rows: T[];
	rowHeight: number;
	getRowId: (row: T) => string | number;
	onSelect?: (row: T) => void;
};

export const Body = <T, K = keyof T>({
	isEmpty,
	isLoading,
	noDataText,
	noDataImgSrc,
	columns,
	rows,
	rowHeight,
	getRowId,
	onSelect,
}: BodyProps<T, K>) => {
	return isEmpty || isLoading ? (
		<Container>
			<DataGridState
				noDataText={noDataText}
				isEmpty={isEmpty}
				isLoading={isLoading}
				noDataImgSrc={noDataImgSrc}
			/>
		</Container>
	) : (
		<Container>
			{rows.map((row, index) => (
				<Row
					key={getRowId(row)}
					row={row}
					rowHeight={rowHeight}
					columns={columns}
					onSelect={onSelect}
					rowIndex={index}
				/>
			))}
		</Container>
	);
};
