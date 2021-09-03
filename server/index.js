// Referencing libraries
const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');

// import other modules
const index = require('./routes/index');
const employees = require('./routes/employees');

// Invoking
const app = express();
dotenv.config();
app.use(cors());

// connecting to database
mongoose
	.connect(process.env.MONGO_URL)
	.then(console.log('Connected to mongoDB Atlas'))
	.catch((err) => console.log(err));

// middleware
app.use(express.json());
// app.use(express.urlencoded({ extended: true }));
app.use('/', index);
app.use('/employees', employees);

app.listen(process.env.PORT, () => {
	console.log(`sever running at http://localhost:${process.env.PORT}`);
});
