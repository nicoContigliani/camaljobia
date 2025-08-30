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
  Paper
} from '@mui/material';
import { RootState } from '../../store/store';
import { useAppDispatch } from '../../store/hooks';
import { fetchCVs, selectCVs, selectActiveCV, setActiveCV } from '../../store/features/cvSlice';

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

const CVPage: React.FC = () => {
  const { user, isAuthenticated } = useSelector((state: RootState) => state?.auth);
  const cvs = useSelector(selectCVs);
  const activeCV = useSelector(selectActiveCV);
  const loading = useSelector((state: RootState) => state.cv.loading);
  const error = useSelector((state: RootState) => state.cv.error);
  const dispatch = useAppDispatch();
  const [isClient, setIsClient] = useState(false);
  const [tabValue, setTabValue] = useState(0);
  const [importOpen, setImportOpen] = useState(false);

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

      <Container maxWidth="lg" sx={{ py: 4 }}>
        <Paper elevation={2} sx={{ p: 3, mb: 3 }}>
          <Typography variant="h4" component="h1" gutterBottom>
            Gestión de Currículums
          </Typography>
          <Typography variant="body1" color="text.secondary" sx={{ mb: 2 }}>
            Administra y visualiza tus currículums profesionales
          </Typography>
          
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
            
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
              <Typography variant="h5">
                Visualización de CV
              </Typography>
              
              <Box>
                <Button 
                  variant="outlined" 
                  onClick={handleImportOpen}
                  sx={{ mr: 1 }}
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
                    <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 1 }}>
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
      </Container>
    </>
  );
};

export default CVPage;