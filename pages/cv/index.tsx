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
  useTheme,
  TextField,
  AppBar,
  Toolbar,
  alpha
} from '@mui/material';
import {
  PictureAsPdf,
  Share,
  MoreVert,
  Visibility,
  ContentCopy,
  Link
} from '@mui/icons-material';
import { RootState } from '../../store/store';
import { useAppDispatch } from '../../store/hooks';
import { fetchCVs, selectCVs, selectActiveCV, setActiveCV } from '../../store/features/cvSlice';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import { useRouter } from 'next/router';
import LoginForm from '@/components/LoginForm';
import RegisterForm from '@/components//RegisterForm';

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

// Diálogo para compartir enlace
const ShareDialog: React.FC<{
  open: boolean;
  onClose: () => void;
  shareLink: string;
  onGenerateLink: () => void;
  isGeneratingLink: boolean;
}> = ({ open, onClose, shareLink, onGenerateLink, isGeneratingLink }) => {
  const [copied, setCopied] = useState(false);

  const handleCopyLink = () => {
    navigator.clipboard.writeText(shareLink)
      .then(() => {
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      })
      .catch(err => {
        console.error('Error copying to clipboard:', err);
      });
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
      <DialogTitle>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <Link /> Compartir CV
        </Box>
      </DialogTitle>
      <DialogContent>
        <Typography variant="body1" sx={{ mb: 2 }}>
          Genera un enlace único para compartir tu CV. Las personas con este enlace podrán ver y descargar tu CV, pero necesitarán iniciar sesión para acceder a él.
        </Typography>

        {shareLink ? (
          <>
            <TextField
              fullWidth
              value={shareLink}
              label="Enlace para compartir"
              InputProps={{
                readOnly: true,
              }}
              sx={{ mb: 2 }}
            />
            <Button
              variant="outlined"
              startIcon={<ContentCopy />}
              onClick={handleCopyLink}
              fullWidth
            >
              {copied ? '¡Enlace copiado!' : 'Copiar enlace'}
            </Button>
          </>
        ) : (
          <Box sx={{ textAlign: 'center', py: 3 }}>
            <Button
              variant="contained"
              onClick={onGenerateLink}
              disabled={isGeneratingLink}
              startIcon={isGeneratingLink ? <CircularProgress size={16} /> : <Link />}
            >
              {isGeneratingLink ? 'Generando enlace...' : 'Generar enlace para compartir'}
            </Button>
          </Box>
        )}
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cerrar</Button>
      </DialogActions>
    </Dialog>
  );
};

function a11yProps(index: number) {
  return {
    id: `auth-tab-${index}`,
    'aria-controls': `auth-tabpanel-${index}`,
  };
}

const AuthTabs: React.FC = () => {
  const [tabValue, setTabValue] = useState(0);
  const { isAuthenticated } = useSelector((state: RootState) => state.auth);
  const router = useRouter();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
  };

  useEffect(() => {
    if (isAuthenticated) {
      router.push('/dashboard');
    }
  }, [isAuthenticated, router]);

  if (isAuthenticated) {
    return null;
  }

  return (
    <Box sx={{
      backgroundColor: '#f8fafc',
      minHeight: '100vh',
      backgroundImage: 'linear-gradient(to top, #f3e7e9 0%, #e3eeff 99%, #e3eeff 100%)'
    }}>
      <AppBar
        position="static"
        elevation={0}
        sx={{
          backgroundColor: 'transparent',
          color: '#334155',
          boxShadow: 'none'
        }}
      >
        <Toolbar>
          <Typography
            variant="h4"
            component="div"
            sx={{
              flexGrow: 1,
              fontWeight: 700,
              color: '#4f46e5',
              pt: 2,
              pl: { xs: 2, md: 4 },
              fontFamily: '"Playfair Display", serif'
            }}
          >
            CamalJob
            <Box component="span" sx={{ color: '#0ea5e9', fontWeight: 700 }}>IA</Box>
          </Typography>
        </Toolbar>
      </AppBar>

      <Container maxWidth="lg" sx={{ py: 0 }}>
        <Box sx={{
          display: 'flex',
          minHeight: '80vh',
          flexDirection: { xs: 'column', md: 'row' },
          borderRadius: 4,
          overflow: 'hidden',
          boxShadow: '0 15px 30px rgba(0,0,0,0.07)'
        }}>
          {/* Sección de imagen/ilustración */}
          {!isMobile && (
            <Box sx={{
              flex: 1,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              backgroundColor: '#f1f5f9',
              position: 'relative',
              overflow: 'hidden',
              p: 4
            }}>
              <Box
                component="img"
                src="/los-colores-brillantes-del-neon-brillan-en-el-camaleon-salvaje.jpg"
                alt="Chameleon"
                sx={{
                  width: '100%',
                  maxWidth: 400,
                  borderRadius: 2,
                  transition: 'transform 0.4s ease',
                  objectFit: 'cover',
                  '&:hover': {
                    transform: 'scale(1.03)'
                  }
                }}
              />
            </Box>
          )}

          {/* Sección del formulario */}
          <Box sx={{
            flex: 1,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            p: { xs: 2, md: 4 },
            backgroundColor: '#ffffff'
          }}>
            <Paper
              elevation={0}
              sx={{
                maxWidth: 450,
                width: '100%',
                backgroundColor: '#ffffff',
                border: '1px solid',
                borderColor: 'rgba(0, 0, 0, 0.05)',
                borderRadius: 3,
                overflow: 'hidden',
                boxShadow: '0 8px 25px rgba(0,0,0,0.05)'
              }}
            >
              <Box sx={{ px: 3, pt: 4, pb: 1 }}>
                <Typography variant="h4" sx={{
                  fontWeight: 600,
                  color: '#1e293b',
                  textAlign: 'center',
                  mb: 1
                }}>
                  {tabValue === 0 ? 'Iniciar Sesión' : 'Crear Cuenta'}
                </Typography>
                <Typography variant="body2" sx={{
                  color: '#64748b',
                  textAlign: 'center',
                  mb: 3
                }}>
                  {tabValue === 0
                    ? 'Ingresa a tu cuenta para continuar'
                    : 'Únete a nuestra plataforma hoy mismo'
                  }
                </Typography>
              </Box>

              <Tabs
                value={tabValue}
                onChange={handleTabChange}
                aria-label="auth tabs"
                variant="fullWidth"
                sx={{
                  borderBottom: '1px solid',
                  borderColor: 'rgba(0, 0, 0, 0.05)',
                  '& .MuiTab-root': {
                    color: '#64748b',
                    fontWeight: 500,
                    fontSize: '1rem',
                    textTransform: 'none',
                    py: 2.5,
                    '&.Mui-selected': {
                      color: '#4f46e5'
                    }
                  },
                  '& .MuiTabs-indicator': {
                    backgroundColor: '#4f46e5',
                    height: 3
                  }
                }}
              >
                <Tab label="Iniciar Sesión" {...a11yProps(0)} />
                <Tab label="Registrarse" {...a11yProps(1)} />
              </Tabs>

              <TabPanel value={tabValue} index={0}>
                <LoginForm
                  urlRdirect={`${window.location.href}`}
                />
              </TabPanel>

              <TabPanel value={tabValue} index={1}>
                <RegisterForm />
              </TabPanel>
            </Paper>
          </Box>
        </Box>
      </Container>
    </Box>
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
  const [shareOpen, setShareOpen] = useState(false);
  const [selectedCVId, setSelectedCVId] = useState<string>('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [isGeneratingLink, setIsGeneratingLink] = useState(false);
  const [shareLink, setShareLink] = useState('');
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

  const handleShareOpen = () => {
    setShareOpen(true);
    setShareLink('');
    if (activeCV) {
      setSelectedCVId(activeCV._id);
    } else if (cvs.length > 0) {
      setSelectedCVId(cvs[0]._id);
    }
  };

  const handleShareClose = () => {
    setShareOpen(false);
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

  const handleGenerateShareLink = async () => {
    if (!selectedCVId) return;

    setIsGeneratingLink(true);
    try {
      // Generar enlace simple
      const baseUrl = window.location.origin;
      const shareUrl = `${baseUrl}/cv/${selectedCVId}`;

      setShareLink(shareUrl);
      setSnackbar({
        open: true,
        message: 'Enlace generado. Los usuarios necesitarán iniciar sesión para verlo.',
        severity: 'success'
      });
    } catch (error) {
      console.error('Error generating share link:', error);
      setSnackbar({
        open: true,
        message: 'Error al generar el enlace',
        severity: 'error'
      });
    } finally {
      setIsGeneratingLink(false);
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
    return <AuthTabs />;
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
                <MenuItem onClick={() => { handleShareOpen(); handleMenuClose(); }}>
                  <Share sx={{ mr: 1 }} /> Compartir CV
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
                        variant="outlined"
                        startIcon={<Share />}
                        onClick={() => {
                          setSelectedCVId(cv._id);
                          handleShareOpen();
                        }}
                      >
                        Compartir
                      </Button>
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
              onClick={() => {
                if (selectedCV) handleGeneratePDF(selectedCV);
              }}
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

        {/* Diálogo para compartir */}
        <ShareDialog
          open={shareOpen}
          onClose={handleShareClose}
          shareLink={shareLink}
          onGenerateLink={handleGenerateShareLink}
          isGeneratingLink={isGeneratingLink}
        />

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