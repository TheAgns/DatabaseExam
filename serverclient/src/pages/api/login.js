const { login, connect } = require("../../lib/loginService.js");

export default async function handler(req, res) {
  if (req.method !== "POST") {
    res.status(405).end();
    return;
  }

  const { username, password } = req.body;
  console.log(username, password);

  try {
    await connect();
    const loggedIn = await login(username, password);
    console.log(username, password);
    if (loggedIn) {
      res.status(200).json({ message: "Login successful" });
    } else {
      res.status(401).json({ message: "Invalid username or password" });
    }
  } catch (error) {
    console.error("Error logging in:", error.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
}
