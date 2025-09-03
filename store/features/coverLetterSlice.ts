import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../store';

export interface CoverLetterData {
  _id: string;
  user: string;
  title: string;
  content: string;
  company?: string;
  position?: string;
  isTemplate: boolean;
  createdAt: string;
  updatedAt: string;
}

interface CoverLetterState {
  letters: CoverLetterData[];
  activeLetter: CoverLetterData | null;
  loading: boolean;
  error: string | null;
}

const initialState: CoverLetterState = {
  letters: [],
  activeLetter: null,
  loading: false,
  error: null,
};

// Async thunks
export const fetchCoverLetters = createAsyncThunk(
  'coverLetter/fetchCoverLetters',
  async (_, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem('token') || 
                    localStorage.getItem('authToken') ||
                    sessionStorage.getItem('token') ||
                    sessionStorage.getItem('authToken');

      if (!token) throw new Error('No authentication token found');

      const response = await fetch('/api/coverletter', {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        credentials: 'include'
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(errorText || 'Failed to fetch cover letters');
      }

      return await response.json();
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);

export const createCoverLetter = createAsyncThunk(
  'coverLetter/createCoverLetter',
  async (letterData: Partial<CoverLetterData>, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem('token') || 
                    localStorage.getItem('authToken') ||
                    sessionStorage.getItem('token') ||
                    sessionStorage.getItem('authToken');

      if (!token) throw new Error('No authentication token found');

      const response = await fetch('/api/coverletter', {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(letterData),
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(errorText || 'Failed to create cover letter');
      }

      return await response.json();
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);

export const updateCoverLetter = createAsyncThunk(
  'coverLetter/updateCoverLetter',
  async ({ id, letterData }: { id: string; letterData: Partial<CoverLetterData> }, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem('token') || 
                    localStorage.getItem('authToken') ||
                    sessionStorage.getItem('token') ||
                    sessionStorage.getItem('authToken');

      if (!token) throw new Error('No authentication token found');

      const response = await fetch(`/api/coverletter/${id}`, {
        method: 'PUT',
        headers: { 
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(letterData),
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(errorText || 'Failed to update cover letter');
      }

      return await response.json();
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);

export const deleteCoverLetter = createAsyncThunk(
  'coverLetter/deleteCoverLetter',
  async (id: string, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem('token') || 
                    localStorage.getItem('authToken') ||
                    sessionStorage.getItem('token') ||
                    sessionStorage.getItem('authToken');

      if (!token) throw new Error('No authentication token found');

      const response = await fetch(`/api/coverletter/${id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(errorText || 'Failed to delete cover letter');
      }

      return id;
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);

const coverLetterSlice = createSlice({
  name: 'coverLetter',
  initialState,
  reducers: {
    setActiveLetter: (state, action: PayloadAction<CoverLetterData | null>) => {
      state.activeLetter = action.payload;
    },
    clearError: (state) => {
      state.error = null;
    },
    clearLetters: (state) => {
      state.letters = [];
      state.activeLetter = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCoverLetters.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCoverLetters.fulfilled, (state, action) => {
        state.loading = false;
        state.letters = action.payload;
      })
      .addCase(fetchCoverLetters.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(createCoverLetter.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createCoverLetter.fulfilled, (state, action) => {
        state.loading = false;
        state.letters.push(action.payload);
        state.activeLetter = action.payload;
      })
      .addCase(createCoverLetter.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(updateCoverLetter.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateCoverLetter.fulfilled, (state, action) => {
        state.loading = false;
        const index = state.letters.findIndex(letter => letter._id === action.payload._id);
        if (index !== -1) {
          state.letters[index] = action.payload;
        }
        state.activeLetter = action.payload;
      })
      .addCase(updateCoverLetter.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(deleteCoverLetter.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteCoverLetter.fulfilled, (state, action) => {
        state.loading = false;
        state.letters = state.letters.filter(letter => letter._id !== action.payload);
        if (state.activeLetter && state.activeLetter._id === action.payload) {
          state.activeLetter = null;
        }
      })
      .addCase(deleteCoverLetter.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const { setActiveLetter, clearError, clearLetters } = coverLetterSlice.actions;
export const selectCoverLetters = (state: RootState) => state.coverLetter.letters;
export const selectActiveLetter = (state: RootState) => state.coverLetter.activeLetter;
export const selectCoverLetterLoading = (state: RootState) => state.coverLetter.loading;
export const selectCoverLetterError = (state: RootState) => state.coverLetter.error;

export default coverLetterSlice.reducer;