import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Login, reset } from '../store/authSlice';
import { toast, ToastContainer } from 'react-toastify';
import CircularProgress from '@mui/material/CircularProgress';
import "react-toastify/dist/ReactToastify.css";

export default function SignIn() {
    const [formData, setFormData] = useState({
        email: '',
        password: '',
    })

    const [err, setErr] = useState(false) // email verification
    const { password, email } = formData
    const { user1, isLoading, isError, isFullfilled, message } = useSelector((state) => state.auth)

    const dispatch = useDispatch()
    const navigate = useNavigate()

    useEffect(() => {
        if (isError) {
            toast.error(message)
        }
        if (user1 || isFullfilled) {
            navigate('/')
        }
        dispatch(reset())
    }, [user1, isError, isFullfilled, message, navigate, dispatch])

    const handleSubmit = (e) => {
        e.preventDefault();
        const user = {
            email,
            password
        }
        if (!user.email || !user.password) {
            toast.warn('fill all fields')
            return
        }
        if (!err) {
            dispatch(Login(user))
        }
    };

    const onChange = (e) => {
        setFormData((prevState) => ({
            ...prevState,
            [e.target.name]: e.target.value
        })
        )
        if (e.target.name === 'email') {
            const email = e.target.value
            const atIndex = email.indexOf('@')
            if (email.length === 0) {
                setErr(false)
            } else if (atIndex === 0 || atIndex === -1 || atIndex === email.length - 1) {
                setErr(true)
            } else setErr(false)
        }
    }

    return isLoading ? (<>
        <CircularProgress />
        <ToastContainer />
    </>) : (
        <>
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
                        Sign in
                    </Typography>
                    <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
                        <TextField
                            error={err}
                            helperText={err && 'invalid email'}
                            margin="normal"
                            required
                            fullWidth
                            type="email"
                            id="email"
                            label="Email Address"
                            name="email"
                            autoComplete="email"
                            autoFocus
                            value={email}
                            onChange={onChange}
                        />
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            name="password"
                            label="Password"
                            type="password"
                            id="password"
                            autoComplete="current-password"
                            value={password}
                            onChange={onChange}
                        />
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{ mt: 3, mb: 2 }}
                        >
                            Sign In
                        </Button>
                    </Box>
                </Box>
            </Container>
            <ToastContainer />
        </>
    );
}
