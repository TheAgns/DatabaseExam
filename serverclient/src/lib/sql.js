const sql = require("mssql");

<<<<<<< HEAD
export async function getUser(userId) {
  try {
    await sql.connect(
      "Server=localhost,1433;Database=Exam;User id=sa;Password=thisIsSuperStrong1234;Encrypt=true;trustServerCertificate=true"
    );
    const res = await sql.query`SELECT * FROM Users WHERE id = ${userId}`;
    return res.recordset[0];
  } finally {
    sql.close();
  }
}
//typeof res;

module.exports = { getUser };
=======
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
>>>>>>> 7e881755a4549c1c92df01c168ff4584bb98bdfa
