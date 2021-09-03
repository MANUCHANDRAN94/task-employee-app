var mongoose = require('mongoose');

var BusinessSchema = new mongoose.Schema(
	{
		key: {
			trim: true,
			type: String,
			// index: true,
			required: true,
		},
		name: {
			desc: "The Company's name.",
			trim: true,
			type: String,
			required: true,
		},
		beType: {
			desc: '???????????',
			type: String,
			enum: ['Company', 'Person'],
			default: 'Company',
			required: true,
		},
		role: [
			{
				desc: 'Employee role',
				type: String,
				enum: ['OPERATOR', 'PRODUCER', 'SHIPPER', 'HAULER', 'TRANSPORTER'],
				required: true,
			},
		],
		contactInfo: {
			firstName: String,
			middleName: String,
			lastName: String,
			givenName: String,
			email: { type: String, required: true, unique: true },
			phone: String,
		},
		address: [
			{
				addrType: {
					desc: 'Current address',
					type: String,
					enum: ['Permanant', 'Temporary'],
					default: 'Temporary',
				},
				addrLine1: String,
				addrLine2: String,
				city: String,
				state: String,
				county: String,
				postalCode: Number,
			},
		],
	},
	{
		timestamps: true,
	},
);

module.exports = mongoose.model('Business', BusinessSchema);
