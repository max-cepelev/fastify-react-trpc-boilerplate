import type { UserPermissions } from '@shared/enums';
import { useLocation } from '@shared/hooks';
import { useAuthStore } from '@shared/stores';
import { Navigate } from 'react-router-dom';

interface ProtectedRouteProps {
	permission: UserPermissions;
	page: React.JSX.Element;
}

export function ProtectedRoute({ page, permission }: ProtectedRouteProps) {
	const location = useLocation();
	const user = useAuthStore((store) => store.user);
	if (!user) {
		return <Navigate state={{ from: location }} to='/login' replace />;
	}
	// if (!user.isActivated) {
	//   return <Navigate to='/no-activate' state={{ from: location }} replace />
	// }
	if (user.isAdmin || user.permissions.includes(permission)) {
		return page;
	}

	return <Navigate to='/no-access' replace />;
}
