import { notification } from '@shared/services';
import {
	Button,
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
	InputOTP,
	InputOTPGroup,
	InputOTPSeparator,
	InputOTPSlot,
} from '@ui/lib';
import { useState } from 'react';
import { useAuth } from '../hooks';

export function ConfirmationCard() {
	const [code, setCode] = useState('');
	const { confirmRegistration } = useAuth();
	const handleChangeCode = (code: string) => {
		setCode(code);
	};

	const handleSendCode = () => {
		if (code.length === 6) {
			confirmRegistration({ code });
		} else {
			notification.error('Код должен состоять из 6 цифр');
		}
	};
	return (
		<Card>
			<CardHeader>
				<CardTitle className='text-center'>Код подтверждения</CardTitle>
				<CardDescription>
					Введите код подтверждения, отправленный на вашу почту
				</CardDescription>
			</CardHeader>
			<CardContent className='flex justify-center'>
				<InputOTP maxLength={6} value={code} onChange={handleChangeCode}>
					<InputOTPGroup>
						<InputOTPSlot index={0} />
						<InputOTPSlot index={1} />
						<InputOTPSlot index={2} />
					</InputOTPGroup>
					<InputOTPSeparator />
					<InputOTPGroup>
						<InputOTPSlot index={3} />
						<InputOTPSlot index={4} />
						<InputOTPSlot index={5} />
					</InputOTPGroup>
				</InputOTP>
			</CardContent>
			<CardFooter>
				<Button onClick={handleSendCode} className='w-full'>
					Отправить
				</Button>
			</CardFooter>
		</Card>
	);
}
