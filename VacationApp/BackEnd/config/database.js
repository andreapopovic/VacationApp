/*import mysql from "mysql2"

const mysqlConnection = mysql.createConnection({
    host:'127.0.0.1',
    user:'codemancydev',
    password:'root1234',
    database:'employeesdb'
})
export default mysqlConnection*/
import { Sequelize } from "sequelize"

const db = new Sequelize('employeesdb', 'codemancydev', 'root1234', {
    host: "127.0.0.1",
    dialect: "mysql"
});

export default db;