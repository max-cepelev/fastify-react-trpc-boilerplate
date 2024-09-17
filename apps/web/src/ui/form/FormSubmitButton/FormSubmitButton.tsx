import { Button, type ButtonProps } from '@ui/lib';
import { useFormContext } from '../hooks';

export type FormSubmitButtonProps = Omit<ButtonProps, 'type'> & {
	loading?: boolean;
};

/**
 * @description Используется для форм, отображает состояние загрузки, когда форма isSubmitting
 */
export const FormSubmitButton = ({
	children,
	loading,
}: FormSubmitButtonProps) => {
	const { formState } = useFormContext();

	if (Object.keys(formState.errors).length) {
		console.log(formState.errors);
	}
	return (
		<Button type='submit' isLoading={loading || formState.isSubmitting}>
			{children}
		</Button>
	);
};
