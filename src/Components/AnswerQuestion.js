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
import TextField from '@mui/material/TextField';
import Divider from '@mui/material/Divider';
import Button from '@mui/material/Button';
import Axios from "../Config/Axios";

import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import CircularProgress from '@mui/material/CircularProgress';




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


function AnswerQuestion() {
  const location = useLocation();
  const navigate = useNavigate();

  const [agentId, setAgentId] = useState('');
  const [answer, setAnswer] = useState('');
  const [loader, setLoader] = useState(false);

  const handleAnswerQuestion = async() => {
    if(answer == '') {
      alert('Please enter answer....');
      return;
    }
    setLoader(true);
    const body = {questionId: location.state.questionId}
    const config = {
      headers: {
        "content-type": "application/json",
      },
      mode: "cors",
    };
    
    const result = await Axios.post('/questions/answerQuestion', body, config);
    console.log(result);

    if(result.data.status == true) {
      const body2 = {answerId: String(Math.random()*1000 + 99), questionId: location.state.questionId, answerText: answer};
      const result2 = await Axios.post('/answer/answerQuestion', body2, config);
      console.log(result2);
      if(result2.data.status == true) {
        Swal.fire({
          position: "top-center",
          icon: "success",
          title: "Answered successfully...",
          showConfirmButton: false,
          timer: 2000,
        });
        navigate('/home');
        setLoader(false);
      }
    }
  }



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
            <Typography variant="h6" gutterBottom>
              Question: - {location.state.questionText}
            </Typography>
            <Grid container spacing={3}>
              <Grid item xs={12} sm={12}>
                <TextField
                  required
                  id="answer"
                  name="answer"
                  label=""
                  fullWidth
                  autoComplete="given-name"
                  variant="standard"
                  onChange={(event)=>setAnswer(event.target.value)}
                  value={answer}
                />
                {loader==true?<CircularProgress />:
                <Button
                  variant="contained"
                  sx={{ mt: 3, ml: 1 }}
                  onClick={()=>handleAnswerQuestion()}
                >
                  {"Answer Query"}
                </Button>
}
              </Grid>
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

export default AnswerQuestion;