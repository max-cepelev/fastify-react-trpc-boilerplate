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
import { TelegramLoginButton } from '../TelegramLoginButton';
import { useAuth } from '../hooks';
import { type LoginSchema, useLoginForm } from './hooks';

export function LoginForm() {
	const form = useLoginForm();
	const { login, isLoginPending } = useAuth();

	const onSubmitHandler: SubmitHandler<LoginSchema> = (values) => {
		login(values);
	};
	return (
		<Card>
			<Form {...form}>
				<form onSubmit={form.handleSubmit(onSubmitHandler)}>
					<CardHeader>
						<CardTitle className='text-center'>Вход</CardTitle>
						{/* <CardDescription>
      Make changes to your account here. Click save when you're done.
    </CardDescription> */}
					</CardHeader>
					<CardContent className='space-y-2'>
						<FormTextField
							name='email'
							label='Email'
							type='email'
							placeholder='email@example.ru'
							control={form.control}
							autoComplete='email'
						/>
						<FormTextField
							name='password'
							label='Пароль'
							type='password'
							control={form.control}
							placeholder='Введите пароль'
							autoComplete='current-password'
						/>
					</CardContent>
					<CardFooter className='flex-col gap-1'>
						<Button isLoading={isLoginPending} type='submit' className='w-full'>
							Войти
						</Button>
						{/* <TelegramLoginButton
              className='w-full'
              botName={'NutrimeterBot'}
              dataAuthUrl='http://localhost/auth/telegram'
            /> */}
					</CardFooter>
				</form>
			</Form>
		</Card>
	);
}
