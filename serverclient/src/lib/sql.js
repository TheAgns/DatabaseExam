const { MSSQL_URL, MSSQL_USERNAME, MSSQL_PASSWORD } = process.env;
const mssql = require("mssql");

const config = {
  user: MSSQL_USERNAME,
  password: MSSQL_PASSWORD,
  server: "localhost",
  database: "DBExam",
  options: {
    encrypt: true,
    trustServerCertificate: true, // Use this option if using a self-signed certificate
  },
};

mssql
  .connect(config)
  .then(() => {
    console.log("Connected to MSSQL server");
  })
  .catch((error) => {
    console.error("Error connecting to MSSQL server:", error.message);
  });

module.exports = config;

// const config = {
//   user: MSSQL_USERNAME,
//   password: MSSQL_PASSWORD,
//   server: "localhost",
//   database: "DBExam",
//   options: {
//     encrypt: true,
//     trustServerCertificate: true, // Use this option if using a self-signed certificate
//   },
// };

// module.exports = config;
