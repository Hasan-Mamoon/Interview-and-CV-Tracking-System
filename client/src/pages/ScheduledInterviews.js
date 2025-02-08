// import React, { useContext, useEffect, useState } from 'react';
// import axios from 'axios';
// import { Card, CardContent, Typography, Grid, CircularProgress, Alert } from '@mui/material';
// import { UserContext } from '../Context/UserContext';

// const ScheduledInterviews = () => {
   
//     const [interviews, setInterviews] = useState([]);
//     const [loading, setLoading] = useState(true);
//     const [error, setError] = useState(null);
//     const user = useContext(UserContext);

//     useEffect(() => {
//         const fetchInterviews = async () => {
//             try {
//                 const response = await axios.get(`http://localhost:3070/meetings/${user.user.email}`);
//                 setInterviews(response.data);
//             } catch (err) {
//                 setError(err.message);
//             } finally {
//                 setLoading(false);
//             }
//         };

//         fetchInterviews();
//     }, []);

//     if (loading) return <CircularProgress />;
//     if (error) return <Alert severity="error">{error}</Alert>;

//     return (
//         <div>
//             <Typography variant="h4" gutterBottom>
//                 Scheduled Interviews
//             </Typography>
//             <Grid container spacing={3}>
//                 {interviews.map((interview) => (
//                     <Grid item xs={12} sm={6} md={4} key={interview.id}>
//                         <Card>
//                             <CardContent>
//                                 <Typography variant="h5" component="div">
//                                     {interview.title}
//                                 </Typography>
//                                 <Typography color="textSecondary">
//                                     {interview.date} at {interview.time}
//                                 </Typography>
//                                 <Typography variant="body2" component="p">
//                                     Candidate: {interview.candidateName}
//                                 </Typography>
//                             </CardContent>
//                         </Card>
//                     </Grid>
//                 ))}
//             </Grid>
//         </div>
//     );
// };

// export default ScheduledInterviews;

//import React, { useContext, useEffect, useState } from 'react';
// import axios from 'axios';
// import { Card, CardContent, Typography, Grid, CircularProgress, Alert } from '@mui/material';
// import { UserContext } from '../Context/UserContext';
// import dayjs from 'dayjs';

// const ScheduledInterviews = () => {
//     const [interviews, setInterviews] = useState([]);
//     const [loading, setLoading] = useState(true);
//     const [error, setError] = useState(null);
//     const user = useContext(UserContext);

//     useEffect(() => {
//         const fetchInterviews = async () => {
//             try {
//                 const response = await axios.get(`http://localhost:3070/meetings/${user.user.email}`);
//                 setInterviews(response.data);
//             } catch (err) {
//                 setError(err.message);
//             } finally {
//                 setLoading(false);
//             }
//         };

//         fetchInterviews();
//     }, []);

//     if (loading) return <CircularProgress />;
//     if (error) return <Alert severity="error">{error}</Alert>;

//     return (
//         <div>
//             <Typography variant="h4" gutterBottom>
//                 Scheduled Interviews
//             </Typography>
//             <Grid container spacing={3}>
//                 {interviews.map((interview) => {
//                     // Extract date part only
//                     const formattedDate = dayjs(interview.date).format('YYYY-MM-DD');
//                     // Extract time part only
//                     const formattedTime = dayjs(interview.time).format('HH:mm A');

//                     return (
//                         <Grid item xs={12} sm={6} md={4} key={interview.id}>
//                             <Card>
//                                 <CardContent>
//                                     <Typography variant="h5" component="div">
//                                         {interview.title}
//                                     </Typography>
//                                     <Typography color="textSecondary">
//                                         {formattedDate} at {formattedTime}
//                                     </Typography>
//                                     <Typography variant="body2" component="p">
//                                         Candidate: {interview.candidateName}
//                                     </Typography>
//                                 </CardContent>
//                             </Card>
//                         </Grid>
//                     );
//                 })}
//             </Grid>
//         </div>
//     );
// };

// export default ScheduledInterviews;


// import React, { useContext, useEffect, useState } from 'react';
// import axios from 'axios';
// import { Card, CardContent, Typography, Grid, CircularProgress, Alert, Link } from '@mui/material';
// import { UserContext } from '../Context/UserContext';
// import dayjs from 'dayjs';

// const ScheduledInterviews = () => {
//     const [interviews, setInterviews] = useState([]);
//     const [loading, setLoading] = useState(true);
//     const [error, setError] = useState(null);
//     const user = useContext(UserContext);

//     useEffect(() => {
//         const fetchInterviews = async () => {
//             try {
//                 const response = await axios.get(`http://localhost:3070/meetings/${user.user.email}`);
//                 setInterviews(response.data);
//             } catch (err) {
//                 setError(err.message);
//             } finally {
//                 setLoading(false);
//             }
//         };

//         fetchInterviews();
//     }, []);

//     if (loading) return <CircularProgress />;
//     if (error) return <Alert severity="error">{error}</Alert>;

//     return (
//         <div>
//             <Typography variant="h4" gutterBottom>
//                 Scheduled Interviews
//             </Typography>
//             <Grid container spacing={3}>
//                 {interviews.map((interview) => {
//                     // Extract date part only
//                     const formattedDate = dayjs(interview.date).format('YYYY-MM-DD');
//                     // Extract time part only
//                     const formattedTime = dayjs(interview.time).format('hh:mm A');
//                     // Format participants as a readable list
//                     const participantsList = interview.participants?.join(", ") || "Not Available";

//                     return (
//                         <Grid item xs={12} sm={6} md={4} key={interview._id}>
//                             <Card>
//                                 <CardContent>
//                                     <Typography variant="h5" component="div">
//                                         {interview.title}
//                                     </Typography>
//                                     <Typography color="textSecondary">
//                                         {formattedDate} at {formattedTime}
//                                     </Typography>
//                                     <Typography variant="body2" component="p">
//                                         <strong>Participants:</strong> {participantsList}
//                                     </Typography>
//                                     <Typography variant="body2" component="p">
//                                         <strong>Meeting Link:</strong>{' '}
//                                         <Link href={interview.url} target="_blank" rel="noopener noreferrer">
//                                             {interview.url}
//                                         </Link>
//                                     </Typography>
//                                 </CardContent>
//                             </Card>
//                         </Grid>
//                     );
//                 })}
//             </Grid>
//         </div>
//     );
// };

// export default ScheduledInterviews;

import React, { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { 
    Card, CardContent, Typography, Grid, CircularProgress, Alert, Link, 
    Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle 
} from '@mui/material';
import { UserContext } from '../Context/UserContext';
import dayjs from 'dayjs';

const ScheduledInterviews = () => {
    const [interviews, setInterviews] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [openDialog, setOpenDialog] = useState(false);
    const [selectedInterview, setSelectedInterview] = useState(null);
    const [actionType, setActionType] = useState(null);
    
    const user = useContext(UserContext);

    useEffect(() => {
        const fetchInterviews = async () => {
            try {
                const response = await axios.get(`http://localhost:3070/meetings/${user.user.email}`);
                setInterviews(response.data);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchInterviews();
    }, []);

    const handleOpenDialog = (interview, action) => {
        setSelectedInterview(interview);
        setActionType(action);
        setOpenDialog(true);
    };

    const handleCloseDialog = () => {
        setOpenDialog(false);
        setSelectedInterview(null);
        setActionType(null);
    };

    const handleConfirmAction = async () => {
        if (!selectedInterview || !actionType) return;

        try {
            await axios.put(`http://localhost:3070/appdata/update-status/${selectedInterview._id}`, {
                status: actionType
            });

            alert(`Candidate ${actionType === 'approved' ? 'approved' : 'rejected'} successfully!`);

            // Refresh interviews list after action
            setInterviews((prevInterviews) =>
                prevInterviews.filter((int) => int._id !== selectedInterview._id)
            );
        } catch (error) {
            console.error(`Error updating status:`, error);
            alert("Failed to update candidate status.");
        } finally {
            handleCloseDialog();
        }
    };

    if (loading) return <CircularProgress />;
    if (error) return <Alert severity="error">{error}</Alert>;

    return (
        <div>
            <Typography variant="h4" gutterBottom>
                Scheduled Interviews
            </Typography>
            <Grid container spacing={3}>
                {interviews.map((interview) => {
                    const formattedDate = dayjs(interview.date).format('YYYY-MM-DD');
                    const formattedTime = dayjs(interview.time).format('hh:mm A');
                    const participantsList = interview.participants?.join(", ") || "Not Available";

                    return (
                        <Grid item xs={12} sm={6} md={4} key={interview._id}>
                            <Card>
                                <CardContent>
                                    <Typography variant="h5" component="div">
                                        {interview.title}
                                    </Typography>
                                    <Typography color="textSecondary">
                                        {formattedDate} at {formattedTime}
                                    </Typography>
                                    <Typography variant="body2" component="p">
                                        <strong>Interviewee:</strong> {interview.interviewee}
                                    </Typography>
                                    <Typography variant="body2" component="p">
                                        <strong>Participants:</strong> {participantsList}
                                    </Typography>
                                    <Typography variant="body2" component="p">
                                        <strong>Meeting Link:</strong>{' '}
                                        <Link href={interview.url} target="_blank" rel="noopener noreferrer">
                                            {interview.url}
                                        </Link>
                                    </Typography>
                                    <Button 
                                        variant="contained" 
                                        color="success" 
                                        onClick={() => handleOpenDialog(interview, 'approved')} 
                                        sx={{ mt: 2, mr: 1 }}
                                    >
                                        Approve
                                    </Button>
                                    <Button 
                                        variant="contained" 
                                        color="error" 
                                        onClick={() => handleOpenDialog(interview, 'rejected')} 
                                        sx={{ mt: 2 }}
                                    >
                                        Reject
                                    </Button>
                                </CardContent>
                            </Card>
                        </Grid>
                    );
                })}
            </Grid>

            {/* Confirmation Dialog */}
            <Dialog open={openDialog} onClose={handleCloseDialog}>
                <DialogTitle>Confirm Action</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Are you sure you want to {actionType} this candidate?
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCloseDialog} color="primary">Cancel</Button>
                    <Button onClick={handleConfirmAction} color={actionType === 'approved' ? "success" : "error"}>
                        Confirm
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
};

export default ScheduledInterviews;
