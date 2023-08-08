import React, { useEffect, useState } from "react";
import AppBar from '@mui/material/AppBar';
import Button from '@mui/material/Button';
import ChatIcon from '@mui/icons-material/Chat';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import CssBaseline from '@mui/material/CssBaseline';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Link from '@mui/material/Link';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Axios from "../Config/Axios";
import CircularProgress from '@mui/material/CircularProgress';
import { useNavigate } from "react-router-dom";



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


function Home() {
  const navigate = useNavigate();
  const [agentId, setAgentId] = useState('');
  const [questions, setQuestions] = useState([]);
  const [answeredQuestions, setAnsweredQuestions] = useState([]);
  const [currState, setCurrState] = useState(true);
  const [loading, setLoading] = useState(false);

  const handleClickOpen = async (id, text) => {
    // navigate('/answerProvided', {state: {"badri": "vishal"}})
    // return;
    const body = { questionId: id };
    const config = {
      headers: {
        "content-type": "application/json",
      },
      mode: "cors",
    };

    const result = await Axios.post('/answer/getAnswer', body, config);
    navigate('/answerProvided', {state: {questionText: text, answerText: result.data.answer[0].answerText}})
  };

  const getAllQuestions = async (id) => {
    setLoading(true);
    const body = { agentId: id };
    const config = {
      headers: {
        "content-type": "application/json",
      },
      mode: "cors",
    };

    const result = await Axios.post('/questions/getQuestions', body, config);
    setQuestions(result.data.assignedQuestions)
    setLoading(false);
  }

  const handleQuestionToAnswer = async () => {
    setLoading(true);
    if (currState == true) return;
    setCurrState(true);
    setLoading(false);
  }

  const handleAnsweredQuestion = async () => {
    console.log(3, currState, loading, answeredQuestions);

    if (currState == false) return;
    setCurrState(false);
    setLoading(true);


    if (answeredQuestions.length == 0) {
      console.log("heelo")
      const body = { agentId: agentId };
      const config = {
        headers: {
          "content-type": "application/json",
        },
        mode: "cors",
      };

      const result = await Axios.post('/questions/allAnsweredQuestions', body, config);
      setAnsweredQuestions(result.data.answeredQuestion)
    }
    setLoading(false);
  }

  const handleAnswer = (questionid, questiontext) => {
    navigate('/answerQuestion', {state: {questionText: questiontext, questionId: questionid}})
  }

  useEffect(() => {
    let id = localStorage.getItem("AgentId");
    setAgentId(id);
    getAllQuestions(id)
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
              <Stack
                sx={{ pt: 4 }}
                direction="row"
                spacing={2}
                justifyContent="center"
              >
                {currState == true ? <Button variant="contained" onClick={() => handleQuestionToAnswer()} >Questions To be answered</Button> : <Button variant="outlined" onClick={() => handleQuestionToAnswer()} >Questions To be answered</Button>}
                {currState == true ? <Button variant="outlined" onClick={() => handleAnsweredQuestion()}>Already Answered Questions</Button> : <Button variant="contained" onClick={() => handleAnsweredQuestion()}>Already Answered Questions</Button>}

              </Stack>
            </Container>
          </Box>
          <Container sx={{ py: 8 }} maxWidth="md" >
            {/* End hero unit */}
            <Grid container spacing={4}>
              {loading ? <CircularProgress align="center" /> : <>
                {currState ? <>
                  {questions.map((card, index) => (
                    <Grid item key={card.questionId} xs={12} sm={6} md={4}>
                      <Card
                        sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}
                      >
                        <CardMedia
                          component="div"
                          sx={{
                            // 16:9
                            pt: '56.25%',
                          }}
                          image={`https://source.unsplash.com/random/${index + 1}?wallpapers`}
                        />
                        <CardContent sx={{ flexGrow: 1 }}>
                          <Typography gutterBottom variant="h5" component="h2">
                            Question {index + 1}
                          </Typography>
                          <Typography>
                            {card.questionText}
                          </Typography>
                        </CardContent>
                        <CardActions>
                          <Button size="small" onClick={()=>navigate('/user', {state: {id: card.askedByUserId}})} >View User Profile</Button>
                          <Button size="small" onClick={()=>handleAnswer(card.questionId, card.questionText)} >Answer</Button>
                        </CardActions>
                      </Card>
                    </Grid>
                  ))}</> : <> {answeredQuestions.length == 0 ? <p>No Questions Answered by you....</p> : <> {answeredQuestions.map((card, index) => (
                    <Grid item key={card.questionId} xs={12} sm={6} md={4}>
                      <Card
                        sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}
                      >
                        <CardMedia
                          component="div"
                          sx={{
                            // 16:9
                            pt: '56.25%',
                          }}
                          image={`https://source.unsplash.com/random/${index + 1}?wallpapers`}
                        />
                        <CardContent sx={{ flexGrow: 1 }}>
                          <Typography gutterBottom variant="h5" component="h2">
                            Question {index + 1}
                          </Typography>
                          <Typography>
                            {card.questionText}
                          </Typography>
                        </CardContent>
                        <CardActions>
                          <Button size="small">View User</Button>
                          <Button size="small" onClick={() => handleClickOpen(card.questionId, card.questionText)}>View Answer</Button>
                        </CardActions>
                      </Card>

                    </Grid>
                  ))}</>} </>}</>}
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

export default Home;