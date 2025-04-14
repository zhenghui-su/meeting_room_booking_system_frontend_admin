import { createRoot } from 'react-dom/client';
import './index.css';
import '@ant-design/v5-patch-for-react-19';
import { RouterProvider, createBrowserRouter } from 'react-router';
import { Index } from './pages/Index/Index';
import { ErrorPage } from './pages/ErrorPage/ErrorPage';
import { UserManage } from './pages/UserManage/UserManage';
import { Login } from './pages/Login/Login';
import { Menu } from './pages/Menu/Menu';

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
		],
	},
	{
		path: 'login',
		element: <Login />,
	},
];

const router = createBrowserRouter(routes);

const root = createRoot(document.getElementById('root')!);

root.render(<RouterProvider router={router} />);
