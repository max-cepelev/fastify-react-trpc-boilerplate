export default function NoActivate() {
	return (
		<div
			style={{
				margin: '60px auto',
				height: '50vh',
				width: '60vw',
				display: 'flex',
				justifyContent: 'center',
				alignItems: 'center',
			}}
		>
			<h6 style={{ textAlign: 'center', fontStyle: 'italic' }}>
				Ваша учетная запись не активирована.
				<br /> Мы проверим ваши данные и отправим ссылку для активации вам на
				почту.
				<br />
				Если письмо долго не приходит, напиште нам на почту{' '}
				<a href='email:info@permnovostroy.ru'>info@permnovostroy.ru</a>
			</h6>
		</div>
	);
}
