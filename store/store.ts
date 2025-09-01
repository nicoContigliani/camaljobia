import { configureStore } from '@reduxjs/toolkit';
import authReducer from '@/store/features/authSlice';
import profileReducer from '@/store/features/profileSlice';
import cvReducer from '@/store/features/cvSlice';
import sharedCvReducer from '@/store/features/sharedCvSlice'; 

export const store = configureStore({
  reducer: {
    auth: authReducer,
    profiles: profileReducer,
    cv: cvReducer,
    sharedCV: sharedCvReducer,

  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;