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
import CVHeaders from '@/components/CVSParts/CVHeaders/CVHeaders';
import Summary from '@/components/CVSParts/Summary/Summary';
import HardSkill from '@/components/CVSParts/HardSkill/HardSkill';
import WorkExperience from '@/components/CVSParts/WorkExperience/WorkExperience';
import Education from '@/components/CVSParts/Education/Education';
import Courses from '@/components/CVSParts/Courses/Courses';
import { CVPDFTemplate } from '@/components/CVPDFTemplate/CVPDFTemplate';
import { PDFPreview } from '@/components/PDFPreview/PDFPreview';
import { ShareDialog } from '@/components/ShareDialog/ShareDialog';
import { AuthTabs } from '@/components/AuthTabs/AuthTabs';
import { TabPanel } from '@/components/TabPanel/TabPanel';

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