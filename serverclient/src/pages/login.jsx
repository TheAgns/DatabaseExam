import React, { useState } from "react";
//import { loginService } from "../lib/loginService.js";
import loginService from "../lib/loginService.js";

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const welcomeMessage = await loginService(username, password);
      setMessage(welcomeMessage);
    } catch (error) {
      setMessage(error.message);
    }
  };

  return (
    <div>
      <h1>Login</h1>
      <form onSubmit={handleSubmit}>
        <label htmlFor="username">Username:</label>
        <input
          type="text"
          id="username"
          name="username"
          value={username}
          onChange={(event) => setUsername(event.target.value)}
          required
        /><br />

        <label htmlFor="password">Password:</label>
        <input
          type="password"
          id="password"
          name="password"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
          required
        /><br />

        <input type="submit" value="Submit" />
      </form>

      {message && <p>{message}</p>}
    </div>
  );
}

export default Login;
