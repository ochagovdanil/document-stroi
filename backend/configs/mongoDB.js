const mongoose = require('mongoose');

// Local MongoDB URI
const DB_URI = 'mongodb://localhost:27017/document-stroi';

const connectDB = async () => {
	try {
		await mongoose.connect(DB_URI);
		console.log('Connected to MongoDB');
	} catch (error) {
		console.error('Connection error to MongoDB:', error);
	}
};

module.exports = connectDB;
