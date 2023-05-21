const { MSSQL_USERNAME, MSSQL_PASSWORD } = process.env;
const mssql = require("mssql");

export async function loginService(username, password) {
  const config = {
    user: MSSQL_USERNAME,
    password: MSSQL_PASSWORD,
    server: "localhost",
    database: "DBExam",
    options: {
      encrypt: true,
      trustServerCertificate: true,
    },
  };

  try {
    const pool = await mssql.connect(config);
    const result = await pool
      .request()
      .input("username", mssql.VarChar, username)
      .input("password", mssql.VarChar, password)
      .query(
        "SELECT * FROM users WHERE username = @username AND password = @password"
      );

    return result.recordset.length > 0;
  } catch (error) {
    console.error("Error connecting to MSSQL server:", error.message);
    throw error;
  }
}

module.exports = loginService;
