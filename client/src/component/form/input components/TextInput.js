import React from 'react';
import { Col, FormGroup, Label, Alert, Input } from 'reactstrap';

const TextInput = ({ name, placeholder, register, errors }) => {
	return (
		<Col md={6}>
			<FormGroup>
				<Label for={name}>{placeholder}</Label>
				<Input
					type='text'
					name={name}
					id={name}
					placeholder={placeholder}
					// defaultValue={data.key}
					innerRef={register({ required: 'Name is required' })}
				/>
				{errors && errors[name]?.message && (
					<Alert color='danger'>{errors[name].message}</Alert>
				)}
			</FormGroup>
		</Col>
	);
};

export default TextInput;
