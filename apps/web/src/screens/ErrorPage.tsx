import { Container, RouterLink } from '@ui/components';

export default function ErrorPage() {
	return (
		<Container
			height='clamp(350px, 100svh, 100vh)'
			justifyContent='center'
			alignItems='center'
		>
			<Container
				width='35%'
				justifyContent='center'
				alignItems='center'
				height='100%'
				direction='column'
				padding={0}
			>
				<h2 style={{ fontWeight: 'bold' }}>404</h2>
				<p>Страницы не существует</p>
				<RouterLink to={'/'}>На главную</RouterLink>
			</Container>
		</Container>
	);
}
