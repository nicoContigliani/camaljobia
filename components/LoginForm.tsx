import { useState } from 'react';
import {
  TextField,
  Button,
  Box,
  Alert,
  CircularProgress,
  IconButton,
  InputAdornment
} from '@mui/material';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { loginUser, clearError } from '../store/features/authSlice';
import { useRouter } from 'next/router';

export default function LoginForm() {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    showPassword: false
  });
  const dispatch = useAppDispatch();
  const { loading, error } = useAppSelector((state) => state.auth);
  const router = useRouter();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    dispatch(loginUser({ email: formData.email, password: formData.password }))
      .unwrap()
      .then(() => {
        router.push('/dashboard');
      });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
    
    if (error) {
      dispatch(clearError());
    }
  };

  const handleClickShowPassword = () => {
    setFormData({
      ...formData,
      showPassword: !formData.showPassword
    });
  };

  return (
    <Box component="form" onSubmit={handleSubmit}>
      {error && (
        <Alert 
          severity="error" 
          sx={{ 
            mb: 2, 
            backgroundColor: 'rgba(211, 47, 47, 0.1)',
            color: '#ff5252',
            border: '1px solid rgba(211, 47, 47, 0.3)'
          }} 
          onClose={() => dispatch(clearError())}
        >
          {error}
        </Alert>
      )}

      <TextField
        fullWidth
        label="Email"
        name="email"
        type="email"
        value={formData.email}
        onChange={handleChange}
        required
        margin="normal"
        variant="outlined"
        size="small"
        sx={{
          '& .MuiOutlinedInput-root': {
            color: '#fff',
            '& fieldset': {
              borderColor: 'rgba(255, 255, 255, 0.3)',
            },
            '&:hover fieldset': {
              borderColor: 'rgba(0, 255, 200, 0.5)',
            },
            '&.Mui-focused fieldset': {
              borderColor: '#00ffc8',
            },
          },
          '& .MuiInputLabel-root': {
            color: 'rgba(255, 255, 255, 0.6)',
          },
        }}
      />

      <TextField
        fullWidth
        label="Password"
        name="password"
        type={formData.showPassword ? 'text' : 'password'}
        value={formData.password}
        onChange={handleChange}
        required
        margin="normal"
        variant="outlined"
        size="small"
        sx={{
          '& .MuiOutlinedInput-root': {
            color: '#fff',
            '& fieldset': {
              borderColor: 'rgba(255, 255, 255, 0.3)',
            },
            '&:hover fieldset': {
              borderColor: 'rgba(0, 255, 200, 0.5)',
            },
            '&.Mui-focused fieldset': {
              borderColor: '#00ffc8',
            },
          },
          '& .MuiInputLabel-root': {
            color: 'rgba(255, 255, 255, 0.6)',
          },
        }}
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <IconButton
                onClick={handleClickShowPassword}
                edge="end"
                size="small"
                sx={{ color: 'rgba(255, 255, 255, 0.5)' }}
              >
                {formData.showPassword ? <VisibilityOff /> : <Visibility />}
              </IconButton>
            </InputAdornment>
          ),
        }}
      />

      <Button
        type="submit"
        fullWidth
        variant="contained"
        disabled={loading}
        sx={{ 
          mt: 3, 
          mb: 2, 
          py: 1.5,
          backgroundColor: '#00ffc8',
          color: '#000',
          fontWeight: 600,
          '&:hover': {
            backgroundColor: '#00e6b3',
            transform: 'translateY(-2px)',
            boxShadow: '0 6px 20px rgba(0, 255, 200, 0.4)'
          },
          transition: 'all 0.3s ease',
          boxShadow: '0 4px 15px rgba(0, 255, 200, 0.3)'
        }}
      >
        {loading ? <CircularProgress size={24} sx={{ color: '#000' }} /> : 'Sign In'}
      </Button>
    </Box>
  );
}