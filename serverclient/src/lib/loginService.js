const { MSSQL_USERNAME, MSSQL_PASSWORD } = process.env;
const { Connection, Request, TYPES } = require("tedious");

export async function loginService(username, password) {
  const config = {
    server: "localhost",
    authentication: {
      type: "default",
      options: {
        userName: MSSQL_USERNAME,
        password: MSSQL_PASSWORD,
      },
    },
    options: {
      encrypt: true,
      database: "DBExam",
      trustServerCertificate: true,
    },
  };

  return new Promise((resolve, reject) => {
    const connection = new Connection(config);

    connection.on("connect", (err) => {
      if (err) {
        console.error("Error connecting to MSSQL server:", err.message);
        reject(err);
      } else {
        console.log("Connected to MSSQL server");
        const sql = `
          INSERT INTO Users (username, password, firstName, lastName, age, email, phone, admin, orderId)
          VALUES (lars, 1234, lars1, lars2, 21, ss@email, 213o1, 1, 1);
        `;
        const request = new Request(sql, (err, rowCount) => {
          if (err) {
            console.error("Error executing SQL query:", err.message);
            reject(err);
          } else {
            console.log("Query executed successfully");
            resolve(rowCount > 0);
          }
          connection.close();
        });

        request.addParameter("username", TYPES.VarChar, username);
        request.addParameter("password", TYPES.VarChar, password);

        connection.execSql(request);
      }
    });
  });
}

module.exports = loginService;
