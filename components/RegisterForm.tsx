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
import { registerUser, clearError } from '../store/features/authSlice';
import { useRouter } from 'next/router';

interface FormState {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
  showPassword: boolean;
  showConfirmPassword: boolean;
}

interface TouchedState {
  name: boolean;
  email: boolean;
  password: boolean;
  confirmPassword: boolean;
}

export default function RegisterForm() {
  const [formData, setFormData] = useState<FormState>({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    showPassword: false,
    showConfirmPassword: false
  });

  const [touched, setTouched] = useState<TouchedState>({
    name: false,
    email: false,
    password: false,
    confirmPassword: false
  });

  const [validationError, setValidationError] = useState('');
  const dispatch = useAppDispatch();
  const { loading, error } = useAppSelector((state) => state.auth);
  const router = useRouter();
  const theme = useTheme();

  // Validaciones
  const nameError = touched.name && formData.name.trim().length < 2;
  const emailError = touched.email && !/\S+@\S+\.\S+/.test(formData.email);
  const passwordError = touched.password && formData.password.length < 6;
  const confirmPasswordError = touched.confirmPassword && formData.password !== formData.confirmPassword;

  useEffect(() => {
    // Limpiar errores al desmontar
    return () => {
      dispatch(clearError());
      setValidationError('');
    };
  }, [dispatch]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Marcar todos los campos como tocados
    setTouched({
      name: true,
      email: true,
      password: true,
      confirmPassword: true
    });

    // Validaciones
    if (nameError || emailError || passwordError || confirmPasswordError ||
      !formData.name || !formData.email || !formData.password || !formData.confirmPassword) {
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      setValidationError('Las contraseñas no coinciden');
      return;
    }

    setValidationError('');
    dispatch(clearError());

    dispatch(registerUser({
      email: formData.email,
      password: formData.password,
      name: formData.name
    }))
      .unwrap()
      .then(() => {
        router.push('/dashboard');
      });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));

    if (error || validationError) {
      dispatch(clearError());
      setValidationError('');
    }
  };

  const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    const { name } = e.target;
    setTouched(prev => ({
      ...prev,
      [name]: true
    }));
  };

  const handleClickShowPassword = (field: 'password' | 'confirmPassword') => {
    setFormData(prev => ({
      ...prev,
      [field === 'password' ? 'showPassword' : 'showConfirmPassword']:
        !prev[field === 'password' ? 'showPassword' : 'showConfirmPassword']
    }));
  };

  const getPasswordStrength = (password: string) => {
    if (password.length === 0) return { strength: 0, label: '', color: 'transparent' };
    if (password.length < 6) return { strength: 25, label: 'Débil', color: theme.palette.error.main };
    if (password.length < 8) return { strength: 50, label: 'Moderada', color: theme.palette.warning.main };
    if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/.test(password)) return { strength: 75, label: 'Buena', color: theme.palette.info.main };
    return { strength: 100, label: 'Fuerte', color: theme.palette.success.main };
  };

  const passwordStrength = getPasswordStrength(formData.password);

  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ width: '100%' }}>
      <Typography variant="h6" sx={{ mb: 1, color: 'text.secondary', fontWeight: 400 }}>
        Crea tu cuenta
      </Typography>

      <Divider sx={{ mb: 3 }} />

      {(error || validationError) && (
        <Fade in={!!(error || validationError)}>
          <Alert
            severity="error"
            sx={{
              mb: 3,
              borderRadius: 2,
              alignItems: 'center'
            }}
            onClose={() => {
              dispatch(clearError());
              setValidationError('');
            }}
          >
            {error || validationError}
          </Alert>
        </Fade>
      )}

      <TextField
        fullWidth
        label="Nombre completo"
        name="name"
        value={formData.name}
        onChange={handleChange}
        onBlur={handleBlur}
        error={nameError}
        helperText={nameError ? 'El nombre debe tener al menos 2 caracteres' : ''}
        required
        margin="normal"
        variant="outlined"
        autoComplete="name"
        autoFocus
        sx={{
          mb: 2,
          '& .MuiOutlinedInput-root': {
            borderRadius: 2,
          },
        }}
      />

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
        sx={{
          mb: 2,
          '& .MuiOutlinedInput-root': {
            borderRadius: 2,
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
        autoComplete="new-password"
        sx={{
          mb: 1,
          '& .MuiOutlinedInput-root': {
            borderRadius: 2,
          },
        }}
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <IconButton
                onClick={() => handleClickShowPassword('password')}
                edge="end"
                size="medium"
              >
                {formData.showPassword ? <VisibilityOff /> : <Visibility />}
              </IconButton>
            </InputAdornment>
          ),
        }}
      />

      {formData.password && (
        <Box sx={{ mt: 1, mb: 2 }}>
          <Box sx={{
            width: '100%',
            height: 4,
            backgroundColor: 'grey.200',
            borderRadius: 2,
            overflow: 'hidden'
          }}>
            <Box sx={{
              width: `${passwordStrength.strength}%`,
              height: '100%',
              backgroundColor: passwordStrength.color,
              transition: 'all 0.3s ease'
            }} />
          </Box>
          <Typography variant="caption" color="text.secondary">
            Fortaleza de la contraseña: {passwordStrength.label}
          </Typography>
        </Box>
      )}

      <TextField
        fullWidth
        label="Confirmar contraseña"
        name="confirmPassword"
        type={formData.showConfirmPassword ? 'text' : 'password'}
        value={formData.confirmPassword}
        onChange={handleChange}
        onBlur={handleBlur}
        error={confirmPasswordError}
        helperText={confirmPasswordError ? 'Las contraseñas no coinciden' : ''}
        required
        margin="normal"
        variant="outlined"
        autoComplete="new-password"
        sx={{
          mb: 2,
          '& .MuiOutlinedInput-root': {
            borderRadius: 2,
          },
        }}
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <IconButton
                onClick={() => handleClickShowPassword('confirmPassword')}
                edge="end"
                size="medium"
              >
                {formData.showConfirmPassword ? <VisibilityOff /> : <Visibility />}
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
          mt: 2,
          mb: 2,
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
        }}
      >
        {loading ? (
          <CircularProgress size={24} thickness={4} />
        ) : (
          'Crear cuenta'
        )}
      </Button>

      <Box sx={{ mt: 3, textAlign: 'center' }}>
        <Typography variant="body2" color="text.secondary">
          ¿Ya tienes una cuenta?{' '}
          <Button
            variant="text"
            size="small"
            sx={{
              fontWeight: 600,
              textTransform: 'none',
              fontSize: '0.875rem'
            }}
            onClick={() => {/* Aquí podrías agregar lógica para cambiar a login */ }}
          >
            Inicia sesión
          </Button>
        </Typography>
      </Box>

      <Typography variant="caption" color="text.secondary" sx={{ display: 'block', mt: 2, textAlign: 'center' }}>
        Al registrarte, aceptas nuestros Términos de servicio y Política de privacidad
      </Typography>
    </Box>
  );
}