const express = require('express');
const bodyParser = require('body-parser');
const pino = require('express-pino-logger')();
// const db_fun = require('./db_fun')
const app = express();
var cors = require('cors');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(pino);

const MongoClient = require("mongodb").MongoClient;

const url = "mongodb://localhost:27017/";
const mongoClient = new MongoClient(url, { useUnifiedTopology: true });

app.get('/api/greeting', (req, res) => {
  const name = req.query.name || 'World';
  res.setHeader('Content-Type', 'application/json');
  res.send(JSON.stringify({ greeting: `Hello ${name}!` }));
});

// mysql requests
// app.get('/api/check_user', async (req, res) => {
// 	const user = req.query.user_id || 'user';
// 	const pas = req.query.password || 'password';
// 	res.setHeader('Content-Type', 'application/json');
// 	try {
// 		let a = await db_fun.check_user(user, pas);
// 		if (Object.keys(a).length)
// 			res.send(JSON.stringify({ answer: a[0].user_id }));
// 		else
// 			res.send(JSON.stringify({ answer: 0 }));
// 	} catch (e)
// 	{
// 		console.log(e)
// 		res.sendStatus(500)
// 	}
// });

app.get('/api/check_user', async (req, res) => {
	const user = req.query.user_id || 'user';
	const pas = req.query.password || 'password';
	res.setHeader('Content-Type', 'application/json');
	try {
		mongoClient.connect(function (err, client) {
			if (err) {
				return console.log(err);
			}
			const db = client.db("usersdb");
			const collection = db.collection("users");
	collection.find({ name: user, password: pas }).toArray(function(err, result) {
		if (err) {
			throw err;
		}
			console.log(result);
			if (Object.keys(result).length)
				res.send(JSON.stringify({ answer: result[0]._id }));
			else
				res.send(JSON.stringify({ answer: 0 }));
				});
		})
	} catch (e)
	{
		console.log(e)
		res.sendStatus(500)
	}
});

// mysql request
// app.get('/api/get_diagram_list', async (req, res) => {
// 	res.setHeader('Content-Type', 'application/json');
// 	try {
// 		let a = await db_fun.get_list();
// 		if (Object.keys(a).length)
// 			res.send(JSON.stringify({ diagram_arr: a}));
// 		else
// 			res.send(JSON.stringify({ diagram_arr: [] }));
// 	} catch (e)
// 	{
// 		console.log(e)
// 		res.sendStatus(500)
// 	}
// });

app.get('/api/get_diagram_list', async (req, res) => {
	res.setHeader('Content-Type', 'application/json');
	try {
		mongoClient.connect(function (err, client) {
			if (err) {
				return console.log(err);
			}
			const db = client.db("usersdb");
			const collection = db.collection("diagrams");
			collection.find({}, { diagram_text:0 , _id: 0 }).toArray(function (err, result) {
				if (err) {
					throw err;
				}
				if (Object.keys(result).length)
					res.send(JSON.stringify({ diagram_arr: result }));
				else
					res.send(JSON.stringify({ diagram_arr: [] }));
			})
		})
	} catch (e)
	{
		console.log(e)
		res.sendStatus(500)
	}
});

// app.post('/api/set_diagram_new', async (req, res) => {
// 	const name_diag = req.body.name_diag || 'null';
// 	const text_diag = req.body.text_diag || 'null';
// 	if (name_diag === 'null' || text_diag === 'null')
// 		return;
// 	res.setHeader('Content-Type', 'application/json');
// 	try {
// 		let a = await db_fun.add_diagram(name_diag, text_diag);
// 	} catch (e)
// 	{
// 		console.log(e)
// 		res.sendStatus(500)
// 	}
// });

app.post('/api/set_diagram_new', async (req, res) => {
	const name_diag = req.body.name_diag || 'null';
	const text_diag = req.body.text_diag || 'null';
	if (name_diag === 'null' || text_diag === 'null')
		return;
	res.setHeader('Content-Type', 'application/json');
	try {
		mongoClient.connect(function (err, client) {
			if (err) {
				return console.log(err);
			}
			const db = client.db("usersdb");
			const collection = db.collection("diagrams");
			collection.insertOne({diagram_name: name_diag, diagram_text:text_diag}, function (err, result) {
				if (err) {
					return console.log(err);
				}
				// console.log(result.ops);
				client.close();
			});
		})
	} catch (e)
	{
		console.log(e)
		res.sendStatus(500)
	}
});


// app.get('/api/get_diagram_text', async (req, res) => {
// 	res.setHeader('Content-Type', 'application/json');
// 	const name_diag = req.query.name_diag || 'null';
// 	if (name_diag === 'null')
// 		return;
// 	try {
// 		let a = await db_fun.get_text_d(name_diag);
// 		if (Object.keys(a).length)
// 			res.send(JSON.stringify({ diagram_text: a[0].diagram_text}));
// 		else
// 			res.send(JSON.stringify({ diagram_text: '' }));
// 	} catch (e)
// 	{
// 		console.log(e)
// 		res.sendStatus(500)
// 	}
// });

app.get('/api/get_diagram_text', async (req, res) => {
	res.setHeader('Content-Type', 'application/json');
	const name_diag = req.query.name_diag || 'null';
	if (name_diag === 'null')
		return;
	try {
		mongoClient.connect(function (err, client) {
			if (err) {
				return console.log(err);
			}
			const db = client.db("usersdb");
			const collection = db.collection("diagrams");
			collection.find({ diagram_name: name_diag }, { diagram_name: 0, _id: 0 }).toArray(function (err, result) {
				if (err) {
					throw err;
				}
				if (Object.keys(result).length)
					res.send(JSON.stringify({ diagram_text: result[0].diagram_text }));
				else
					res.send(JSON.stringify({ diagram_text: '' }));
			})
		})
	} catch (e)
	{
		console.log(e)
		res.sendStatus(500)
	}
});

app.listen(3001, () =>
  console.log('Express server is running on localhost:3001')
);
