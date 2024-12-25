// import React from "react";
// import { Box, Typography, Divider } from "@mui/material";
// import { useTheme } from "@mui/material/styles";
// import EmailIcon from '@mui/icons-material/Email';

// const Footer = () => {
//   const theme = useTheme();

//   return (
//     <Box
//       sx={{
//         py: 2,
//         display: 'flex',
//         flexDirection: 'column',
//         alignItems: 'center',
//         textAlign: 'center',
//         mt: 4, // Add margin-top to separate from other content
//         backgroundColor: theme.palette.background.default, // Optional: Add a background color based on theme
//       }}
//     >
//       <Divider sx={{ width: '100%', mb: 2 }} />
//       <Typography
//         variant="body2"
//         sx={{ textAlign: 'center', color: theme.palette.text.primary }} // Set text color based on theme
//       >
//         © {new Date().getFullYear()} InterView And CV Tracking System. All rights reserved.
//       </Typography>
//       <Typography
//         variant="body2"
//         sx={{ textAlign: 'center', mt: 1, color: theme.palette.text.secondary }} // Set text color based on theme
//       >
//         <EmailIcon fontSize="small" sx={{ mr: 0.5 }} />
//         contact@yourcompany.com
//       </Typography>
//     </Box>
//   );
// };

// export default Footer;

// import React from "react";
// import { Box, Typography, Divider, Stack } from "@mui/material";
// import { useTheme } from "@mui/material/styles";
// import EmailIcon from '@mui/icons-material/Email';
// import FacebookIcon from '@mui/icons-material/Facebook';

// const Footer = () => {
//   const theme = useTheme();

//   return (
//     <Box
//       sx={{
//         py: 2,
//         display: 'flex',
//         flexDirection: 'column',
//         alignItems: 'center',
//         textAlign: 'center',
//         //mt: 40, // Add margin-top to separate from other content
//         //ml:'5vw',

//         backgroundColor: theme.palette.background.default, // Optional: Add a background color based on theme
//       }}
//     >
//       <Divider sx={{ width: '100%', mb: 2 }} />
//       <Typography
//         variant="body2"
//         sx={{ textAlign: 'center', color: theme.palette.text.primary }} // Set text color based on theme
//       >
//         © {new Date().getFullYear()} InterView And CV Tracking System. All rights reserved.
//       </Typography>
//       <Stack direction="row" alignItems="center" sx={{ mt: 1, color: theme.palette.text.secondary }}>
//       <FacebookIcon fontSize="small" sx={{ mr: 0.5 }} />
//         <Typography variant="body2" sx={{ mr: 1 }}>
//             <a href="https://www.facebook.com/yourcompany" target="_blank" rel="noopener noreferrer" style={{ color: theme.palette.text.secondary, textDecoration: 'none' }}>
//             Facebook
//             </a>
//         </Typography>

//         <EmailIcon fontSize="small" sx={{ mr: 0.5 }} />
//         <Typography variant="body2">
//             <a href="mailto:contact@yourcompany.com" style={{ color: theme.palette.text.secondary, textDecoration: 'none' }}>
//             contact@yourcompany.com
//             </a>
//         </Typography>

        
//       </Stack>
//     </Box>
//   );
// };

// export default Footer;

import React from "react";
import { Box, Typography, Divider, Stack, useMediaQuery } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import EmailIcon from '@mui/icons-material/Email';
import FacebookIcon from '@mui/icons-material/Facebook';

const Footer = () => {
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));

  const dashboardHeight = 100; // Example drawer width, adjust as needed
  const marginTop = isSmallScreen ? '20px' : `calc(100vh - ${dashboardHeight}px - 500px)`; // Adjust the calculation as needed

  return (
    <Box
      sx={{
        py: 2,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        textAlign: 'center',
        mt: marginTop, // Dynamically calculated margin-top
        backgroundColor: theme.palette.background.default, // Optional: Add a background color based on theme
        width: '100%', // Ensure the footer takes full width
      }}
    >
      <Divider sx={{ width: '100%', mb: 2 }} />
      <Typography
        variant="body2"
        sx={{ textAlign: 'center', color: theme.palette.text.primary }} // Set text color based on theme
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

// import React from "react";
// import { Box, Typography, Divider, Stack, useMediaQuery } from "@mui/material";
// import { useTheme } from "@mui/material/styles";
// import EmailIcon from '@mui/icons-material/Email';
// import FacebookIcon from '@mui/icons-material/Facebook';

// const Footer = () => {
//   const theme = useTheme();
//   const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));
//   const isMediumScreen = useMediaQuery(theme.breakpoints.down('md'));

//   const dashboardHeight = 100; // Example height, adjust as needed
//   const marginTop = isSmallScreen
//     ? '20px'
//     : isMediumScreen
//     ? `calc(100vh - ${dashboardHeight}px - 900px)` // Adjust the calculation as needed for medium screens
//     : `calc(100vh - ${dashboardHeight}px - 500px)`; // Adjust the calculation as needed for larger screens

//   return (
//     <Box
//       sx={{
//         py: 2,
//         display: 'flex',
//         flexDirection: 'column',
//         alignItems: 'center',
//         textAlign: 'center',
//         mt: marginTop, // Dynamically calculated margin-top
//         backgroundColor: theme.palette.background.default, // Optional: Add a background color based on theme
//         width: '100%', // Ensure the footer takes full width
//       }}
//     >
//       <Divider sx={{ width: '100%', mb: 2 }} />
//       <Typography
//         variant="body2"
//         sx={{ textAlign: 'center', color: theme.palette.text.primary }} // Set text color based on theme
//       >
//         © {new Date().getFullYear()} InterView And CV Tracking System. All rights reserved.
//       </Typography>
//       <Stack direction="row" alignItems="center" sx={{ mt: 1, color: theme.palette.text.secondary }}>
//         <FacebookIcon fontSize="small" sx={{ mr: 0.5 }} />
//         <Typography variant="body2" sx={{ mr: 1 }}>
//           <a href="https://www.facebook.com/yourcompany" target="_blank" rel="noopener noreferrer" style={{ color: theme.palette.text.secondary, textDecoration: 'none' }}>
//             Facebook
//           </a>
//         </Typography>
//         <EmailIcon fontSize="small" sx={{ mr: 0.5 }} />
//         <Typography variant="body2">
//           <a href="mailto:contact@yourcompany.com" style={{ color: theme.palette.text.secondary, textDecoration: 'none' }}>
//             contact@yourcompany.com
//           </a>
//         </Typography>
//       </Stack>
//     </Box>
//   );
// };

// export default Footer;