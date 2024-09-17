import type { ReactNode } from 'react';

export type GridColumn<T, K = keyof T> = {
	title: string;
	key?: keyof T;
	sortKey?: K;
	width?: number | string;
	align?: 'left' | 'center' | 'right' | 'justify';
	isDisabled?: boolean;
	component?: (row: T, index: number) => ReactNode;
	getCellValue?: (row: T) => string | number | null | undefined;
	cellClassName?: (row: T) => string;
	cellColor?: (row: T) => string;
	cellHoveredComponent?: (row: T) => ReactNode;
};

export type GridColumns<T, K = keyof T> = GridColumn<T, K>[];

export type AlignVariant = 'left' | 'center' | 'right' | 'justify';
