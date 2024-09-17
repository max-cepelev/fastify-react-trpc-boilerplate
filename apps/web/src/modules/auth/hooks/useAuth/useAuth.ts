import { useLocation, useNavigate } from '@shared/hooks';
import { localStorageService, notification, trpc } from '@shared/services';
import { useAuthStore } from '@shared/stores';
import { useQueryClient } from '@tanstack/react-query';

export function useAuth() {
	const queryClient = useQueryClient();
	const location = useLocation();
	const navigate = useNavigate();
	const setUser = useAuthStore((store) => store.setUser);

	const {
		mutate: initUser,
		isLoading: isInitPending,
		isSuccess: isInitSuccess,
	} = trpc.users.init.useMutation({
		onSuccess(response) {
			setUser(response);
			navigate(location);
		},
	});

	const { mutate: login, isLoading: isLoginPending } =
		trpc.auth.login.useMutation({
			onSuccess: (data) => {
				localStorageService.setToken(data.token);
				navigate('/');
			},
			onError(error) {
				notification.error(error.message);
			},
		});

	const { mutate: registration, isLoading: isRegistrationPending } =
		trpc.auth.registration.useMutation({
			onSuccess() {
				navigate('/confirmation');
				// successNotice(response.data.message)
			},
			onError(error) {
				notification.error(error.message);
			},
		});

	const { mutate: confirmRegistration, isLoading: isConfirmationPending } =
		trpc.auth.confirmRegistration.useMutation({
			onSuccess: (data) => {
				localStorageService.setToken(data.token);
				navigate('/');
			},
			onError(error) {
				notification.error(error.message);
			},
		});

	const { mutate: logout } = trpc.auth.logout.useMutation({
		onSuccess() {
			setUser(null);
			queryClient.clear();
			localStorageService.removeToken();
			navigate('/login');
		},
	});

	return {
		login,
		registration,
		isRegistrationPending,
		isLoginPending,
		confirmRegistration,
		isConfirmationPending,
		initUser,
		isInitPending,
		isInitSuccess,
		logout,
	};
}
