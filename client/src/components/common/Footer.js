import React from "react";
import { Box, Typography, Divider, Stack, useMediaQuery } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import EmailIcon from '@mui/icons-material/Email';
import FacebookIcon from '@mui/icons-material/Facebook';

const Footer = () => {
  const theme = useTheme();
  return (
    <Box
      sx={{
        py: 2,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        textAlign: 'center',
        backgroundColor: theme.palette.background.default, 
        width: '100%',
      }}
    >
      <Divider sx={{ width: '100%', mb: 2 }} />
      <Typography
        variant="body2"
        sx={{ textAlign: 'center', color: theme.palette.text.primary }} 
      >
        © {new Date().getFullYear()} InterView And CV Tracking System. All rights reserved.
      </Typography>
      <Stack direction="row" alignItems="center" sx={{ mt: 1, color: theme.palette.text.secondary }}>
        <FacebookIcon fontSize="small" sx={{ mr: 0.5 }} />
        <Typography variant="body2" sx={{ mr: 1 }}>
          <a href="https://www.facebook.com/yourcompany" target="_blank" rel="noopener noreferrer" style={{ color: theme.palette.text.secondary, textDecoration: 'none' }}>
            Facebook
          </a>
        </Typography>
        <EmailIcon fontSize="small" sx={{ mr: 0.5 }} />
        <Typography variant="body2">
          <a href="mailto:contact@yourcompany.com" style={{ color: theme.palette.text.secondary, textDecoration: 'none' }}>
            contact@yourcompany.com
          </a>
        </Typography>
      </Stack>
    </Box>
  );
};

export default Footer;