import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { Notification } from '../../types';

interface NotificationState {
  notifications: Notification[];
  loading: boolean;
  error: string | null;
}

const initialState: NotificationState = {
  notifications: [],
  loading: false,
  error: null,
};

// Async thunks (placeholder)
export const fetchNotifications = createAsyncThunk(
  'notification/fetchNotifications',
  async () => {
    // TODO: Implement API call
    return [] as Notification[];
  }
);

const notificationSlice = createSlice({
  name: 'notification',
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
    markAsRead: (state, action) => {
      const notificationIndex = state.notifications.findIndex(
        (n) => n.id === action.payload
      );
      if (notificationIndex !== -1) {
        state.notifications[notificationIndex].isRead = true;
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchNotifications.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchNotifications.fulfilled, (state, action) => {
        state.loading = false;
        state.notifications = action.payload;
      })
      .addCase(fetchNotifications.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch notifications';
      });
  },
});

export const { clearError, markAsRead } = notificationSlice.actions;
export default notificationSlice.reducer;

