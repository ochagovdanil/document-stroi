// Handles 404 error
const getErr = (_req, res) => {
	res.status(404).send({ message: 'Not Found' });
};

module.exports = { getErr };
