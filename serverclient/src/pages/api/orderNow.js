const sql = require("mssql");

export default async function insertOrderProc(result, req) {
  await sql.connect(
    "Server=localhost,1433;Database=Exam;User id=sa;Password=thisIsSuperStrong1234;Encrypt=true;trustServerCertificate=true"
  );
  const table = new sql.Table("orderLines");
  table.create = true;
  table.columns.add("productId", sql.Int, { nullable: true });
  table.columns.add("productName", sql.VarChar(35), { nullable: true });
  table.columns.add("productPrice", sql.Float, { nullable: true });
  table.columns.add("quantity", sql.Int, { nullable: true });

  for (const p of cart) {
    table.rows.add(p.productId, p.productName, p.productPrice, p.quantity);
  }
  const userid = 1;
  const billingAddress = "Mågevej";
  const billingCity = "Lyngby";
  const billingPostalCode = 2800;
  var request = sql.Request();
  request.input(
    "Products",
    table,
    userid,
    totalPrice,
    billingAddress,
    billingCity,
    billingPostalCode
  );

  const res = await request.execute("create_order");
  //return new sql.Request().bulk(table);
}

// const sql = require("mssql");

// export async function insertOrderProc(cart, totalPrice) {
//   await sql.connect(
//     "Server=localhost,1433;Database=Exam;User id=sa;Password=thisIsSuperStrong1234;Encrypt=true;trustServerCertificate=true"
//   );

//   const table = new tedious.Table("orderLines");
//   table.create = true;
//   table.columns.add("productId", tedious.TYPES.Int, { nullable: true });
//   table.columns.add("productName", tedious.TYPES.VarChar(35), { nullable: true });
//   table.columns.add("productPrice", tedious.TYPES.Float, { nullable: true });
//   table.columns.add("quantity", tedious.TYPES.Int, { nullable: true });

//   for (const p of cart) {
//     table.rows.add(p.productId, p.productName, p.productPrice, p.quantity);
//   }

//   const userid = 1;
//   const billingAddress = "Mågevej";
//   const billingCity = "Lyngby";
//   const billingPostalCode = 2800;

//   const request = new tedious.request();
//   //request.bulk(table);

//   return request;
// }
