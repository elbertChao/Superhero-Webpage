import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// Define the initial state for the hero slice
const initialState = {
  heroes: [],
  isLoading: false,
  isError: false,
  errorMessage: '',
};

// Define the base URL for the superhero API
const API_URL = '/api';

// Create an async thunk to fetch superhero details by ID
export const fetchHeroById = createAsyncThunk('heroes/fetchHeroById', async (heroId) => {
  try {
    const response = await axios.get(`${API_URL}/superhero/${heroId}`);
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
});

// Create an async thunk to fetch superhero powers by ID
export const fetchHeroPowersById = createAsyncThunk('heroes/fetchHeroPowersById', async (heroId) => {
  try {
    const response = await axios.get(`${API_URL}/superhero/${heroId}/powers`);
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
});

// Create an async thunk to fetch all available publishers
export const fetchPublishers = createAsyncThunk('heroes/fetchPublishers', async () => {
  try {
    const response = await axios.get(`${API_URL}/publishers`);
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
});

// Create an async thunk to search for superheroes
export const searchSuperheroes = createAsyncThunk('heroes/searchSuperheroes', async ({ field, pattern, n }) => {
  try {
    const response = await axios.get(`${API_URL}/match`, {
      params: { field, pattern, n },
    });
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
});

// Define the hero slice
const heroSlice = createSlice({
  name: 'heroes',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchHeroById.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchHeroById.fulfilled, (state, action) => {
        state.isLoading = false;
        state.heroes = [action.payload];
      })
      .addCase(fetchHeroById.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.errorMessage = action.payload.message || 'Error fetching hero details';
      })
      .addCase(fetchHeroPowersById.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchHeroPowersById.fulfilled, (state, action) => {
        state.isLoading = false;
        // Update the powers of the existing hero in the state
        const updatedHero = state.heroes[0];
        if (updatedHero) {
          updatedHero.powers = action.payload.powers;
        }
      })
      .addCase(fetchHeroPowersById.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.errorMessage = action.payload.message || 'Error fetching hero powers';
      })
      .addCase(fetchPublishers.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchPublishers.fulfilled, (state, action) => {
        state.isLoading = false;
        state.publishers = action.payload.publishers;
      })
      .addCase(fetchPublishers.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.errorMessage = action.payload.message || 'Error fetching publishers';
      })
      .addCase(searchSuperheroes.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(searchSuperheroes.fulfilled, (state, action) => {
        state.isLoading = false;
        state.searchResults = action.payload.matchedSuperheroes;
      })
      .addCase(searchSuperheroes.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.errorMessage = action.payload.message || 'Error searching superheroes';
      });
  },
});

// Export the async thunks for use in components
export { fetchHeroById, fetchHeroPowersById, fetchPublishers, searchSuperheroes };

// Export the reducer
export default heroSlice.reducer;
