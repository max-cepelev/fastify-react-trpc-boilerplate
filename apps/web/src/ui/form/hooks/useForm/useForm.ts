import {
	type UseFormProps,
	type UseFormReturn,
	useForm as useRHForm,
} from 'react-hook-form';

import type { FieldValues } from '../../types';

export const useForm = <
	TFieldValues extends FieldValues = FieldValues,
	// eslint-disable-next-line
	TContext = unknown,
>({
	mode = 'onBlur',
	...params
}: UseFormProps<TFieldValues, TContext> = {}): UseFormReturn<
	TFieldValues,
	TContext
> => useRHForm({ ...params, mode });

export type { UseFormProps, UseFormReturn };
