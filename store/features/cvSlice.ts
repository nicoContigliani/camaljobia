// import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
// import { ICurriculum } from '@/lib/models/Curriculum';
// import { RootState } from '../store';

// // Crear una interfaz para los datos planos del CV (sin propiedades de Mongoose)
// export interface CVData {
//   _id: string;
//   user: string;
//   profile: string;
//   professional_summary: string;
//   skills: {
//     languages: string[];
//     frameworks_libraries: string[];
//     databases: string[];
//     tools_environments: string[];
//     methodologies: string[];
//     security: string[];
//     mobile: string[];
//     analysis_management: string[];
//     communication: string[];
//   };
//   work_experience: Array<{
//     company: string;
//     period: string;
//     position: string;
//     description: string[];
//   }>;
//   createdAt: string;
//   updatedAt: string;
// }

// interface CVState {
//   cvs: CVData[];
//   activeCV: CVData | null;
//   loading: boolean;
//   error: string | null;
// }

// const initialState: CVState = {
//   cvs: [],
//   activeCV: null,
//   loading: false,
//   error: null,
// };

// // Función para convertir ICurriculum a CVData
// const convertToCVData = (cv: ICurriculum): CVData => {
//   const plainCV = cv.toObject ? cv.toObject() : cv;

//   // Manejar ObjectId correctamente
//   const handleObjectId = (id: any): string => {
//     if (!id) return '';
//     if (typeof id === 'string') return id;
//     if (id.toString) return id.toString();
//     return '';
//   };

//   // Manejar fechas correctamente
//   const handleDate = (date: any): string => {
//     if (!date) return new Date().toISOString();

//     // Si ya es un string ISO, devolverlo directamente
//     if (typeof date === 'string' && date.includes('T')) {
//       return date;
//     }

//     // Si es un objeto Date, convertirlo a ISO string
//     if (date instanceof Date) {
//       return date.toISOString();
//     }

//     // Si es un timestamp numérico
//     if (typeof date === 'number') {
//       return new Date(date).toISOString();
//     }

//     // Para cualquier otro caso, crear una nueva fecha
//     return new Date().toISOString();
//   };

//   return {
//     _id: handleObjectId(plainCV._id),
//     user: handleObjectId(plainCV.user),
//     profile: plainCV.profile || '',
//     professional_summary: plainCV.professional_summary || '',
//     skills: {
//       languages: plainCV.skills?.languages || [],
//       frameworks_libraries: plainCV.skills?.frameworks_libraries || [],
//       databases: plainCV.skills?.databases || [],
//       tools_environments: plainCV.skills?.tools_environments || [],
//       methodologies: plainCV.skills?.methodologies || [],
//       security: plainCV.skills?.security || [],
//       mobile: plainCV.skills?.mobile || [],
//       analysis_management: plainCV.skills?.analysis_management || [],
//       communication: plainCV.skills?.communication || [],
//     },
//     work_experience: plainCV.work_experience?.map((exp: any) => ({
//       company: exp.company || '',
//       period: exp.period || '',
//       position: exp.position || '',
//       description: exp.description || [],
//     })) || [],
//     createdAt: handleDate(plainCV.createdAt),
//     updatedAt: handleDate(plainCV.updatedAt),
//   };
// };

// // Async thunks
// export const fetchCVs = createAsyncThunk(
//   'cv/fetchCVs',
//   async (_, { rejectWithValue }) => {
//     try {
//       // Obtener token de autenticación
//       const token = localStorage.getItem('token') || 
//                     localStorage.getItem('authToken') ||
//                     sessionStorage.getItem('token') ||
//                     sessionStorage.getItem('authToken');

//       if (!token) {
//         throw new Error('No authentication token found');
//       }

//       const response = await fetch('/api/cv', {
//         headers: {
//           'Authorization': `Bearer ${token}`,
//           'Content-Type': 'application/json'
//         },
//         credentials: 'include'
//       });

//       if (!response.ok) {
//         const errorText = await response.text();
//         let errorMessage = `Failed to fetch CVs: ${response.status} ${response.statusText}`;

//         try {
//           const errorData = JSON.parse(errorText);
//           errorMessage = errorData.error || errorMessage;
//         } catch {
//           errorMessage = errorText || errorMessage;
//         }

//         throw new Error(errorMessage);
//       }

//       const data = await response.json();
//       // Convertir cada CV a datos planos
//       return data.map((cv: ICurriculum) => convertToCVData(cv));
//     } catch (error: any) {
//       return rejectWithValue(error.message);
//     }
//   }
// );

// export const createCV = createAsyncThunk(
//   'cv/createCV',
//   async (cvData: Partial<CVData>, { rejectWithValue }) => {
//     try {
//       // Obtener token de autenticación
//       const token = localStorage.getItem('token') || 
//                     localStorage.getItem('authToken') ||
//                     sessionStorage.getItem('token') ||
//                     sessionStorage.getItem('authToken');

//       if (!token) {
//         throw new Error('No authentication token found');
//       }

//       const response = await fetch('/api/cv', {
//         method: 'POST',
//         headers: { 
//           'Content-Type': 'application/json',
//           'Authorization': `Bearer ${token}`
//         },
//         body: JSON.stringify(cvData),
//       });

//       if (!response.ok) {
//         const errorText = await response.text();
//         let errorMessage = `Failed to create CV: ${response.status} ${response.statusText}`;

//         try {
//           const errorData = JSON.parse(errorText);
//           errorMessage = errorData.error || errorMessage;
//         } catch {
//           errorMessage = errorText || errorMessage;
//         }

//         throw new Error(errorMessage);
//       }

//       const data = await response.json();
//       return convertToCVData(data);
//     } catch (error: any) {
//       return rejectWithValue(error.message);
//     }
//   }
// );

// export const updateCV = createAsyncThunk(
//   'cv/updateCV',
//   async ({ id, cvData }: { id: string; cvData: Partial<CVData> }, { rejectWithValue }) => {
//     try {
//       // Obtener token de autenticación
//       const token = localStorage.getItem('token') || 
//                     localStorage.getItem('authToken') ||
//                     sessionStorage.getItem('token') ||
//                     sessionStorage.getItem('authToken');

//       if (!token) {
//         throw new Error('No authentication token found');
//       }

//       const response = await fetch(`/api/cv/${id}`, {
//         method: 'PUT',
//         headers: { 
//           'Content-Type': 'application/json',
//           'Authorization': `Bearer ${token}`
//         },
//         body: JSON.stringify(cvData),
//       });

//       if (!response.ok) {
//         const errorText = await response.text();
//         let errorMessage = `Failed to update CV: ${response.status} ${response.statusText}`;

//         try {
//           const errorData = JSON.parse(errorText);
//           errorMessage = errorData.error || errorMessage;
//         } catch {
//           errorMessage = errorText || errorMessage;
//         }

//         throw new Error(errorMessage);
//       }

//       const data = await response.json();
//       return convertToCVData(data);
//     } catch (error: any) {
//       return rejectWithValue(error.message);
//     }
//   }
// );

// export const deleteCV = createAsyncThunk(
//   'cv/deleteCV',
//   async (id: string, { rejectWithValue }) => {
//     try {
//       // Obtener token de autenticación
//       const token = localStorage.getItem('token') || 
//                     localStorage.getItem('authToken') ||
//                     sessionStorage.getItem('token') ||
//                     sessionStorage.getItem('authToken');

//       if (!token) {
//         throw new Error('No authentication token found');
//       }

//       const response = await fetch(`/api/cv/${id}`, {
//         method: 'DELETE',
//         headers: {
//           'Authorization': `Bearer ${token}`,
//           'Content-Type': 'application/json'
//         }
//       });

//       if (!response.ok) {
//         const errorText = await response.text();
//         let errorMessage = `Failed to delete CV: ${response.status} ${response.statusText}`;

//         try {
//           const errorData = JSON.parse(errorText);
//           errorMessage = errorData.error || errorMessage;
//         } catch {
//           errorMessage = errorText || errorMessage;
//         }

//         throw new Error(errorMessage);
//       }

//       return id;
//     } catch (error: any) {
//       return rejectWithValue(error.message);
//     }
//   }
// );

// export const importCV = createAsyncThunk(
//   'cv/importCV',
//   async ({ cvData, token }: { cvData: any; token: string }, { rejectWithValue }) => {
//     try {
//       // Validar que los datos requeridos estén presentes
//       if (!cvData.profile || !cvData.professional_summary) {
//         throw new Error('Datos de CV incompletos. Se requieren profile y professional_summary');
//       }

//       const response = await fetch('/api/cv/import', {
//         method: 'POST',
//         headers: { 
//           'Content-Type': 'application/json',
//           'Authorization': `Bearer ${token}`
//         },
//         body: JSON.stringify(cvData),
//       });

//       if (!response.ok) {
//         const errorText = await response.text();
//         let errorMessage = `Error ${response.status}: ${response.statusText}`;

//         try {
//           const errorData = JSON.parse(errorText);
//           errorMessage = errorData.error || errorMessage;
//         } catch {
//           errorMessage = errorText || errorMessage;
//         }

//         throw new Error(errorMessage);
//       }

//       const data = await response.json();
//       return convertToCVData(data);
//     } catch (error: any) {
//       return rejectWithValue(error.message);
//     }
//   }
// );

// const cvSlice = createSlice({
//   name: 'cv',
//   initialState,
//   reducers: {
//     setActiveCV: (state, action: PayloadAction<CVData | null>) => {
//       state.activeCV = action.payload;
//     },
//     clearError: (state) => {
//       state.error = null;
//     },
//     clearCVs: (state) => {
//       state.cvs = [];
//       state.activeCV = null;
//     },
//   },
//   extraReducers: (builder) => {
//     builder
//       // Fetch CVs
//       .addCase(fetchCVs.pending, (state) => {
//         state.loading = true;
//         state.error = null;
//       })
//       .addCase(fetchCVs.fulfilled, (state, action) => {
//         state.loading = false;
//         state.cvs = action.payload;
//       })
//       .addCase(fetchCVs.rejected, (state, action) => {
//         state.loading = false;
//         state.error = action.payload as string;
//       })
//       // Create CV
//       .addCase(createCV.pending, (state) => {
//         state.loading = true;
//         state.error = null;
//       })
//       .addCase(createCV.fulfilled, (state, action) => {
//         state.loading = false;
//         state.cvs.push(action.payload);
//         state.activeCV = action.payload;
//       })
//       .addCase(createCV.rejected, (state, action) => {
//         state.loading = false;
//         state.error = action.payload as string;
//       })
//       // Update CV
//       .addCase(updateCV.pending, (state) => {
//         state.loading = true;
//         state.error = null;
//       })
//       .addCase(updateCV.fulfilled, (state, action) => {
//         state.loading = false;
//         const index = state.cvs.findIndex(cv => cv._id === action.payload._id);
//         if (index !== -1) {
//           state.cvs[index] = action.payload;
//         }
//         state.activeCV = action.payload;
//       })
//       .addCase(updateCV.rejected, (state, action) => {
//         state.loading = false;
//         state.error = action.payload as string;
//       })
//       // Delete CV
//       .addCase(deleteCV.pending, (state) => {
//         state.loading = true;
//         state.error = null;
//       })
//       .addCase(deleteCV.fulfilled, (state, action) => {
//         state.loading = false;
//         state.cvs = state.cvs.filter(cv => cv._id !== action.payload);
//         if (state.activeCV && state.activeCV._id === action.payload) {
//           state.activeCV = null;
//         }
//       })
//       .addCase(deleteCV.rejected, (state, action) => {
//         state.loading = false;
//         state.error = action.payload as string;
//       })
//       // Import CV
//       .addCase(importCV.pending, (state) => {
//         state.loading = true;
//         state.error = null;
//       })
//       .addCase(importCV.fulfilled, (state, action) => {
//         state.loading = false;
//         state.cvs.push(action.payload);
//         state.activeCV = action.payload;
//       })
//       .addCase(importCV.rejected, (state, action) => {
//         state.loading = false;
//         state.error = action.payload as string;
//       });
//   },
// });

// export const { setActiveCV, clearError, clearCVs } = cvSlice.actions;
// export const selectCVs = (state: RootState) => state.cv.cvs;
// export const selectActiveCV = (state: RootState) => state.cv.activeCV;
// export const selectLoading = (state: RootState) => state.cv.loading;
// export const selectError = (state: RootState) => state.cv.error;

// export default cvSlice.reducer;




import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { ICurriculum } from '@/lib/models/Curriculum';
import { RootState } from '../store';

// Crear una interfaz para los datos planos del CV (sin propiedades de Mongoose)
export interface CVData {
  isDefault?: any | null | undefined;
  _id: string;
  user: string;
  profile: string;
  professional_summary: string;
  skills: {
    languages: string[];
    frameworks_libraries: string[];
    databases: string[];
    tools_environments: string[];
    methodologies: string[];
    security: string[];
    mobile: string[];
    analysis_management: string[];
    communication: string[];
  };
  work_experience: Array<{
    company: string;
    period: string;
    position: string;
    description: string[];
  }>;
  education: Array<{
    institution: string;
    degree: string;
    field_of_study: string;
    period: string;
    description: string[];
  }>;
  courses: Array<{
    name: string;
    institution: string;
    completion_date: string;
    duration_hours?: number;
    certificate_url?: string;
    description: string[];
  }>;
  createdAt: string;
  updatedAt: string;
}

interface CVState {
  cvs: CVData[];
  activeCV: CVData | null;
  loading: boolean;
  error: string | null;
}

const initialState: CVState = {
  cvs: [],
  activeCV: null,
  loading: false,
  error: null,
};

// Función para convertir ICurriculum a CVData
const convertToCVData = (cv: ICurriculum): CVData => {
  const plainCV = cv.toObject ? cv.toObject() : cv;

  // Manejar ObjectId correctamente
  const handleObjectId = (id: any): string => {
    if (!id) return '';
    if (typeof id === 'string') return id;
    if (id.toString) return id.toString();
    return '';
  };

  // Manejar fechas correctamente
  const handleDate = (date: any): string => {
    if (!date) return new Date().toISOString();

    // Si ya es un string ISO, devolverlo directamente
    if (typeof date === 'string' && date.includes('T')) {
      return date;
    }

    // Si es un objeto Date, convertirlo a ISO string
    if (date instanceof Date) {
      return date.toISOString();
    }

    // Si es un timestamp numérico
    if (typeof date === 'number') {
      return new Date(date).toISOString();
    }

    // Para cualquier otro caso, crear una nueva fecha
    return new Date().toISOString();
  };

  return {
    _id: handleObjectId(plainCV._id),
    user: handleObjectId(plainCV.user),
    profile: plainCV.profile || '',
    professional_summary: plainCV.professional_summary || '',
    skills: {
      languages: plainCV.skills?.languages || [],
      frameworks_libraries: plainCV.skills?.frameworks_libraries || [],
      databases: plainCV.skills?.databases || [],
      tools_environments: plainCV.skills?.tools_environments || [],
      methodologies: plainCV.skills?.methodologies || [],
      security: plainCV.skills?.security || [],
      mobile: plainCV.skills?.mobile || [],
      analysis_management: plainCV.skills?.analysis_management || [],
      communication: plainCV.skills?.communication || [],
    },
    work_experience: plainCV.work_experience?.map((exp: any) => ({
      company: exp.company || '',
      period: exp.period || '',
      position: exp.position || '',
      description: exp.description || [],
    })) || [],
    education: plainCV.education?.map((edu: any) => ({
      institution: edu.institution || '',
      degree: edu.degree || '',
      field_of_study: edu.field_of_study || '',
      period: edu.period || '',
      description: edu.description || [],
    })) || [],
    courses: plainCV.courses?.map((course: any) => ({
      name: course.name || '',
      institution: course.institution || '',
      completion_date: handleDate(course.completion_date),
      duration_hours: course.duration_hours || undefined,
      certificate_url: course.certificate_url || undefined,
      description: course.description || [],
    })) || [],
    createdAt: handleDate(plainCV.createdAt),
    updatedAt: handleDate(plainCV.updatedAt),
  };
};

// Async thunks
export const fetchCVs = createAsyncThunk(
  'cv/fetchCVs',
  async (_, { rejectWithValue }) => {
    try {
      // Obtener token de autenticación
      const token = localStorage.getItem('token') ||
        localStorage.getItem('authToken') ||
        sessionStorage.getItem('token') ||
        sessionStorage.getItem('authToken');

      if (!token) {
        throw new Error('No authentication token found');
      }

      const response = await fetch('/api/cv', {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        credentials: 'include'
      });

      if (!response.ok) {
        const errorText = await response.text();
        let errorMessage = `Failed to fetch CVs: ${response.status} ${response.statusText}`;

        try {
          const errorData = JSON.parse(errorText);
          errorMessage = errorData.error || errorMessage;
        } catch {
          errorMessage = errorText || errorMessage;
        }

        throw new Error(errorMessage);
      }

      const data = await response.json();
      // Convertir cada CV a datos planos
      return data.map((cv: ICurriculum) => convertToCVData(cv));
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);

export const createCV = createAsyncThunk(
  'cv/createCV',
  async (cvData: Partial<CVData>, { rejectWithValue }) => {
    try {
      // Obtener token de autenticación
      const token = localStorage.getItem('token') ||
        localStorage.getItem('authToken') ||
        sessionStorage.getItem('token') ||
        sessionStorage.getItem('authToken');

      if (!token) {
        throw new Error('No authentication token found');
      }

      const response = await fetch('/api/cv', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(cvData),
      });

      if (!response.ok) {
        const errorText = await response.text();
        let errorMessage = `Failed to create CV: ${response.status} ${response.statusText}`;

        try {
          const errorData = JSON.parse(errorText);
          errorMessage = errorData.error || errorMessage;
        } catch {
          errorMessage = errorText || errorMessage;
        }

        throw new Error(errorMessage);
      }

      const data = await response.json();
      return convertToCVData(data);
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);

export const updateCV = createAsyncThunk(
  'cv/updateCV',
  async ({ id, cvData }: { id: string; cvData: Partial<CVData> }, { rejectWithValue }) => {
    try {
      // Obtener token de autenticación
      const token = localStorage.getItem('token') ||
        localStorage.getItem('authToken') ||
        sessionStorage.getItem('token') ||
        sessionStorage.getItem('authToken');

      if (!token) {
        throw new Error('No authentication token found');
      }

      const response = await fetch(`/api/cv/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(cvData),
      });

      if (!response.ok) {
        const errorText = await response.text();
        let errorMessage = `Failed to update CV: ${response.status} ${response.statusText}`;

        try {
          const errorData = JSON.parse(errorText);
          errorMessage = errorData.error || errorMessage;
        } catch {
          errorMessage = errorText || errorMessage;
        }

        throw new Error(errorMessage);
      }

      const data = await response.json();
      return convertToCVData(data);
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);

export const deleteCV = createAsyncThunk(
  'cv/deleteCV',
  async (id: string, { rejectWithValue }) => {
    try {
      // Obtener token de autenticación
      const token = localStorage.getItem('token') ||
        localStorage.getItem('authToken') ||
        sessionStorage.getItem('token') ||
        sessionStorage.getItem('authToken');

      if (!token) {
        throw new Error('No authentication token found');
      }

      const response = await fetch(`/api/cv/${id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });

      if (!response.ok) {
        const errorText = await response.text();
        let errorMessage = `Failed to delete CV: ${response.status} ${response.statusText}`;

        try {
          const errorData = JSON.parse(errorText);
          errorMessage = errorData.error || errorMessage;
        } catch {
          errorMessage = errorText || errorMessage;
        }

        throw new Error(errorMessage);
      }

      return id;
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);

export const importCV = createAsyncThunk(
  'cv/importCV',
  async ({ cvData, token }: { cvData: any; token: string }, { rejectWithValue }) => {
    try {
      // Validar que los datos requeridos estén presentes
      if (!cvData.profile || !cvData.professional_summary) {
        throw new Error('Datos de CV incompletos. Se requieren profile y professional_summary');
      }

      const response = await fetch('/api/cv/import', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(cvData),
      });

      if (!response.ok) {
        const errorText = await response.text();
        let errorMessage = `Error ${response.status}: ${response.statusText}`;

        try {
          const errorData = JSON.parse(errorText);
          errorMessage = errorData.error || errorMessage;
        } catch {
          errorMessage = errorText || errorMessage;
        }

        throw new Error(errorMessage);
      }

      const data = await response.json();
      return convertToCVData(data);
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);

const cvSlice = createSlice({
  name: 'cv',
  initialState,
  reducers: {
    setActiveCV: (state, action: PayloadAction<CVData | null>) => {
      state.activeCV = action.payload;
    },
    clearError: (state) => {
      state.error = null;
    },
    clearCVs: (state) => {
      state.cvs = [];
      state.activeCV = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch CVs
      .addCase(fetchCVs.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCVs.fulfilled, (state, action) => {
        state.loading = false;
        state.cvs = action.payload;
      })
      .addCase(fetchCVs.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      // Create CV
      .addCase(createCV.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createCV.fulfilled, (state, action) => {
        state.loading = false;
        state.cvs.push(action.payload);
        state.activeCV = action.payload;
      })
      .addCase(createCV.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      // Update CV
      .addCase(updateCV.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateCV.fulfilled, (state, action) => {
        state.loading = false;
        const index = state.cvs.findIndex(cv => cv._id === action.payload._id);
        if (index !== -1) {
          state.cvs[index] = action.payload;
        }
        state.activeCV = action.payload;
      })
      .addCase(updateCV.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      // Delete CV
      .addCase(deleteCV.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteCV.fulfilled, (state, action) => {
        state.loading = false;
        state.cvs = state.cvs.filter(cv => cv._id !== action.payload);
        if (state.activeCV && state.activeCV._id === action.payload) {
          state.activeCV = null;
        }
      })
      .addCase(deleteCV.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      // Import CV
      .addCase(importCV.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(importCV.fulfilled, (state, action) => {
        state.loading = false;
        state.cvs.push(action.payload);
        state.activeCV = action.payload;
      })
      .addCase(importCV.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const { setActiveCV, clearError, clearCVs } = cvSlice.actions;
export const selectCVs = (state: RootState) => state.cv.cvs;
export const selectActiveCV = (state: RootState) => state.cv.activeCV;
export const selectLoading = (state: RootState) => state.cv.loading;
export const selectError = (state: RootState) => state.cv.error;

export default cvSlice.reducer;