import React from 'react';
import ReactDOM from 'react-dom';
import { useForm } from 'react-hook-form';
import { FormGroup } from 'reactstrap';

import './edit.css';

export default function Edit() {
	const { register, handleSubmit, formState } = useForm({
		mode: 'onChange',
	});
	const onSubmit = (data) => {
		alert(JSON.stringify(data));
	};
	// make sure to read state before render to subscribe to the state update (Proxy).
	const { dirtyFields } = formState;

	// check your dev console, it's a Set
	console.log(dirtyFields);

	return (
		<form onSubmit={handleSubmit(onSubmit)}>
			<label>Key</label>
			<input type='text' name='Key' {...register('Key', { required: true })} />

			<label>Org Name</label>
			<input
				type='text'
				name='Org Name'
				{...register('Org Name', { required: true })}
			/>

			<label>BeType</label>
			<select name='beType' {...register('beType', { required: true })}>
				<option value='Company'>Company</option>
				<option value='Person'>Person</option>
			</select>

			<label>Role</label>
			<select name='Role' {...register('Role', { required: true })}>
				<option value='PRODUCER'>PRODUCER</option>
				<option value='SHIPPER'>SHIPPER</option>
			</select>

			<label>Contact Info</label>
			<div className='form-group'>
				<label>First name</label>
				<input type='text' name='First name' {...register('First name')} />
				<label>Middle name</label>
				<input type='text' name='Middle name' {...register('Middle name')} />
				<label>Last name</label>
				<input type='text' name='Last name' {...register('Last name')} />
				<label>Given name</label>
				<input type='text' name='Given name' {...register('Given name')} />
				<label>Email</label>
				<input type='text' name='Email' {...register('Email')} />

				<label>Mobile number</label>
				<input type='tel' name='Mobile number' {...register('Mobile number')} />
			</div>

			<label>Permanent Address</label>
			<FormGroup>
				<label>Addr type</label>
				<input type='text' name='Addr type' {...register('Addr type')} />
				<label>Line1</label>
				<input type='text' name='Line1' {...register('Line1')} />
				<label>Line2</label>
				<input type='text' name='Line1' {...register('Line1')} />
				<label>City</label>
				<input type='text' name='City' {...register('City')} />
				<label>State</label>
				<input type='text' name='State' {...register('State')} />
				<label>Country</label>
				<input type='text' name='Country' {...register('Country')} />

				<label>Postal Code</label>
				<input type='tel' name='Postal Code' {...register('Postal Code')} />
			</FormGroup>

			<input type='checkbox' />

			<input type='submit' />
		</form>
	);
}
