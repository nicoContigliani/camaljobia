'use client';

import React, { useState, useRef, useCallback } from 'react';
import {
  Box,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
  Typography,
  IconButton,
  Alert,
  CircularProgress
} from '@mui/material';
import {
  PictureAsPdf,
  Share,
  Close
} from '@mui/icons-material';
import { useSelector } from 'react-redux';
import { RootState } from '../../store/store';
import { selectCVs } from '../../store/features/cvSlice';
import { useReactToPrint } from 'react-to-print';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

interface CVExportProps {
  open: boolean;
  onClose: () => void;
}

const CVExport: React.FC<CVExportProps> = ({ open, onClose }) => {
  const cvs = useSelector(selectCVs);
  const userProfile = useSelector((state: RootState) => state.profiles.profile);
  const [selectedCVId, setSelectedCVId] = useState<string>('');
  const [isGenerating, setIsGenerating] = useState(false);
  const printRef = useRef<HTMLDivElement>(null);

  const selectedCV = cvs.find(cv => cv._id === selectedCVId);

  // Función para generar PDF usando html2canvas y jsPDF
  const handleGeneratePDF = async () => {
    if (!printRef.current) return;
    
    setIsGenerating(true);
    try {
      const element = printRef.current;
      const canvas = await html2canvas(element, {
        scale: 2,
        useCORS: true,
        logging: false
      });
      
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF('p', 'mm', 'a4');
      const imgWidth = 210; // A4 width in mm
      const pageHeight = 295; // A4 height in mm
      const imgHeight = (canvas.height * imgWidth) / canvas.width;
      
      let heightLeft = imgHeight;
      let position = 0;
      
      pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
      heightLeft -= pageHeight;
      
      // Add more pages if the content is too long
      while (heightLeft >= 0) {
        position = heightLeft - imgHeight;
        pdf.addPage();
        pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
        heightLeft -= pageHeight;
      }
      
      pdf.save(`${userProfile?.fullname || 'CV'}_${selectedCV?.profile || ''}.pdf`);
    } catch (error) {
      console.error('Error generating PDF:', error);
    } finally {
      setIsGenerating(false);
    }
  };

  // SOLUCIÓN: Uso de useCallback para la referencia de impresión
  const handlePrint = useReactToPrint({
    contentRef: printRef,
    documentTitle: `${userProfile?.fullname || 'CV'}_${selectedCV?.profile || ''}`,
    onAfterPrint: () => console.log('Printed successfully')
  });

  // Función para compartir
  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: `${userProfile?.fullname} - ${selectedCV?.profile}`,
          text: `Echa un vistazo a mi currículum de ${selectedCV?.profile}`,
          url: window.location.href,
        });
      } catch (error) {
        console.log('Error sharing:', error);
      }
    } else {
      // Fallback: copiar al portapapeles
      navigator.clipboard.writeText(window.location.href)
        .then(() => {
          alert('Enlace copiado al portapapeles');
        })
        .catch(err => {
          console.error('Error copying to clipboard:', err);
        });
    }
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
      <DialogTitle>
        <Box display="flex" justifyContent="space-between" alignItems="center">
          Exportar/Compartir CV
          <IconButton onClick={onClose}>
            <Close />
          </IconButton>
        </Box>
      </DialogTitle>
      
      <DialogContent>
        {cvs.length === 0 ? (
          <Alert severity="info">
            No tienes CVs guardados. Crea o importa un CV primero.
          </Alert>
        ) : (
          <>
            <FormControl fullWidth sx={{ mb: 3 }}>
              <InputLabel id="cv-select-label">Seleccionar CV</InputLabel>
              <Select
                labelId="cv-select-label"
                value={selectedCVId}
                label="Seleccionar CV"
                onChange={(e) => setSelectedCVId(e.target.value as string)}
              >
                {cvs.map((cv) => (
                  <MenuItem key={cv._id} value={cv._id}>
                    {cv.profile} - {new Date(cv.updatedAt || cv.createdAt || '').toLocaleDateString()}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

            {selectedCV && (
              <Box sx={{ border: '1px solid #eee', p: 2, borderRadius: 1 }}>
                <Box sx={{ display: 'none' }}>
                  {/* Contenido oculto para la generación de PDF */}
                  <div ref={printRef}>
                    <CVPDFTemplate cv={selectedCV} userProfile={userProfile} />
                  </div>
                </Box>
                
                <Typography variant="h6" gutterBottom>
                  Vista previa: {selectedCV.profile}
                </Typography>
                <Box 
                  sx={{ 
                    maxHeight: '300px', 
                    overflow: 'auto', 
                    border: '1px solid #ddd', 
                    p: 2, 
                    borderRadius: 1,
                    backgroundColor: '#f9f9f9'
                  }}
                >
                  <CVPreview cv={selectedCV} userProfile={userProfile} />
                </Box>
              </Box>
            )}
          </>
        )}
      </DialogContent>
      
      <DialogActions>
        <Button onClick={onClose}>Cancelar</Button>
        <Button 
          onClick={handleShare} 
          disabled={!selectedCV || isGenerating}
          startIcon={<Share />}
        >
          Compartir
        </Button>
        <Button 
          onClick={handlePrint} 
          disabled={!selectedCV || isGenerating}
          startIcon={<PictureAsPdf />}
        >
          Imprimir
        </Button>
        <Button 
          onClick={handleGeneratePDF} 
          disabled={!selectedCV || isGenerating}
          variant="contained"
          startIcon={isGenerating ? <CircularProgress size={16} /> : <PictureAsPdf />}
        >
          {isGenerating ? 'Generando...' : 'Descargar PDF'}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

// Componente para la vista previa del CV
const CVPreview: React.FC<{ cv: any; userProfile: any }> = ({ cv, userProfile }) => {
  return (
    <Box>
      <Typography variant="h5" gutterBottom>
        {userProfile?.fullname || 'Nombre no disponible'}
      </Typography>
      <Typography variant="subtitle1" gutterBottom>
        {cv.profile}
      </Typography>
      <Typography variant="body2" paragraph>
        {cv.professional_summary}
      </Typography>
      
      <Typography variant="h6" gutterBottom>
        Habilidades
      </Typography>
      <Box display="flex" flexWrap="wrap" gap={0.5} mb={2}>
        {Object.entries(cv.skills).map(([category, skills]: [string, any]) => 
          skills.map((skill: string, index: number) => (
            <span key={`${category}-${index}`} style={{ 
              backgroundColor: '#e0e0e0', 
              padding: '2px 8px', 
              borderRadius: '12px', 
              fontSize: '12px',
              margin: '2px'
            }}>
              {skill}
            </span>
          ))
        )}
      </Box>
      
      <Typography variant="body2">
        Más detalles disponibles en el PDF completo...
      </Typography>
    </Box>
  );
};

// Componente para la plantilla del PDF (formato ATS-friendly)
const CVPDFTemplate: React.FC<{ cv: any; userProfile: any }> = ({ cv, userProfile }) => {
  return (
    <Box sx={{ padding: '20px', fontFamily: 'Arial, sans-serif', fontSize: '12px' }}>
      {/* Encabezado con información de contacto */}
      <Box sx={{ textAlign: 'center', marginBottom: '15px' }}>
        <h1 style={{ margin: '0', fontSize: '20px' }}>{userProfile?.fullname || 'Nombre no disponible'}</h1>
        <p style={{ margin: '5px 0', fontSize: '14px' }}>{cv.profile}</p>
        <Box sx={{ display: 'flex', justifyContent: 'center', flexWrap: 'wrap', gap: '10px', fontSize: '11px' }}>
          {userProfile?.email && <span>📧 {userProfile.email}</span>}
          {userProfile?.phone && <span>📞 {userProfile.phone}</span>}
          {userProfile?.linkedin && <span>🔗 LinkedIn: {userProfile.linkedin}</span>}
          {userProfile?.portfolio && <span>🌐 Portfolio: {userProfile.portfolio}</span>}
        </Box>
      </Box>
      
      <hr style={{ border: '1px solid #ccc', margin: '15px 0' }} />
      
      {/* Resumen profesional */}
      <Box sx={{ marginBottom: '15px' }}>
        <h2 style={{ margin: '0 0 10px 0', fontSize: '16px', borderBottom: '1px solid #eee', paddingBottom: '5px' }}>
          RESUMEN PROFESIONAL
        </h2>
        <p style={{ margin: '0', textAlign: 'justify' }}>{cv.professional_summary}</p>
      </Box>
      
      {/* Habilidades - Formato ATS-friendly (sin iconos) */}
      <Box sx={{ marginBottom: '15px' }}>
        <h2 style={{ margin: '0 0 10px 0', fontSize: '16px', borderBottom: '1px solid #eee', paddingBottom: '5px' }}>
          HABILIDADES TÉCNICAS
        </h2>
        {Object.entries(cv.skills).map(([category, skills]: [string, any]) => (
          skills.length > 0 && (
            <Box key={category} sx={{ marginBottom: '8px' }}>
              <strong>{category.toUpperCase().replace(/_/g, ' ')}:</strong>{' '}
              {skills.join(', ')}
            </Box>
          )
        ))}
      </Box>
      
      {/* Experiencia laboral */}
      {cv.work_experience && cv.work_experience.length > 0 && (
        <Box sx={{ marginBottom: '15px' }}>
          <h2 style={{ margin: '0 0 10px 0', fontSize: '16px', borderBottom: '1px solid #eee', paddingBottom: '5px' }}>
            EXPERIENCIA LABORAL
          </h2>
          {cv.work_experience.map((exp: any, index: number) => (
            <Box key={index} sx={{ marginBottom: '10px' }}>
              <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                <strong>{exp.position}</strong>
                <span>{exp.period}</span>
              </Box>
              <Box sx={{ fontStyle: 'italic', marginBottom: '5px' }}>{exp.company}</Box>
              <ul style={{ margin: '5px 0', paddingLeft: '15px' }}>
                {exp.description.map((desc: string, i: number) => (
                  <li key={i}>{desc}</li>
                ))}
              </ul>
            </Box>
          ))}
        </Box>
      )}
      
      {/* Educación */}
      {cv.education && cv.education.length > 0 && (
        <Box sx={{ marginBottom: '15px' }}>
          <h2 style={{ margin: '0 0 10px 0', fontSize: '16px', borderBottom: '1px solid #eee', paddingBottom: '5px' }}>
            FORMACIÓN ACADÉMICA
          </h2>
          {cv.education.map((edu: any, index: number) => (
            <Box key={index} sx={{ marginBottom: '10px' }}>
              <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                <strong>{edu.degree}</strong>
                <span>{edu.period}</span>
              </Box>
              <Box sx={{ fontStyle: 'italic' }}>{edu.institution}</Box>
              {edu.field_of_study && <Box>Campo de estudio: {edu.field_of_study}</Box>}
              {edu.description && edu.description.length > 0 && (
                <ul style={{ margin: '5px 0', paddingLeft: '15px' }}>
                  {edu.description.map((desc: string, i: number) => (
                    <li key={i}>{desc}</li>
                  ))}
                </ul>
              )}
            </Box>
          ))}
        </Box>
      )}
      
      {/* Cursos y certificaciones */}
      {cv.courses && cv.courses.length > 0 && (
        <Box sx={{ marginBottom: '15px' }}>
          <h2 style={{ margin: '0 0 10px 0', fontSize: '16px', borderBottom: '1px solid #eee', paddingBottom: '5px' }}>
            CURSOS Y CERTIFICACIONES
          </h2>
          {cv.courses.map((course: any, index: number) => (
            <Box key={index} sx={{ marginBottom: '10px' }}>
              <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                <strong>{course.name}</strong>
                <span>{course.completion_date}</span>
              </Box>
              <Box sx={{ fontStyle: 'italic' }}>{course.institution}</Box>
              {course.duration_hours > 0 && <Box>Duración: {course.duration_hours} horas</Box>}
              {course.description && course.description.length > 0 && (
                <ul style={{ margin: '5px 0', paddingLeft: '15px' }}>
                  {course.description.map((desc: string, i: number) => (
                    <li key={i}>{desc}</li>
                  ))}
                </ul>
              )}
            </Box>
          ))}
        </Box>
      )}
    </Box>
  );
};

export default CVExport;