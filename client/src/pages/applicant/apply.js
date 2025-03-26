import React, { useContext, useState } from "react";
import { TextField, Button, Typography, Card} from "@mui/material";
import Grid from "@mui/material/Grid";
import { AuthContext } from "../../Context/AuthContext";

const JobApplication = () => {
    const {auth} = useContext(AuthContext);
  const [formData, setFormData] = useState({
    firstname: "",
    lastname: "",
    email: `${auth.user.email}`,
    speciality: "",
    degree: "",
    experience: "",
    about: "",
    cv: null,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setFormData((prev) => ({ ...prev, cv: file }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.cv) {
      alert("Please upload your CV.");
      return;
    }

    const formDataObj = new FormData();
    Object.keys(formData).forEach((key) => {
      formDataObj.append(key, formData[key]);
    });

    try {
      const response = await fetch(`${process.env.REACT_APP_EPIC2_URL}/apply/update/${auth.user.email}`, {
        method: "POST",
        body: formDataObj,
      });

      if (!response.ok) throw new Error("Failed to submit application");

      alert("Application submitted successfully!");
      setFormData({
        firstname: "",
        lastname: "",
        email: "",
        speciality: "",
        degree: "",
        experience: "",
        about: "",
        cv: null,
      });
    } catch (error) {
      alert("Error submitting application: " + error.message);
    }
  };

  return (

      <Card
        sx={{
          width: "90%",
          maxWidth: 600,
          p: 4,
          backgroundColor: "rgba(255, 255, 255, 0.1)",
          borderRadius: 2,
          boxShadow: 3,
          backdropFilter: "blur(10px)",
        }}
      >
        <Typography variant="h5" color="#fff" align="center" mb={2}>
          Apply
        </Typography>

        <form onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            {/* First Name & Last Name */}
            <Grid item xs={12} sm={6}>
              <TextField
                label="First Name"
                name="firstname"
                value={formData.firstname}
                onChange={handleChange}
                fullWidth
                required
                InputLabelProps={{ style: { color: "#fff" } }}
                InputProps={{ style: { color: "#fff" } }}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Last Name"
                name="lastname"
                value={formData.lastname}
                onChange={handleChange}
                fullWidth
                required
                InputLabelProps={{ style: { color: "#fff" } }}
                InputProps={{ style: { color: "#fff" } }}
              />
            </Grid>

            {/* Email - Full Width */}
            <Grid item xs={12}>
              <TextField
                label="Email"
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                fullWidth
                required
                InputLabelProps={{ style: { color: "#fff" } }}
                InputProps={{ style: { color: "#fff" } }}
              />
            </Grid>
            

            {/* Speciality & Degree */}
            <Grid item xs={12} sm={6}>
              <TextField
                label="Speciality"
                name="speciality"
                value={formData.speciality}
                onChange={handleChange}
                fullWidth
                required
                InputLabelProps={{ style: { color: "#fff" } }}
                InputProps={{ style: { color: "#fff" } }}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Degree"
                name="degree"
                value={formData.degree}
                onChange={handleChange}
                fullWidth
                required
                InputLabelProps={{ style: { color: "#fff" } }}
                InputProps={{ style: { color: "#fff" } }}
              />
            </Grid>

            {/* Experience - Full Width */}
            <Grid item xs={12}>
              <TextField
                label="Experience"
                name="experience"
                value={formData.experience}
                onChange={handleChange}
                fullWidth
                required
                InputLabelProps={{ style: { color: "#fff" } }}
                InputProps={{ style: { color: "#fff" } }}
              />
            </Grid>

            {/* About You - Full Width */}
            <Grid item xs={12}>
              <TextField
                label="About Yourself"
                name="about"
                value={formData.about}
                onChange={handleChange}
                fullWidth
                multiline
                rows={3}
                required
                InputLabelProps={{ style: { color: "#fff" } }}
                InputProps={{ style: { color: "#fff" } }}
              />
            </Grid>

            {/* CV Upload */}
            <Grid item xs={12}>
              <input
                type="file"
                accept=".pdf,.doc,.docx"
                onChange={handleFileChange}
                required
                style={{ color: "#fff" }}
              />
            </Grid>

            {/* Submit Button */}
            <Grid item xs={12}>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ bgcolor: "#2ebf91", "&:hover": { bgcolor: "#24a074" } }}
              >
                Submit Application
              </Button>
            </Grid>
          </Grid>
        </form>
      </Card>
  
  );
};

export default JobApplication;
