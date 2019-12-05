var mysql = require('mysql')
var connection = mysql.createConnection({
host: 'localhost',
user:'root',
password:'',
database:'library'
})

module.exports = connection