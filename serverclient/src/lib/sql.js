const { MSSQL_URL, MSSQL_USERNAME, MSSQL_PASSWORD } = process.env;
// const mssql = require("mssql");

var Connection = require("tedious").Connection;
var config = {
  server: `127.0.0.1\\mssql`, //update me
  authentication: {
    type: "default",
    options: {
      userName: "sa", //update me
      password: "Pass1234", //update me
    },
  },
  options: {
    // If you are on Microsoft Azure, you need encryption:
    encrypt: true,
    database: "mssql",
    trustServerCertificate: true,
    port: 50000
  },
};

var Request = require("tedious").Request;
var TYPES = require("tedious").TYPES;

const getUsers = () => {
  return new Promise((resolve, reject) => {
    const connection = new Connection(config);
    connection.on("connect", (err) => {
      if (err) {
        reject(err);
        return;
      }
      console.log("connected");

      const request = new Request(
        "SELECT * FROM users",
        (err, rowCount, rows) => {
          if (err) {
            console.log(err)
            reject(err);
          } else {
            resolve(rows);
          }

          connection.close();
        }
      );

      connection.execSql(request);
    });

    connection.connect();
  });
};

export { getUsers };

module.exports = { getUsers };
