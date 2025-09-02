'use client';

import { useState } from 'react';
import {
  Box,
  Typography,
  Card,
  CardContent,
  Switch,
  FormControlLabel,
  TextField,
  Button,
  Divider,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Alert,
  Snackbar
} from '@mui/material';
import {
  SaveRounded,
  NotificationsRounded,
  LanguageRounded,
  SecurityRounded,
  PaletteRounded
} from '@mui/icons-material';

interface ConfigProps {
  user: {
    name: string;
    email: string;
    id?: string;
  };
}

export default function Config({ user }: ConfigProps) {
  const [settings, setSettings] = useState({
    notifications: true,
    emailAlerts: false,
    darkMode: false,
    language: 'es',
    autoSave: true,
    privacy: 'public'
  });

  const [openAlert, setOpenAlert] = useState(false);

  const handleChange = (field: string, value: any) => {
    setSettings(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSave = () => {
    // Lógica para guardar configuraciones
    console.log('Configuración guardada:', settings);
    setOpenAlert(true);
  };

  return (
    <Box>
      <Typography variant="h4" component="h1" gutterBottom fontWeight={600} color="#1e293b">
        Configuración
      </Typography>
      <Typography variant="body1" color="#64748b" sx={{ mb: 4 }}>
        Personaliza tu experiencia en la plataforma
      </Typography>

      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
        {/* Preferencias de Notificaciones */}
        <Card sx={{ borderRadius: 3, boxShadow: '0 8px 25px rgba(0,0,0,0.05)' }}>
          <CardContent sx={{ p: 4 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
              <NotificationsRounded sx={{ color: '#4f46e5', mr: 2 }} />
              <Typography variant="h6" color="#1e293b" fontWeight="600">
                Notificaciones
              </Typography>
            </Box>
            
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
              <FormControlLabel
                control={
                  <Switch 
                    checked={settings.notifications} 
                    onChange={(e) => handleChange('notifications', e.target.checked)}
                    color="primary"
                  />
                }
                label="Notificaciones push"
              />
              
              <FormControlLabel
                control={
                  <Switch 
                    checked={settings.emailAlerts} 
                    onChange={(e) => handleChange('emailAlerts', e.target.checked)}
                    color="primary"
                  />
                }
                label="Alertas por correo electrónico"
              />
            </Box>
          </CardContent>
        </Card>

        {/* Preferencias de Apariencia */}
        <Card sx={{ borderRadius: 3, boxShadow: '0 8px 25px rgba(0,0,0,0.05)' }}>
          <CardContent sx={{ p: 4 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
              <PaletteRounded sx={{ color: '#0ea5e9', mr: 2 }} />
              <Typography variant="h6" color="#1e293b" fontWeight="600">
                Apariencia
              </Typography>
            </Box>
            
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
              <FormControlLabel
                control={
                  <Switch 
                    checked={settings.darkMode} 
                    onChange={(e) => handleChange('darkMode', e.target.checked)}
                    color="primary"
                  />
                }
                label="Modo oscuro"
              />
              
              <FormControl fullWidth sx={{ mt: 2 }}>
                <InputLabel id="language-label">Idioma</InputLabel>
                <Select
                  labelId="language-label"
                  value={settings.language}
                  label="Idioma"
                  onChange={(e) => handleChange('language', e.target.value)}
                >
                  <MenuItem value="es">Español</MenuItem>
                  <MenuItem value="en">English</MenuItem>
                  <MenuItem value="pt">Português</MenuItem>
                  <MenuItem value="fr">Français</MenuItem>
                </Select>
              </FormControl>
            </Box>
          </CardContent>
        </Card>

        <Button
          variant="contained"
          startIcon={<SaveRounded />}
          onClick={handleSave}
          sx={{
            backgroundColor: '#4f46e5',
            borderRadius: 2,
            py: 1.5,
            fontSize: '1rem',
            '&:hover': {
              backgroundColor: '#4338ca'
            }
          }}
        >
          Guardar cambios
        </Button>
      </Box>

      <Snackbar 
        open={openAlert} 
        autoHideDuration={3000} 
        onClose={() => setOpenAlert(false)}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert onClose={() => setOpenAlert(false)} severity="success" sx={{ width: '100%' }}>
          Configuración guardada exitosamente
        </Alert>
      </Snackbar>
    </Box>
  );
}