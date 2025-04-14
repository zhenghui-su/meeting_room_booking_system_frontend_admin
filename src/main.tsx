import { createRoot } from 'react-dom/client';
import './index.css';
import '@ant-design/v5-patch-for-react-19';
import { RouterProvider, createBrowserRouter } from 'react-router';
import { Index } from './pages/Index/Index';
import { ErrorPage } from './pages/ErrorPage/ErrorPage';
import { UserManage } from './pages/UserManage/UserManage';
import { Login } from './pages/Login/Login';
import { Menu } from './pages/Menu/Menu';
import { ModifyMenu } from './pages/ModifyMenu/ModifyMenu';
import { InfoModify } from './pages/InfoModify/InfoModify';
import { PasswordModify } from './pages/PasswordModify/PasswordModify';

const routes = [
	{
		path: '/',
		element: <Index></Index>,
		errorElement: <ErrorPage />,
		children: [
			{
				path: '/',
				element: <Menu></Menu>,
				children: [
					{
						path: 'user_manage',
						element: <UserManage />,
					},
				],
			},
			{
				path: '/user',
				element: <ModifyMenu></ModifyMenu>,
				children: [
					{
						path: 'info_modify',
						element: <InfoModify />,
					},
					{
						path: 'password_modify',
						element: <PasswordModify />,
					},
				],
			},
		],
	},
	{
		path: 'login',
		element: <Login />,
	},
];

export const router = createBrowserRouter(routes);

const root = createRoot(document.getElementById('root')!);

root.render(<RouterProvider router={router} />);
