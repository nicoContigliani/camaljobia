import React, { useState } from 'react';
import {
  Box,
  Button,
  TextField,
  Alert,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Typography,
  CircularProgress,
} from '@mui/material';
import { importCV } from '@/store/features/cvSlice';
import { useAppDispatch } from '@/store/hooks';

interface CVImportProps {
  open: boolean;
  onClose: () => void;
}

interface UserData {
  id: string;
  email: string;
  name: string;
  token?: string;
}

const CVImport: React.FC<CVImportProps> = ({ open, onClose }) => {
  const dispatch = useAppDispatch();
  const [jsonInput, setJsonInput] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  // Función para obtener el usuario y token del localStorage
  const getUserFromLocalStorage = (): UserData | null => {
    try {
      const userData = localStorage.getItem('user');
      const token = localStorage.getItem('token');
      
      if (userData) {
        const user = JSON.parse(userData);
        return { ...user, token };
      }
    } catch (error) {
      console.error('Error al obtener datos del localStorage:', error);
    }
    return null;
  };

  // Función para obtener el token de autenticación
  const getAuthToken = (): string | null => {
    try {
      const userData = getUserFromLocalStorage();
      if (userData?.token) return userData.token;
      
      const tokenFromStorage = localStorage.getItem('token') || 
                              localStorage.getItem('authToken') ||
                              sessionStorage.getItem('token') ||
                              sessionStorage.getItem('authToken');
      
      return tokenFromStorage;
    } catch (error) {
      console.error('Error al obtener token:', error);
      return null;
    }
  };

  const handleImport = async () => {
    try {
      setError('');
      setLoading(true);
      
      if (!jsonInput.trim()) {
        throw new Error('Por favor, ingresa o sube un JSON válido');
      }

      const jsonData = JSON.parse(jsonInput);
      
      // Obtener el usuario del localStorage
      const user = getUserFromLocalStorage();
      
      if (!user || !user.id) {
        throw new Error('No se pudo obtener la información del usuario. Por favor, inicia sesión nuevamente.');
      }
      
      // Obtener el token de autenticación
      const token = getAuthToken();
      if (!token) {
        throw new Error('No se encontró el token de autenticación. Por favor, inicia sesión nuevamente.');
      }
      
      // Validar que los datos requeridos estén presentes
      if (!jsonData.profile || !jsonData.professional_summary) {
        throw new Error('Datos de CV incompletos. Se requieren "profile" y "professional_summary"');
      }

      // Crear un nuevo objeto sin modificar el original
      const cvDataWithUser = {
        ...jsonData,
        user: user.id // Esto se convertirá automáticamente a ObjectId en el backend
      };
      
      // Pasar el token en el payload
      await dispatch(importCV({ cvData: cvDataWithUser, token })).unwrap();
      
      onClose();
      setJsonInput('');
      setError('');
    } catch (err: any) {
      if (err.name === 'SyntaxError') {
        setError('Formato JSON inválido. Por favor, verifica la sintaxis.');
      } else if (err.message.includes('401') || err.message.includes('Unauthorized')) {
        setError('Error de autenticación. Por favor, inicia sesión nuevamente.');
      } else if (err.message.includes('409') || err.message.includes('duplicate')) {
        setError('Ya existe un CV con estos datos. Por favor, verifica la información.');
      } else {
        setError(err.message || 'Error al importar el CV. Por favor, intenta nuevamente.');
      }
    } finally {
      setLoading(false);
    }
  };

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        try {
          const content = e.target?.result as string;
          const jsonData = JSON.parse(content);
          
          // Validar estructura básica del CV
          if (!jsonData.profile || !jsonData.professional_summary) {
            setError('El archivo JSON no tiene la estructura correcta de CV');
            return;
          }
          
          setJsonInput(JSON.stringify(jsonData, null, 2));
          setError('');
        } catch (err) {
          setError('Archivo JSON inválido o corrupto');
        }
      };
      
      reader.onerror = () => {
        setError('Error al leer el archivo');
      };
      
      reader.readAsText(file);
    }
  };

  const handleClose = () => {
    if (!loading) {
      onClose();
      setJsonInput('');
      setError('');
    }
  };

  const isValidJSON = (text: string): boolean => {
    try {
      if (!text.trim()) return false;
      JSON.parse(text);
      return true;
    } catch {
      return false;
    }
  };

  return (
    <Dialog open={open} onClose={handleClose} maxWidth="md" fullWidth>
      <DialogTitle>
        <Typography variant="h6" component="div">
          Importar CV desde JSON
        </Typography>
      </DialogTitle>
      
      <DialogContent>
        {error && (
          <Alert 
            severity="error" 
            sx={{ mb: 2 }}
            onClose={() => setError('')}
          >
            {error}
          </Alert>
        )}
        
        <Box mb={2}>
          <Button 
            variant="contained" 
            component="label"
            disabled={loading}
            startIcon={loading ? <CircularProgress size={16} /> : undefined}
          >
            Subir archivo JSON
            <input 
              type="file" 
              hidden 
              accept=".json,application/json" 
              onChange={handleFileUpload}
              disabled={loading}
            />
          </Button>
          
          <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
            Formatos aceptados: .json
          </Typography>
        </Box>
        
        <TextField
          label="Datos del CV en JSON"
          multiline
          rows={12}
          fullWidth
          value={jsonInput}
          onChange={(e) => {
            setJsonInput(e.target.value);
            if (error && isValidJSON(e.target.value)) {
              setError('');
            }
          }}
          placeholder={`{
  "profile": "Desarrollador Full Stack",
  "professional_summary": "Resumen profesional...",
  "skills": {
    "languages": ["JavaScript", "TypeScript"],
    "frameworks_libraries": ["React", "Node.js"]
  },
  "work_experience": [
    {
      "company": "Empresa",
      "position": "Cargo",
      "period": "2020-2023",
      "description": ["Descripción de responsabilidades"]
    }
  ]
}`}
          variant="outlined"
          error={!!error && !isValidJSON(jsonInput)}
          disabled={loading}
          helperText={!isValidJSON(jsonInput) && jsonInput ? 'JSON inválido' : ' '}
        />
        
        <Box mt={2}>
          <Typography variant="body2" color="text.secondary">
            💡 <strong>Información importante:</strong>
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mt: 0.5 }}>
            • El ID de usuario se agregará automáticamente desde tu sesión
          </Typography>
          <Typography variant="body2" color="text.secondary">
            • Campos obligatorios: <strong>profile</strong> y <strong>professional_summary</strong>
          </Typography>
          <Typography variant="body2" color="text.secondary">
            • Las fechas (createdAt, updatedAt) se generarán automáticamente
          </Typography>
        </Box>
      </DialogContent>
      
      <DialogActions>
        <Button 
          onClick={handleClose} 
          disabled={loading}
          color="inherit"
        >
          Cancelar
        </Button>
        <Button 
          onClick={handleImport} 
          variant="contained" 
          disabled={!jsonInput.trim() || !isValidJSON(jsonInput) || loading}
          startIcon={loading ? <CircularProgress size={16} /> : undefined}
        >
          {loading ? 'Importando...' : 'Importar'}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default CVImport;