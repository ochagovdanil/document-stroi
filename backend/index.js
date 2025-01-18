const cors = require('cors');
const express = require('express');
const router = require('./routes/routes');
const connectDB = require('./configs/mongoDB');

// Apply dependencies
const app = express();
app.use(cors());
app.use(express.json());

connectDB();

app.use(router);

// Server error handling
app.use((err, _req, res, _next) => {
	console.error(err);
	res.status(500).send({ message: 'Internal Server Error' });
});

// Set up the server
const PORT = 3001;
const HOST = '0.0.0.0';

app.listen(PORT, HOST, () => {
	console.log(`Express.js server running at http://${HOST}:${PORT}/`);
});
