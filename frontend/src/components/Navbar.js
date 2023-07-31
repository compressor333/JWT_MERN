import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import ArticleSharpIcon from '@mui/icons-material/ArticleSharp';
import LoginSharpIcon from '@mui/icons-material/LoginSharp';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { reset, Logout } from '../store/authSlice';
import LogoutIcon from '@mui/icons-material/Logout';
import { setCurrentPage } from '../store/pagesSlice';
import useMediaQuery from '@mui/material/useMediaQuery'; // Import useMediaQuery hook



function Navbar() {
    const { currentPage, itemsPerPage } = useSelector((state) => state.pages)
    const isSmallScreen = useMediaQuery('(max-width:430px)');

    const { user1 } = useSelector((state) => state.auth)
    const navigate = useNavigate()
    const dispatch = useDispatch()

    const onLogout = () => {
        dispatch(Logout())
        dispatch(reset())
        navigate('/')
    }

    const resetPage = () => {
        dispatch(setCurrentPage(1))
    }
    return (
        <AppBar position="static">
            <Toolbar>
                <Box sx={{ flexGrow: 1 }}>
                    <Link to='/' style={{ display: 'flex', alignItems: 'center', color: 'inherit', textDecoration: 'none' }} onClick={resetPage}>
                        <ArticleSharpIcon sx={{ mr: 1, fontSize: isSmallScreen ? 25 : 30 }} />
                        <Typography variant='h6' sx={{ mr: 1, fontSize: isSmallScreen ? 20 : 20 }}> Task Tracker</Typography>
                    </Link>
                </Box>
                <Box> {user1 ? (<>
                    <Button sx={{ mr: 2 }} color="inherit" onClick={onLogout} to='/register'><LogoutIcon sx={{ mr: 1 }} /> Logout</Button>
                </>) : (<>
                    <Link to='register' style={{ color: 'inherit' }} >
                        <Button sx={{ mr: 2, fontSize: isSmallScreen ? 12 : 15}} color="inherit" ><AccountCircleIcon sx={{ mr: 1 }} /> Register</Button>
                    </Link>
                    <Link style={{ color: 'inherit'}} to='/login'>
                        <Button color="inherit" sx={{ fontSize: isSmallScreen ? 12 : 15}}><LoginSharpIcon sx={{ mr: 1 }} />Login</Button>
                    </Link> </>)}
                </Box>

            </Toolbar>
        </AppBar >
    )
}

export default Navbar