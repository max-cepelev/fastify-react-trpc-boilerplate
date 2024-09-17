import { useAuthStore } from '@shared/stores';
import {
	Avatar,
	AvatarFallback,
	AvatarImage,
	Command,
	CommandEmpty,
	CommandGroup,
	CommandInput,
	CommandItem,
	CommandList,
	CommandSeparator,
	CommandShortcut,
	Separator,
} from '@ui/lib';
import {
	Calculator,
	Calendar,
	CreditCard,
	Settings,
	Smile,
	User,
} from 'lucide-react';

export const Sidebar = () => {
	const user = useAuthStore((store) => store.user);
	return (
		<div className='flex relative flex-col gap-2 h-full w-full p-2 bg-gray-100 '>
			{/* <Avatar>
        <AvatarImage src='https://github.com/shadcn.png' alt='@shadcn' />
        <AvatarFallback>
          {(user?.name?.[0] || 'S').toUpperCase()}
        </AvatarFallback>
      </Avatar> */}
			<Command className='rounded-lg border shadow-md w-full'>
				{/* <CommandInput placeholder='' /> */}
				<CommandList>
					<CommandEmpty>No results found.</CommandEmpty>
					<CommandGroup heading='Suggestions'>
						<CommandItem>
							<Calendar className='mr-2 h-4 w-4' />
							<span>Calendar</span>
						</CommandItem>
						<CommandItem>
							<Smile className='mr-2 h-4 w-4' />
							<span>Search Emoji</span>
						</CommandItem>
						<CommandItem disabled>
							<Calculator className='mr-2 h-4 w-4' />
							<span>Calculator</span>
						</CommandItem>
					</CommandGroup>
					<CommandSeparator />
					<CommandGroup heading='Settings'>
						<CommandItem content=''>
							<User className='mr-2 h-4 w-4' />
							<span>Профиль</span>
							<CommandShortcut>⌘P</CommandShortcut>
						</CommandItem>
						<CommandItem>
							<CreditCard className='mr-2 h-4 w-4' />
							<span>Оплата</span>
							<CommandShortcut>⌘B</CommandShortcut>
						</CommandItem>
						<CommandItem>
							<Settings className='mr-2 h-4 w-4' />
							<span>Настройки</span>
							<CommandShortcut>⌘S</CommandShortcut>
						</CommandItem>
					</CommandGroup>
				</CommandList>
			</Command>
			<Separator className='absolute bottom-0 right-0' orientation='vertical' />
		</div>
	);
};
