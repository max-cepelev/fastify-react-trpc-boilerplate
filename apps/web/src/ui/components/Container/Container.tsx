import { cn } from '@shared/utils';
import { cva } from 'class-variance-authority';
import { forwardRef } from 'react';
import type { CSSProperties, HTMLAttributes, ReactNode } from '../types';

export type ContainerProps = {
	variant?: 'flex' | 'grid';
	direction?: 'row' | 'column';
	gap?: number;
	width?: number | string;
	height?: number | string;
	justifyContent?: CSSProperties['justifyContent'];
	alignItems?: CSSProperties['alignItems'];
	templateAreas?: CSSProperties['gridTemplateAreas'];
	templateColumns?: CSSProperties['gridTemplateColumns'];
	templateRows?: CSSProperties['gridTemplateRows'];
	children?: ReactNode;
	padding?: string | number;
	margin?: string | number;
	elevation?: 0 | 1 | 2 | 3;
	gridArea?: string;
	isPaper?: boolean;
	role?: HTMLAttributes<HTMLDivElement>['role'];
	hidden?: HTMLAttributes<HTMLDivElement>['hidden'];
	borderRadius?: 'small' | 'medium' | 'large' | 'borderRadius';
	style?: CSSProperties;
	id?: string;
};

const containerVariants = cva('container', {
	variants: {
		variant: {
			flex: 'flex',
			grid: 'grid',
		},
		direction: {
			row: 'flex-row',
			column: 'flex-col',
		},
		elevation: {
			0: 'shadow-none',
			1: 'shadow-sm',
			2: 'shadow',
			3: 'shadow-lg',
		},
		borderRadius: {
			small: 'rounded-sm',
			medium: 'rounded-md',
			large: 'rounded-lg',
			borderRadius: 'rounded',
		},
		isPaper: {
			true: 'bg-white', // Предполагаем, что тема задается с белым фоном для "бумаги"
			false: 'bg-transparent',
		},
	},
	defaultVariants: {
		variant: 'flex',
		direction: 'row',
		elevation: 0,
		borderRadius: 'borderRadius',
		isPaper: false,
	},
});

export const Container = forwardRef<HTMLDivElement, ContainerProps>(
	(
		{
			variant,
			direction,
			gap = 2,
			width,
			height,
			justifyContent,
			alignItems,
			templateAreas,
			templateColumns,
			templateRows,
			gridArea,
			padding,
			margin,
			elevation,
			borderRadius,
			isPaper,
			children,
			...props
		},
		ref,
	) => {
		return (
			<div
				ref={ref}
				className={cn(
					containerVariants({
						variant,
						direction,
						elevation,
						borderRadius,
						isPaper,
					}),
					gap && `gap-${gap}`,
					justifyContent && `justify-${justifyContent}`,
					alignItems && `items-${alignItems}`,
					templateAreas && `grid-areas-${templateAreas}`,
					templateColumns && `grid-cols-${templateColumns}`,
					templateRows && `grid-rows-${templateRows}`,
					gridArea && `grid-area-${gridArea}`,
				)}
				style={{
					width,
					height,
					padding,
					margin,
				}}
				{...props}
			>
				{children}
			</div>
		);
	},
);

Container.displayName = 'Container';
