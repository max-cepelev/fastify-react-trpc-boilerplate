import { create } from 'zustand';
import { devtools } from 'zustand/middleware';

type User = {
	email: string | null;
	fileSizeLimit: number;
	id: string;
	isAdmin: boolean;
	name: string | null;
	phone: string | null;
	username: string;
};

interface AuthStore {
	user: User | null;
	ready: boolean;
	isAdmin: boolean;
}

interface AuthStoreActions {
	setUser: (user: User | null) => void;
}

export const useAuthStore = create(
	devtools<AuthStore & AuthStoreActions>(
		(set) => ({
			user: null,
			ready: false,
			isAdmin: false,
			setUser(user) {
				set({
					user,
					ready: true,
					isAdmin: user?.isAdmin || false,
				});
			},
		}),
		{ name: 'auth' },
	),
);
