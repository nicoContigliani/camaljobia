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


"use client"

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
  IconButton
} from '@mui/material';
import {
  Edit as EditIcon,
  Delete as DeleteIcon,
  Person as PersonIcon
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
    } else {
      dispatch(createProfile(data) as any);
    }

    setEditMode(false);
  };

  const handleDelete = () => {
    if (profile?._id) {
      dispatch(deleteProfile(profile._id) as any);
      setDeleteConfirmOpen(false);
    }
  };

  const handleEdit = () => {
    setEditMode(true);
  };

  const handleCancelEdit = () => {
    setEditMode(false);
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
        <Box>
          <Typography variant="h5" gutterBottom>
            Completa tu perfil
          </Typography>
          <Typography variant="body1" paragraph>
            Para comenzar, necesitamos que completes tu información personal.
          </Typography>
          <FormGenerator
            config={{
              ...formConfig,
              onSubmit: handleFormSubmit
            }}
          />
        </Box>
      ) : editMode ? (
        <Box>
          <Typography variant="h5" gutterBottom>
            {profile ? 'Editar Perfil' : 'Crear Perfil'}
          </Typography>
          <FormGenerator
            config={{
              ...formConfig,
              onSubmit: handleFormSubmit
            }}
            defaultValues={profile} // Pasa los valores del perfil
          />
          <Button
            onClick={handleCancelEdit}
            variant="outlined"
            sx={{ mt: 2 }}
          >
            Cancelar
          </Button>
        </Box>
      ) : (
        <Paper elevation={3} sx={{ p: 3, maxWidth: 800, margin: '0 auto' }}>
          <Box display="flex" justifyContent="space-between" alignItems="flex-start" mb={3}>
            <Box display="flex" alignItems="center">
              <PersonIcon sx={{ fontSize: 40, mr: 2, color: 'primary.main' }} />
              <Typography variant="h4" component="h1">
                Perfil Personal
              </Typography>
            </Box>
            <Box>
              <IconButton
                onClick={handleEdit}
                color="primary"
                sx={{ mr: 1 }}
                aria-label="Editar perfil"
              >
                <EditIcon />
              </IconButton>
              <IconButton
                onClick={() => setDeleteConfirmOpen(true)}
                color="error"
                aria-label="Eliminar perfil"
              >
                <DeleteIcon />
              </IconButton>
            </Box>
          </Box>

          <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' }, gap: 3 }}>
            <Box>
              <Typography variant="h6" gutterBottom sx={{ fontWeight: 'bold' }}>
                Información de Contacto
              </Typography>
              <Typography variant="body1" paragraph>
                <strong>Nombre:</strong> {profile?.fullname}
              </Typography>
              <Typography variant="body1" paragraph>
                <strong>Email:</strong> {profile?.email}
              </Typography>
              <Typography variant="body1" paragraph>
                <strong>Teléfono:</strong> {profile?.phone}
              </Typography>
            </Box>

            <Box>
              <Typography variant="h6" gutterBottom sx={{ fontWeight: 'bold' }}>
                Enlaces y Portafolio
              </Typography>
              {profile?.repository && (
                <Typography variant="body1" paragraph>
                  <strong>Repositorio:</strong>{' '}
                  <a href={profile.repository} target="_blank" rel="noopener noreferrer">
                    {profile.repository}
                  </a>
                </Typography>
              )}
              {profile?.linkedin && (
                <Typography variant="body1" paragraph>
                  <strong>LinkedIn:</strong>{' '}
                  <a href={profile.linkedin} target="_blank" rel="noopener noreferrer">
                    {profile.linkedin}
                  </a>
                </Typography>
              )}
              {profile?.portfolio && (
                <Typography variant="body1" paragraph>
                  <strong>Portafolio:</strong>{' '}
                  <a href={profile.portfolio} target="_blank" rel="noopener noreferrer">
                    {profile.portfolio}
                  </a>
                </Typography>
              )}
            </Box>
          </Box>
        </Paper>
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
    </Box>
  );
};

export default Profile;