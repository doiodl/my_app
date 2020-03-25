Create new React-js app : https://github.com/facebook/create-react-app#create-react-app--
npm i esm for ESM6
use mysql2 module
how to use ES6 in node js https://www.freecodecamp.org/news/how-to-enable-es6-and-beyond-syntax-with-node-and-express-68d3e11fe1ab/

CREATE TABLE `myexample`.`tbl_user` (
  `user_id` BIGINT AUTO_INCREMENT,
  `user_login` VARCHAR(45) NULL,
  `user_password` VARCHAR(45) NULL,
  PRIMARY KEY (`user_id`));

INSERT INTO tbl_user (user_login,user_password) VALUES('admin','admin');

CREATE TABLE `myexample`.`tbl_diagrams`
(
 diagram_name VARCHAR(45) NOT NULL,
 diagram_text LONGTEXT NOT NULL
);
