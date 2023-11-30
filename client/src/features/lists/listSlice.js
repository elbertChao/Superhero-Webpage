import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import listService from './listService';

const initialState = {
    lists: [],
    isError: false,
    isSuccess: false,
    isLoading: false,
    message: ''
}

// Creating a new list
export const createList = createAsyncThunk(
    'lists/create',
    async (listData, thunkAPI) => {
        try {
            // Getting the token of the current user since private lists require authentication
            const token = thunkAPI.getState().auth.user.token;
            return await listService.createList(listData, token);
        } catch (error) {
            const message = (error.response && error.response.data &&
                error.response.data.message) || error.message || error.toString();
            return thunkAPI.rejectWithValue(message);
        }
    });

// Getting user's lists
export const getLists = createAsyncThunk('lists/getAll', 
    async (_, thunkAPI) => {
        try {
            // Getting the token of the current user since private lists require authentication
            const token = thunkAPI.getState().auth.user.token;
            return await listService.getLists(token);
        } catch (error) {
            const message = (error.response && error.response.data &&
                error.response.data.message) || error.message || error.toString();
            return thunkAPI.rejectWithValue(message); 
        }
    });

// Deleting a list
export const deleteList = createAsyncThunk(
    'lists/delete',
    async (id, thunkAPI) => {
        try {
            // Getting the token of the current user since private lists require authentication
            const token = thunkAPI.getState().auth.user.token;
            return await listService.deleteList(id, token);
        } catch (error) {
            const message = (error.response && error.response.data &&
                error.response.data.message) || error.message || error.toString();
            return thunkAPI.rejectWithValue(message);
        }
    });

export const listSlice = createSlice({
    name: 'list',
    initialState,
    reducers: {
        reset: (state) => initialState
    },
    extraReducers: (builder) => {
        builder
        .addCase(createList.pending, (state) => {
            state.isLoading = true
        })
        .addCase(createList.fulfilled, (state, action) => {
            state.isSuccess = true
            state.isLoading = false
            state.lists.push(action.payload)
        })
        .addCase(createList.rejected, (state, action) => {
            state.isError = true
            state.isLoading = false
            state.message = action.payload
        })
        .addCase(getLists.pending, (state) => {
            state.isLoading = true
        })
        .addCase(getLists.fulfilled, (state, action) => {
            state.isSuccess = true
            state.isLoading = false
            state.lists = action.payload
        })
        .addCase(getLists.rejected, (state, action) => {
            state.isError = true
            state.isLoading = false
            state.message = action.payload
        })
        .addCase(deleteList.pending, (state) => {
            state.isLoading = true
        })
        .addCase(deleteList.fulfilled, (state, action) => {
            state.isSuccess = true
            state.isLoading = false
            // Taking out the list with the id on the UI
            // only showing goals that aren't the one that is deleted
            state.lists = state.lists.filter((list) =>
             list._id !== action.payload.id)
        })
        .addCase(deleteList.rejected, (state, action) => {
            state.isError = true
            state.isLoading = false
            state.message = action.payload
        })
    }
});

export const { reset } = listSlice.actions;
export default listSlice.reducer;