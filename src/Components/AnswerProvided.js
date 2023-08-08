import React, { useEffect, useState } from "react";
import AppBar from '@mui/material/AppBar';
import ChatIcon from '@mui/icons-material/Chat';
import CssBaseline from '@mui/material/CssBaseline';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Link from '@mui/material/Link';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useLocation } from "react-router-dom";


// TODO remove, this demo shouldn't need to reset the theme.
const defaultTheme = createTheme();

function Copyright() {
  return (
    <Typography variant="body2" color="text.secondary" align="center">
      {'Copyright © '}
      <Link color="inherit">
        Web Chat Assistance
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}


function AnswerProvided() {
    const location = useLocation();
    
    const [agentId, setAgentId] = useState('');
 


  useEffect(() => {
    let id = localStorage.getItem("AgentId");
    setAgentId(id);
  }, [])

  return (
    <>
      
      <ThemeProvider theme={defaultTheme}>
        <CssBaseline />
        <AppBar position="relative">
          <Toolbar>
            <ChatIcon sx={{ mr: 2 }} />
            <Typography variant="h6" color="inherit" noWrap>
              Web Chat Assistance
            </Typography>
          </Toolbar>
        </AppBar>
        <main>
          {/* Hero unit */}
          <Box
            sx={{
              bgcolor: 'background.paper',
              pt: 8,
              pb: 6,
            }}
          >
            <Container maxWidth="sm">
              <Typography
                component="h1"
                variant="h3"
                align="center"
                color="text.primary"
                gutterBottom
              >
                Hello Agent @{agentId}!
              </Typography>
              <Typography variant="h5" align="center" color="text.secondary" paragraph>
                Assist our clients in receiving appropriate answers to their questions. To get further questions, please respond to all of them.
              </Typography>
            </Container>
          </Box>
          <Container sx={{ py: 8 }} maxWidth="md" >
            {/* End hero unit */}
            <Grid container spacing={4}>
            <Typography variant="h5" align="center" color="text.secondary" paragraph>
                Question: - {location.state.questionText}
              </Typography>
              <br></br> 
              <br></br> 
              <Typography variant="h5" align="center" color="text.secondary" paragraph>        
                Answer: - {location.state.answerText}
                </Typography>
            </Grid>
          </Container>
        </main>
        {/* Footer */}
        <Box sx={{ bgcolor: 'background.paper', p: 6 }} component="footer">
          <Typography variant="h6" align="center" gutterBottom>
            You are our support heros.
          </Typography>
          <Typography
            variant="subtitle1"
            align="center"
            color="text.secondary"
            component="p"
          >
            Our Support team is fast, smart and help our users any time day or night!
          </Typography>
          <Copyright />
        </Box>
        {/* End footer */}
      </ThemeProvider>
    </>
  )
}

export default AnswerProvided;