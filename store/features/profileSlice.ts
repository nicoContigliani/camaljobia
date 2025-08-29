import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';

export interface UserProfile {
  _id?: string;
  user: string;
  fullname: string;
  email: string;
  phone: string;
  repository: string;
  linkedin: string;
  portfolio: string;
  createdAt?: string;
  updatedAt?: string;
}

interface ProfileState {
  profile: UserProfile | null;
  loading: boolean;
  error: string | null;
}

// Cargar perfil desde localStorage (solo en el lado del cliente)
const getInitialState = (): ProfileState => {
  if (typeof window === 'undefined') {
    return {
      profile: null,
      loading: false,
      error: null,
    };
  }

  const profileStr = localStorage.getItem('userProfile');
  let profile = null;
  
  if (profileStr) {
    try {
      profile = JSON.parse(profileStr);
    } catch (error) {
      console.error('Error parsing profile data from localStorage:', error);
      localStorage.removeItem('userProfile');
    }
  }

  return {
    profile,
    loading: false,
    error: null,
  };
};

const initialState: ProfileState = getInitialState();

// Función auxiliar para obtener el token JWT
const getAuthToken = (): string | null => {
  if (typeof window === 'undefined') return null;
  
  // Primero intenta obtener el token directamente desde localStorage
  const token = localStorage.getItem('token');
  if (token) return token;
  
  // Si no existe un token directo, intenta obtenerlo del objeto user
  const userStr = localStorage.getItem('user');
  if (userStr) {
    try {
      const user = JSON.parse(userStr);
      return user.token || null;
    } catch (error) {
      console.error('Error parsing user data from localStorage:', error);
      return null;
    }
  }
  return null;
};

// Thunks para operaciones CRUD - ACTUALIZADOS
export const fetchProfile = createAsyncThunk(
  'profile/fetchProfile',
  async (_, { rejectWithValue }) => {
    try {
      const token = getAuthToken();
      if (!token) {
        return rejectWithValue('No authentication token found');
      }

      const response = await fetch(`/api/profile`, {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });
      
      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        return rejectWithValue(errorData.message || 'Failed to fetch profile');
      }

      const data = await response.json();
      return data;
    } catch (error: any) {
      return rejectWithValue(error.message || 'An error occurred while fetching profile');
    }
  }
);

export const createProfile = createAsyncThunk(
  'profile/createProfile',
  async (profileData: Omit<UserProfile, '_id' | 'user'>, { rejectWithValue }) => {
    try {
      const token = getAuthToken();
      if (!token) {
        return rejectWithValue('No authentication token found');
      }

      const response = await fetch('/api/profile', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify(profileData),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        return rejectWithValue(errorData.message || 'Failed to create profile');
      }

      const data = await response.json();
      return data;
    } catch (error: any) {
      return rejectWithValue(error.message || 'An error occurred while creating profile');
    }
  }
);

export const updateProfile = createAsyncThunk(
  'profile/updateProfile',
  async (profileData: Partial<UserProfile>, { rejectWithValue }) => {
    try {
      const token = getAuthToken();
      if (!token) {
        return rejectWithValue('No authentication token found');
      }

      const response = await fetch(`/api/profile/${profileData._id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify(profileData),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        return rejectWithValue(errorData.message || 'Failed to update profile');
      }

      const data = await response.json();
      return data;
    } catch (error: any) {
      return rejectWithValue(error.message || 'An error occurred while updating profile');
    }
  }
);

export const deleteProfile = createAsyncThunk(
  'profile/deleteProfile',
  async (profileId: string, { rejectWithValue }) => {
    try {
      const token = getAuthToken();
      if (!token) {
        return rejectWithValue('No authentication token found');
      }

      const response = await fetch(`/api/profile/${profileId}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        return rejectWithValue(errorData.message || 'Failed to delete profile');
      }

      const data = await response.json();
      return data;
    } catch (error: any) {
      return rejectWithValue(error.message || 'An error occurred while deleting profile');
    }
  }
);

const profileSlice = createSlice({
  name: 'profile',
  initialState,
  reducers: {
    clearProfileError: (state) => {
      state.error = null;
    },
    // Nuevo reducer para actualizar el perfil localmente
    updateLocalProfile: (state, action: PayloadAction<Partial<UserProfile>>) => {
      if (state.profile) {
        state.profile = { ...state.profile, ...action.payload };
        if (typeof window !== 'undefined') {
          localStorage.setItem('userProfile', JSON.stringify(state.profile));
        }
      }
    },
    // Reducer para establecer el token manualmente si es necesario
    setAuthToken: (state, action: PayloadAction<string>) => {
      if (typeof window !== 'undefined') {
        localStorage.setItem('token', action.payload);
        
        // También actualiza el token en el objeto user si existe
        const userStr = localStorage.getItem('user');
        if (userStr) {
          try {
            const user = JSON.parse(userStr);
            user.token = action.payload;
            localStorage.setItem('user', JSON.stringify(user));
          } catch (error) {
            console.error('Error updating token in user object:', error);
          }
        }
      }
    },
    // Reducer para limpiar el perfil al cerrar sesión
    clearProfile: (state) => {
      state.profile = null;
      state.loading = false;
      state.error = null;
      if (typeof window !== 'undefined') {
        localStorage.removeItem('userProfile');
      }
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch Profile
      .addCase(fetchProfile.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProfile.fulfilled, (state, action: PayloadAction<UserProfile>) => {
        state.loading = false;
        state.profile = action.payload;
        state.error = null;
        if (typeof window !== 'undefined') {
          localStorage.setItem('userProfile', JSON.stringify(action.payload));
        }
      })
      .addCase(fetchProfile.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
        // Limpiar perfil si hay error de autenticación
        if (action.payload === 'No authentication token found') {
          state.profile = null;
          if (typeof window !== 'undefined') {
            localStorage.removeItem('userProfile');
          }
        }
      })
      // Create Profile
      .addCase(createProfile.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createProfile.fulfilled, (state, action: PayloadAction<UserProfile>) => {
        state.loading = false;
        state.profile = action.payload;
        state.error = null;
        if (typeof window !== 'undefined') {
          localStorage.setItem('userProfile', JSON.stringify(action.payload));
        }
      })
      .addCase(createProfile.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      // Update Profile
      .addCase(updateProfile.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateProfile.fulfilled, (state, action: PayloadAction<UserProfile>) => {
        state.loading = false;
        state.profile = action.payload;
        state.error = null;
        if (typeof window !== 'undefined') {
          localStorage.setItem('userProfile', JSON.stringify(action.payload));
        }
      })
      .addCase(updateProfile.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      // Delete Profile
      .addCase(deleteProfile.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteProfile.fulfilled, (state) => {
        state.loading = false;
        state.profile = null;
        state.error = null;
        if (typeof window !== 'undefined') {
          localStorage.removeItem('userProfile');
        }
      })
      .addCase(deleteProfile.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const { 
  clearProfileError, 
  updateLocalProfile, 
  setAuthToken, 
  clearProfile 
} = profileSlice.actions;

export default profileSlice.reducer;