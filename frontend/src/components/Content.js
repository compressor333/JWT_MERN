import Box from '@mui/material/Box';
import { Route, Routes } from "react-router-dom";
import SignIn from './SignIn';
import SignUp from './SignUp';
import Dashboard from './Dashboard';




const Content = () => {
    return (
        <Box
            display='flex'
            justifyContent='center'
            alignItems='center'
        >
            <Box
                margin='10px'
                display='flex'
                justifyContent='center'
                alignItems='center'
                width='100%'
                height='87vh'
                color='primary.main'
            >
                <Routes>
                    <Route path='/' element={<Dashboard />} />
                    <Route path='/login' element={<SignIn />} />
                    <Route path='/register' element={<SignUp />} />
                </Routes>
            </Box>
        </Box>
    );
};

export default Content;