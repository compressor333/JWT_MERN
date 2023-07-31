import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import AddToPhotosIcon from '@mui/icons-material/AddToPhotos';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTask } from '../store/tasksSlice';
import { useDispatch, useSelector } from 'react-redux';
import { useState } from 'react';
import { toast, ToastContainer } from 'react-toastify';



// TODO remove, this demo shouldn't need to reset the theme.


export default function GoalForm() {
    const [task, setTask] = useState({
        text: ''
    })
    const dispatch = useDispatch()

    const handleSubmit = (event) => {
        event.preventDefault();
        console.log(task)
        if (task.text === '') {
            toast.warn('void input')
            return
        }
        dispatch(createTask(task))
    };

    const onChange = (e) => {
        setTask((prevState) => ({
            [e.target.name]: e.target.value
        }))
    }

    return (
        <>
            <Container component="main" maxWidth="xs">
                <CssBaseline />
                <Box
                    sx={{
                        marginBottom: 5,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                    }}
                >
                    <Avatar sx={{ m: 1, bgcolor: '#00FF00' }}>
                        <AddToPhotosIcon />
                    </Avatar>
                    <Typography component="h1" variant="h5">
                        Add Task
                    </Typography>
                    <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }} >
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            id="text"
                            label="create task"
                            name="text"
                            autoComplete="task"
                            autoFocus
                            onChange={onChange}
                        />
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{ mt: 3, mb: 2 }}
                        >
                            Create Task
                        </Button>
                    </Box>
                </Box>
            </Container>
            <ToastContainer />
        </>
    );
}