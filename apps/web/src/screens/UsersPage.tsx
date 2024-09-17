import { trpc } from '@shared/services';
import { Container, DataGrid, type GridColumns } from '@ui/components';

export default function Users() {
	const { data: users = [], isLoading } = trpc.users.list.useQuery();
	const columns: GridColumns<(typeof users)[0]> = [
		{
			title: 'Имя',
			key: 'name',
		},
		{
			title: 'Email',
			align: 'center',
			component: (row) => (
				<a target='_blank' rel='noreferrer' href={`mailto:${row.email}`}>
					{row.email}
				</a>
			),
		},
		{
			title: 'Телефон',
			key: 'phone',
			align: 'center',
		},

		{
			title: 'Права',
			align: 'center',
			getCellValue: (row) => row.permissions.join(', '),
		},
	];
	return (
		<Container
			direction='column'
			gap={3}
			templateRows='63px calc(100% - 75px)'
			height='100%'
			templateColumns='1fr'
		>
			<h6 style={{ flexGrow: 1, lineHeight: 8 }}>Пользователи</h6>
			<DataGrid
				rows={users}
				columns={columns}
				getRowId={(row) => row.id}
				isLoading={isLoading}
				isEmpty={users.length === 0}
			/>
		</Container>
	);
}
