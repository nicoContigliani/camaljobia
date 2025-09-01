// pages/shared-cv/[id].tsx
'use client';

import Head from 'next/head';
import React, { useEffect } from 'react';
import { 
  Box, 
  Container, 
  Typography, 
  CircularProgress, 
  Paper,
  Button,
  Alert,
  IconButton
} from '@mui/material';
import {
  PictureAsPdf,
  ArrowBack
} from '@mui/icons-material';
import { useParams, useRouter, useSearchParams } from 'next/navigation';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import { useAppDispatch, useAppSelector } from '@/hooks/redux';
import { fetchSharedCV, selectSharedCV } from '@/store/slices/sharedCvSlice';

// Función para formatear fechas
const formatDate = (dateString: string) => {
  if (!dateString || dateString.toLowerCase() === 'presente') return 'Presente';
  
  try {
    const date = new Date(dateString);
    return isNaN(date.getTime()) ? 'Presente' : date.toLocaleDateString('es-ES', {
      year: 'numeric',
      month: 'short'
    });
  } catch {
    return 'Presente';
  }
};

// Componente para la plantilla del PDF (formato ATS-friendly mejorado)
const CVPDFTemplate: React.FC<{ cv: any; userProfile: any }> = ({ cv, userProfile }) => {
  return (
    <Box id="pdf-content" sx={{ 
      padding: '15mm', 
      fontFamily: 'Arial, sans-serif', 
      fontSize: '11px',
      lineHeight: 1.4,
      width: '210mm',
      minHeight: '297mm',
      boxSizing: 'border-box',
      backgroundColor: 'white'
    }}>
      {/* Encabezado con información de contacto */}
      <Box sx={{ textAlign: 'center', marginBottom: '15px', borderBottom: '2px solid #1976d2', paddingBottom: '10px' }}>
        <h1 style={{ margin: '0', fontSize: '20px', color: '#1976d2', textTransform: 'uppercase' }}>
          {userProfile?.fullname || 'Nombre no disponible'}
        </h1>
        <p style={{ margin: '5px 0', fontSize: '14px', fontWeight: 'bold' }}>{cv.profile}</p>
        <Box sx={{ display: 'flex', justifyContent: 'center', flexWrap: 'wrap', gap: '10px', fontSize: '11px' }}>
          {userProfile?.email && <span>{userProfile.email}</span>}
          {userProfile?.phone && <span>{userProfile.phone}</span>}
          {userProfile?.linkedin && <span>LinkedIn: {userProfile.linkedin}</span>}
          {userProfile?.portfolio && <span>Portfolio: {userProfile.portfolio}</span>}
        </Box>
      </Box>
      
      {/* Resumen profesional */}
      <Box sx={{ marginBottom: '15px' }}>
        <h2 style={{ 
          margin: '0 0 10px 0', 
          fontSize: '14px', 
          borderBottom: '1px solid #ddd', 
          paddingBottom: '5px',
          textTransform: 'uppercase',
          color: '#1976d2'
        }}>
          Resumen Profesional
        </h2>
        <p style={{ margin: '0', textAlign: 'justify' }}>{cv.professional_summary}</p>
      </Box>
      
      {/* Habilidades - Formato ATS-friendly mejorado */}
      <Box sx={{ marginBottom: '15px' }}>
        <h2 style={{ 
          margin: '0 0 10px 0', 
          fontSize: '14px', 
          borderBottom: '1px solid #ddd', 
          paddingBottom: '5px',
          textTransform: 'uppercase',
          color: '#1976d2'
        }}>
          Habilidades Técnicas
        </h2>
        {Object.entries(cv.skills).map(([category, skills]: [string, any]) => (
          skills.length > 0 && (
            <Box key={category} sx={{ marginBottom: '8px' }}>
              <strong style={{ textTransform: 'capitalize' }}>
                {category.replace(/_/g, ' ')}:
              </strong>{' '}
              {skills.join(', ')}
            </Box>
          )
        ))}
      </Box>
      
      {/* Experiencia laboral */}
      {cv.work_experience && cv.work_experience.length > 0 && (
        <Box sx={{ marginBottom: '15px' }}>
          <h2 style={{ 
            margin: '0 0 10px 0', 
            fontSize: '14px', 
            borderBottom: '1px solid #ddd', 
            paddingBottom: '5px',
            textTransform: 'uppercase',
            color: '#1976d2'
          }}>
            Experiencia Laboral
          </h2>
          {cv.work_experience.map((exp: any, index: number) => (
            <Box key={index} sx={{ marginBottom: '10px', pageBreakInside: 'avoid' }}>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                <Box>
                  <strong style={{ display: 'block' }}>{exp.position}</strong>
                  <span style={{ fontStyle: 'italic' }}>{exp.company}</span>
                </Box>
                <span style={{ whiteSpace: 'nowrap' }}>
                  {formatDate(exp.start_date)} - {formatDate(exp.end_date)}
                </span>
              </Box>
              <ul style={{ margin: '5px 0', paddingLeft: '15px' }}>
                {exp.description.map((desc: string, i: number) => (
                  <li key={i} style={{ marginBottom: '3px' }}>{desc}</li>
                ))}
              </ul>
            </Box>
          ))}
        </Box>
      )}
      
      {/* Educación */}
      {cv.education && cv.education.length > 0 && (
        <Box sx={{ marginBottom: '15px' }}>
          <h2 style={{ 
            margin: '0 0 10px 0', 
            fontSize: '14px', 
            borderBottom: '1px solid #ddd', 
            paddingBottom: '5px',
            textTransform: 'uppercase',
            color: '#1976d2'
          }}>
            Formación Académica
          </h2>
          {cv.education.map((edu: any, index: number) => (
            <Box key={index} sx={{ marginBottom: '10px', pageBreakInside: 'avoid' }}>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                <Box>
                  <strong style={{ display: 'block' }}>{edu.degree}</strong>
                  <span style={{ fontStyle: 'italic' }}>{edu.institution}</span>
                </Box>
                <span style={{ whiteSpace: 'nowrap' }}>
                  {formatDate(edu.start_date)} - {formatDate(edu.end_date)}
                </span>
              </Box>
              {edu.field_of_study && <Box>Campo de estudio: {edu.field_of_study}</Box>}
              {edu.description && edu.description.length > 0 && (
                <ul style={{ margin: '5px 0', paddingLeft: '15px' }}>
                  {edu.description.map((desc: string, i: number) => (
                    <li key={i} style={{ marginBottom: '3px' }}>{desc}</li>
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
          <h2 style={{ 
            margin: '0 0 10px 0', 
            fontSize: '14px', 
            borderBottom: '1px solid #ddd', 
            paddingBottom: '5px',
            textTransform: 'uppercase',
            color: '#1976d2'
          }}>
            Cursos y Certificaciones
          </h2>
          {cv.courses.map((course: any, index: number) => (
            <Box key={index} sx={{ marginBottom: '10px', pageBreakInside: 'avoid' }}>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                <Box>
                  <strong style={{ display: 'block' }}>{course.name}</strong>
                  <span style={{ fontStyle: 'italic' }}>{course.institution}</span>
                </Box>
                <span style={{ whiteSpace: 'nowrap' }}>
                  {formatDate(course.completion_date)}
                </span>
              </Box>
              {course.duration_hours > 0 && <Box>Duración: {course.duration_hours} horas</Box>}
              {course.description && course.description.length > 0 && (
                <ul style={{ margin: '5px 0', paddingLeft: '15px' }}>
                  {course.description.map((desc: string, i: number) => (
                    <li key={i} style={{ marginBottom: '3px' }}>{desc}</li>
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

// Componente para mostrar el CV compartido
const SharedCVView: React.FC<{ cv: any; userProfile: any }> = ({ cv, userProfile }) => {
  const [isGenerating, setIsGenerating] = React.useState(false);

  const handleGeneratePDF = async () => {
    setIsGenerating(true);
    try {
      // Crear un elemento temporal para renderizar el PDF
      const element = document.createElement('div');
      element.style.position = 'absolute';
      element.style.left = '-9999px';
      element.style.width = '210mm';
      element.style.fontSize = '11px';
      element.style.fontFamily = 'Arial, sans-serif';
      element.style.padding = '15mm';
      element.style.boxSizing = 'border-box';
      element.style.backgroundColor = 'white';
      document.body.appendChild(element);
      
      // Renderizar el contenido del PDF
      const tempTemplate = <CVPDFTemplate cv={cv} userProfile={userProfile} />;
      // En una aplicación real, necesitarías usar ReactDOMServer.renderToStaticMarkup o similar
      // Para este ejemplo, clonamos el elemento existente
      const pdfElement = document.getElementById('pdf-content');
      if (pdfElement) {
        element.innerHTML = pdfElement.innerHTML;
      }
      
      const canvas = await html2canvas(element, {
        scale: 2,
        useCORS: true,
        logging: false,
        width: 210 * 3.78, // Convert mm to pixels (1mm = 3.78px)
        height: 297 * 3.78,
        windowWidth: 210 * 3.78
      });
      
      document.body.removeChild(element);
      
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF('p', 'mm', 'a4');
      const imgWidth = 210; // A4 width in mm
      const imgHeight = (canvas.height * imgWidth) / canvas.width;
      
      pdf.addImage(imgData, 'PNG', 0, 0, imgWidth, imgHeight);
      pdf.save(`${userProfile?.fullname || 'CV'}_${cv.profile || ''}.pdf`);
    } catch (error) {
      console.error('Error generating PDF:', error);
      alert('Error al generar el PDF');
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <Box>
      {/* Template oculto para generar PDF */}
      <div style={{ display: 'none' }}>
        <CVPDFTemplate cv={cv} userProfile={userProfile} />
      </div>

      <Paper elevation={2} sx={{ p: 3, mb: 3 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
          <Typography variant="h4" component="h1">
            {userProfile?.fullname} - {cv.profile}
          </Typography>
          <Button
            variant="contained"
            startIcon={isGenerating ? <CircularProgress size={16} /> : <PictureAsPdf />}
            onClick={handleGeneratePDF}
            disabled={isGenerating}
          >
            {isGenerating ? 'Generando...' : 'Descargar PDF'}
          </Button>
        </Box>

        <Box sx={{ border: '1px solid #eee', p: 2, borderRadius: 1 }}>
          <CVPDFTemplate cv={cv} userProfile={userProfile} />
        </Box>
      </Paper>
    </Box>
  );
};

const SharedCVPage: React.FC = () => {
  const params = useParams();
  const searchParams = useSearchParams();
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { cv, userProfile, loading, error } = useAppSelector(selectSharedCV);

  useEffect(() => {
    if (params?.id) {
      const token = searchParams.get('token');
      dispatch(fetchSharedCV({ 
        cvId: Array.isArray(params.id) ? params.id[0] : params.id, 
        token: token || undefined 
      }));
    }
  }, [dispatch, params, searchParams]);

  if (loading) {
    return (
      <Container maxWidth="lg">
        <Box sx={{ py: 4, display: 'flex', justifyContent: 'center' }}>
          <CircularProgress />
        </Box>
      </Container>
    );
  }

  if (error || !cv) {
    return (
      <Container maxWidth="lg">
        <Box sx={{ py: 4 }}>
          <Alert severity="error" sx={{ mb: 2 }}>
            {error || 'El CV solicitado no existe o no está disponible'}
          </Alert>
          <Button variant="contained" onClick={() => router.push('/')}>
            Volver al inicio
          </Button>
        </Box>
      </Container>
    );
  }

  return (
    <>
      <Head>
        <title>{userProfile?.fullname} - {cv.profile}</title>
        <meta name="description" content={`CV de ${userProfile?.fullname} - ${cv.profile}`} />
      </Head>

      <Container maxWidth="lg" sx={{ py: 4 }}>
        <IconButton onClick={() => router.push('/')} sx={{ mb: 2 }}>
          <ArrowBack /> Volver
        </IconButton>
        
        <SharedCVView cv={cv} userProfile={userProfile} />
      </Container>
    </>
  );
};

export default SharedCVPage;