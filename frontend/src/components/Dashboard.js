import { useEffect, useState } from "react"
import Item from "./item"
import Grid from '@mui/material/Grid';
import { Box, CircularProgress, Typography } from "@mui/material";
import { useSelector, useDispatch } from "react-redux"
import { useNavigate } from "react-router-dom"
import { getTasks, reset } from "../store/tasksSlice"
import GoalForm from './GoalForm'
import Button from "@mui/material/Button";
import { setCurrentPage } from "../store/pagesSlice";



const Dashboard = () => {

  const navigate = useNavigate()
  const dispatch = useDispatch()

  const { user1, isLoading1 } = useSelector((state) => state.auth)
  const { currentPage, itemsPerPage } = useSelector((state) => state.pages)
  const { tasks, isLoading, isError, message } = useSelector((state) => state.tasks)

  // const itemsPerPage = 4;
  // const [currentPage, setCurrentPage] = useState(1);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const itemsToShow = tasks.slice(startIndex, endIndex);
  const totalPages = Math.ceil(tasks.length / itemsPerPage);

  useEffect(() => {
    if (itemsToShow.length === 0 && currentPage > 1) {
      dispatch(setCurrentPage(currentPage - 1)); // Update currentPage in Redux to previous page
    }
  }, [currentPage, itemsToShow.length, dispatch]);

  useEffect(() => {
    console.log(isLoading)

    try {
      if (user1 === null || user1 === undefined || !user1) {
        navigate('/register')
      }
    dispatch(getTasks())
            
    dispatch(reset())
    } catch (error) {
      dispatch(reset())
      return error.message
    }
  }, [user1, dispatch])


  const handlePageChange = (pageNumber) => {
    console.log(pageNumber)
    dispatch(setCurrentPage(pageNumber));
  };

  let firstPage = Math.max(currentPage - 1, 1);
  let lastPage = Math.min(currentPage + 2, totalPages);

  // Ensure there are exactly four buttons in the pagination
  if (lastPage - firstPage + 1 < 4) {
    if (firstPage === 1) {
      lastPage = Math.min(4, totalPages);
    } else if (lastPage === totalPages) {
      firstPage = Math.max(totalPages - 3, 1);
    }
  }

  return  (
    <div>
      <GoalForm />
      <Box mt={2} mx="auto" maxWidth={600} maxHeight={400} >
        {isLoading ? (<Box display="flex" justifyContent="center" alignItems="center"><CircularProgress /></Box>) : itemsToShow.length === 0 ? (<Box display="flex" justifyContent="center" alignItems="center"><Typography color="text.primary" variant="h4">No items to show</Typography></Box>) : (<Grid display="flex" justifyContent="center" alignItems="center" container spacing={{ xs: 3, md: 3 }} columns={{ xs: 'auto', sm: 'auto', md: 'auto' }}>
          {itemsToShow.map((tasks, index) => (
            <Grid item xs={2} sm={2} md={2} key={tasks._id} >
              <Item task1={tasks} />
            </Grid>
          ))}
        </Grid>)}
        <Box mt={2} display="flex" justifyContent="center" marginTop={7}>
          {Array.from({ length: lastPage - firstPage + 1 }, (_, index) => (
            <Button
              key={firstPage + index}
              variant={firstPage + index === currentPage ? 'contained' : 'outlined'}
              mg={3}
              color="primary"
              onClick={() => handlePageChange(firstPage + index)}
            >
              {firstPage + index}
            </Button>
          ))}
        </Box>
      </Box>
    </div>
  )
}

export default Dashboard