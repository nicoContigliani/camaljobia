export const getToken = (): string | null => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('token');
    }
    return null;
  };
  
  export const isAuthenticated = (): boolean => {
    return !!getToken();
  };
  
  export const redirectToLogin = (): void => {
    if (typeof window !== 'undefined') {
      window.location.href = '/login?redirect=' + encodeURIComponent(window.location.pathname);
    }
  };