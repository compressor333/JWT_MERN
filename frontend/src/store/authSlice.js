import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
const register_url = 'https://jwt-mern-p322.onrender.com/api/users/'
const login_url = 'https://jwt-mern-p322.onrender.com/api/users/login'
// const register_url = 'http://localhost:5000/api/users/'
// const login_url = 'http://localhost:5000/api/users/login'


const user = JSON.parse(localStorage.getItem('user'))
console.log(user)

const initialState = {
    user1: user ? user : null,
    isLoading: false,
    isError: false,
    isFullfilled: false,
    message: '',
}

export const Register = createAsyncThunk(
    'auth/register',
    async (user, { rejectWithValue }) => {
        try {
            const res = await fetch(register_url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(user)
            })
            const data = await res.json()
            if (!res.ok) {
                throw new Error(data.error)
            }
            console.log(data)
            localStorage.setItem('user', JSON.stringify(data))
            return data
        } catch (error) {
           return rejectWithValue(error.message)
        }
    }
)

export const getMe = createAsyncThunk(
    'auth/me',
    async (_, { rejectWithValue }) => {
        const res = await fetch(register_url)
        return res.json()
    }
)

export const Login = createAsyncThunk(
    'auth/login',
    async (user, { rejectWithValue }) => {
        try {
            const res = await fetch(login_url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(user)
            })
            const data = await res.json()

            if (!res.ok) {
                throw new Error(data.error)
            }
            console.log(JSON.stringify(data) + ' data')
            localStorage.setItem('user', JSON.stringify(data))
            return data
        } catch (error) {
            console.log('allllo')
            return rejectWithValue(error.message)
        }
    }
)

export const Logout = createAsyncThunk(
    'auth/logout',
    async () => { await localStorage.removeItem('user') }
)

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        reset: (state) => {
            state.isLoading = false
            state.isFullfilled = false
            state.isError = false
            state.message = ''
        },
    },
    extraReducers: {
        [Register.pending]: (state) => {
            state.isLoading = true
        },
        [Register.fulfilled]: (state, action) => {
            state.isLoading = false
            state.user1 = action.payload
            state.isFullfilled = true
        },
        [Register.rejected]: (state, action) => {
            state.isLoading = false
            state.isError = true
            state.message = action.payload
        },
        [Login.pending]: (state) => {
            state.isLoading = true
        },
        [Login.fulfilled]: (state, action) => {
            state.isLoading = false
            state.isFullfilled = true
            state.user1 = action.payload
        },
        [Login.rejected]: (state, action) => {
            state.isError = true
            state.isFullfilled = false
            state.message = action.payload
        },
        [Logout.fulfilled]: (state) => {
            state.user1 = null
        }
    }
})

export const { reset } = authSlice.actions
export default authSlice.reducer