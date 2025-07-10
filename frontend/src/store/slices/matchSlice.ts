import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { Match } from '../../types';

interface MatchState {
  matches: Match[];
  loading: boolean;
  error: string | null;
}

const initialState: MatchState = {
  matches: [],
  loading: false,
  error: null,
};

// Async thunks (placeholder)
export const fetchMatches = createAsyncThunk(
  'match/fetchMatches',
  async () => {
    // TODO: Implement API call
    return [] as Match[];
  }
);

const matchSlice = createSlice({
  name: 'match',
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchMatches.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchMatches.fulfilled, (state, action) => {
        state.loading = false;
        state.matches = action.payload;
      })
      .addCase(fetchMatches.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch matches';
      });
  },
});

export const { clearError } = matchSlice.actions;
export default matchSlice.reducer;
