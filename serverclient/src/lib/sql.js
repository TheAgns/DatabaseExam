const sql = require("mssql");

export async function getUser(userId) {
  try {
    await sql.connect(
      "Server=localhost,1433;Database=DBExam;User id=sa;Password=thisIsSuperStrong1234;Encrypt=true;trustServerCertificate=true"
    );
    const res = await sql.query`SELECT * FROM Users WHERE id = ${userId}`;
    return res.recordset[0];
  } finally {
    sql.close();
  }
}

module.exports = { getUser };
