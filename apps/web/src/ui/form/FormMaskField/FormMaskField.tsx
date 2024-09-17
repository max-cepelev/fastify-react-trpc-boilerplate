// import { MaskField, MaskFieldProps } from '@ui/components'
// import { type WithFormFieldProps } from '../types'
// import { FormController } from '../external'

// export type FormMaskFieldProps<FieldValues extends object> = WithFormFieldProps<
//   MaskFieldProps,
//   FieldValues
// >

// export function FormMaskField<T extends object>({
//   name,
//   control,
//   ref,
//   ...props
// }: FormMaskFieldProps<T>) {
//   return (
//     <FormController
//       control={control}
//       name={name}
//       render={({ field, fieldState }) => (
//         <MaskField
//           {...props}
//           {...field}
//           error={!!fieldState.error}
//           helperText={fieldState.error?.message}
//         />
//       )}
//     />
//   )
// }
