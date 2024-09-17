import type { ControllerFieldState } from 'react-hook-form';

type UseFormFieldErrorPropsReturn = {
	error: boolean;
	helperText?: string | null;
};

/**
 * @description хук предназначен для предоставления пропсов для отображения ошибки field
 */
export const useFormFieldErrorProps = (
	fieldState: Pick<ControllerFieldState, 'error'>,
): UseFormFieldErrorPropsReturn => {
	const { error } = fieldState;

	if (error) {
		return {
			error: true,
			helperText: error?.message,
		};
	}

	return {
		error: false,
		helperText: '',
	};
};
