// store/features/sharedCvSlice.ts
import { createSlice } from '@reduxjs/toolkit';

interface SharedCvState {
  cv: any | null;
  userProfile: any | null;
  loading: boolean;
  error: string | null;
}

const initialState: SharedCvState = {
  cv: null,
  userProfile: null,
  loading: false,
  error: null,
};

const sharedCvSlice = createSlice({
  name: 'sharedCv',
  initialState,
  reducers: {
    setCV: (state, action) => {
      state.cv = action.payload;
    },
    setUserProfile: (state, action) => {
      state.userProfile = action.payload;
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
    clearSharedCV: (state) => {
      state.cv = null;
      state.userProfile = null;
      state.error = null;
      state.loading = false;
    }
  }
});

export const { setCV, setUserProfile, setLoading, setError, clearSharedCV } = sharedCvSlice.actions;
export default sharedCvSlice.reducer;