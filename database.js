import mysql from "mysql2";
import "dotenv/config";

const connection = mysql.createConnection({
  host: process.env.MYSQL_HOST,
  user: process.env.MYSQL_USER,
  port: process.env.MYSQL_PORT,
  password: process.env.MYSQL_PASSWORD,
  database: process.env.MYSQL_DATABASE,
  multipleStatements: true,
});

if (process.env.MYSQL_CERT) {
  connection.ssl = { cs: fs.readFileSync("periamma-server.crt.pem") };
}

export default connection;
