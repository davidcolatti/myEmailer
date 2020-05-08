const express = require('express');
const app = express();

// get is a route handler
app.get('/', (req, res) => {
	res.send({ hi: 'there' });
});

// dynamic PORT binding
const PORT = process.env.PORT || 5000;
app.listen(PORT);
