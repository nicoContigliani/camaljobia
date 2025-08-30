// "use client"

// import React, { useEffect, useState } from 'react';
// import {
//   Box,
//   Paper,
//   Typography,
//   Button,
//   CircularProgress,
//   Alert,
//   Dialog,
//   DialogTitle,
//   DialogContent,
//   DialogActions,
//   IconButton
// } from '@mui/material';
// import {
//   Edit as EditIcon,
//   Delete as DeleteIcon,
//   Person as PersonIcon
// } from '@mui/icons-material';
// import { useDispatch, useSelector } from 'react-redux';
// import { RootState } from '../store/store';
// import FormGenerator, { FormConfig } from './FormGenerator';
// import { profileFormConfig } from '../utils/profileFormConfig';
// import {
//   fetchProfile,
//   createProfile,
//   updateProfile,
//   deleteProfile,
//   clearProfileError,
//   UserProfile
// } from '@/store/features/profileSlice';

// interface ProfileProps {
//   // userId ya no es necesario como prop
// }

// const Profile: React.FC<ProfileProps> = () => {
//   const dispatch = useDispatch();
//   const { profile, loading, error } = useSelector((state: RootState) => state.profiles);
//   const [editMode, setEditMode] = useState(false);
//   const [deleteConfirmOpen, setDeleteConfirmOpen] = useState(false);
//   const [formConfig, setFormConfig] = useState<FormConfig>(profileFormConfig(false));

//   useEffect(() => {
//     // Ya no necesitamos pasar userId, se obtiene del token automáticamente
//     dispatch(fetchProfile() as any);
//   }, [dispatch]);

//   useEffect(() => {
//     if (profile) {
//       setFormConfig(profileFormConfig(true, profile));
//     } else {
//       setFormConfig(profileFormConfig(false));
//     }
//   }, [profile]);

//   const handleFormSubmit = (data: any) => {
//     // Ya no necesitamos agregar user: userId manualmente
//     if (editMode && profile?._id) {
//       dispatch(updateProfile({ ...data, _id: profile._id }) as any);
//     } else {
//       dispatch(createProfile(data) as any);
//     }

//     setEditMode(false);
//   };

//   const handleDelete = () => {
//     if (profile?._id) {
//       dispatch(deleteProfile(profile._id) as any);
//       setDeleteConfirmOpen(false);
//     }
//   };

//   const handleEdit = () => {
//     setEditMode(true);
//   };

//   const handleCancelEdit = () => {
//     setEditMode(false);
//   };

//   if (loading) {
//     return (
//       <Box display="flex" justifyContent="center" alignItems="center" minHeight="200px">
//         <CircularProgress />
//       </Box>
//     );
//   }

//   if (error) {
//     return (
//       <Alert
//         severity="error"
//         onClose={() => dispatch(clearProfileError())}
//         sx={{ mb: 2 }}
//       >
//         {error}
//       </Alert>
//     );
//   }

//   return (
//     <Box>
//       {!profile && !editMode ? (
//         <Box>
//           <Typography variant="h5" gutterBottom>
//             Completa tu perfil
//           </Typography>
//           <Typography variant="body1" paragraph>
//             Para comenzar, necesitamos que completes tu información personal.
//           </Typography>
//           <FormGenerator
//             config={{
//               ...formConfig,
//               onSubmit: handleFormSubmit
//             }}
//           />
//         </Box>
//       ) : editMode ? (
//         <Box>
//           <Typography variant="h5" gutterBottom>
//             {profile ? 'Editar Perfil' : 'Crear Perfil'}
//           </Typography>
//           <FormGenerator
//             config={{
//               ...formConfig,
//               onSubmit: handleFormSubmit
//             }}
//             defaultValues={profile} // Pasa los valores del perfil
//           />
//           <Button
//             onClick={handleCancelEdit}
//             variant="outlined"
//             sx={{ mt: 2 }}
//           >
//             Cancelar
//           </Button>
//         </Box>
//       ) : (
//         <Paper elevation={3} sx={{ p: 3, maxWidth: 800, margin: '0 auto' }}>
//           <Box display="flex" justifyContent="space-between" alignItems="flex-start" mb={3}>
//             <Box display="flex" alignItems="center">
//               <PersonIcon sx={{ fontSize: 40, mr: 2, color: 'primary.main' }} />
//               <Typography variant="h4" component="h1">
//                 Perfil Personal
//               </Typography>
//             </Box>
//             <Box>
//               <IconButton
//                 onClick={handleEdit}
//                 color="primary"
//                 sx={{ mr: 1 }}
//                 aria-label="Editar perfil"
//               >
//                 <EditIcon />
//               </IconButton>
//               <IconButton
//                 onClick={() => setDeleteConfirmOpen(true)}
//                 color="error"
//                 aria-label="Eliminar perfil"
//               >
//                 <DeleteIcon />
//               </IconButton>
//             </Box>
//           </Box>

//           <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' }, gap: 3 }}>
//             <Box>
//               <Typography variant="h6" gutterBottom sx={{ fontWeight: 'bold' }}>
//                 Información de Contacto
//               </Typography>
//               <Typography variant="body1" paragraph>
//                 <strong>Nombre:</strong> {profile?.fullname}
//               </Typography>
//               <Typography variant="body1" paragraph>
//                 <strong>Email:</strong> {profile?.email}
//               </Typography>
//               <Typography variant="body1" paragraph>
//                 <strong>Teléfono:</strong> {profile?.phone}
//               </Typography>
//             </Box>

//             <Box>
//               <Typography variant="h6" gutterBottom sx={{ fontWeight: 'bold' }}>
//                 Enlaces y Portafolio
//               </Typography>
//               {profile?.repository && (
//                 <Typography variant="body1" paragraph>
//                   <strong>Repositorio:</strong>{' '}
//                   <a href={profile.repository} target="_blank" rel="noopener noreferrer">
//                     {profile.repository}
//                   </a>
//                 </Typography>
//               )}
//               {profile?.linkedin && (
//                 <Typography variant="body1" paragraph>
//                   <strong>LinkedIn:</strong>{' '}
//                   <a href={profile.linkedin} target="_blank" rel="noopener noreferrer">
//                     {profile.linkedin}
//                   </a>
//                 </Typography>
//               )}
//               {profile?.portfolio && (
//                 <Typography variant="body1" paragraph>
//                   <strong>Portafolio:</strong>{' '}
//                   <a href={profile.portfolio} target="_blank" rel="noopener noreferrer">
//                     {profile.portfolio}
//                   </a>
//                 </Typography>
//               )}
//             </Box>
//           </Box>
//         </Paper>
//       )}

//       {/* Diálogo de confirmación para eliminar */}
//       <Dialog
//         open={deleteConfirmOpen}
//         onClose={() => setDeleteConfirmOpen(false)}
//       >
//         <DialogTitle>Confirmar Eliminación</DialogTitle>
//         <DialogContent>
//           <Typography>
//             ¿Estás seguro de que deseas eliminar tu perfil? Esta acción no se puede deshacer.
//           </Typography>
//         </DialogContent>
//         <DialogActions>
//           <Button onClick={() => setDeleteConfirmOpen(false)}>Cancelar</Button>
//           <Button onClick={handleDelete} color="error" variant="contained">
//             Eliminar
//           </Button>
//         </DialogActions>
//       </Dialog>
//     </Box>
//   );
// };

// export default Profile;


'use client'

import React, { useEffect, useState } from 'react';
import {
  Box,
  Paper,
  Typography,
  Button,
  CircularProgress,
  Alert,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  IconButton,
  Chip,
  Divider,
  Stack,
  Menu,
  MenuItem,
  Snackbar,
  Card,
  CardContent,
  CardActions,
  Collapse,
  Tabs,
  Tab,
  TextField
} from '@mui/material';
import {
  Edit as EditIcon,
  Delete as DeleteIcon,
  Person as PersonIcon,
  MoreVert,
  ExpandMore,
  ExpandLess,
  ContentCopy,
  Visibility
} from '@mui/icons-material';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../store/store';
import FormGenerator, { FormConfig } from './FormGenerator';
import { profileFormConfig } from '../utils/profileFormConfig';
import {
  fetchProfile,
  createProfile,
  updateProfile,
  deleteProfile,
  clearProfileError,
  UserProfile
} from '@/store/features/profileSlice';

interface ProfileProps {
  // userId ya no es necesario como prop
}

const Profile: React.FC<ProfileProps> = () => {
  const dispatch = useDispatch();
  const { profile, loading, error } = useSelector((state: RootState) => state.profiles);
  const [editMode, setEditMode] = useState(false);
  const [deleteConfirmOpen, setDeleteConfirmOpen] = useState(false);
  const [formConfig, setFormConfig] = useState<FormConfig>(profileFormConfig(false));
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' });
  const [expandedSections, setExpandedSections] = useState<Record<string, boolean>>({
    contact: true,
    links: true
  });

  useEffect(() => {
    // Ya no necesitamos pasar userId, se obtiene del token automáticamente
    dispatch(fetchProfile() as any);
  }, [dispatch]);

  useEffect(() => {
    if (profile) {
      setFormConfig(profileFormConfig(true, profile));
    } else {
      setFormConfig(profileFormConfig(false));
    }
  }, [profile]);

  const handleFormSubmit = (data: any) => {
    // Ya no necesitamos agregar user: userId manualmente
    if (editMode && profile?._id) {
      dispatch(updateProfile({ ...data, _id: profile._id }) as any);
      setSnackbar({ open: true, message: 'Perfil actualizado correctamente', severity: 'success' });
    } else {
      dispatch(createProfile(data) as any);
      setSnackbar({ open: true, message: 'Perfil creado correctamente', severity: 'success' });
    }

    setEditMode(false);
  };

  const handleDelete = () => {
    if (profile?._id) {
      dispatch(deleteProfile(profile._id) as any);
      setDeleteConfirmOpen(false);
      setSnackbar({ open: true, message: 'Perfil eliminado correctamente', severity: 'success' });
    }
  };

  const handleEdit = () => {
    setEditMode(true);
    setAnchorEl(null);
  };

  const handleCancelEdit = () => {
    setEditMode(false);
  };

  const handleMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const toggleSection = (section: string) => {
    setExpandedSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };

  const copyProfileLinks = () => {
    const links = [
      profile?.repository,
      profile?.linkedin,
      profile?.portfolio
    ].filter(link => link).join('\n');
    
    if (links) {
      navigator.clipboard.writeText(links);
      setSnackbar({ open: true, message: 'Enlaces copiados al portapapeles', severity: 'success' });
    }
    setAnchorEl(null);
  };

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="200px">
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Alert
        severity="error"
        onClose={() => dispatch(clearProfileError())}
        sx={{ mb: 2 }}
      >
        {error}
      </Alert>
    );
  }

  return (
    <Box>
      {!profile && !editMode ? (
        <Card sx={{ p: 3 }}>
          <Typography variant="h4" gutterBottom color="primary">
            Completa tu perfil
          </Typography>
          <Typography variant="body1" paragraph color="text.secondary">
            Para comenzar, necesitamos que completes tu información personal. Esto nos ayudará a conocerte mejor.
          </Typography>
          <FormGenerator
            config={{
              ...formConfig,
              onSubmit: handleFormSubmit
            }}
          />
        </Card>
      ) : editMode ? (
        <Card sx={{ p: 3 }}>
          <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
            <Typography variant="h4" color="primary">
              {profile ? 'Editar Perfil' : 'Crear Perfil'}
            </Typography>
            <IconButton onClick={handleCancelEdit} color="inherit">
              <DeleteIcon />
            </IconButton>
          </Box>
          <FormGenerator
            config={{
              ...formConfig,
              onSubmit: handleFormSubmit
            }}
            defaultValues={profile} // Pasa los valores del perfil
          />
        </Card>
      ) : (
        <Card elevation={3} sx={{ p: 3, position: 'relative' }}>
          {/* Botones de acción */}
          <Box position="absolute" top={16} right={16}>
            <IconButton onClick={handleMenuOpen}>
              <MoreVert />
            </IconButton>
            <Menu
              anchorEl={anchorEl}
              open={Boolean(anchorEl)}
              onClose={handleMenuClose}
            >
              <MenuItem onClick={handleEdit}>
                <EditIcon sx={{ mr: 1 }} /> Editar
              </MenuItem>
              <MenuItem onClick={copyProfileLinks}>
                <ContentCopy sx={{ mr: 1 }} /> Copiar Enlaces
              </MenuItem>
              <MenuItem onClick={() => setDeleteConfirmOpen(true)}>
                <DeleteIcon sx={{ mr: 1 }} /> Eliminar
              </MenuItem>
            </Menu>
          </Box>

          <Box display="flex" alignItems="center" mb={3}>
            <PersonIcon sx={{ fontSize: 40, mr: 2, color: 'primary.main' }} />
            <Typography variant="h4" component="h1">
              Perfil Personal
            </Typography>
          </Box>

          <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' }, gap: 3 }}>
            {/* Información de Contacto */}
            <Box>
              <Box 
                display="flex" 
                justifyContent="space-between" 
                alignItems="center" 
                mb={2}
                sx={{ cursor: 'pointer' }}
                onClick={() => toggleSection('contact')}
              >
                <Typography variant="h5" color="primary">
                  Información de Contacto
                </Typography>
                <IconButton size="small">
                  {expandedSections.contact ? <ExpandLess /> : <ExpandMore />}
                </IconButton>
              </Box>

              <Collapse in={expandedSections.contact}>
                <Stack spacing={2}>
                  <Box>
                    <Typography variant="subtitle2" color="text.secondary">
                      Nombre Completo
                    </Typography>
                    <Typography variant="body1" paragraph>
                      {profile?.fullname}
                    </Typography>
                  </Box>
                  
                  <Box>
                    <Typography variant="subtitle2" color="text.secondary">
                      Email
                    </Typography>
                    <Typography variant="body1" paragraph>
                      {profile?.email}
                    </Typography>
                  </Box>
                  
                  {profile?.phone && (
                    <Box>
                      <Typography variant="subtitle2" color="text.secondary">
                        Teléfono
                      </Typography>
                      <Typography variant="body1" paragraph>
                        {profile?.phone}
                      </Typography>
                    </Box>
                  )}
                </Stack>
              </Collapse>
            </Box>

            {/* Enlaces y Portafolio */}
            <Box>
              <Box 
                display="flex" 
                justifyContent="space-between" 
                alignItems="center" 
                mb={2}
                sx={{ cursor: 'pointer' }}
                onClick={() => toggleSection('links')}
              >
                <Typography variant="h5" color="primary">
                  Enlaces y Portafolio
                </Typography>
                <IconButton size="small">
                  {expandedSections.links ? <ExpandLess /> : <ExpandMore />}
                </IconButton>
              </Box>

              <Collapse in={expandedSections.links}>
                <Stack spacing={2}>
                  {profile?.repository && (
                    <Box>
                      <Typography variant="subtitle2" color="text.secondary">
                        Repositorio
                      </Typography>
                      <Typography variant="body1">
                        <a 
                          href={profile.repository} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          style={{ color: 'inherit', textDecoration: 'none' }}
                        >
                          <Chip 
                            label="Ver Repositorio" 
                            clickable 
                            color="primary" 
                            variant="outlined"
                          />
                        </a>
                      </Typography>
                    </Box>
                  )}
                  
                  {profile?.linkedin && (
                    <Box>
                      <Typography variant="subtitle2" color="text.secondary">
                        LinkedIn
                      </Typography>
                      <Typography variant="body1">
                        <a 
                          href={profile.linkedin} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          style={{ color: 'inherit', textDecoration: 'none' }}
                        >
                          <Chip 
                            label="Ver LinkedIn" 
                            clickable 
                            color="primary" 
                            variant="outlined"
                          />
                        </a>
                      </Typography>
                    </Box>
                  )}
                  
                  {profile?.portfolio && (
                    <Box>
                      <Typography variant="subtitle2" color="text.secondary">
                        Portafolio
                      </Typography>
                      <Typography variant="body1">
                        <a 
                          href={profile.portfolio} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          style={{ color: 'inherit', textDecoration: 'none' }}
                        >
                          <Chip 
                            label="Ver Portafolio" 
                            clickable 
                            color="primary" 
                            variant="outlined"
                          />
                        </a>
                      </Typography>
                    </Box>
                  )}
                </Stack>
              </Collapse>
            </Box>
          </Box>
       
       
        </Card>
      )}

      {/* Diálogo de confirmación para eliminar */}
      <Dialog
        open={deleteConfirmOpen}
        onClose={() => setDeleteConfirmOpen(false)}
      >
        <DialogTitle>Confirmar Eliminación</DialogTitle>
        <DialogContent>
          <Typography>
            ¿Estás seguro de que deseas eliminar tu perfil? Esta acción no se puede deshacer.
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDeleteConfirmOpen(false)}>Cancelar</Button>
          <Button onClick={handleDelete} color="error" variant="contained">
            Eliminar
          </Button>
        </DialogActions>
      </Dialog>

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
    </Box>
  );
};

export default Profile;