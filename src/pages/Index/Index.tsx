import { Outlet } from 'react-router';

export function Index() {
	return (
		<div>
			Index<Outlet></Outlet>
		</div>
	);
}
