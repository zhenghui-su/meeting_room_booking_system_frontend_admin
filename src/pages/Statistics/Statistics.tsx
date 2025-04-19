import { Button, DatePicker, Form, message, Select } from 'antd';
import * as echarts from 'echarts';
import './statistics.css';
import { useEffect, useRef, useState } from 'react';
import dayjs from 'dayjs';
import {
	meetingRoomUsedCount,
	userBookingCount,
} from '../../interfaces/interfaces';
import { useForm } from 'antd/es/form/Form';

interface UserBookingData {
	userId: string;
	username: string;
	bookingCount: string;
}
interface MeetingRoomUsedData {
	meetingRoomName: string;
	meetingRoomId: number;
	usedCount: string;
}
export function Statistics() {
	const [userBookingData, setUserBookingData] = useState<UserBookingData[]>();
	const [meetingRoomUsedData, setMeetingRoomUsedData] =
		useState<MeetingRoomUsedData[]>();

	const containerRef = useRef(null);
	const containerRef2 = useRef(null);
	async function getStatisticData(values: {
		startTime: string;
		endTime: string;
	}) {
		const startTime = dayjs(values.startTime).format('YYYY-MM-DD');
		const endTime = dayjs(values.endTime).format('YYYY-MM-DD');

		const res = await userBookingCount(startTime, endTime);
		const { data } = res.data;
		if (res.status === 200 || res.status === 201) {
			setUserBookingData(data);
		} else {
			message.error(data || '系统繁忙, 请稍后重试');
		}

		const res2 = await meetingRoomUsedCount(startTime, endTime);
		const { data: data2 } = res2.data;
		if (res2.status === 200 || res2.status === 201) {
			setMeetingRoomUsedData(data2);
		} else {
			message.error(data2 || '系统繁忙, 请稍后重试');
		}
	}

	useEffect(() => {
		const myChart = echarts.init(containerRef.current);
		if (!userBookingData) {
			return;
		}
		myChart.setOption({
			title: {
				text: '用户预订情况',
			},
			tooltip: {},
			xAxis: {
				data: userBookingData.map((item) => item.username),
			},
			yAxis: {},
			series: [
				{
					name: '预订次数',
					type: form.getFieldValue('chartType'),
					data: userBookingData.map((item) => {
						return {
							name: item.username,
							value: item.bookingCount,
						};
					}),
				},
			],
		});
	}, [userBookingData]);

	useEffect(() => {
		const myChart = echarts.init(containerRef2.current);
		if (!meetingRoomUsedData) {
			return;
		}
		myChart.setOption({
			title: {
				text: '会议室使用情况',
			},
			tooltip: {},
			xAxis: {
				data: meetingRoomUsedData.map((item) => item.meetingRoomName),
			},
			yAxis: {},
			series: [
				{
					name: '使用次数',
					type: form.getFieldValue('chartType'),
					data: meetingRoomUsedData.map((item) => {
						return {
							name: item.meetingRoomName,
							value: item.usedCount,
						};
					}),
				},
			],
		});
	}, [meetingRoomUsedData]);
	const [form] = useForm();

	return (
		<div id='statistics-container'>
			<div className='statistics-form'>
				<Form
					form={form}
					onFinish={getStatisticData}
					name='search'
					layout='inline'
					colon={false}
				>
					<Form.Item label='开始日期' name='startTime'>
						<DatePicker />
					</Form.Item>

					<Form.Item label='结束日期' name='endTime'>
						<DatePicker />
					</Form.Item>

					<Form.Item label='图表类型' name='chartType' initialValue={'bar'}>
						<Select>
							<Select.Option value='pie'>饼图</Select.Option>
							<Select.Option value='bar'>柱形图</Select.Option>
						</Select>
					</Form.Item>

					<Form.Item>
						<Button type='primary' htmlType='submit'>
							查询
						</Button>
					</Form.Item>
				</Form>
			</div>
			<div className='statistics-chart' ref={containerRef}></div>
			<div className='statistics-chart' ref={containerRef2}></div>
		</div>
	);
}
