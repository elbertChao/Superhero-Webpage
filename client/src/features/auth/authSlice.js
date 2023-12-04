import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import authService from './authService';

// Getting the user from localStorage
const user = JSON.parse(localStorage.getItem('user'));

// Initial state for the auth slice
const initialState = {
    user: user ? user : null, // Initial user state retrieved from localStorage
    isError: false, // Flag to indicate if an error occurred
    isSuccess: false, // Flag to indicate if an operation was successful
    isLoading: false, // Flag to indicate if an asynchronous operation is in progress
    message: '', // Additional message related to the state
};

// Async thunk for registering a user
export const register = createAsyncThunk(
    'auth/register',
    async (user, thunkAPI) => {
        try {
            // Call the register method from authService
            return await authService.register(user);
        } catch (error) {
            // Handle errors and reject with an error message
            const message = (error.response && error.response.data &&
                error.response.data.message) || error.message || error.toString();
            return thunkAPI.rejectWithValue(message);
        }
    }
);

// Async thunk for logging in a user
export const login = createAsyncThunk(
    'auth/login',
    async (user, thunkAPI) => {
        try {
            // Call the login method from authService
            return await authService.login(user);
        } catch (error) {
            // Handle errors and reject with an error message
            const message = (error.response && error.response.data &&
                error.response.data.message) || error.message || error.toString();
            return thunkAPI.rejectWithValue(message);
        }
    }
);

// Async thunk for logging out a user
export const logout = createAsyncThunk(
    'auth/logout',
    async () => {
        // Call the logout method from authService
        await authService.logout();
    }
);

// Create the authSlice using createSlice
export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        // Reset action to reset the state
        reset: (state) => {
            state.isLoading = false;
            state.isSuccess = false;
            state.isError = false;
            state.message = '';
        },
    },
    // Handle extraReducers to manage actions related to async operations
    extraReducers: (builder) => {
        builder
            // Handling the pending, fulfilled, and rejected actions for the register thunk
            .addCase(register.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(register.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.user = action.payload;
            })
            .addCase(register.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload;
                state.user = null;
            })
            // Handling the pending, fulfilled, and rejected actions for the login thunk
            .addCase(login.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(login.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.user = action.payload;
            })
            .addCase(login.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload;
                state.user = null;
            })
            // Handling the fulfilled action for the logout thunk
            .addCase(logout.fulfilled, (state) => {
                state.user = null;
            });
    },
});

// Exporting actions and reducer from authSlice
export const { reset } = authSlice.actions;
export default authSlice.reducer;
