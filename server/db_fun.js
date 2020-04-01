const db_full = require('./connect_db');
const Connection = db_full.Connection;

const check_user = async(user, password) => {
	return new Promise((resolve, reject) => {
	Connection.query('SELECT user_id FROM myexample.`tbl_user` WHERE `tbl_user`.user_login = ? and `tbl_user`.user_password = ?', [user, password],
			(err, res) => {
				if (err)
					return reject(err)
				return resolve(res);
			});
	});
}

function get_list_all(){
	return new Promise((resolve, reject) => {
	Connection.query('SELECT * FROM myexample.`tbl_diagrams`',
			(err, res) => {
				if (err)
					return reject(err)
				return resolve(res);
			});
	});
}

const get_list = async() => {
	return new Promise((resolve, reject) => {
	Connection.query('SELECT diagram_name FROM myexample.`tbl_diagrams`',
			(err, res) => {
				if (err)
					return reject(err)
				return resolve(res);
			});
	});
}

const add_diagram = async(name_di, text_di) => {
	return new Promise((resolve, reject) => {
	Connection.query('INSERT INTO myexample.`tbl_diagrams` VALUES(?, ?)', [name_di, text_di],
			(err, res) => {
				if (err)
					return reject(err)
				return resolve(res);
			});
	});
}

const get_text_d = async(name_di) => {
	return new Promise((resolve, reject) => {
	Connection.query('SELECT diagram_text FROM myexample.`tbl_diagrams` WHERE diagram_name = ?', [name_di],
			(err, res) => {
				if (err)
					return reject(err)
				return resolve(res);
			});
	});
}

exports.check_user = check_user;
exports.get_list = get_list;
exports.add_diagram = add_diagram;
exports.get_text_d = get_text_d;
exports.get_list_all = get_list_all;
