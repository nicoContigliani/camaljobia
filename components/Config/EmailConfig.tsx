'use client';

import { useState } from 'react';
import {
  Box,
  Typography,
  Card,
  CardContent,
  TextField,
  Button,
  Divider,
  Switch,
  FormControlLabel,
  Alert,
  Snackbar
} from '@mui/material';
import { SaveRounded, EmailRounded } from '@mui/icons-material';

interface EmailConfigProps {
  user: {
    name: string;
    email: string;
    id?: string;
  };
}

export default function EmailConfig({ user }: EmailConfigProps) {
  const [emailSettings, setEmailSettings] = useState({
    smtpServer: '',
    smtpPort: 587,
    username: '',
    password: '',
    useSSL: true,
    fromAddress: user.email,
    fromName: user.name
  });

  const [openAlert, setOpenAlert] = useState(false);

  const handleChange = (field: string, value: any) => {
    setEmailSettings(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSave = () => {
    // Lógica para guardar configuración de email
    console.log('Configuración de email guardada:', emailSettings);
    setOpenAlert(true);
  };

  const testConnection = () => {
    // Lógica para probar conexión SMTP
    console.log('Probando conexión SMTP...');
  };

  return (
    <Box>
      <Typography variant="h4" component="h1" gutterBottom fontWeight={600} color="#1e293b">
        Configuración de Email
      </Typography>
      <Typography variant="body1" color="#64748b" sx={{ mb: 4 }}>
        Configura los parámetros de envío de correos electrónicos
      </Typography>

      <Card sx={{ borderRadius: 3, boxShadow: '0 8px 25px rgba(0,0,0,0.05)' }}>
        <CardContent sx={{ p: 4 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
            <EmailRounded sx={{ color: '#4f46e5', mr: 2 }} />
            <Typography variant="h6" color="#1e293b" fontWeight="600">
              Servidor SMTP
            </Typography>
          </Box>
          
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2 }}>
              <TextField
                label="Servidor SMTP"
                value={emailSettings.smtpServer}
                onChange={(e) => handleChange('smtpServer', e.target.value)}
                sx={{ flex: '1 1 300px' }}
              />
              <TextField
                label="Puerto"
                type="number"
                value={emailSettings.smtpPort}
                onChange={(e) => handleChange('smtpPort', parseInt(e.target.value))}
                sx={{ flex: '1 1 100px' }}
              />
            </Box>
            
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2 }}>
              <TextField
                label="Usuario"
                value={emailSettings.username}
                onChange={(e) => handleChange('username', e.target.value)}
                sx={{ flex: '1 1 200px' }}
              />
              <TextField
                label="Contraseña"
                type="password"
                value={emailSettings.password}
                onChange={(e) => handleChange('password', e.target.value)}
                sx={{ flex: '1 1 200px' }}
              />
            </Box>
            
            <FormControlLabel
              control={
                <Switch 
                  checked={emailSettings.useSSL} 
                  onChange={(e) => handleChange('useSSL', e.target.checked)}
                  color="primary"
                />
              }
              label="Usar SSL/TLS"
            />
            
            <Divider />
            
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2 }}>
              <TextField
                label="Dirección de envío"
                value={emailSettings.fromAddress}
                onChange={(e) => handleChange('fromAddress', e.target.value)}
                sx={{ flex: '1 1 300px' }}
              />
              <TextField
                label="Nombre de remitente"
                value={emailSettings.fromName}
                onChange={(e) => handleChange('fromName', e.target.value)}
                sx={{ flex: '1 1 300px' }}
              />
            </Box>
            
            <Box sx={{ display: 'flex', gap: 2, mt: 2 }}>
              <Button
                variant="contained"
                startIcon={<SaveRounded />}
                onClick={handleSave}
                sx={{
                  backgroundColor: '#4f46e5',
                  '&:hover': {
                    backgroundColor: '#4338ca'
                  }
                }}
              >
                Guardar configuración
              </Button>
              
              <Button
                variant="outlined"
                onClick={testConnection}
                sx={{
                  color: '#4f46e5',
                  borderColor: 'rgba(79, 70, 229, 0.3)',
                  '&:hover': {
                    borderColor: '#4f46e5',
                    backgroundColor: 'rgba(79, 70, 229, 0.08)'
                  }
                }}
              >
                Probar conexión
              </Button>
            </Box>
          </Box>
        </CardContent>
      </Card>

      <Snackbar 
        open={openAlert} 
        autoHideDuration={3000} 
        onClose={() => setOpenAlert(false)}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert onClose={() => setOpenAlert(false)} severity="success" sx={{ width: '100%' }}>
          Configuración de email guardada exitosamente
        </Alert>
      </Snackbar>
    </Box>
  );
}