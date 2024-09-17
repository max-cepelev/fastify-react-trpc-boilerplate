import {
	FormControl,
	FormDescription,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
	Input,
	type InputProps,
} from '@ui/lib';
import type { WithFormFieldProps } from '../types';

export type FormTextFieldProps<FieldValues extends object> = WithFormFieldProps<
	InputProps,
	FieldValues
> & {
	label?: string;
	description?: string;
};

export function FormTextField<T extends object>(props: FormTextFieldProps<T>) {
	return (
		<FormField
			control={props.control}
			name={props.name}
			render={({ field }) => (
				<FormItem>
					{props.label && <FormLabel>{props.label}</FormLabel>}
					<FormControl>
						<Input {...props} {...field} />
					</FormControl>
					{props.description && (
						<FormDescription>{props.description}</FormDescription>
					)}
					<FormMessage />
				</FormItem>
			)}
		/>
	);
}
