const mysql = require('mysql2');
const {MYSQL_CONFIG} = require('../config/db');
 
// create the connection to database
const connection = mysql.createConnection(MYSQL_CONFIG);
connection.connect();

const exec = (sql) => {
    return new Promise((resolve, reject) => {
        connection.query(sql, function (error, results) {
            if (error){
                reject(error);
            } else {
                resolve(results);
            }
          });
    })
}

module.exports = exec;