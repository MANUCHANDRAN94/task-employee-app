import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';

import { userService, alertService } from '@/_services';

function AddEdit({ history, match }) {
	const { id } = match.params;
	const isAddMode = !id;

	// functions to build form returned by useForm() hook
	const {
		register,
		handleSubmit,
		reset,
		setValue,
		getValues,
		errors,
		formState,
	} = useForm({
		resolver: yupResolver(validationSchema),
	});

	function onSubmit(data) {
		return isAddMode ? createUser(data) : updateUser(id, data);
	}

	function createUser(data) {
		return userService
			.create(data)
			.then(() => {
				alertService.success('User added', { keepAfterRouteChange: true });
				history.push('.');
			})
			.catch(alertService.error);
	}

	function updateUser(id, data) {
		return userService
			.update(id, data)
			.then(() => {
				alertService.success('User updated', { keepAfterRouteChange: true });
				history.push('..');
			})
			.catch(alertService.error);
	}

	const [user, setUser] = useState({});
	const [showPassword, setShowPassword] = useState(false);

	useEffect(() => {
		if (!isAddMode) {
			// get user and set form fields
			userService.getById(id).then((user) => {
				const fields = ['title', 'firstName', 'lastName', 'email', 'role'];
				fields.forEach((field) => setValue(field, user[field]));
				setUser(user);
			});
		}
	}, []);

	return (
		<form onSubmit={handleSubmit(onSubmit)} onReset={reset}>
			<h1>{isAddMode ? 'Add User' : 'Edit User'}</h1>
			<div className='form-row'>
				<div className='form-group col'>
					<label>Title</label>
					<select
						name='title'
						ref={register}
						className={`form-control ${errors.title ? 'is-invalid' : ''}`}
					>
						<option value=''></option>
						<option value='Mr'>Mr</option>
						<option value='Mrs'>Mrs</option>
						<option value='Miss'>Miss</option>
						<option value='Ms'>Ms</option>
					</select>
					<div className='invalid-feedback'>{errors.title?.message}</div>
				</div>
				<div className='form-group col-5'>
					<label>First Name</label>
					<input
						name='firstName'
						type='text'
						ref={register}
						className={`form-control ${errors.firstName ? 'is-invalid' : ''}`}
					/>
					<div className='invalid-feedback'>{errors.firstName?.message}</div>
				</div>
				<div className='form-group col-5'>
					<label>Last Name</label>
					<input
						name='lastName'
						type='text'
						ref={register}
						className={`form-control ${errors.lastName ? 'is-invalid' : ''}`}
					/>
					<div className='invalid-feedback'>{errors.lastName?.message}</div>
				</div>
			</div>
			<div className='form-row'>
				<div className='form-group col-7'>
					<label>Email</label>
					<input
						name='email'
						type='text'
						ref={register}
						className={`form-control ${errors.email ? 'is-invalid' : ''}`}
					/>
					<div className='invalid-feedback'>{errors.email?.message}</div>
				</div>
				<div className='form-group col'>
					<label>Role</label>
					<select
						name='role'
						ref={register}
						className={`form-control ${errors.role ? 'is-invalid' : ''}`}
					>
						<option value=''></option>
						<option value='User'>User</option>
						<option value='Admin'>Admin</option>
					</select>
					<div className='invalid-feedback'>{errors.role?.message}</div>
				</div>
			</div>
			{!isAddMode && (
				<div>
					<h3 className='pt-3'>Change Password</h3>
					<p>Leave blank to keep the same password</p>
				</div>
			)}
			<div className='form-row'>
				<div className='form-group col'>
					<label>
						Password
						{!isAddMode &&
							(!showPassword ? (
								<span>
									{' '}
									-{' '}
									<a
										onClick={() => setShowPassword(!showPassword)}
										className='text-primary'
									>
										Show
									</a>
								</span>
							) : (
								<em> - {user.password}</em>
							))}
					</label>
					<input
						name='password'
						type='password'
						ref={register}
						className={`form-control ${errors.password ? 'is-invalid' : ''}`}
					/>
					<div className='invalid-feedback'>{errors.password?.message}</div>
				</div>
				<div className='form-group col'>
					<label>Confirm Password</label>
					<input
						name='confirmPassword'
						type='password'
						ref={register}
						className={`form-control ${
							errors.confirmPassword ? 'is-invalid' : ''
						}`}
					/>
					<div className='invalid-feedback'>
						{errors.confirmPassword?.message}
					</div>
				</div>
			</div>
			<div className='form-group'>
				<button
					type='submit'
					disabled={formState.isSubmitting}
					className='btn btn-primary'
				>
					{formState.isSubmitting && (
						<span className='spinner-border spinner-border-sm mr-1'></span>
					)}
					Save
				</button>
				<Link to={isAddMode ? '.' : '..'} className='btn btn-link'>
					Cancel
				</Link>
			</div>
		</form>
	);
}

export { AddEdit };
