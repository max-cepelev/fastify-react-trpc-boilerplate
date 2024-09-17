import type { ReactNode } from 'react';
import { Body } from './Body';
import { Head } from './Head';
import { ROW_HEIGHT } from './constants';
import { Container, DataGridWrapper, DisabledDataGridWrapper } from './styles';
import type { GridColumn } from './types';

type Props<T, K = keyof T> = {
	rows: T[];
	columns: GridColumn<T, K>[];
	className?: string;
	maxHeight?: string | number;
	noDataText?: string;
	noDataImgSrc?: string;
	rowHeight?: number;
	getRowId: (row: T) => string | number;
	isLoading?: boolean;
	isDisabled?: boolean;
	isEmpty?: boolean;
	onSelect?: (row: T) => void;
	sortBy?: { key: K; order: 'asc' | 'desc' };
	onSort?: (sort: { key: K; order: 'asc' | 'desc' }) => void;
	minDisplayRows?: number;
	Footer?: ReactNode;
};

export function DataGrid<T, K = keyof T>({
	rows,
	columns,
	maxHeight = '100%',
	className,
	noDataText,
	rowHeight = ROW_HEIGHT,
	getRowId,
	onSelect,
	isLoading,
	isDisabled,
	isEmpty,
	sortBy,
	onSort,
	noDataImgSrc = '/empty.png',
	Footer,
}: Props<T, K>) {
	const isEmptyState = isEmpty ?? rows.length === 0;
	const isDataGridDisabled = isLoading || isDisabled;
	const TableContainer = isDataGridDisabled
		? DisabledDataGridWrapper
		: DataGridWrapper;
	return (
		<Container className={className} maxHeight={maxHeight}>
			<TableContainer
				rowHeight={rowHeight}
				{...{ inert: isDataGridDisabled ? '' : undefined }}
			>
				<Head
					columns={columns}
					rowHeight={rowHeight}
					// stickyHeader={stickyHeader}
					sortBy={sortBy}
					onSort={onSort}
				/>
				<Body
					rows={rows}
					columns={columns}
					rowHeight={rowHeight}
					getRowId={getRowId}
					onSelect={onSelect}
					noDataText={noDataText}
					noDataImgSrc={noDataImgSrc}
					isEmpty={isEmptyState}
					isLoading={isLoading}
				/>
			</TableContainer>
			{Footer}
		</Container>
	);
}
