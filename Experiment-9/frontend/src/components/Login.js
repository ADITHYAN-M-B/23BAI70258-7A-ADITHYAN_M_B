import React, { useState } from "react";
import API from "../api";
import { Alert, Box, Button, Card, CardContent, Stack, TextField, Typography } from "@mui/material";

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const login = async () => {
    setError("");
    setLoading(true);

    try {
      const res = await API.post("/api/auth/login", {
        username,
        password
      });

      const roles = Array.isArray(res.data.roles) ? res.data.roles : [];
      const role = roles.includes("ROLE_ADMIN") ? "ADMIN" : "USER";
      const auth = `Basic ${btoa(`${username}:${password}`)}`;

      sessionStorage.setItem("user", username);
      sessionStorage.setItem("auth", auth);
      sessionStorage.setItem("role", role);
      sessionStorage.setItem("roles", JSON.stringify(roles));
      sessionStorage.setItem("loginResponse", JSON.stringify(res.data));

      if (role === "ADMIN") {
        window.location.href = "/admin";
      } else {
        window.location.href = "/user";
      }

    } catch (err) {
      setError("Invalid username or password. Try user1/user123 or admin1/admin123.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="simple-page">
      <Box className="container py-5">
        <Box className="row justify-content-center align-items-center min-vh-100">
          <Box className="col-12 col-sm-10 col-md-8 col-lg-10">
            <Card className="simple-card simple-card-login">
              <CardContent sx={{ p: { xs: 3, md: 4 } }}>
                <Box className="row g-4 align-items-center">
                  <Box className="col-12 col-lg-5">
                    <div className="simple-kicker mb-2">RBAC Demo</div>
                    <Typography variant="h3" component="h1" sx={{ fontWeight: 800, mb: 1 }}>
                      Sign in
                    </Typography>
                  </Box>

                  <Box className="col-12 col-lg-7">
                    <Stack spacing={2.2}>
                      {error && <Alert severity="error">{error}</Alert>}

                      <TextField
                        label="User ID"
                        fullWidth
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                      />

                      <TextField
                        label="Password"
                        type="password"
                        fullWidth
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                      />

                      <Button
                        variant="contained"
                        size="large"
                        onClick={login}
                        disabled={loading}
                        sx={{ py: 1.4, borderRadius: 2, textTransform: "none", fontWeight: 700 }}
                      >
                        {loading ? "Signing in..." : "Login"}
                      </Button>

                      <Typography variant="body2" color="text.secondary" align="center">
                        Demo: user1 / user123 or admin1 / admin123
                      </Typography>
                    </Stack>
                  </Box>
                </Box>
              </CardContent>
            </Card>
          </Box>
        </Box>
      </Box>
    </div>
  );
}

export default Login;