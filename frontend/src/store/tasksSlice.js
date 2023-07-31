import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
const url = 'https://jwt-mern-p322.onrender.com//api/tasks/'

const initialState = {
    tasks: [],
    isLoading: true,
    isError: false,
    isFulfilled: false,
    message: '',
}

export const createTask = createAsyncThunk(
    'tasks/create',
    async (taskData, { getState, rejectWithValue }) => {
        try {
            const token = getState().auth.user1.token
            console.log(token)
            console.log(taskData)
            const res = await fetch(url, {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(taskData), // Convert data to JSON format for the request body
            });
            const data = await res.json()
            if (!res.ok) {
                throw new Error(data.error)
            }
            return data
        } catch (error) {
            return rejectWithValue(error.message)
        }
    }
)

export const getTasks = createAsyncThunk(
    'tasks/get',
    async (_, thunkAPI) => {
        try {
            const token = thunkAPI.getState().auth.user1.token
            console.log(token)
            const res = await fetch(url, {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${token}`,
                },
            })
            const data = await res.json()
            console.log(data)
            console.log('from get')
            if (!res.ok) {
                throw new Error(data.error)
            }
            console.log(data)
            return data
        } catch (error) {
            return thunkAPI.rejectWithValue(error.message)
        }
    }
)

export const deleteTask = createAsyncThunk(
    'tasks/delete',
    async (_id, { getState, rejectWithValue }) => {
        try {
            const token = getState().auth.user1.token
            console.log(token)
            const res = await fetch(url + _id, {
                method: 'DELETE',
                headers: {
                    'Authorization': `Bearer ${token}`,
                },
            });
            const data = await res.json()
            if (!res.ok) {
                throw new Error(data.error)
            }
            return data
        } catch (error) {
            return rejectWithValue(error.message)
        }
    }
)

const tasksSlice = createSlice({
    name: 'tasks',
    initialState,
    reducers: {
        reset: (state) => initialState,
    },
    extraReducers: {
        [createTask.pending]: (state, action) => {
            state.isLoading = true
        },
        [createTask.fulfilled]: (state, action) => {
            state.isLoading = false
            state.tasks.push(action.payload)
            console.log(state.task)
        },
        [createTask.rejected]: (state, action) => {
            state.isLoading = false
            state.message = action.payload
        },
        [getTasks.pending]: (state, action) => {
            state.isLoading = true
            console.log(state.isLoading)
        },
        [getTasks.fulfilled]: (state, action) => {
            state.isLoading = false
            state.isError = false
            state.tasks = action.payload
            console.log(state.tasks)
        },
        [getTasks.rejected]: (state, action) => {
            state.isError = true
            state.isLoading = false
            state.message = action.payload
        },
        [deleteTask.pending]: (state, action) => {
            state.isLoading = true
        },
        [deleteTask.fulfilled]: (state, action) => {
            state.isLoading = false
            state.isError = false
            console.log(action.payload._id)
            state.tasks = state.tasks.filter(
                (goal) => goal._id !== action.payload._id
              )
        },
        [deleteTask.rejected]: (state, action) => {
            state.isError = true
            state.isLoading = false
            state.message = action.payload
        },
    }
}
)

export const { reset, pagin } = tasksSlice.actions
export default tasksSlice.reducer