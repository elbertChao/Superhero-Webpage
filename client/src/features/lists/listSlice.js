import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

const initialState = {
    lists: [],
    isError: false,
    isSuccess: false,
    isLoading: false,
    message: ''
}

export const listSlice = createSlice({
    name: 'list',
    initialState,
    reducers: {
        reset: (state) => initialState
    }
});

export const { reset } = listSlice.actions;
export default listSlice.reducer;