import React, { useState } from "react";
import loginService from "../services/login";
import blogService from "../services/blogs";

const Login = ({ setUser }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (event) => {
    event.preventDefault();

    try {
      const user = await loginService.login({
        username,
        password,
      });

      window.localStorage.setItem("blogAppUser", JSON.stringify(user));

      blogService.setToken(user.token);

      setUser(user);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="login">
      <div>
        <h3>Login to Blog App</h3>
        <form onSubmit={handleLogin}>
          <div>
            username
            <input
              type="text"
              value={username}
              name="Username"
              onChange={({ target }) => setUsername(target.value)}
            />
          </div>
          <div>
            password
            <input
              type="password"
              value={password}
              name="Password"
              onChange={({ target }) => setPassword(target.value)}
            />
          </div>
          <button type="submit">login</button>
        </form>
      </div>
    </div>
  );
};

export default Login;
