import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useParams, useHistory } from 'react-router-dom';
import { Link } from 'react-router-dom';
import {
	Col,
	Row,
	Button,
	Form,
	FormGroup,
	Label,
	Alert,
	Input,
} from 'reactstrap';

import axios from 'axios';

// import './form.css';

export default function FormComponent() {
	const { id: userId } = useParams();
	const isAddMode = !userId;
	const history = useHistory();
	const { register, handleSubmit, reset, setValue, formState, errors } =
		useForm({
			mode: 'onChange',
		});
	const [data, setData] = useState([]);
	const [showSecondaryAddr, setShowSecondaryAddr] = useState(false);

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

	const toggleSecondaryAddr = () => {
		setShowSecondaryAddr(!showSecondaryAddr);
	};

	// const addrGrourJsx =()=>{
	// 	return (
	// 		<FormGroup>
	// 			'addrType' + serial
	// 		</FormGroup>
	// 	)
	// }

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
			addrType0,
			line10,
			line20,
			city0,
			state0,
			country0,
			pin0,
			addrType1,
			line11,
			line21,
			city1,
			state1,
			country1,
			pin1,
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
					addrType: addrType0,
					addrLine1: line10,
					addrLine2: line20,
					city: city0,
					state: state0,
					country: country0,
					postalCode: pin0,
				},
				{
					addrType: addrType1,
					addrLine1: line11,
					addrLine2: line21,
					city: city1,
					state: state1,
					country: country1,
					postalCode: pin1,
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
			data.address?.forEach((element, index) => {
				setValue('addrType' + index, element.addrType);
				setValue('line1' + index, element.addrLine1);
				setValue('line2' + index, element.addrLine2);
				setValue('city' + index, element.city);
				setValue('state' + index, element.state);
				setValue('country' + index, element.country);
				setValue('pin' + index, element.postalCode);
			});
		}
	}, [data]);

	return (
		<>
			{' '}
			<h1 className={`${isAddMode ? 'text-success' : 'text-info'} `}>
				{isAddMode ? 'Add User' : 'Edit User'}
			</h1>
			<Form onSubmit={handleSubmit(onSubmit)} onReset={reset}>
				<FormGroup>
					<Row form>
						<Col md={6}>
							<FormGroup>
								<Label for='key'>Key</Label>
								<input
									type='text'
									name='key'
									id='key'
									placeholder='Enter Key Name'
									// defaultValue={data.key}
									{...register('key', { required: true })}
									className={`form-control ${errors?.key ? 'is-invalid' : ''}`}
								/>
								{errors?.key?.message && (
									<Alert color='danger'>{errors?.key?.message}</Alert>
								)}
							</FormGroup>
						</Col>

						<Col md={6}>
							<FormGroup>
								<Label for='orgName'>Org Name</Label>
								<input
									type='text'
									name='orgName'
									id='orgName'
									placeholder='Enter org Name'
									// defaultValue={data.key}
									{...register('orgName', { required: true })}
									className={`form-control ${
										errors?.orgName ? 'is-invalid' : ''
									}`}
								/>
								{errors?.orgName?.message && (
									<Alert color='danger'>{errors?.orgName?.message}</Alert>
								)}
							</FormGroup>
						</Col>
					</Row>

					<Row form>
						<Col md={6}>
							<FormGroup>
								<Label for='beType'>BeType</Label>
								<select
									name='beType'
									// defaultValue={data.beType}
									{...register('beType', { required: true })}
									className={`form-control ${
										errors?.beType ? 'is-invalid' : ''
									}`}
								>
									<option value='Company'>Company</option>
									<option value='Person'>Person</option>
								</select>
								{errors?.beType?.message && (
									<Alert color='danger'>{errors?.beType?.message}</Alert>
								)}
							</FormGroup>
						</Col>

						<Col md={6}>
							<FormGroup>
								<Label for='role'>Role</Label>
								<select
									name='role'
									// defaultValue={data.beType}
									{...register('role', { required: true })}
									className={`form-control ${errors?.role ? 'is-invalid' : ''}`}
								>
									<option value='PRODUCER'>PRODUCER</option>
									<option value='SHIPPER'>SHIPPER</option>
								</select>
								{errors?.role?.message && (
									<Alert color='danger'>{errors?.role?.message}</Alert>
								)}
							</FormGroup>
						</Col>
					</Row>
				</FormGroup>

				<FormGroup id='contactInfo' className='my-5'>
					<Label for='contactInfo' className='mb-2 h4'>
						Contact Info
					</Label>
					<Row form>
						{/* First Name */}
						<Col md={6}>
							<FormGroup>
								<Label for='firstName'>First Name</Label>
								<input
									type='text'
									name='firstName'
									id='firstName'
									placeholder='Enter firstName'
									// defaultValue={data.key}
									{...register('firstName')}
									className={`form-control ${
										errors?.firstName ? 'is-invalid' : ''
									}`}
								/>
								{errors?.firstName?.message && (
									<Alert color='danger'>{errors?.firstName?.message}</Alert>
								)}
							</FormGroup>
						</Col>

						{/* Middle Name */}
						<Col md={6}>
							<FormGroup>
								<Label for='middleName'>Middle name</Label>
								<input
									type='text'
									name='middleName'
									id='middleName'
									placeholder='Enter middleName'
									// defaultValue={data.key}
									{...register('middleName')}
									className={`form-control ${
										errors?.middleName ? 'is-invalid' : ''
									}`}
								/>
								{errors?.middleName?.message && (
									<Alert color='danger'>{errors?.middleName?.message}</Alert>
								)}
							</FormGroup>
						</Col>
					</Row>

					<Row form>
						{/* Last Name */}
						<Col md={6}>
							<FormGroup>
								<Label for='lastName'>Last name</Label>
								<input
									type='text'
									name='lastName'
									id='lastName'
									placeholder='Enter lastName'
									// defaultValue={data.key}
									{...register('lastName')}
									className={`form-control ${
										errors?.lastName ? 'is-invalid' : ''
									}`}
								/>
								{errors?.lastName?.message && (
									<Alert color='danger'>{errors?.lastName?.message}</Alert>
								)}
							</FormGroup>
						</Col>

						{/* Given Name */}
						<Col md={6}>
							<FormGroup>
								<Label for='givenName'>Given name</Label>
								<input
									type='text'
									name='givenName'
									id='givenName'
									placeholder='Enter givenName'
									// defaultValue={data.key}
									{...register('givenName')}
									className={`form-control ${
										errors?.givenName ? 'is-invalid' : ''
									}`}
								/>
								{errors?.givenName?.message && (
									<Alert color='danger'>{errors?.givenName?.message}</Alert>
								)}
							</FormGroup>
						</Col>
					</Row>

					<Row form>
						{/* Email */}
						<Col md={6}>
							<FormGroup>
								<Label for='email'>Email</Label>
								<input
									type='text'
									name='email'
									id='email'
									placeholder='Enter email'
									// defaultValue={data.key}
									{...register('email')}
									className={`form-control ${
										errors?.email ? 'is-invalid' : ''
									}`}
								/>
								{errors?.email?.message && (
									<Alert color='danger'>{errors?.email?.message}</Alert>
								)}
							</FormGroup>
						</Col>

						{/* Phone */}
						<Col md={6}>
							<FormGroup>
								<Label for='mobile'>Mobile number</Label>
								<input
									type='tel'
									name='mobile'
									id='mobile'
									placeholder='Enter mobile number'
									// defaultValue={data.key}
									{...register('mobile')}
									className={`form-control ${
										errors?.mobile ? 'is-invalid' : ''
									}`}
								/>
								{errors?.mobile?.message && (
									<Alert color='danger'>{errors.mobile.message}</Alert>
								)}
							</FormGroup>
						</Col>
					</Row>
				</FormGroup>

				<FormGroup id='addressInfo' className='my-5'>
					<Label for='addressInfo' className='mb-2 h4'>
						Address
					</Label>

					<FormGroup>
						<Row form>
							{/* Address Type */}
							<Col md={6}>
								<FormGroup>
									<Label for='addrType0'>Addr type</Label>
									<select
										name='addrType0'
										id='addrType0'
										// defaultValue={data.address[0] ?? data.address[0].addrType}
										{...register('addrType0')}
										className={`form-control ${
											errors?.addrType0 ? 'is-invalid' : ''
										}`}
									>
										<option value='Permanant'>Permanent</option>
										<option value='Temporary'>Temporary</option>
									</select>

									{errors?.addrType0?.message && (
										<Alert color='danger'>{errors.addrType0.message}</Alert>
									)}
								</FormGroup>
							</Col>

							{/* AddressLine 1 */}
							<Col md={6}>
								<FormGroup>
									<Label for='line10'>Line1</Label>
									<input
										type='text'
										name='line10'
										id='line10'
										placeholder='Enter line1'
										// defaultValue={data.key}
										{...register('line10')}
										className={`form-control ${
											errors?.line10 ? 'is-invalid' : ''
										}`}
									/>
									{errors?.line10?.message && (
										<Alert color='danger'>{errors.line10.message}</Alert>
									)}
								</FormGroup>
							</Col>

							{/* AddressLine 2 */}
							<Col md={6}>
								<FormGroup>
									<Label for='line20'>Line2</Label>
									<input
										type='text'
										name='line20'
										id='line20'
										placeholder='Enter line2'
										// defaultValue={data.key}
										{...register('line20')}
										className={`form-control ${
											errors?.line20 ? 'is-invalid' : ''
										}`}
									/>
									{errors?.line20?.message && (
										<Alert color='danger'>{errors.line20.message}</Alert>
									)}
								</FormGroup>
							</Col>
						</Row>

						<Row form>
							{/* City*/}
							<Col md={6}>
								<FormGroup>
									<Label for='city0'>City</Label>
									<input
										type='text'
										name='city0'
										id='citcity0y'
										placeholder='Enter city'
										// defaultValue={data.key}
										{...register('city0')}
										className={`form-control ${
											errors?.city0 ? 'is-invalid' : ''
										}`}
									/>
									{errors?.city0?.message && (
										<Alert color='danger'>{errors.city0.message}</Alert>
									)}
								</FormGroup>
							</Col>

							{/* State*/}
							<Col md={6}>
								<FormGroup>
									<Label for='state0'>State</Label>
									<input
										type='text'
										name='state0'
										id='state0'
										placeholder='Enter state'
										// defaultValue={data.key}
										{...register('state0')}
										className={`form-control ${
											errors?.state0 ? 'is-invalid' : ''
										}`}
									/>
									{errors?.state0?.message && (
										<Alert color='danger'>{errors.state0.message}</Alert>
									)}
								</FormGroup>
							</Col>

							{/* Country*/}
							<Col md={6}>
								<FormGroup>
									<Label for='country0'>Country</Label>
									<input
										type='text'
										name='country0'
										id='country0'
										placeholder='Enter country'
										// defaultValue={data.key}
										{...register('country0')}
										className={`form-control ${
											errors?.country0 ? 'is-invalid' : ''
										}`}
									/>
									{errors?.country0?.message && (
										<Alert color='danger'>{errors.country0.message}</Alert>
									)}
								</FormGroup>
							</Col>

							{/* Postal Code*/}
							<Col md={6}>
								<FormGroup>
									<Label for='pin0'>Postal Code</Label>
									<input
										type='tel'
										name='pin0'
										id='pin0'
										placeholder='Enter pin code'
										// defaultValue={data.key}
										{...register('pin0')}
										className={`form-control ${
											errors?.pin0 ? 'is-invalid' : ''
										}`}
									/>
									{errors?.pin0?.message && (
										<Alert color='danger'>{errors.pin0.message}</Alert>
									)}
								</FormGroup>
							</Col>
						</Row>
					</FormGroup>

					<FormGroup check>
						<Label check>
							<Input type='checkbox' onClick={toggleSecondaryAddr} /> add
							another address
						</Label>
					</FormGroup>

					{showSecondaryAddr && (
						<FormGroup>
							<Label for='addressInfo' className=' mt-5 mb-2 h5'>
								additional Address
							</Label>
							<Row form>
								{/* Address Type */}
								<Col md={6}>
									<FormGroup>
										<Label for='addrType1'>Addr type</Label>
										<select
											name='addrType1'
											id='addrType1'
											// defaultValue={data.address[0] ?? data.address[0].addrType}
											{...register('addrType1')}
											className={`form-control ${
												errors?.addrType1 ? 'is-invalid' : ''
											}`}
										>
											<option value='Permanant'>Permanent</option>
											<option value='Temporary'>Temporary</option>
										</select>

										{errors?.addrType1?.message && (
											<Alert color='danger'>{errors.addrType1.message}</Alert>
										)}
									</FormGroup>
								</Col>

								{/* AddressLine 1 */}
								<Col md={6}>
									<FormGroup>
										<Label for='line11'>Line1</Label>
										<input
											type='text'
											name='line11'
											id='line11'
											placeholder='Enter line1'
											// defaultValue={data.key}
											{...register('line11')}
											className={`form-control ${
												errors?.line11 ? 'is-invalid' : ''
											}`}
										/>
										{errors?.line11?.message && (
											<Alert color='danger'>{errors.line11.message}</Alert>
										)}
									</FormGroup>
								</Col>

								{/* AddressLine 2 */}
								<Col md={6}>
									<FormGroup>
										<Label for='line21'>Line2</Label>
										<input
											type='text'
											name='line21'
											id='line21'
											placeholder='Enter line2'
											// defaultValue={data.key}
											{...register('line21')}
											className={`form-control ${
												errors?.line21 ? 'is-invalid' : ''
											}`}
										/>
										{errors?.line21?.message && (
											<Alert color='danger'>{errors.line21.message}</Alert>
										)}
									</FormGroup>
								</Col>
							</Row>

							<Row form>
								{/* City*/}
								<Col md={6}>
									<FormGroup>
										<Label for='city1'>City</Label>
										<input
											type='text'
											name='city1'
											id='city1'
											placeholder='Enter city'
											// defaultValue={data.key}
											{...register('city1')}
											className={`form-control ${
												errors?.city1 ? 'is-invalid' : ''
											}`}
										/>
										{errors?.city1?.message && (
											<Alert color='danger'>{errors.city1.message}</Alert>
										)}
									</FormGroup>
								</Col>

								{/* State*/}
								<Col md={6}>
									<FormGroup>
										<Label for='state1'>State</Label>
										<input
											type='text'
											name='state1'
											id='state1'
											placeholder='Enter state'
											// defaultValue={data.key}
											{...register('state1')}
											className={`form-control ${
												errors?.state1 ? 'is-invalid' : ''
											}`}
										/>
										{errors?.state1?.message && (
											<Alert color='danger'>{errors.state1.message}</Alert>
										)}
									</FormGroup>
								</Col>

								{/* Country*/}
								<Col md={6}>
									<FormGroup>
										<Label for='country1'>Country</Label>
										<input
											type='text'
											name='country1'
											id='country1'
											placeholder='Enter country'
											// defaultValue={data.key}
											{...register('country1')}
											className={`form-control ${
												errors?.country1 ? 'is-invalid' : ''
											}`}
										/>
										{errors?.country1?.message && (
											<Alert color='danger'>{errors.country1.message}</Alert>
										)}
									</FormGroup>
								</Col>

								{/* Postal Code*/}
								<Col md={6}>
									<FormGroup>
										<Label for='pin1'>Postal Code</Label>
										<input
											type='tel'
											name='pin1'
											id='pin1'
											placeholder='Enter pin code'
											// defaultValue={data.key}
											{...register('pin1')}
											className={`form-control ${
												errors?.pin1 ? 'is-invalid' : ''
											}`}
										/>
										{errors?.pin1?.message && (
											<Alert color='danger'>{errors.pin1.message}</Alert>
										)}
									</FormGroup>
								</Col>
							</Row>
						</FormGroup>
					)}
				</FormGroup>

				<div className='form-group'>
					<button
						type='submit'
						disabled={formState.isSubmitting}
						className='btn btn-primary'
					>
						{formState.isSubmitting && (
							<span className='spinner-border spinner-border-sm mr-1'></span>
						)}
						{isAddMode ? 'Create' : 'Update'}
					</button>
					<Link to='/dashboard' className='btn btn-link'>
						<Button color='secondary'>Cancel</Button>
					</Link>
				</div>
			</Form>
		</>
	);
}
