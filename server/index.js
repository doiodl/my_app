const express = require('express');
const bodyParser = require('body-parser');
const pino = require('express-pino-logger')();
const db_fun = require('./db_fun')
const app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(pino);

app.get('/api/greeting', (req, res) => {
  const name = req.query.name || 'World';
  res.setHeader('Content-Type', 'application/json');
  res.send(JSON.stringify({ greeting: `Hello ${name}!` }));
});

app.get('/api/check_user', async (req, res) => {
	const user = req.query.user_id || 'user';
	const pas = req.query.password || 'password';
	res.setHeader('Content-Type', 'application/json');
	try {
		let a = await db_fun.check_user(user, pas);
		if (Object.keys(a).length)
			res.send(JSON.stringify({ answer: a[0].user_id }));
		else
			res.send(JSON.stringify({ answer: 0 }));
	} catch (e)
	{
		console.log(e)
		res.sendStatus(500)
	}
});


app.get('/api/get_diagram_list', async (req, res) => {
	res.setHeader('Content-Type', 'application/json');
	try {
		let a = await db_fun.get_list();
		if (Object.keys(a).length)
			res.send(JSON.stringify({ diagram_arr: a}));
		else
			res.send(JSON.stringify({ diagram_arr: [] }));
	} catch (e)
	{
		console.log(e)
		res.sendStatus(500)
	}
});

app.post('/api/set_diagram_new', async (req, res) => {
	const name_diag = req.body.name_diag || 'null';
	const text_diag = req.body.text_diag || 'null';
	if (name_diag === 'null' || text_diag === 'null')
		return;
	res.setHeader('Content-Type', 'application/json');
	try {
		let a = await db_fun.add_diagram(name_diag, text_diag);
	} catch (e)
	{
		console.log(e)
		res.sendStatus(500)
	}
});

app.get('/api/get_diagram_text', async (req, res) => {
	res.setHeader('Content-Type', 'application/json');
	const name_diag = req.query.name_diag || 'null';
	if (name_diag === 'null')
		return;
	try {
		let a = await db_fun.get_text_d(name_diag);
		if (Object.keys(a).length)
			res.send(JSON.stringify({ diagram_text: a[0].diagram_text}));
		else
			res.send(JSON.stringify({ diagram_text: '' }));
	} catch (e)
	{
		console.log(e)
		res.sendStatus(500)
	}
});

app.listen(3001, () =>
  console.log('Express server is running on localhost:3001')
);
