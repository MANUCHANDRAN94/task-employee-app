import './dashboard.css';
import React, { useState, useEffect, useMemo } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import TableContainer from '../../component/dataTable/TableContainer';

function Dashboard() {
	const [data, setData] = useState([]);
	const [reloadFlag, setReloadFlag] = useState([]);

	useEffect(() => {
		axios
			.get('/employees')
			.then((res) => {
				const rawData = res.data.list || [];
				const tableData = rawData.map((currentDoc) => {
					return {
						user: {
							name:
								currentDoc.contactInfo.firstName +
								currentDoc.contactInfo.middleName +
								currentDoc.contactInfo.lastName,
							id: currentDoc._id,
						},
						orgName: currentDoc.name,
						type: currentDoc.beType,
						role: currentDoc.role,
						email: currentDoc.contactInfo.email,
						action: currentDoc._id,
					};
				});
				setData(tableData);
			})
			.catch((err) => console.log(err));
	}, [reloadFlag]);

	const columns = useMemo(
		() => [
			{
				Header: 'User Name',
				accessor: 'user',
				Cell: ({ cell: { value } }) =>
					value ? (
						<a href={'/employees/' + value.id}>
							<span>{value.name}</span>
						</a>
					) : (
						'-'
					),
			},
			{
				Header: 'Org Name',
				accessor: 'orgName',
			},
			{
				Header: 'Type',
				accessor: 'type',
			},
			{
				Header: 'Role',
				accessor: 'role',
				Cell: ({ cell: { value } }) => (value ? value.toString() : '-'),
			},
			{
				Header: 'Email',
				accessor: 'email',
				Cell: ({ cell: { value } }) => value || '-',
			},
			{
				width: 300,
				Header: 'Action',
				accessor: 'action',
				Cell: ({ cell: { value } }) => (
					<div className='dashboard-button-group'>
						<button type='button' onClick={() => deleteEmployee(value)}>
							Delete
						</button>
					</div>
				),
			},
			// {
			// 	Header: 'Phone',
			// 	accessor: 'show.officialSite',
			// 	Cell: ({ cell: { value } }) =>
			// 		value ? <a href={value}>{value}</a> : '-',
			// },
			// {
			// 	Header: 'Address',
			// 	accessor: 'show.rating.average',
			// 	Cell: ({ cell: { value } }) => value || '-',
			// },
		],
		[],
	);

	function deleteEmployee(userId) {
		axios
			.delete('/employees/' + userId)
			.then((res) => {
				const rawData = res.data;
				setReloadFlag(!reloadFlag);
				console.log(rawData);
			})
			.catch((err) => console.log(err));
	}

	return (
		<div className='App'>
			<h1>
				<center>React Table Demo</center>
			</h1>
			<TableContainer columns={columns} data={data} />
		</div>
	);
}

export default Dashboard;
