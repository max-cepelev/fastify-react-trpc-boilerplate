import { FormTextField, type SubmitHandler } from '@ui/form';
import {
	Button,
	Card,
	CardContent,
	CardFooter,
	CardHeader,
	CardTitle,
	Form,
} from '@ui/lib';
import { useAuth } from '../hooks';
import { type RegisterSchema, useRegisterForm } from './hooks';

export function RegisterForm() {
	const form = useRegisterForm();
	const { registration, isRegistrationPending } = useAuth();

	const onSubmitHandler: SubmitHandler<RegisterSchema> = (values) => {
		registration({
			email: values.email,
			password: values.password,
		});
	};
	return (
		<Card>
			<Form {...form}>
				<form onSubmit={form.handleSubmit(onSubmitHandler)}>
					<CardHeader>
						<CardTitle className='text-center'>Регистрация</CardTitle>
						{/* <CardDescription>
          Change your password here. After saving, you'll be logged out.
        </CardDescription> */}
					</CardHeader>
					<CardContent className='space-y-2'>
						<FormTextField
							control={form.control}
							name={'email'}
							type='email'
							autoComplete='email'
							label='Email'
						/>
						<FormTextField
							control={form.control}
							name='password'
							type='password'
							autoComplete='new-password'
							label='Пароль'
						/>
						<FormTextField
							control={form.control}
							name='passwordConfirm'
							type='password'
							autoComplete='new-password'
							label='Подтвердите пароль'
						/>
					</CardContent>
					<CardFooter>
						<Button isLoading={isRegistrationPending} className='w-full'>
							Зарегистрироваться
						</Button>
					</CardFooter>
				</form>
			</Form>
		</Card>
	);
}
