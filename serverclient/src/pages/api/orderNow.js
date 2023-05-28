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

var sql = require("mssql");

export default async function insertOrderProc(req, res) {
  const { cart, totalPrice } = req.body;

  try {
    let pool = await sql.connect(
      "Server=localhost,1433;Database=DBExam;User id=sa;Password=thisIsSuperStrong1234;Encrypt=true;trustServerCertificate=true"
    );

    const table = new sql.Table("typeProduct");
    table.create = true;
    table.columns.add("productId", sql.Int);
    table.columns.add("productName", sql.VarChar(35));
    table.columns.add("productPrice", sql.Float);
    table.columns.add("quantity", sql.Int);

    for (const p of cart) {
      table.rows.add(p.id, p.name, p.price, 1);
      //console.log(p);
    }

    const userid = 1;
    const billingAddress = "Mågevej";
    const billingCity = "Lyngby";
    const billingPostalCode = 2800;

    const request = pool.request();
    request.input("tblProducts", table);
    request.input("userId", userid);
    request.input("total", totalPrice);
    request.input("billingAddress", billingAddress);
    request.input("billingCity", billingCity);
    request.input("postalCode", billingPostalCode);

    console.log(table);

    const result = await request.execute("create_order");

    const products = result.recordset;
    //console.log(products);
  } catch (error) {
    console.error(error);
  } finally {
    sql.close();
  }
}
