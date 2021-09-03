import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { FormGroup } from 'reactstrap';
import { useParams, useHistory } from 'react-router-dom';
import { Link } from 'react-router-dom';

import axios from 'axios';

// import './form.css';

export default function Form() {
	const { id: userId } = useParams();
	const isAddMode = !userId;
	const history = useHistory();
	const { register, handleSubmit, reset, setValue, formState, errors } =
		useForm({
			mode: 'onChange',
		});
	const [data, setData] = useState([]);

	useEffect(() => {
		if (!isAddMode) {
			axios
				.get('/employees/' + userId)
				.then((res) => {
					setData(res.data);
				})
				.catch((err) => console.log(err));
		}
	}, []);

	const onSubmit = (data) => {
		const {
			key,
			orgName,
			beType,
			role,
			firstName,
			middleName,
			lastName,
			givenName,
			email,
			mobile,
			addrType,
			line1,
			line2,
			city,
			state,
			country,
			pin,
		} = data;
		const payloadData = {
			key,
			name: orgName,
			beType,
			role,
			contactInfo: {
				firstName,
				middleName,
				lastName,
				givenName,
				email,
				phone: mobile,
			},
			address: [
				{
					addrType,
					addrLine1: line1,
					addrLine2: line2,
					city,
					state,
					country,
					postalCode: pin,
				},
			],
		};

		return isAddMode
			? createUser(payloadData)
			: updateUser(userId, payloadData);
	};

	function createUser(data) {
		axios
			.post('/employees', data)
			.then(function (response) {
				history.push('/dashboard');
				alert('Successfully created');
			})
			.catch(function (error) {
				alert(error.message);
			});
	}

	function updateUser(id, data) {
		axios
			.put('/employees/' + id, data)
			.then(function (response) {
				history.push('/dashboard');
				alert('Success Update');
			})
			.catch(function (error) {
				alert(error.message);
			});
	}

	useEffect(() => {
		if (!isAddMode) {
			// get user and set form fields
			setValue('key', data.key);
			setValue('orgName', data.name);
			setValue('beType', data.beType);
			setValue('role', data.role);
			setValue('firstName', data.contactInfo?.firstName);
			setValue('middleName', data.contactInfo?.middleName);
			setValue('lastName', data.contactInfo?.lastName);
			setValue('givenName', data.contactInfo?.givenName);
			setValue('email', data.contactInfo?.email);
			setValue('mobile', data.contactInfo?.phone);
			data.address?.forEach((element) => {
				setValue('addrType', element.addrType);
				setValue('line1', element.addrLine1);
				setValue('line2', element.addrLine2);
				setValue('city', element.city);
				setValue('state', element.state);
				setValue('country', element.county);
				setValue('pin', element.postalCode);
			});
		}
	}, [data]);

	return (
		<form onSubmit={handleSubmit(onSubmit)} onReset={reset}>
			<h1>{isAddMode ? 'Add User' : 'Edit User'}</h1>
			<div className='form-row'>
				<div className='form-group col-5'>
					<label>Key</label>
					<input
						type='text'
						name='key'
						// defaultValue={data.key}
						{...register('key', { required: true })}
						className={`form-control ${errors?.key ? 'is-invalid' : ''}`}
					/>
					<div className='invalid-feedback'>{errors?.key?.message}</div>
				</div>

				<div className='form-group col-5'>
					<label>Org Name</label>
					<input
						type='text'
						name='orgName'
						// defaultValue={data.name}
						{...register('orgName', { required: true })}
						className={`form-control ${errors?.orgName ? 'is-invalid' : ''}`}
					/>
					<div className='invalid-feedback'>{errors?.orgName?.message}</div>
				</div>
			</div>

			<div className='form-row'>
				<div className='form-group col'>
					<label>BeType</label>
					<select
						name='beType'
						// defaultValue={data.beType}
						{...register('beType', { required: true })}
						className={`form-control ${errors?.beType ? 'is-invalid' : ''}`}
					>
						<option value='Company'>Company</option>
						<option value='Person'>Person</option>
					</select>
					<div className='invalid-feedback'>{errors?.beType?.message}</div>
				</div>

				<div className='form-group col'>
					<label>Role</label>
					<select
						name='role'
						// defaultValue={data.role}
						{...register('role', { required: true })}
						className={`form-control ${errors?.role ? 'is-invalid' : ''}`}
					>
						<option value='PRODUCER'>PRODUCER</option>
						<option value='SHIPPER'>SHIPPER</option>
					</select>
					<div className='invalid-feedback'>{errors?.role?.message}</div>
				</div>
			</div>

			<label>Contact Info</label>
			<FormGroup>
				<div className='form-row'>
					<div className='form-group col-5'>
						<label>First Name</label>
						<input
							type='text'
							name='firstName'
							// defaultValue={data.contactInfo?.firstName || ''}
							className={`form-control ${
								errors?.firstName ? 'is-invalid' : ''
							}`}
						/>
						<div className='invalid-feedback'>{errors?.firstName?.message}</div>
					</div>
					{/* Middle Name */}
					<div className='form-group col-5'>
						<label>Middle name</label>
						<input
							type='text'
							name='middleName'
							// defaultValue={data.contactInfo?.middleName || ''}
							{...register('middleName')}
							className={`form-control ${
								errors?.middleName ? 'is-invalid' : ''
							}`}
						/>
						<div className='invalid-feedback'>
							{errors?.middleName?.message}
						</div>
					</div>
					{/* Last Name */}
					<div className='form-group col-5'>
						<label>Last name</label>
						<input
							type='text'
							name='lastName'
							// defaultValue={data.contactInfo?.lastName}
							{...register('lastName')}
							className={`form-control ${errors?.lastName ? 'is-invalid' : ''}`}
						/>
						<div className='invalid-feedback'>{errors?.lastName?.message}</div>
					</div>
					{/* Given Name */}
					<div className='form-group col-5'>
						<label>Given name</label>
						<input
							type='text'
							name='givenName'
							// defaultValue={data.contactInfo?.givenName}
							{...register('givenName')}
							className={`form-control ${
								errors?.givenName ? 'is-invalid' : ''
							}`}
						/>
						<div className='invalid-feedback'>{errors?.givenName?.message}</div>
					</div>

					{/* Email */}
					<div className='form-group col-7'>
						<label>Email</label>
						<input
							type='text'
							name='email'
							// defaultValue={data.contactInfo?.email}
							{...register('email')}
							className={`form-control ${errors?.email ? 'is-invalid' : ''}`}
						/>
						<div className='invalid-feedback'>{errors?.email?.message}</div>
					</div>

					{/* Phone */}

					<div className='form-group col-7'>
						<label>Mobile number</label>
						<input
							type='tel'
							name='mobile'
							// defaultValue={data.contactInfo?.phone}
							{...register('mobile')}
							className={`form-control ${errors?.mobile ? 'is-invalid' : ''}`}
						/>
						<div className='invalid-feedback'>{errors?.mobile?.message}</div>
					</div>
				</div>
			</FormGroup>

			<label>Permanent Address</label>
			<FormGroup>
				<div className='form-row'>
					{/* Address Type */}
					<div className='form-group col'>
						<label>Addr type</label>
						<select
							name='addrType'
							// defaultValue={data.address[0] ?? data.address[0].addrType}
							{...register('addrType')}
							className={`form-control ${errors?.addrType ? 'is-invalid' : ''}`}
						>
							<option value='Permanant'>Permanent</option>
							<option value='Temporary'>Temporary</option>
						</select>
						<div className='invalid-feedback'>{errors?.addrType?.message}</div>
					</div>

					{/* AddrressLine 1 */}
					<div className='form-group col-7'>
						<label>Line1</label>
						<input
							type='text'
							name='line1'
							// defaultValue={data.address[0].addrLine1 || ''}
							{...register('line1')}
							className={`form-control ${errors?.line1 ? 'is-invalid' : ''}`}
						/>
						<div className='invalid-feedback'>{errors?.line1?.message}</div>
					</div>

					{/* AddrressLine 2 */}
					<div className='form-group col-7'>
						<label>Line2</label>
						<input
							type='text'
							name='line2'
							// defaultValue={data.address[0].addrLine2}
							{...register('line2')}
							className={`form-control ${errors?.line2 ? 'is-invalid' : ''}`}
						/>
						<div className='invalid-feedback'>{errors?.line2?.message}</div>
					</div>

					{/* City*/}
					<div className='form-group col-7'>
						<label>City</label>
						<input
							type='text'
							name='city'
							// defaultValue={data.address[0].city}
							{...register('city')}
							className={`form-control ${errors?.city ? 'is-invalid' : ''}`}
						/>
						<div className='invalid-feedback'>{errors?.city?.message}</div>
					</div>

					{/* State*/}
					<div className='form-group col-7'>
						<label>State</label>
						<input
							type='text'
							name='state'
							// defaultValue={data.address[0].state}
							{...register('state')}
							className={`form-control ${errors?.state ? 'is-invalid' : ''}`}
						/>
						<div className='invalid-feedback'>{errors?.state?.message}</div>
					</div>

					{/* Country*/}
					<div className='form-group col-7'>
						<label>Country</label>
						<input
							type='text'
							name='country'
							// defaultValue={data.address[0].country}
							{...register('country')}
							className={`form-control ${errors?.country ? 'is-invalid' : ''}`}
						/>
						<div className='invalid-feedback'>{errors?.country?.message}</div>
					</div>

					{/* Postal Code*/}
					<div className='form-group col-7'>
						<label>Postal Code</label>
						<input
							type='tel'
							name='pin'
							// defaultValue={data.address[0].postalCode}
							{...register('pin')}
							className={`form-control ${errors?.pin ? 'is-invalid' : ''}`}
						/>
						<div className='invalid-feedback'>{errors?.pin?.message}</div>
					</div>
				</div>
			</FormGroup>

			<input type='checkbox' />

			<div className='form-group'>
				<button
					type='submit'
					disabled={formState.isSubmitting}
					className='btn btn-primary'
				>
					{formState.isSubmitting && (
						<span className='spinner-border spinner-border-sm mr-1'></span>
					)}
					{isAddMode ? 'Create' : 'Save'}
				</button>
				<Link to='/dashboard' className='btn btn-link'>
					Cancel
				</Link>
			</div>
		</form>
	);
}
