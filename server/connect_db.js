const mysql = require('mysql2');
const config = require('./config/config');

const Connection = mysql.createConnection(config.mysql);

Connection.connect(err => {
	if (err) console.log(err);
});

exports.Connection = Connection;
