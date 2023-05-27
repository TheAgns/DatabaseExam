// const sql = require("mssql");

// export default async function insertOrderProc(result, req) {
//   await sql.connect(
//     "Server=localhost,1433;Database=Exam;User id=sa;Password=thisIsSuperStrong1234;Encrypt=true;trustServerCertificate=true"
//   );
//   const table = new sql.Table("orderLines");
//   table.create = true;
//   table.columns.add("productId", sql.Int, { nullable: true });
//   table.columns.add("productName", sql.VarChar(35), { nullable: true });
//   table.columns.add("productPrice", sql.Float, { nullable: true });
//   table.columns.add("quantity", sql.Int, { nullable: true });

//   for (const p of cart) {
//     table.rows.add(p.productId, p.productName, p.productPrice, p.quantity);
//   }
//   const userid = 1;
//   const billingAddress = "Mågevej";
//   const billingCity = "Lyngby";
//   const billingPostalCode = 2800;
//   var request = sql.Request();
//   request.input(
//     "Products",
//     table,
//     userid,
//     totalPrice,
//     billingAddress,
//     billingCity,
//     billingPostalCode
//   );

//   const res = await request.execute("create_order");
//   //return new sql.Request().bulk(table);
// }

const sql = require("mssql");

export default async function insertOrderProc(req, res) {
  const { cart, totalPrice } = req.body;

  try {
    await sql.connect(
      "Server=localhost,1433;Database=DBExam;User id=sa;Password=thisIsSuperStrong1234;Encrypt=true;trustServerCertificate=true"
    );

    const table = new sql.Table("typeProduct");
    table.create = true;
    table.columns.add("productId", sql.Int, { nullable: true });
    table.columns.add("productName", sql.VarChar(35), { nullable: true });
    table.columns.add("productPrice", sql.Float, { nullable: true });
    table.columns.add("quantity", sql.Int, { nullable: true });

    for (const p of cart) {
      table.rows.add(p.id, p.name, p.price, p.quantity);
      console.log(p);
    }

    const userid = 1;
    const billingAddress = "Mågevej";
    const billingCity = "Lyngby";
    const billingPostalCode = 2800;

    const request = new sql.Request();
    request.input("tblProducts", table);
    request.input("userId", sql.Int, userid);
    request.input("total", sql.Decimal, totalPrice);
    request.input("billingAddress", sql.VarChar(100), billingAddress);
    request.input("billingCity", sql.VarChar(50), billingCity);
    request.input("postalCode", sql.Int, billingPostalCode);

    const result = await request.execute("create_order");

    console.log(res.json(result.recordset));
  } catch (error) {
    console.error(error);
  } finally {
    sql.close();
  }
}
