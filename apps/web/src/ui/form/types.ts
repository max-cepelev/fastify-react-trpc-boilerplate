import type { UseControllerProps } from 'react-hook-form';

/**
 * @description Добавляет к переданным пропсам типы для react-hook-form. Позволяет переиспользовать логику типизации для филдов формы.
 * @example WithFormFieldProps<TextFieldProps, FieldValues>;
 */
export type WithFormFieldProps<
	Props extends object,
	FieldValues extends object,
> = Omit<Props, 'name' | 'error'> &
	Omit<UseControllerProps<FieldValues>, 'rules'>;

export type {
	ControllerProps as FormControllerProps,
	Field as FormField,
	FieldArray as FormFieldArray,
	FieldArrayPath as FormFieldArrayPath,
	FieldArrayWithId as FormFieldArrayWithId,
	FieldError as FormFieldError,
	FieldErrors as FormFieldErrors,
	FieldPath as FormFieldPath,
	FieldValues as FormFieldValues,
	Path as FormPath,
	RegisterOptions as FormRegisterOptions,
	Resolver as FormResolver,
	UseControllerProps as UseFormControllerProps,
	UseFormGetValues,
	UseWatchProps as UseFormWatchProps,
	FieldValues,
	SubmitHandler,
} from 'react-hook-form';
