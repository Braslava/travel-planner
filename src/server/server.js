const app = require('./app');
// enables to get portname from environment variable but use 3000 if there's none
const port = process.env.PORT || 3000;

app.listen(port, () => {
	console.log(`Server running on port ${port}!`);
	console.log(`Running on http://localhost:${port}/`);
});
