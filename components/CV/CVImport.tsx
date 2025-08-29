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
  IconButton,
  Tooltip,
} from '@mui/material';
import { ContentCopy } from '@mui/icons-material';
import { importCV } from '@/store/features/cvSlice';
import { useAppDispatch } from '@/store/hooks';
import { transformJSONToModel } from '@/utils/adapters/cvDataAdapter';

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

// Ejemplo de JSON válido en español
const EXAMPLE_JSON = {
  "curriculum_vitae": [
    {
      "perfil": "Desarrollador Web Full Stack",
      "resumen_profesional": "Soy un profesional de TI con capacidad de trabajar en equipo, especializado en tecnologías Node.js, React.js y bases de datos relacionales.",
      "habilidades": {
        "lenguajes": ["JavaScript", "TypeScript"],
        "frameworks_y_librerias": ["React", "Node.js"],
        "bases_de_datos": ["PostgreSQL", "MySQL"],
        "herramientas_y_entornos": ["Git", "Docker"],
        "metodologias": ["Scrum", "Agile"],
        "seguridad": [],
        "movil": ["React Native"],
        "analisis_y_gestion": [],
        "comunicacion": ["Español - Nativo", "Inglés - Intermedio"]
      },
      "experiencia_laboral": [
        {
          "empresa": "Mi Empresa",
          "periodo": "2020 - Actualidad",
          "puesto": "Desarrollador Full Stack",
          "descripcion": [
            "Desarrollo de aplicaciones web con React y Node.js",
            "Mantenimiento de bases de datos PostgreSQL"
          ]
        }
      ],
      "educacion": [
        {
          "institucion": "Universidad Ejemplo",
          "titulo": "Ingeniería en Sistemas",
          "campo_estudio": "Informática",
          "periodo": "2015 - 2020",
          "descripcion": ["Graduado con honores"]
        }
      ],
      "cursos": [
        {
          "nombre": "Curso de React Avanzado",
          "institucion": "Plataforma Online",
          "fecha_finalizacion": "2023-06-15",
          "duracion_horas": 40,
          "url_certificado": "https://ejemplo.com/certificado",
          "descripcion": ["Curso avanzado de React con Hooks y Context API"]
        }
      ]
    }
  ]
};

const CVImport: React.FC<CVImportProps> = ({ open, onClose }) => {
  const dispatch = useAppDispatch();
  const [jsonInput, setJsonInput] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

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

  const getAuthToken = (): string | null => {
    try {
      const userData = getUserFromLocalStorage();
      if (userData?.token) return userData.token;

      return localStorage.getItem('token') ||
        localStorage.getItem('authToken') ||
        sessionStorage.getItem('token') ||
        sessionStorage.getItem('authToken');
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

      // TRANSFORMAR el JSON español al modelo inglés ANTES de validar
      const transformedData = transformJSONToModel(jsonData, user.id);

      // Validar que los datos transformados tengan los campos requeridos
      if (!transformedData.profile || !transformedData.professional_summary) {
        throw new Error('Datos de CV incompletos. Se requieren "perfil" y "resumen_profesional" en el JSON');
      }

      // Pasar el token en el payload
      await dispatch(importCV({ cvData: transformedData, token })).unwrap();

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

          // Validar estructura básica del CV en ESPAÑOL
          if (!jsonData.curriculum_vitae || !Array.isArray(jsonData.curriculum_vitae) ||
            !jsonData.curriculum_vitae[0]?.perfil || !jsonData.curriculum_vitae[0]?.resumen_profesional) {
            setError('El archivo JSON no tiene la estructura correcta de CV en español');
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

  const copyExampleJSON = () => {
    navigator.clipboard.writeText(JSON.stringify(EXAMPLE_JSON, null, 2));
    setError('Ejemplo copiado al portapapeles!');
    setTimeout(() => setError(''), 2000);
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
            severity={error.includes('copiado') ? "success" : "error"}
            sx={{ mb: 2 }}
            onClose={() => setError('')}
          >
            {error}
          </Alert>
        )}

        <Box mb={2} display="flex" gap={1} alignItems="center">
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

          <Tooltip title="Copiar ejemplo de JSON válido">
            <Button
              variant="outlined"
              onClick={copyExampleJSON}
              startIcon={<ContentCopy />}
              disabled={loading}
            >
              Copiar ejemplo
            </Button>
          </Tooltip>
        </Box>

        <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
          💡 El JSON debe estar en español con la estructura: curriculum_vitae[perfil, resumen_profesional, habilidades, experiencia_laboral]
        </Typography>

        <TextField
          label="Datos del CV en JSON (español)"
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
  "curriculum_vitae": [
    {
      "perfil": "Tu perfil profesional...",
      "resumen_profesional": "Tu resumen profesional...",
      "habilidades": {
        "lenguajes": ["JavaScript", "TypeScript"],
        "frameworks_y_librerias": ["React", "Node.js"]
      },
      "experiencia_laboral": [
        {
          "empresa": "Empresa",
          "puesto": "Cargo",
          "periodo": "2020-2023",
          "descripcion": ["Descripción de responsabilidades"]
        }
      ]
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
            📋 <strong>Campos obligatorios en español:</strong>
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mt: 0.5 }}>
            • <strong>perfil</strong> (se convierte a profile)
          </Typography>
          <Typography variant="body2" color="text.secondary">
            • <strong>resumen_profesional</strong> (se convierte a professional_summary)
          </Typography>
          <Typography variant="body2" color="text.secondary">
            • <strong>habilidades</strong> (se convierte a skills)
          </Typography>
          <Typography variant="body2" color="text.secondary">
            • <strong>experiencia_laboral</strong> (se convierte a work_experience)
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