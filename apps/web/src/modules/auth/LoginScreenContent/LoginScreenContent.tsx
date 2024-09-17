import { Tabs, TabsContent, TabsList, TabsTrigger } from '@ui/lib';
import { LoginForm } from '../LoginForm';
import { RegisterForm } from '../RegisterForm';

export function LoginScreenContent() {
	return (
		<Tabs defaultValue='login' className='w-[400px]'>
			<TabsList className='grid w-full grid-cols-2'>
				<TabsTrigger value='login'>Вход</TabsTrigger>
				<TabsTrigger value='register'>Регистрация</TabsTrigger>
			</TabsList>
			<TabsContent value='login'>
				<LoginForm />
			</TabsContent>
			<TabsContent value='register'>
				<RegisterForm />
			</TabsContent>
		</Tabs>
	);
}
