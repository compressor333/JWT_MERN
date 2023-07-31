import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { useDispatch, useSelector } from 'react-redux';
import { deleteTask } from '../store/tasksSlice';




export default function Item({ task1 }) {

    const dispatch = useDispatch()
    console.log(task1)
    // const { tasks } = useSelector((state) => state.tasks)
    return (
        <Card variant="outlined" sx={{ minWidth: 200, maxHeight: 100, borderColor: 'primary.main',  }}>
            <CardContent>
                <Typography sx={{ fontSize: 14 }} color="text.primary">Date: {new Date(task1.createdAt).toLocaleString('en-US')}</Typography>
                <Typography sx={{ fontSize: 14 }} color="text.primary">
                   Task: {task1.text}
                </Typography>
                <CardActions>
                    <Button onClick={() => dispatch(deleteTask(task1._id))} size="small">Delete</Button>
                </CardActions>
            </CardContent>

        </Card>
    );
}