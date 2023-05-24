const { MSSQL_URL, MSSQL_USERNAME, MSSQL_PASSWORD } = process.env;
// const mssql = require("mssql");

// const config = {
//   user: "sa",
//   password: "thisIsSuperStrong1234",
//   server: `127.0.0.1\\mssql`,
//   database: "DBExam",
//   options: {
//     encrypt: true,
//     trustServerCertificate: true,
//   },
// };
var Connection = require("tedious").Connection;
var config = {
  server: `127.0.0.1\\mssql`, //update me
  authentication: {
    type: "default",
    options: {
      userName: "sa", //update me
      password: "thisIsSuperStrong1234", //update me
    },
  },
  options: {
    // If you are on Microsoft Azure, you need encryption:
    encrypt: true,
    database: "DBExam", //update me
  },
};
var connection = new Connection(config);
connection.on("connect", function (err) {
  // If no error, then good to proceed.
  console.log("Connected");
});

connection.connect();

// const getUsers = async () => {
//   try {
//     const pool = await mssql.connect(config);
//     const result = await pool.request().query("SELECT * FROM users");
//     return result.recordset;
//   } catch (error) {
//     console.error("Error retrieving users from MSSQL:", error);
//     throw new Error("Error retrieving users from MSSQL:", error);
//   }
// };
var Request = require("tedious").Request;
var TYPES = require("tedious").TYPES;

const getUsers = () => {
  return new Promise((resolve, reject) => {
    const connection = new Connection(/* your connection configuration */);
    connection.on("connect", (err) => {
      if (err) {
        reject(err);
        return;
      }

      const request = new Request(
        "SELECT * FROM users",
        (err, rowCount, rows) => {
          if (err) {
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
