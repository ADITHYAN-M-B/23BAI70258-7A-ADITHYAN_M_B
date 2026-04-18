import React, { useState } from "react";
import API from "../api";
import { Alert, Box, Button, Card, CardContent, Stack, Typography } from "@mui/material";

function UserDashboard() {
  const role = sessionStorage.getItem("role");
  const [message, setMessage] = useState("");

  if (!role) {
    window.location.href = "/";
    return null;
  }

  const fetchData = async () => {
    try {
      const res = await API.get("/api/user/profile");
      setMessage(`${res.data.message} (${res.data.username})`);
    } catch {
      setMessage("Access denied to user profile.");
    }
  };

  const goToAdmin = async () => {
    try {
      await API.get("/api/admin/dashboard");
      setMessage("Admin API unexpectedly succeeded.");
    } catch {
      setMessage("USER role cannot access admin APIs.");
    }
  };

  return (
    <div className="simple-page">
      <Box className="container py-5">
        <Card className="simple-card simple-card-panel">
          <CardContent sx={{ p: { xs: 3, md: 4 } }}>
            <Box className="d-flex justify-content-between align-items-start mb-4 flex-wrap gap-2">
              <div>
                <div className="simple-kicker mb-2">USER ACCESS</div>
                <Typography variant="h4" component="h1" sx={{ fontWeight: 800 }}>
                  User Dashboard
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
              <Button variant="contained" color="success" onClick={fetchData} sx={{ textTransform: "none", borderRadius: 2, flex: 1 }}>
                Get Profile
              </Button>
              <Button variant="outlined" color="error" onClick={goToAdmin} sx={{ textTransform: "none", borderRadius: 2, flex: 1 }}>
                Test Admin Access
              </Button>
            </Stack>

            {message && (
              <Alert severity="info" sx={{ mt: 3 }}>
                {message}
              </Alert>
            )}
          </CardContent>
        </Card>
      </Box>
    </div>
  );
}

export default UserDashboard;