import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import authService from './authService';

// Getting the user from localStorage
const user = JSON.parse(localStorage.getItem('user'));


const initialState = {
    user: user ? user : null,
    isError: false,
    isSuccess: false,
    isLoading: false,
    message: '',
}

// Registering user
export const register = createAsyncThunk(
    'auth/register',
    async (user, thunkAPI) => {
    try {
        return await authService.register(user);
    } catch (error) {
        const message = (error.response && error.response.data &&
            error.response.data.message) || error.message || error.toString();
        return thunkAPI.rejectWithValue(message);
    }
});

export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        reset: (state) => {
            state.isLoading = false;
            state.isSuccess = false;
            state.isError = false;
            state.message = '';
        },
    },
    // Using extraReducers to handle success, failure, or pending to register
    extraReducers: (builder) => {
        builder
            .addCase(register.pending, (state) => {
                state.isLoading = true // Fetching data so loading is true
            })
            .addCase(register.fulfilled, (state, action) => {
                state.isLoading = false // Register is fulfilled, do an action
                state.isSuccess = true
                state.user = action.payload
            })
            .addCase(register.rejected, (state, action) => {
                state.isLoading = false
                state.isError = true
                state.message = action.payload
                state.user = null
            })
    },
});

export const logout = createAsyncThunk('auth/logout',
async() => {
    await authService.logout();
})

export const { reset } = authSlice.actions
export default authSlice.reducer