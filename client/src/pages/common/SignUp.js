import * as React from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import axios from "axios";

export default function SignUp() {
  const [error, setError] = useState(null);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const email = data.get("email");
    const password = data.get("password");
    const firstname = data.get("firstName");
    const lastname = data.get("lastName");
    const role = data.get("role");

    try {
      const response = await axios.post(`${process.env.REACT_APP_EPIC1_URL}/user/signup`, {
        email,
        password,
        firstname,
        lastname,
        role,
      });
      console.log(response.data);
      setError(null);
    } catch (error) {
      console.error("Error signing up:", error);
      setError(error.response?.data?.message || "An unexpected error occurred.");
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
        <Avatar sx={{ m: "auto", bgcolor: "secondary.main" }}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5" sx={{ mb: 2 }}>
          Sign Up
        </Typography>
        <Box component="form" noValidate onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField name="firstName" required fullWidth label="First Name" />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField name="lastName" required fullWidth label="Last Name" />
            </Grid>
            <Grid item xs={12}>
              <TextField name="email" required fullWidth label="Email Address" />
            </Grid>
            <Grid item xs={12}>
              <TextField name="password" required fullWidth label="Password" type="password" />
            </Grid>
            <Grid item xs={12}>
              <FormControl component="fieldset">
                <FormLabel component="legend">Role</FormLabel>
                <RadioGroup row aria-label="role" name="role" defaultValue="applicant">
                  <FormControlLabel value="applicant" control={<Radio />} label="Applicant" />
                  <FormControlLabel value="mentor" control={<Radio />} label="Mentor" />
                </RadioGroup>
              </FormControl>
            </Grid>
            
          </Grid>
          {error && (
            <Typography color="error" variant="body2" sx={{ mt: 2 }}>
              {error}
            </Typography>
          )}
          <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
            Sign Up
          </Button>
          <Typography variant="body2">
            Already have an account?{" "}
            <Link to="/user/signin" variant="body2">
              Sign in
            </Link>
          </Typography>
        </Box>
      </Box>
    </Grid>
  );
}