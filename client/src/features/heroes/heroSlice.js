// import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
// import axios from 'axios';

// const initialState = {
//   heroes: [],
//   isLoading: false,
//   isError: false,
//   errorMessage: '',
// };

// const apiUrl = '/api';

// export const fetchHeroById = createAsyncThunk('heroes/fetchHeroById', async (heroId) => {
//   try {
//     const response = await axios.get(`${apiUrl}/superhero/${heroId}`);
//     return response.data;
//   } catch (error) {
//     throw error.response.data;
//   }
// });

// const heroSlice = createSlice({
//   name: 'heroes',
//   initialState,
//   reducers: {},
//   extraReducers: (builder) => {
//     builder
//       .addCase(fetchHeroById.pending, (state) => {
//         state.isLoading = true;
//       })
//       .addCase(fetchHeroById.fulfilled, (state, action) => {
//         state.isLoading = false;
//         state.heroes = action.payload;
//       })
//       .addCase(fetchHeroById.rejected, (state, action) => {
//         state.isLoading = false;
//         state.isError = true;
//         state.errorMessage = action.payload.message || 'Error fetching heroes';
//       });
//   },
// });

// export default heroSlice.reducer;
