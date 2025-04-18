import { UserOutlined } from '@ant-design/icons';
import { Link, Outlet } from 'react-router';
import './index.css';
import { useState } from 'react';

export function Index() {
	const [refreshKey, setRefreshKey] = useState(0);
	const handleNavigateHome = () => {
		setRefreshKey((prevKey) => prevKey + 1);
	};

	return (
		<div id='index-container' key={refreshKey}>
			<div className='header'>
				<Link to='/' className='sys_name' onClick={handleNavigateHome}>
					<h1>会议室预定系统-后台管理</h1>
				</Link>
				<Link to='/user/info_modify'>
					<UserOutlined className='icon' />
				</Link>
			</div>

			<div className='body'>
				<Outlet></Outlet>
			</div>
		</div>
	);
}
