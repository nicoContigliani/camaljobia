// "use client"

// import Head from 'next/head';
// import dynamic from 'next/dynamic';
// import React, { Suspense, useState, useEffect } from 'react';
// import { useSelector } from 'react-redux';
// import {
//   Box,
//   Container,
//   Typography,
//   CircularProgress,
//   Tabs,
//   Tab,
//   Button,
//   Alert,
//   Paper
// } from '@mui/material';
// import { RootState } from '../../store/store';
// import { useAppDispatch } from '../../store/hooks';
// import { fetchCVs, selectCVs, selectActiveCV, setActiveCV } from '../../store/features/cvSlice';

// // Importaciones dinámicas de todos los componentes
// const Profile = dynamic(() => import('../../components/Profile'), {
//   ssr: false,
//   loading: () => <CircularProgress />
// });

// const CVView = dynamic(() => import('@/components/CV/CVView'), {
//   ssr: false,
//   loading: () => <CircularProgress />
// });

// const CVImport = dynamic(() => import('@/components/CV/CVImport'), {
//   ssr: false,
//   loading: () => <CircularProgress />
// });

// interface TabPanelProps {
//   children?: React.ReactNode;
//   index: number;
//   value: number;
// }

// function TabPanel(props: TabPanelProps) {
//   const { children, value, index, ...other } = props;

//   return (
//     <div
//       role="tabpanel"
//       hidden={value !== index}
//       id={`cv-tabpanel-${index}`}
//       aria-labelledby={`cv-tab-${index}`}
//       {...other}
//     >
//       {value === index && <Box sx={{ py: 3 }}>{children}</Box>}
//     </div>
//   );
// }

// const CVPage: React.FC = () => {
//   const { user, isAuthenticated } = useSelector((state: RootState) => state?.auth);
//   const cvs = useSelector(selectCVs);
//   const activeCV = useSelector(selectActiveCV);
//   const loading = useSelector((state: RootState) => state.cv.loading);
//   const error = useSelector((state: RootState) => state.cv.error);
//   const dispatch = useAppDispatch();
//   const [isClient, setIsClient] = useState(false);
//   const [tabValue, setTabValue] = useState(0);
//   const [importOpen, setImportOpen] = useState(false);

//   useEffect(() => {
//     setIsClient(true);
//     if (isAuthenticated) {
//       dispatch(fetchCVs());
//     }
//   }, [dispatch, isAuthenticated]);

//   const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
//     setTabValue(newValue);
//   };

//   const handleImportOpen = () => {
//     setImportOpen(true);
//   };

//   const handleImportClose = () => {
//     setImportOpen(false);
//   };

//   if (!isClient) {
//     return (
//       <Container maxWidth="lg">
//         <Box sx={{ py: 4, display: 'flex', justifyContent: 'center' }}>
//           <CircularProgress />
//         </Box>
//       </Container>
//     );
//   }

//   if (!isAuthenticated || !user) {
//     return (
//       <Container maxWidth="lg">
//         <Box sx={{ py: 4 }}>
//           <Typography variant="h4" component="h1" gutterBottom>
//             Acceso Denegado
//           </Typography>
//           <Typography variant="body1">
//             Debes iniciar sesión para acceder a esta página.
//           </Typography>
//         </Box>
//       </Container>
//     );
//   }

//   return (
//     <>
//       <Head>
//         <title>Mi CV - Perfil</title>
//         <meta name="description" content="Gestiona tu perfil profesional" />
//       </Head>

//       <Container maxWidth="lg" sx={{ py: 4 }}>
//         <Paper elevation={2} sx={{ p: 3, mb: 3 }}>
//           <Typography variant="h4" component="h1" gutterBottom>
//             Gestión de Currículums
//           </Typography>
//           <Typography variant="body1" color="text.secondary" sx={{ mb: 2 }}>
//             Administra y visualiza tus currículums profesionales
//           </Typography>

//           <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
//             <Tabs value={tabValue} onChange={handleTabChange} aria-label="CV tabs">
//               <Tab label="Editor de Perfil" />
//               <Tab label="Visualizar CV" />
//             </Tabs>
//           </Box>

//           <TabPanel value={tabValue} index={0}>
//             <Suspense fallback={
//               <Box sx={{ display: 'flex', justifyContent: 'center', py: 4 }}>
//                 <CircularProgress />
//               </Box>
//             }>
//               {user && <Profile />}
//             </Suspense>
//           </TabPanel>

//           <TabPanel value={tabValue} index={1}>
//             {error && (
//               <Alert severity="error" sx={{ mb: 2 }}>
//                 {error}
//               </Alert>
//             )}

//             <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
//               <Typography variant="h5">
//                 Visualización de CV
//               </Typography>



//               <Box>
//                 <Button
//                   variant="outlined"
//                   onClick={handleImportOpen}
//                   sx={{ mr: 1 }}
//                 >
//                   Importar CV
//                 </Button>
//                 <Button
//                   variant="contained"
//                   onClick={() => dispatch(fetchCVs())}
//                   disabled={loading}
//                 >
//                   {loading ? <CircularProgress size={24} /> : 'Actualizar'}
//                 </Button>
//               </Box>
//             </Box>

//             {loading ? (
//               <Box sx={{ display: 'flex', justifyContent: 'center', py: 4 }}>
//                 <CircularProgress />
//               </Box>
//             ) : cvs.length > 0 ? (
//               <Box>

//                 <Suspense fallback={
//                   <Box sx={{ display: 'flex', justifyContent: 'center', py: 4 }}>
//                     <CircularProgress />
//                   </Box>
//                 }>
//                   {user && <Profile />}
//                 </Suspense>

//                 {cvs?.map((cv) => (
//                   <Box key={cv._id} sx={{ mb: 3 }}>
//                     <Suspense fallback={
//                       <Box sx={{ display: 'flex', justifyContent: 'center', py: 4 }}>
//                         <CircularProgress />
//                       </Box>
//                     }>
//                       <CVView cv={cv} />
//                     </Suspense>
//                     <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 1 }}>
//                       <Button
//                         variant={activeCV?._id === cv._id ? "contained" : "outlined"}
//                         size="small"
//                         onClick={() => dispatch(setActiveCV(cv))}
//                       >
//                         {activeCV?._id === cv._id ? "Seleccionado" : "Seleccionar"}
//                       </Button>
//                     </Box>
//                   </Box>
//                 ))}
//               </Box>
//             ) : (
//               <Paper variant="outlined" sx={{ p: 4, textAlign: 'center' }}>
//                 <Typography variant="h6" gutterBottom>
//                   No tienes currículums guardados
//                 </Typography>
//                 <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
//                   Comienza creando un perfil o importa un CV existente
//                 </Typography>
//                 <Button variant="contained" onClick={handleImportOpen}>
//                   Importar CV
//                 </Button>
//               </Paper>
//             )}
//           </TabPanel>
//         </Paper>

//         {importOpen && (
//           <Suspense fallback={
//             <Box sx={{ display: 'flex', justifyContent: 'center', py: 4 }}>
//               <CircularProgress />
//             </Box>
//           }>
//             <CVImport open={importOpen} onClose={handleImportClose} />
//           </Suspense>
//         )}
//       </Container>
//     </>
//   );
// };

// export default CVPage;



"use client"

import Head from 'next/head';
import dynamic from 'next/dynamic';
import React, { Suspense, useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { 
  Box, 
  Container, 
  Typography, 
  CircularProgress, 
  Tabs,
  Tab,
  Button,
  Alert,
  Paper,
  IconButton,
  Chip,
  Menu,
  MenuItem,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  FormControl,
  InputLabel,
  Select,
  Snackbar,
  useMediaQuery,
  useTheme
} from '@mui/material';
import {
  PictureAsPdf,
  Share,
  MoreVert,
  Visibility
} from '@mui/icons-material';
import { RootState } from '../../store/store';
import { useAppDispatch } from '../../store/hooks';
import { fetchCVs, selectCVs, selectActiveCV, setActiveCV } from '../../store/features/cvSlice';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

// Importaciones dinámicas de todos los componentes
const Profile = dynamic(() => import('../../components/Profile'), {
  ssr: false,
  loading: () => <CircularProgress />
});

const CVView = dynamic(() => import('@/components/CV/CVView'), {
  ssr: false,
  loading: () => <CircularProgress />
});

const CVImport = dynamic(() => import('@/components/CV/CVImport'), {
  ssr: false,
  loading: () => <CircularProgress />
});

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`cv-tabpanel-${index}`}
      aria-labelledby={`cv-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ py: 3 }}>{children}</Box>}
    </div>
  );
}

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

// Componente de vista previa del PDF
const PDFPreview: React.FC<{ cv: any; userProfile: any; onClose: () => void; onDownload: () => void }> = 
  ({ cv, userProfile, onClose, onDownload }) => {
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('md'));

  return (
    <Dialog 
      open={true} 
      onClose={onClose} 
      maxWidth="lg" 
      fullWidth 
      fullScreen={fullScreen}
      sx={{ 
        '& .MuiDialog-paper': { 
          maxWidth: '210mm', 
          height: '297mm',
          overflow: 'hidden'
        } 
      }}
    >
      <DialogTitle sx={{ 
        display: 'flex', 
        justifyContent: 'space-between', 
        alignItems: 'center',
        backgroundColor: '#f5f5f5',
        borderBottom: '1px solid #ddd'
      }}>
        <Typography variant="h6">Vista previa del CV</Typography>
        <Box>
          <Button 
            variant="outlined" 
            onClick={onClose}
            sx={{ mr: 1 }}
          >
            Cerrar
          </Button>
          <Button 
            variant="contained" 
            startIcon={<PictureAsPdf />}
            onClick={onDownload}
          >
            Descargar PDF
          </Button>
        </Box>
      </DialogTitle>
      <DialogContent sx={{ 
        overflow: 'auto', 
        p: 0, 
        display: 'flex', 
        justifyContent: 'center',
        alignItems: 'flex-start',
        backgroundColor: '#f9f9f9'
      }}>
        <Box sx={{ 
          width: '210mm',
          height: '297mm',
          boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
          backgroundColor: 'white'
        }}>
          <CVPDFTemplate cv={cv} userProfile={userProfile} />
        </Box>
      </DialogContent>
    </Dialog>
  );
};

const CVPage: React.FC = () => {
  const { user, isAuthenticated } = useSelector((state: RootState) => state?.auth);
  const cvs = useSelector(selectCVs);
  const activeCV = useSelector(selectActiveCV);
  const loading = useSelector((state: RootState) => state.cv.loading);
  const error = useSelector((state: RootState) => state.cv.error);
  const userProfile = useSelector((state: RootState) => state.profiles.profile);
  const dispatch = useAppDispatch();
  const [isClient, setIsClient] = useState(false);
  const [tabValue, setTabValue] = useState(0);
  const [importOpen, setImportOpen] = useState(false);
  const [exportOpen, setExportOpen] = useState(false);
  const [previewOpen, setPreviewOpen] = useState(false);
  const [selectedCVId, setSelectedCVId] = useState<string>('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' });
  const [menuAnchorEl, setMenuAnchorEl] = useState<null | HTMLElement>(null);
  const menuOpen = Boolean(menuAnchorEl);

  useEffect(() => {
    setIsClient(true);
    if (isAuthenticated) {
      dispatch(fetchCVs());
    }
  }, [dispatch, isAuthenticated]);

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
  };

  const handleImportOpen = () => {
    setImportOpen(true);
  };

  const handleImportClose = () => {
    setImportOpen(false);
  };

  const handleExportOpen = () => {
    setExportOpen(true);
    if (activeCV) {
      setSelectedCVId(activeCV._id);
    } else if (cvs.length > 0) {
      setSelectedCVId(cvs[0]._id);
    }
  };

  const handleExportClose = () => {
    setExportOpen(false);
  };

  const handlePreviewOpen = () => {
    setPreviewOpen(true);
  };

  const handlePreviewClose = () => {
    setPreviewOpen(false);
  };

  const handleMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setMenuAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setMenuAnchorEl(null);
  };

  const handleGeneratePDF = async (cv: any) => {
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
      setSnackbar({ open: true, message: 'PDF generado correctamente', severity: 'success' });
      handleExportClose();
      handlePreviewClose();
    } catch (error) {
      console.error('Error generating PDF:', error);
      setSnackbar({ open: true, message: 'Error al generar el PDF', severity: 'error' });
    } finally {
      setIsGenerating(false);
    }
  };

  const handleShare = async () => {
    if (!selectedCVId) return;
    
    const cv = cvs.find(c => c._id === selectedCVId);
    if (!cv) return;
    
    if (navigator.share) {
      try {
        await navigator.share({
          title: `${userProfile?.fullname} - ${cv.profile}`,
          text: `Echa un vistazo a mi currículum de ${cv.profile}`,
          url: window.location.href,
        });
      } catch (error) {
        console.log('Error sharing:', error);
      }
    } else {
      // Fallback: copiar al portapapeles
      navigator.clipboard.writeText(window.location.href)
        .then(() => {
          setSnackbar({ open: true, message: 'Enlace copiado al portapapeles', severity: 'success' });
        })
        .catch(err => {
          console.error('Error copying to clipboard:', err);
          setSnackbar({ open: true, message: 'Error al copiar el enlace', severity: 'error' });
        });
    }
  };

  const selectedCV = cvs.find(cv => cv._id === selectedCVId);

  if (!isClient) {
    return (
      <Container maxWidth="lg">
        <Box sx={{ py: 4, display: 'flex', justifyContent: 'center' }}>
          <CircularProgress />
        </Box>
      </Container>
    );
  }

  if (!isAuthenticated || !user) {
    return (
      <Container maxWidth="lg">
        <Box sx={{ py: 4 }}>
          <Typography variant="h4" component="h1" gutterBottom>
            Acceso Denegado
          </Typography>
          <Typography variant="body1">
            Debes iniciar sesión para acceder a esta página.
          </Typography>
        </Box>
      </Container>
    );
  }

  return (
    <>
      <Head>
        <title>Mi CV - Perfil</title>
        <meta name="description" content="Gestiona tu perfil profesional" />
      </Head>

      {/* Template oculto para generar PDF */}
      <div style={{ display: 'none' }}>
        {selectedCV && (
          <CVPDFTemplate cv={selectedCV} userProfile={userProfile} />
        )}
      </div>

      <Container maxWidth="lg" sx={{ py: 4 }}>
        <Paper elevation={2} sx={{ p: 3, mb: 3 }}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 2 }}>
            <Box>
              <Typography variant="h4" component="h1" gutterBottom>
                Gestión de Currículums
              </Typography>
              <Typography variant="body1" color="text.secondary">
                Administra y visualiza tus currículums profesionales
              </Typography>
              {activeCV && (
                <Chip 
                  label={`CV activo: ${activeCV.profile}`} 
                  color="primary" 
                  variant="outlined" 
                  sx={{ mt: 1 }}
                />
              )}
            </Box>
            
            <Box sx={{ display: 'flex', gap: 1 }}>
              <IconButton onClick={handleMenuOpen}>
                <MoreVert />
              </IconButton>
              <Menu
                anchorEl={menuAnchorEl}
                open={menuOpen}
                onClose={handleMenuClose}
              >
                <MenuItem onClick={() => { handleExportOpen(); handleMenuClose(); }}>
                  <PictureAsPdf sx={{ mr: 1 }} /> Exportar PDF
                </MenuItem>
                <MenuItem onClick={() => { 
                  if (selectedCV) handlePreviewOpen(); 
                  handleMenuClose(); 
                }}>
                  <Visibility sx={{ mr: 1 }} /> Vista Previa
                </MenuItem>
                <MenuItem onClick={() => { handleShare(); handleMenuClose(); }}>
                  <Share sx={{ mr: 1 }} /> Compartir
                </MenuItem>
              </Menu>
            </Box>
          </Box>
          
          <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
            <Tabs value={tabValue} onChange={handleTabChange} aria-label="CV tabs">
              <Tab label="Editor de Perfil" />
              <Tab label="Visualizar CV" />
            </Tabs>
          </Box>

          <TabPanel value={tabValue} index={0}>
            <Suspense fallback={
              <Box sx={{ display: 'flex', justifyContent: 'center', py: 4 }}>
                <CircularProgress />
              </Box>
            }>
              {user && <Profile />}
            </Suspense>
          </TabPanel>

          <TabPanel value={tabValue} index={1}>
            {error && (
              <Alert severity="error" sx={{ mb: 2 }}>
                {error}
              </Alert>
            )}
            
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3, flexWrap: 'wrap', gap: 2 }}>
              <Typography variant="h5">
                Visualización de CV
              </Typography>
              
              <Box sx={{ display: 'flex', gap: 1 }}>
                <Button 
                  variant="outlined" 
                  onClick={handleImportOpen}
                >
                  Importar CV
                </Button>
                <Button 
                  variant="contained" 
                  onClick={() => dispatch(fetchCVs())}
                  disabled={loading}
                >
                  {loading ? <CircularProgress size={24} /> : 'Actualizar'}
                </Button>
              </Box>
            </Box>

            {loading ? (
              <Box sx={{ display: 'flex', justifyContent: 'center', py: 4 }}>
                <CircularProgress />
              </Box>
            ) : cvs.length > 0 ? (
              <Box>
                {cvs?.map((cv) => (
                  <Box key={cv._id} sx={{ mb: 3 }}>
                    <Suspense fallback={
                      <Box sx={{ display: 'flex', justifyContent: 'center', py: 4 }}>
                        <CircularProgress />
                      </Box>
                    }>
                      <CVView cv={cv} />
                    </Suspense>
                    <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 1, gap: 1, flexWrap: 'wrap' }}>
                      <Button
                        variant="outlined"
                        startIcon={<Visibility />}
                        onClick={() => {
                          setSelectedCVId(cv._id);
                          handlePreviewOpen();
                        }}
                      >
                        Vista Previa
                      </Button>
                      <IconButton 
                        onClick={() => {
                          setSelectedCVId(cv._id);
                          handleGeneratePDF(cv);
                        }}
                        color="primary"
                        title="Exportar este CV"
                      >
                        <PictureAsPdf />
                      </IconButton>
                      <Button 
                        variant={activeCV?._id === cv._id ? "contained" : "outlined"}
                        size="small"
                        onClick={() => dispatch(setActiveCV(cv))}
                      >
                        {activeCV?._id === cv._id ? "Seleccionado" : "Seleccionar"}
                      </Button>
                    </Box>
                  </Box>
                ))}
              </Box>
            ) : (
              <Paper variant="outlined" sx={{ p: 4, textAlign: 'center' }}>
                <Typography variant="h6" gutterBottom>
                  No tienes currículums guardados
                </Typography>
                <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                  Comienza creando un perfil o importa un CV existente
                </Typography>
                <Button variant="contained" onClick={handleImportOpen}>
                  Importar CV
                </Button>
              </Paper>
            )}
          </TabPanel>
        </Paper>

        {importOpen && (
          <Suspense fallback={
            <Box sx={{ display: 'flex', justifyContent: 'center', py: 4 }}>
              <CircularProgress />
            </Box>
          }>
            <CVImport open={importOpen} onClose={handleImportClose} />
          </Suspense>
        )}

        {/* Diálogo de exportación */}
        <Dialog open={exportOpen} onClose={handleExportClose} maxWidth="md" fullWidth>
          <DialogTitle>
            Exportar/Compartir CV
          </DialogTitle>
          
          <DialogContent>
            {cvs.length === 0 ? (
              <Alert severity="info">
                No tienes CVs guardados. Crea o importa un CV primero.
              </Alert>
            ) : (
              <>
                <FormControl fullWidth sx={{ mb: 3, mt: 1 }}>
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
                      <Typography variant="body1" gutterBottom>
                        <strong>Perfil:</strong> {selectedCV.profile}
                      </Typography>
                      <Typography variant="body2" paragraph>
                        <strong>Resumen:</strong> {selectedCV.professional_summary?.substring(0, 100)}...
                      </Typography>
                      <Typography variant="body2">
                        <strong>Habilidades:</strong> {Object.values(selectedCV.skills).flat().slice(0, 5).join(', ')}...
                      </Typography>
                      <Typography variant="body2" sx={{ mt: 1 }}>
                        El PDF se generará con formato ATS-friendly optimizado para sistemas de reclutamiento.
                      </Typography>
                    </Box>
                  </Box>
                )}
              </>
            )}
          </DialogContent>
          
          <DialogActions>
            <Button onClick={handleExportClose}>Cancelar</Button>
            <Button 
              onClick={() => {
                if (selectedCV) handlePreviewOpen();
                handleExportClose();
              }}
              startIcon={<Visibility />}
            >
              Vista Previa
            </Button>
            <Button 
              onClick={handleShare} 
              disabled={!selectedCV || isGenerating}
              startIcon={<Share />}
            >
              Compartir
            </Button>
            <Button 
              onClick={() => selectedCV && handleGeneratePDF(selectedCV)} 
              disabled={!selectedCV || isGenerating}
              variant="contained"
              startIcon={isGenerating ? <CircularProgress size={16} /> : <PictureAsPdf />}
            >
              {isGenerating ? 'Generando...' : 'Descargar PDF'}
            </Button>
          </DialogActions>
        </Dialog>

        {/* Vista previa del PDF */}
        {previewOpen && selectedCV && (
          <PDFPreview 
            cv={selectedCV} 
            userProfile={userProfile} 
            onClose={handlePreviewClose}
            onDownload={() => handleGeneratePDF(selectedCV)}
          />
        )}

        {/* Snackbar para notificaciones */}
        <Snackbar
          open={snackbar.open}
          autoHideDuration={6000}
          onClose={() => setSnackbar({ ...snackbar, open: false })}
        >
          <Alert 
            onClose={() => setSnackbar({ ...snackbar, open: false })} 
            severity={snackbar.severity as any} 
            sx={{ width: '100%' }}
          >
            {snackbar.message}
          </Alert>
        </Snackbar>
      </Container>
    </>
  );
};

export default CVPage;