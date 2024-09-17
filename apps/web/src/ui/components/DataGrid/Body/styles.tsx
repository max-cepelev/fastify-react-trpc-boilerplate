import type { StyledComponent } from '@ui/components';

export const Container = (props: StyledComponent<HTMLDivElement>) => (
	<div {...props}>{props.children}</div>
);
