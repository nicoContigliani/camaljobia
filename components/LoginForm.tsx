import { useState, useEffect } from 'react';
import {
  TextField,
  Button,
  Box,
  Alert,
  CircularProgress,
  IconButton,
  InputAdornment,
  Typography,
  Fade,
  Divider,
  useTheme
} from '@mui/material';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { loginUser, clearError } from '../store/features/authSlice';
import { useRouter } from 'next/router';

export default function LoginForm(props: any) {
  const { urlRdirect } = props
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    showPassword: false
  });

  const [touched, setTouched] = useState({
    email: false,
    password: false
  });

  const dispatch = useAppDispatch();
  const { loading, error } = useAppSelector((state) => state.auth);
  const router = useRouter();
  const theme = useTheme();

  // Validaciones
  const emailError = touched.email && !/\S+@\S+\.\S+/.test(formData.email);
  const passwordError = touched.password && formData.password.length < 6;

  useEffect(() => {
    // Limpiar errores al desmontar
    return () => {
      dispatch(clearError());
    };
  }, [dispatch]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Validación antes de enviar
    if (emailError || passwordError || !formData.email || !formData.password) {
      setTouched({ email: true, password: true });
      return;
    }

    dispatch(loginUser({ email: formData.email, password: formData.password }))
      .unwrap()
      .then(() => {
        
        urlRdirect && router.push(urlRdirect);
      });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));

    if (error) {
      dispatch(clearError());
    }
  };

  const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    const { name } = e.target;
    setTouched(prev => ({
      ...prev,
      [name]: true
    }));
  };

  const handleClickShowPassword = () => {
    setFormData(prev => ({
      ...prev,
      showPassword: !prev.showPassword
    }));
  };

  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ width: '100%' }}>
      <Typography variant="h6" sx={{ mb: 1, color: 'text.secondary', fontWeight: 400 }}>
        Ingresa tus credenciales
      </Typography>

      <Divider sx={{ mb: 3 }} />

      {error && (
        <Fade in={!!error}>
          <Alert
            severity="error"
            sx={{
              mb: 3,
              borderRadius: 2,
              alignItems: 'center',
              '& .MuiAlert-message': {
                padding: '4px 0'
              }
            }}
            onClose={() => dispatch(clearError())}
          >
            {error}
          </Alert>
        </Fade>
      )}

      <TextField
        fullWidth
        label="Correo electrónico"
        name="email"
        type="email"
        value={formData.email}
        onChange={handleChange}
        onBlur={handleBlur}
        error={emailError}
        helperText={emailError ? 'Ingresa un correo electrónico válido' : ''}
        required
        margin="normal"
        variant="outlined"
        autoComplete="email"
        autoFocus
        sx={{
          mb: 2.5,
          '& .MuiOutlinedInput-root': {
            borderRadius: 2,
            transition: 'all 0.2s ease-in-out',
            '&:hover fieldset': {
              borderColor: 'primary.main',
            },
          },
        }}
      />

      <TextField
        fullWidth
        label="Contraseña"
        name="password"
        type={formData.showPassword ? 'text' : 'password'}
        value={formData.password}
        onChange={handleChange}
        onBlur={handleBlur}
        error={passwordError}
        helperText={passwordError ? 'La contraseña debe tener al menos 6 caracteres' : ''}
        required
        margin="normal"
        variant="outlined"
        autoComplete="current-password"
        sx={{
          mb: 1,
          '& .MuiOutlinedInput-root': {
            borderRadius: 2,
            transition: 'all 0.2s ease-in-out',
            '&:hover fieldset': {
              borderColor: 'primary.main',
            },
          },
        }}
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <IconButton
                onClick={handleClickShowPassword}
                edge="end"
                size="medium"
                sx={{
                  color: 'action.active',
                  '&:hover': {
                    backgroundColor: 'transparent'
                  }
                }}
              >
                {formData.showPassword ? <VisibilityOff /> : <Visibility />}
              </IconButton>
            </InputAdornment>
          ),
        }}
      />

      <Box sx={{ textAlign: 'right', mb: 3 }}>
        <Button
          variant="text"
          size="small"
          sx={{
            fontWeight: 500,
            textTransform: 'none',
            fontSize: '0.875rem'
          }}
        >
          ¿Olvidaste tu contraseña?
        </Button>
      </Box>

      <Button
        type="submit"
        fullWidth
        variant="contained"
        disabled={loading}
        sx={{
          py: 1.5,
          borderRadius: 2,
          fontWeight: 600,
          fontSize: '1rem',
          textTransform: 'none',
          boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
          transition: 'all 0.2s ease-in-out',
          '&:hover': {
            transform: 'translateY(-1px)',
            boxShadow: '0 6px 16px rgba(0, 0, 0, 0.15)'
          },
          '&:active': {
            transform: 'translateY(0)',
          }
        }}
      >
        {loading ? (
          <CircularProgress size={24} thickness={4} />
        ) : (
          'Iniciar sesión'
        )}
      </Button>

      <Box sx={{ mt: 3, textAlign: 'center' }}>
        <Typography variant="body2" color="text.secondary">
          ¿No tienes una cuenta?{' '}
          <Button
            variant="text"
            size="small"
            sx={{
              fontWeight: 600,
              textTransform: 'none',
              fontSize: '0.875rem'
            }}
            onClick={() => {/* Aquí podrías agregar lógica para cambiar a registro */ }}
          >
            Regístrate ahora
          </Button>
        </Typography>
      </Box>
    </Box>
  );
}