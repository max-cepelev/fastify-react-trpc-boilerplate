import { clsx } from 'clsx';
import type { AlignVariant } from '../types';
import styles from './Cell.module.css';

export const Container = (props: {
	align?: AlignVariant;
	isDisabled?: boolean;
	isComponent?: boolean;
	backgroundColor?: string;
	children: React.ReactNode;
	rowHeight: number;
	className?: string;
}) => {
	return (
		<div
			onClick={(e) => props.isComponent && e.stopPropagation()}
			onKeyDown={(e) => props.isComponent && e.stopPropagation()}
			style={{
				minHeight: props.rowHeight,
				backgroundColor: props.backgroundColor,
			}}
			className={clsx(
				styles.root,
				styles[props.align ?? 'left'],
				props.className,
				{
					disabled: props.isDisabled,
				},
			)}
		>
			{props.children}
		</div>
	);
};
