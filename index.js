import express from 'express';
import bodyParser from 'body-parser';

const app = express();
const port = 80;

// Middleware to parse JSON bodies
app.use(bodyParser.json());

// Serve static files from the /iso directory
app.use('/iso', express.static('/iso'));

// Handle POST requests with JSON body
app.post('/answer', (request, _response) => {
	const jsonBody = request.body;
	console.log('Recieved POST request at /answer');
	console.log(jsonBody);
	// Res.rejectUnauthorized();
	// res.json(jsonBody);
});

app.get('/answer', (request, response) => {
	console.log('Recieved GET request at /answer');
	response.send('Hello World!');
});

app.listen(port, () => {
	console.log(`Server is running on http://localhost:${port}`);
});
