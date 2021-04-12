const mysql = require('mysql');
const dotenv = require('dotenv');
let instance = null;
dotenv.config();
const connections = mysql.createConnection({
    host: process.env.HOST,
    user: process.env.USER,
    password: process.env.PASSWORD,
    database: process.env.DATABASE,
    port: process.env.DB_PORT
});
connections.connect((err) => {
    if (err) {
        console.log(err.message);
    }
    console.log('db   ' + connections.state);
})
class DbService {
    static getDbServiceInstance() {
        return instance ? instance : new DbService();
    }
    async getAllData() {
        try {
            const response = await new Promise((res, req) => {
                const query = "SELECT * FROM name ;";
                connections.query(query, (err, results) => {
                    if (err) {
                        req(new Error(err.message));
                    }


                    res(results);
                })
            })
            // console.log(response);

            return response;
        } catch (error) {
            console.log(error);
        }
    }
    async insertNewName(name) {
        try {
            const dateAdded = new Date();
            const insertId = await new Promise((res, req) => {
                const query = "INSERT INTO name (name,date_added) VALUES ( ?,?);";
                connections.query(query, [name, dateAdded], (err, result) => {
                    if (err) {
                        req(new Error(err.message));
                    }
                    res(result.insertId);


                    res(result);
                })
            })
            // console.log(insertId);
            return {
                id:insertId,
                name:name,
                dateAdded:dateAdded
            }

            // return insertId;
        } catch (error) {
            console.log(error);
        }
    }
}

module.exports = DbService;