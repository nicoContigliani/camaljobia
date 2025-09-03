import React, { useState, useEffect } from 'react';
import {
  Box,
  Paper,
  TextField,
  Button,
  Typography,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Chip,
  Alert,
  CircularProgress
} from '@mui/material';
import { Save, Cancel } from '@mui/icons-material';
import { useSelector } from 'react-redux';
import { RootState } from '@/store/store';
import { CoverLetterData } from '@/store/features/coverLetterSlice';

interface CoverLetterEditorProps {
  letter?: CoverLetterData | null;
  onSave: (letterData: Partial<CoverLetterData>) => void;
  onCancel: () => void;
  loading?: boolean;
}

const defaultTemplates = [
  {
    title: 'Plantilla Formal',
    content: `Estimado/a equipo de contratación,

Me complace presentar mi candidatura para el puesto de [Puesto] en [Empresa]. 

Con mi experiencia en [área relevante] y mis habilidades en [habilidades clave], estoy seguro de que puedo contribuir significativamente al éxito de su organización.

Agradezco su consideración y quedo a la espera de la oportunidad de discutir mi candidatura en una entrevista.

Atentamente,
[Nombre]`
  },
  {
    title: 'Plantilla Creativa',
    content: `¡Hola equipo de [Empresa]!

Me encantaría unirme a ustedes como [Puesto]. Soy un apasionado de [área relevante] y he seguido con admiración el trabajo que han estado haciendo en [proyecto específico].

Creo que mi experiencia en [habilidad] y mi pasión por [área] serían una gran adición a su equipo.

¡Espero tener noticias suyas pronto!

Saludos cordiales,
[Nombre]`
  }
];

const CoverLetterEditor: React.FC<CoverLetterEditorProps> = ({
  letter,
  onSave,
  onCancel,
  loading = false
}) => {
  const [title, setTitle] = useState(letter?.title || '');
  const [content, setContent] = useState(letter?.content || '');
  const [company, setCompany] = useState(letter?.company || '');
  const [position, setPosition] = useState(letter?.position || '');
  const [selectedTemplate, setSelectedTemplate] = useState('');

  const userProfile = useSelector((state: RootState) => state.profiles.profile);

  useEffect(() => {
    if (letter) {
      setTitle(letter.title);
      setContent(letter.content);
      setCompany(letter.company || '');
      setPosition(letter.position || '');
    }
  }, [letter]);

  const handleTemplateChange = (templateIndex: number) => {
    const template = defaultTemplates[templateIndex];
    setContent(template.content);
    setSelectedTemplate(templateIndex.toString());
  };

  const handleSave = () => {
    const letterData: Partial<CoverLetterData> = {
      title,
      content,
      company,
      position,
      isTemplate: false
    };

    onSave(letterData);
  };

  const isFormValid = title.trim() !== '' && content.trim() !== '';

  return (
    <Paper sx={{ p: 3 }}>
      <Typography variant="h5" gutterBottom>
        {letter ? 'Editar Carta' : 'Nueva Carta de Presentación'}
      </Typography>

      <Box sx={{ mb: 3 }}>
        <FormControl fullWidth>
          <InputLabel>Plantillas</InputLabel>
          <Select
            value={selectedTemplate}
            label="Plantillas"
            onChange={(e) => handleTemplateChange(parseInt(e.target.value))}
          >
            <MenuItem value="">Seleccionar plantilla</MenuItem>
            {defaultTemplates.map((template, index) => (
              <MenuItem key={index} value={index.toString()}>
                {template.title}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Box>

      <TextField
        fullWidth
        label="Título"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        sx={{ mb: 2 }}
      />

      <TextField
        fullWidth
        label="Empresa (opcional)"
        value={company}
        onChange={(e) => setCompany(e.target.value)}
        sx={{ mb: 2 }}
      />

      <TextField
        fullWidth
        label="Puesto (opcional)"
        value={position}
        onChange={(e) => setPosition(e.target.value)}
        sx={{ mb: 2 }}
      />

      <TextField
        fullWidth
        multiline
        rows={10}
        label="Contenido de la carta"
        value={content}
        onChange={(e) => setContent(e.target.value)}
        sx={{ mb: 2 }}
        helperText={`${content.length}/10000 caracteres`}
      />

      <Box sx={{ display: 'flex', gap: 1, justifyContent: 'flex-end' }}>
        <Button
          variant="outlined"
          onClick={onCancel}
          startIcon={<Cancel />}
        >
          Cancelar
        </Button>
        <Button
          variant="contained"
          onClick={handleSave}
          disabled={!isFormValid || loading}
          startIcon={loading ? <CircularProgress size={16} /> : <Save />}
        >
          {loading ? 'Guardando...' : 'Guardar'}
        </Button>
      </Box>
    </Paper>
  );
};

export default CoverLetterEditor;