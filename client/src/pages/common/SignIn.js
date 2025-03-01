import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../Context/AuthContext";
import Alert from "@mui/material/Alert";
import { Link } from "react-router-dom";

export default function SignIn() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const { login } = useContext(AuthContext);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError(null);

    const result = await login(email, password);
    if (result.success) {
      navigate(
        result.user.role === "mentor"
          ? "/mentor/dashboard"
          : "/applicant/dashboard"
        
      );
    } else {
      setError(result.error);
    }
  };

  return (
    <Grid
      container
      component="main"
      sx={{
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        background: "linear-gradient(to right, rgb(13, 17, 16), rgba(80, 36, 163, 0.42))",
      }}
    >
      <CssBaseline />
      <Box
        sx={{
          width: "100%",
          maxWidth: 400,
          p: 4,
          backgroundColor: "rgba(255, 255, 255, 0.1)",
          borderRadius: 2,
          boxShadow: 3,
          textAlign: "center",
          backdropFilter: "blur(10px)",
        }}
      >
        {/* Centering the Avatar & Text */}
        <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center", mb: 2 }}>
          <Avatar sx={{ bgcolor: "primary.main", mb: 1 }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign In
          </Typography>
        </Box>

        {/* Error Message */}
        {error && (
          <Alert severity="error" sx={{ width: "100%", mb: 2 }}>
            {error}
          </Alert>
        )}

        {/* Form */}
        <Box component="form" noValidate onSubmit={handleSubmit} sx={{ width: "100%" }}>
          <TextField
            margin="normal"
            required
            fullWidth
            label="Email Address"
            autoComplete="email"
            onChange={(event) => setEmail(event.target.value)}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            label="Password"
            type="password"
            autoComplete="current-password"
            onChange={(event) => setPassword(event.target.value)}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{
              mt: 3,
              mb: 2,
              backgroundColor: "#2ebf91",
              "&:hover": { backgroundColor: "#1ea672" },
            }}
          >
            Sign In
          </Button>
          <Typography variant="body2">
            Don't have an account?{" "}
            <Link to="/user/signup" style={{ color: "#2ebf91", textDecoration: "none", fontWeight: "bold" }}>
              Sign Up
            </Link>
          </Typography>
        </Box>
      </Box>
    </Grid>
  );
}