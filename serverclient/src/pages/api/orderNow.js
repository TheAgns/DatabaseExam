const sql = require("mssql");

export async function insertOrderProc(cart, totalPrice) {
  await sql.connect(
    "Server=localhost,1433;Database=Exam;User id=sa;Password=thisIsSuperStrong1234;Encrypt=true;trustServerCertificate=true"
  );
  table = new sql.Table("orderLines");
  table.create = true;
  table.columns.add("productId", sql.Int, { nullable: true });
  table.columns.add("productName", sql.VarChar(35), { nullable: true });
  table.columns.add("productPrice", sql.Float, { nullable: true });
  table.columns.add("quantity", sql.Int, { nullable: true });

  for (p of cart) {
    table.rows.add(p.productId, p.productName, p.productPrice, p.quantity);
  }
  const userid = 1;
  const billingAddress = "Mågevej";
  const billingCity = "Lyngby";
  const billingPostalCode = 2800;
  const res = await sql.request;

  return new sql.Request().bulk(table);
}
