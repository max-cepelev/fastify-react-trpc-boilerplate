import styles from './DataGridState.module.css';

export const Container = ({ children }: { children: React.ReactNode }) => (
	<li className={styles.container}>{children}</li>
);
