// hooks/useAuthCheck.ts
import { useEffect } from 'react';
import { useAppDispatch } from '@/store/hooks';
import { setAuthentication } from '@/store/features/sharedCvSlice';

export const useAuthCheck = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    // Verificar si hay un token en localStorage
    const token = localStorage.getItem('token');
    dispatch(setAuthentication(!!token));
  }, [dispatch]);
};