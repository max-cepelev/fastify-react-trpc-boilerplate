import { Container } from './styles';

export function DataGridState({
	noDataText = 'Нет данных',
	noDataImgSrc,
	isLoading,
	isEmpty,
}: {
	noDataText?: string;
	isLoading?: boolean;
	isEmpty?: boolean;
	noDataImgSrc?: string;
}) {
	if (isLoading) {
		return (
			<Container>
				<p>Загрузка...</p>
			</Container>
		);
	}

	if (isEmpty) {
		return (
			<Container>
				{noDataImgSrc && <img src={noDataImgSrc} alt='' />}
				<p>{noDataText}</p>
			</Container>
		);
	}

	return null;
}
