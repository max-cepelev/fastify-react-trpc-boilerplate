import { Button, Separator } from '@ui/lib';
import { Bell } from 'lucide-react';

export const Header = () => {
	return (
		<div className='flex gap-3 p-2 justify-end h-full w-full'>
			<Button variant='ghost' size='icon'>
				<Bell className='h-4 w-4' />
			</Button>
		</div>
	);
};
