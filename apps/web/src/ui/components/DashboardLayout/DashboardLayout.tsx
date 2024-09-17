import clsx from 'clsx';
import styles from './DashboardLayout.module.css';

type DashboardLayoutProps = {
	main: React.ReactNode;
	sidebar?: React.ReactNode;
	header?: React.ReactNode;
	isOpen?: boolean;
};
export const DashboardLayout = ({
	main,
	sidebar,
	header,
	isOpen = false,
}: DashboardLayoutProps) => {
	return (
		<div
			className={clsx({
				[styles.container]: true,
				[styles.withSidebar]: Boolean(sidebar),
				[styles.withHeader]: Boolean(header),
				[styles.open]: isOpen,
			})}
		>
			{header && <header className={styles.header}>{header}</header>}
			{sidebar && <aside className={styles.sidebar}>{sidebar}</aside>}
			<main className={styles.main}>{main}</main>
		</div>
	);
};
