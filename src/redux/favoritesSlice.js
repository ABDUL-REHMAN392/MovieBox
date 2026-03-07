import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../api/axios';

const TMDB_IMAGE_BASE = 'https://image.tmdb.org/t/p/w500';

// ============= ASYNC THUNKS =============

// Saari favorites fetch karo
export const fetchFavorites = createAsyncThunk(
  'favorites/fetchAll',
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.get('/favorites');
      return response.data.favorites;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to fetch favorites');
    }
  }
);

// Favorite add karo — backend TMDB se khud data fetch karta hai
// Frontend se sirf tmdbId aur mediaType bhejna hai
export const addFavorite = createAsyncThunk(
  'favorites/add',
  async ({ tmdbId, mediaType }, { rejectWithValue }) => {
    try {
      const response = await api.post('/favorites/add', { tmdbId, mediaType });
      return response.data.favorite;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to add favorite');
    }
  }
);

// Favorite remove karo
export const removeFavorite = createAsyncThunk(
  'favorites/remove',
  async ({ tmdbId, mediaType }, { rejectWithValue }) => {
    try {
      await api.delete(`/favorites/remove/${tmdbId}/${mediaType}`);
      return { tmdbId, mediaType };
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to remove favorite');
    }
  }
);

// Saari favorites clear karo
export const clearFavorites = createAsyncThunk(
  'favorites/clearAll',
  async (_, { rejectWithValue }) => {
    try {
      await api.delete('/favorites/clear');
      return true;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to clear favorites');
    }
  }
);

// ============= HELPERS =============
// posterPath sirf path hota hai jaise "/abc.jpg" — full URL banana hoga
export const getImageUrl = (posterPath) => {
  if (!posterPath) return 'https://via.placeholder.com/500x750?text=No+Image';
  if (posterPath.startsWith('http')) return posterPath; // already full URL
  return `${TMDB_IMAGE_BASE}${posterPath}`;
};

// ============= INITIAL STATE =============
const initialState = {
  items: [],
  loading: false,
  actionLoading: {}, // { "tmdbId-mediaType": true/false }
  error: null,
};

// ============= SLICE =============
const favoritesSlice = createSlice({
  name: 'favorites',
  initialState,
  reducers: {
    clearError: (state) => { state.error = null; },
    resetFavorites: (state) => {
      state.items = [];
      state.loading = false;
      state.actionLoading = {};
      state.error = null;
    }
  },
  extraReducers: (builder) => {

    // Fetch All
    builder
      .addCase(fetchFavorites.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchFavorites.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload || [];
      })
      .addCase(fetchFavorites.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });

    // Add
    builder
      .addCase(addFavorite.pending, (state, action) => {
        const key = `${action.meta.arg.tmdbId}-${action.meta.arg.mediaType}`;
        state.actionLoading[key] = true;
      })
      .addCase(addFavorite.fulfilled, (state, action) => {
        const key = `${action.payload.tmdbId}-${action.payload.mediaType}`;
        state.actionLoading[key] = false;
        state.items.unshift(action.payload); // top pe add karo
      })
      .addCase(addFavorite.rejected, (state, action) => {
        const key = `${action.meta.arg.tmdbId}-${action.meta.arg.mediaType}`;
        state.actionLoading[key] = false;
        state.error = action.payload;
      });

    // Remove
    builder
      .addCase(removeFavorite.pending, (state, action) => {
        const key = `${action.meta.arg.tmdbId}-${action.meta.arg.mediaType}`;
        state.actionLoading[key] = true;
      })
      .addCase(removeFavorite.fulfilled, (state, action) => {
        const { tmdbId, mediaType } = action.payload;
        state.actionLoading[`${tmdbId}-${mediaType}`] = false;
        state.items = state.items.filter(
          item => !(item.tmdbId === tmdbId && item.mediaType === mediaType)
        );
      })
      .addCase(removeFavorite.rejected, (state, action) => {
        const key = `${action.meta.arg.tmdbId}-${action.meta.arg.mediaType}`;
        state.actionLoading[key] = false;
        state.error = action.payload;
      });

    // Clear All
    builder
      .addCase(clearFavorites.fulfilled, (state) => { state.items = []; });
  }
});

// ============= SELECTORS =============
export const selectIsFavorited = (tmdbId, mediaType) => (state) =>
  state.favorites.items.some(
    item => item.tmdbId === tmdbId && item.mediaType === mediaType
  );

export const selectItemLoading = (tmdbId, mediaType) => (state) =>
  state.favorites.actionLoading[`${tmdbId}-${mediaType}`] || false;

export const { clearError, resetFavorites } = favoritesSlice.actions;
export const favoritesReducer = favoritesSlice.reducer;