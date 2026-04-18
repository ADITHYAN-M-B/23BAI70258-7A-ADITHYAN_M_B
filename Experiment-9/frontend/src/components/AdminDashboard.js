import React, { useState } from "react";
import API from "../api";
import { Alert, Box, Button, Card, CardContent, Stack, Typography } from "@mui/material";

function AdminDashboard() {
  const role = sessionStorage.getItem("role");
  const [message, setMessage] = useState("");

  if (role !== "ADMIN") {
    alert("Access Denied");
    window.location.href = "/";
    return null;
  }

  const fetchAdmin = async () => {
    try {
      const res = await API.get("/api/admin/dashboard");
      setMessage(`${res.data.message} (${res.data.username})`);
    } catch {
      setMessage("Unauthorized");
    }
  };

  const fetchUsers = async () => {
    try {
      const res = await API.get("/api/admin/users");
      setMessage(`Loaded ${res.data.length} users from admin API.`);
    } catch {
      setMessage("Failed to load users.");
    }
  };

  const fetchStats = async () => {
    try {
      const res = await API.get("/api/admin/stats");
      setMessage(`System status: ${res.data.status}, total users: ${res.data.totalUsers}`);
    } catch {
      setMessage("Failed to load stats.");
    }
  };

  return (
    <div className="simple-page">
      <Box className="container py-5">
        <Card className="simple-card simple-card-panel">
          <CardContent sx={{ p: { xs: 3, md: 4 } }}>
            <Box className="d-flex justify-content-between align-items-start mb-4 flex-wrap gap-2">
              <div>
                <div className="simple-kicker mb-2">ADMIN ACCESS</div>
                <Typography variant="h4" component="h1" sx={{ fontWeight: 800 }}>
                  Admin Dashboard
                </Typography>
              </div>
              <Button
                variant="outlined"
                onClick={() => {
                  sessionStorage.clear();
                  window.location.href = "/";
                }}
                sx={{ textTransform: "none", borderRadius: 2 }}
              >
                Logout
              </Button>
            </Box>

            <Stack direction={{ xs: "column", md: "row" }} spacing={2} sx={{ mb: 3 }}>
              <Button variant="contained" color="error" onClick={fetchAdmin} sx={{ textTransform: "none", borderRadius: 2, flex: 1 }}>
                Admin Data
              </Button>
              <Button variant="outlined" color="error" onClick={fetchUsers} sx={{ textTransform: "none", borderRadius: 2, flex: 1 }}>
                User List
              </Button>
              <Button variant="outlined" color="warning" onClick={fetchStats} sx={{ textTransform: "none", borderRadius: 2, flex: 1 }}>
                System Status
              </Button>
            </Stack>

            {message && (
              <Alert severity="success" sx={{ mt: 3 }}>
                {message}
              </Alert>
            )}
          </CardContent>
        </Card>
      </Box>
    </div>
  );
}

export default AdminDashboard;