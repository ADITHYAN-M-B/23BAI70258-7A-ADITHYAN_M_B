import React, { useState } from "react";
import axios from "axios";

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const login = async () => {
    setError("");
    const cleanUsername = username.trim();
    const cleanPassword = password.trim();

    if (!cleanUsername || !cleanPassword) {
      setError("Enter both username and password.");
      return;
    }

    try {
      const res = await axios.post("http://localhost:5000/api/auth/login", {
        username: cleanUsername,
        password: cleanPassword
      });

      if (res.data.token) {
        sessionStorage.setItem("token", res.data.token);
        window.location.href = "/dashboard";
      }
    } catch (err) {
      if (!err.response) {
        setError("Cannot reach backend at http://localhost:5000. Start the Spring Boot server.");
      } else if (err.response.status === 401) {
        setError("Invalid credentials. Use user123/password123 or admin123/admin123.");
      } else {
        setError(err.response?.data?.message || "Login failed. Please try again.");
      }
    }
  };

  return (
    <div className="container mt-5">
      <h2>Login</h2>
      <input className="form-control" onChange={(e)=>setUsername(e.target.value)} placeholder="Username" /><br/>
      <input className="form-control" type="password" onChange={(e)=>setPassword(e.target.value)} placeholder="Password" /><br/>
      {error && <div className="alert alert-danger py-2">{error}</div>}
      <button className="btn btn-primary" onClick={login}>Login</button>
    </div>
  );
}

export default Login;
