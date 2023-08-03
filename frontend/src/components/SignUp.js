import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Register, reset } from '../store/authSlice';
import { useNavigate } from 'react-router-dom';
import CircularProgress from '@mui/material/CircularProgress';
import { toast, ToastContainer } from 'react-toastify/';
import "react-toastify/dist/ReactToastify.css";

export default function SignUp() {
  const [formData, setFormData] = useState({
    user: '',
    email: '',
    password: '',
    password2: '',
  })

  const [err, setErr] = useState(false) // email verification

  const { user, email, password, password2 } = formData
  const { user1, isFullfilled, isError, isLoading, message } = useSelector((state) => state.auth)

  const dispatch = useDispatch()
  const navigate = useNavigate()

  useEffect(() => {
    if (isError) {
      toast.error(message)
    }

    if (user1 && isFullfilled) {
      navigate('/')
    }
    dispatch(reset())
  }, [user1, isFullfilled, isError, navigate, dispatch, message, err])

  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }))
    console.log((e.target.name))

    if (e.target.name === 'email') {
      const email = e.target.value
      const atIndex = email.indexOf('@')
      if (email.length === 0) {
        setErr(true)
      } else if (atIndex === 0 || atIndex === -1 || atIndex === email.length - 1) {
        setErr(true)
      } else setErr(false)
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    const userData = {
      user,
      email,
      password,
    }

    if (!user || !email || !password || !password2) {
      toast.warn('fill all fields')
      return
    }
    if (password !== password2) {
      toast.warn('passwords do not match')
      return
    }
    if (!err) {
      dispatch(Register(userData))
    }
  }

  return isLoading ? (<>
  <CircularProgress />
  <ToastContainer />
  </>) : (

    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <Box
        sx={{
          marginBottom: 8,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign up
        </Typography>
        <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                autoComplete="given-name"
                name="user"
                required
                fullWidth
                id="Name"
                label="First Name"
                autoFocus
                value={user}
                onChange={onChange}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                error={err}
                helperText={err && 'invalid email'}
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                value={email}
                onChange={onChange}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="new-password"
                value={password}
                onChange={onChange}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                name="password2"
                label="Confirm Password"
                type="password2"
                id="password2"
                autoComplete="new-password"
                value={password2}
                onChange={onChange}
              />
            </Grid>
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Sign Up
          </Button>
          <Grid container justifyContent="flex-end">
            <Grid item>
            </Grid>
          </Grid>
        </Box>
      </Box>
      <ToastContainer />
    </Container>
  );
}