import { useFoldersTreeQuery } from '@data/hooks';
import { FoldersList } from '@modules/folders';
import {
	MemoryUsageIndicator,
	UpdateAppButton,
	UserSidebarButton,
} from '@modules/users';
import { useAuthStore, useSettingsStore } from '@shared/stores';
import { Icon, RouterLink, SideBarContainer, mdiDelete } from '@shared/ui';

export function SideBar() {
	const user = useAuthStore((store) => store.user);
	const fixed = useSettingsStore((store) => store.sidebarFixed);
	const setFixed = useSettingsStore((store) => store.setSidebarFixed);
	const { data = [] } = useFoldersTreeQuery(!user);
	return (
		<SideBarContainer fixed={fixed} onClickOutside={() => setFixed(false)}>
			<UserSidebarButton user={user} />
			<FoldersList folders={data} />
			<RouterLink className='link' to='/trash' style={{ paddingLeft: 6 }}>
				<Icon path={mdiDelete} color={'rgba(55, 53, 47, 0.35)'} size='18px' />
				<span className='text'>Корзина</span>
			</RouterLink>
			<UpdateAppButton />
			<MemoryUsageIndicator />
		</SideBarContainer>
	);
}
