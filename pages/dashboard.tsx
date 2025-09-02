// 'use client';

// import { useEffect, useState } from 'react';
// import {
//   Container,
//   Typography,
//   Button,
//   Box,
//   Card,
//   CardContent,
//   AppBar,
//   Toolbar,
//   useTheme,
//   useMediaQuery,
//   IconButton,
//   Divider,
//   Chip,
//   Avatar,
//   alpha,
//   Paper
// } from '@mui/material';
// import {
//   LogoutRounded,
//   SettingsRounded,
//   EditRounded,
//   AddRounded,
//   DashboardRounded,
//   NotificationsRounded,
//   AccountCircleRounded,
//   AnalyticsRounded,
//   TaskRounded,
//   TrendingUpRounded,
//   PictureAsPdf,
//   Share,
//   MoreVert,
//   Visibility
// } from '@mui/icons-material';
// import { useAppSelector, useAppDispatch } from '../store/hooks';
// import { logout } from '../store/features/authSlice';
// import { useRouter } from 'next/router';

// export default function Dashboard() {
//   const { user } = useAppSelector((state) => state.auth);
//   const dispatch = useAppDispatch();
//   const router = useRouter();
//   const theme = useTheme();
//   const isMobile = useMediaQuery(theme.breakpoints.down('md'));
//   const [mounted, setMounted] = useState(false);

//   const handleLogout = () => {
//     dispatch(logout());
//     router.push('/');
//   };

//   useEffect(() => {
//     setMounted(true);
//   }, []);

//   useEffect(() => {
//     if (!user) {
//       router.push('/');
//     }
//   }, [user, router]);

//   if (!mounted || !user) {
//     return (
//       <Box sx={{ 
//         backgroundColor: '#f8fafc', 
//         minHeight: '100vh',
//         display: 'flex',
//         alignItems: 'center',
//         justifyContent: 'center',
//         backgroundImage: 'linear-gradient(to top, #f3e7e9 0%, #e3eeff 99%, #e3eeff 100%)'
//       }}>
//         <Typography variant="h6" color="#64748b">
//           Cargando...
//         </Typography>
//       </Box>
//     );
//   }

//   return (
//     <Box sx={{ 
//       backgroundColor: '#f8fafc', 
//       minHeight: '100vh',
//       backgroundImage: 'linear-gradient(to top, #f3e7e9 0%, #e3eeff 99%, #e3eeff 100%)'
//     }}>
//       <AppBar
//         position="static"
//         elevation={0}
//         sx={{
//           backgroundColor: 'transparent',
//           color: '#334155',
//           boxShadow: 'none',
//           borderBottom: '1px solid rgba(0, 0, 0, 0.05)'
//         }}
//       >
//         <Toolbar sx={{ px: { xs: 2, md: 4 } }}>
//           <Box sx={{ display: 'flex', alignItems: 'center', flexGrow: 1 }}>
//             <DashboardRounded sx={{ mr: 1.5, color: '#4f46e5' }} />
//             <Typography
//               variant="h4"
//               component="div"
//               sx={{
//                 fontWeight: 700,
//                 color: '#4f46e5',
//                 fontFamily: '"Playfair Display", serif'
//               }}
//             >
//               Elegance
//               <Box component="span" sx={{ color: '#0ea5e9', fontWeight: 700 }}>AI</Box>
//             </Typography>
//           </Box>

//           <IconButton sx={{ color: '#64748b', mr: 1 }}>
//             <NotificationsRounded />
//           </IconButton>

//           <Button
//             variant="outlined"
//             onClick={handleLogout}
//             startIcon={<LogoutRounded />}
//             sx={{
//               color: '#4f46e5',
//               borderColor: 'rgba(79, 70, 229, 0.3)',
//               borderRadius: 2,
//               px: 2,
//               py: 0.8,
//               '&:hover': {
//                 borderColor: '#4f46e5',
//                 backgroundColor: 'rgba(79, 70, 229, 0.08)'
//               }
//             }}
//           >
//             Cerrar sesión
//           </Button>
//         </Toolbar>
//       </AppBar>

//       <Container maxWidth="lg" sx={{ py: 5 }}>
//         <Box sx={{ mb: 6, textAlign: 'center' }}>
//           <Typography
//             variant="h3"
//             component="h1"
//             sx={{
//               color: '#1e293b',
//               fontWeight: 700,
//               mb: 1.5,
//               letterSpacing: '-0.5px'
//             }}
//           >
//             Bienvenido de nuevo, {user.name}
//           </Typography>
//           <Typography variant="h6" color="#64748b" fontWeight="400">
//             Esto es lo que está sucediendo con tus proyectos hoy
//           </Typography>
//         </Box>

//         <Box sx={{ 
//           display: 'flex', 
//           flexDirection: { xs: 'column', md: 'row' }, 
//           gap: 3, 
//           mb: 4 
//         }}>
//           {/* Información del usuario */}
//           <Card
//             sx={{
//               flex: 1,
//               backgroundColor: '#ffffff',
//               border: '1px solid rgba(0, 0, 0, 0.05)',
//               borderRadius: 3,
//               boxShadow: '0 8px 25px rgba(0,0,0,0.05)',
//               transition: 'all 0.3s ease',
//               '&:hover': {
//                 transform: 'translateY(-5px)',
//                 boxShadow: '0 15px 35px rgba(79, 70, 229, 0.1)'
//               }
//             }}
//           >
//             <CardContent sx={{ p: 4 }}>
//               <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
//                 <Avatar
//                   sx={{
//                     width: 60,
//                     height: 60,
//                     bgcolor: 'rgba(79, 70, 229, 0.15)',
//                     color: '#4f46e5',
//                     fontWeight: 600,
//                     mr: 2.5
//                   }}
//                 >
//                   {user.name.charAt(0).toUpperCase()}
//                 </Avatar>
//                 <Box>
//                   <Typography variant="h6" color="#1e293b" fontWeight="600">
//                     {user.name}
//                   </Typography>
//                   <Chip 
//                     label="Miembro Premium" 
//                     size="small" 
//                     sx={{ 
//                       bgcolor: 'rgba(79, 70, 229, 0.15)', 
//                       color: '#4f46e5', 
//                       fontSize: '0.7rem',
//                       height: 22,
//                       mt: 0.5
//                     }} 
//                   />
//                 </Box>
//               </Box>

//               <Divider sx={{ borderColor: 'rgba(0, 0, 0, 0.05)', my: 3 }} />

//               <Box sx={{ 
//                 display: 'flex', 
//                 flexWrap: 'wrap',
//                 justifyContent: 'space-between',
//                 gap: 2
//               }}>
//                 <Box sx={{ width: { xs: '100%', sm: '45%' } }}>
//                   <Typography variant="overline" color="#64748b" fontSize="0.7rem">
//                     Correo electrónico
//                   </Typography>
//                   <Typography variant="body2" color="#334155" sx={{ wordBreak: 'break-all' }}>
//                     {user.email}
//                   </Typography>
//                 </Box>

//                 <Box sx={{ width: { xs: '100%', sm: '45%' } }}>
//                   <Typography variant="overline" color="#64748b" fontSize="0.7rem">
//                     Miembro desde
//                   </Typography>
//                   <Typography variant="body2" color="#334155">
//                     {new Date().toLocaleDateString('es-ES', { month: 'long', day: 'numeric', year: 'numeric' })}
//                   </Typography>
//                 </Box>

//                 <Box sx={{ width: { xs: '100%', sm: '45%' } }}>
//                   <Typography variant="overline" color="#64748b" fontSize="0.7rem">
//                     Estado de la cuenta
//                   </Typography>
//                   <Typography variant="body2" color="#334155">
//                     Verificada
//                   </Typography>
//                 </Box>

//                 <Box sx={{ width: { xs: '100%', sm: '45%' } }}>
//                   <Typography variant="overline" color="#64748b" fontSize="0.7rem">
//                     ID de usuario
//                   </Typography>
//                   <Typography variant="body2" color="#64748b" sx={{ fontFamily: 'monospace' }}>
//                     #{(user.id || 'N/A').slice(0, 8)}
//                   </Typography>
//                 </Box>
//               </Box>

//               <Button
//                 fullWidth
//                 variant="outlined"
//                 startIcon={<EditRounded />}
//                 sx={{
//                   mt: 3,
//                   color: '#64748b',
//                   borderColor: 'rgba(0, 0, 0, 0.1)',
//                   py: 1.2,
//                   '&:hover': {
//                     borderColor: '#4f46e5',
//                     backgroundColor: 'rgba(79, 70, 229, 0.05)'
//                   }
//                 }}
//               >
//                 Editar perfil
//               </Button>
//             </CardContent>
//           </Card>

//           {/* Estadísticas */}
//           <Card
//             sx={{
//               flex: 1,
//               backgroundColor: '#ffffff',
//               border: '1px solid rgba(0, 0, 0, 0.05)',
//               borderRadius: 3,
//               boxShadow: '0 8px 25px rgba(0,0,0,0.05)',
//               transition: 'all 0.3s ease',
//               '&:hover': {
//                 transform: 'translateY(-5px)',
//                 boxShadow: '0 15px 35px rgba(14, 165, 233, 0.1)'
//               }
//             }}
//           >
//             <CardContent sx={{ p: 4 }}>
//               <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
//                 <Box sx={{ 
//                   width: 42, 
//                   height: 42, 
//                   borderRadius: 2, 
//                   bgcolor: 'rgba(14, 165, 233, 0.15)', 
//                   display: 'flex', 
//                   alignItems: 'center', 
//                   justifyContent: 'center',
//                   mr: 2
//                 }}>
//                   <AnalyticsRounded sx={{ color: '#0ea5e9' }} />
//                 </Box>
//                 <Typography variant="h6" color="#1e293b" fontWeight="600">
//                   Resumen de rendimiento
//                 </Typography>
//               </Box>

//               <Divider sx={{ borderColor: 'rgba(0, 0, 0, 0.05)', my: 3 }} />

//               <Box sx={{ 
//                 display: 'flex', 
//                 flexDirection: { xs: 'column', sm: 'row' },
//                 justifyContent: 'space-between',
//                 gap: 3,
//                 textAlign: 'center'
//               }}>
//                 <Box sx={{ 
//                   flex: 1,
//                   bgcolor: 'rgba(79, 70, 229, 0.08)', 
//                   borderRadius: 3, 
//                   py: 2.5,
//                   border: '1px solid rgba(79, 70, 229, 0.12)'
//                 }}>
//                   <Typography variant="h4" color="#4f46e5" fontWeight="700">
//                     12
//                   </Typography>
//                   <Typography variant="body2" color="#64748b" sx={{ mt: 0.5 }}>
//                     Proyectos
//                   </Typography>
//                 </Box>

//                 <Box sx={{ 
//                   flex: 1,
//                   bgcolor: 'rgba(14, 165, 233, 0.08)', 
//                   borderRadius: 3, 
//                   py: 2.5,
//                   border: '1px solid rgba(14, 165, 233, 0.12)'
//                 }}>
//                   <Typography variant="h4" color="#0ea5e9" fontWeight="700">
//                     47
//                   </Typography>
//                   <Typography variant="body2" color="#64748b" sx={{ mt: 0.5 }}>
//                     Tareas
//                   </Typography>
//                 </Box>

//                 <Box sx={{ 
//                   flex: 1,
//                   bgcolor: 'rgba(239, 68, 68, 0.08)', 
//                   borderRadius: 3, 
//                   py: 2.5,
//                   border: '1px solid rgba(239, 68, 68, 0.12)'
//                 }}>
//                   <Typography variant="h4" color="#ef4444" fontWeight="700">
//                     9
//                   </Typography>
//                   <Typography variant="body2" color="#64748b" sx={{ mt: 0.5 }}>
//                     Completadas
//                   </Typography>
//                 </Box>
//               </Box>

//               <Box sx={{ mt: 3, display: 'flex', justifyContent: 'center' }}>
//                 <Chip 
//                   icon={<TrendingUpRounded />}
//                   label="+12% desde el mes pasado" 
//                   size="small" 
//                   sx={{ 
//                     bgcolor: 'rgba(79, 70, 229, 0.15)', 
//                     color: '#4f46e5', 
//                     fontSize: '0.75rem',
//                   }} 
//                 />
//               </Box>
//             </CardContent>
//           </Card>
//         </Box>

//         {/* Sección de acciones rápidas */}
//         <Box sx={{ mt: 6 }}>
//           <Typography
//             variant="h5"
//             sx={{
//               color: '#1e293b',
//               mb: 3.5,
//               fontWeight: 600,
//               display: 'flex',
//               alignItems: 'center'
//             }}
//           >
//             Acciones rápidas
//             <Chip 
//               label="4" 
//               size="small" 
//               sx={{ 
//                 bgcolor: 'rgba(79, 70, 229, 0.15)', 
//                 color: '#4f46e5', 
//                 ml: 1.5,
//                 height: 22,
//                 fontSize: '0.7rem'
//               }} 
//             />
//           </Typography>

//           <Box sx={{ 
//             display: 'flex', 
//             flexDirection: { xs: 'column', sm: 'row' },
//             flexWrap: 'wrap',
//             gap: 2
//           }}>
//             <Button
//               variant="outlined"
//               startIcon={<AddRounded />}
//               sx={{
//                 flex: { xs: '1 1 100%', sm: '1 1 45%', md: '1' },
//                 color: '#4f46e5',
//                 borderColor: 'rgba(79, 70, 229, 0.3)',
//                 borderRadius: 2,
//                 py: 1.8,
//                 '&:hover': {
//                   borderColor: '#4f46e5',
//                   backgroundColor: 'rgba(79, 70, 229, 0.08)'
//                 }
//               }}
//             >
//               Nuevo proyecto
//             </Button>

//             <Button
//               variant="outlined"
//               startIcon={<EditRounded />}
//               sx={{
//                 flex: { xs: '1 1 100%', sm: '1 1 45%', md: '1' },
//                 color: '#0ea5e9',
//                 borderColor: 'rgba(14, 165, 233, 0.3)',
//                 borderRadius: 2,
//                 py: 1.8,
//                 '&:hover': {
//                   borderColor: '#0ea5e9',
//                   backgroundColor: 'rgba(14, 165, 233, 0.08)'
//                 }
//               }}
//             >
//               Editar perfil
//             </Button>

//             <Button
//               variant="outlined"
//               startIcon={<SettingsRounded />}
//               sx={{
//                 flex: { xs: '1 1 100%', sm: '1 1 45%', md: '1' },
//                 color: '#ef4444',
//                 borderColor: 'rgba(239, 68, 68, 0.3)',
//                 borderRadius: 2,
//                 py: 1.8,
//                 '&:hover': {
//                   borderColor: '#ef4444',
//                   backgroundColor: 'rgba(239, 68, 68, 0.08)'
//                 }
//               }}
//             >
//               Configuración
//             </Button>

//             <Button
//               variant="outlined"
//               startIcon={<DashboardRounded />}
//               sx={{
//                 flex: { xs: '1 1 100%', sm: '1 1 45%', md: '1' },
//                 color: '#f59e0b',
//                 borderColor: 'rgba(245, 158, 11, 0.3)',
//                 borderRadius: 2,
//                 py: 1.8,
//                 '&:hover': {
//                   borderColor: '#f59e0b',
//                   backgroundColor: 'rgba(245, 158, 11, 0.08)'
//                 }
//               }}
//             >
//               Plantillas
//             </Button>
//           </Box>
//         </Box>

//         {/* Recent Activity Section */}
//         <Box sx={{ mt: 6 }}>
//           <Typography
//             variant="h5"
//             sx={{
//               color: '#1e293b',
//               mb: 3,
//               fontWeight: 600
//             }}
//           >
//             Actividad reciente
//           </Typography>

//           <Box sx={{ 
//             display: 'flex', 
//             flexDirection: { xs: 'column', md: 'row' },
//             gap: 3
//           }}>
//             <Paper sx={{ 
//               flex: 1, 
//               backgroundColor: '#ffffff',
//               border: '1px solid rgba(79, 70, 229, 0.1)',
//               borderRadius: 3,
//               p: 3,
//               boxShadow: '0 4px 6px rgba(0,0,0,0.03)'
//             }}>
//               <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
//                 <AccountCircleRounded sx={{ color: '#4f46e5', mr: 1.5 }} />
//                 <Typography variant="h6" color="#1e293b">
//                   Perfil actualizado
//                 </Typography>
//               </Box>
//               <Typography variant="body2" color="#64748b">
//                 Actualizaste la información de tu perfil
//               </Typography>
//               <Typography variant="caption" color="#94a3b8">
//                 Hace 2 horas
//               </Typography>
//             </Paper>

//             <Paper sx={{ 
//               flex: 1, 
//               backgroundColor: '#ffffff',
//               border: '1px solid rgba(14, 165, 233, 0.1)',
//               borderRadius: 3,
//               p: 3,
//               boxShadow: '0 4px 6px rgba(0,0,0,0.03)'
//             }}>
//               <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
//                 <TaskRounded sx={{ color: '#0ea5e9', mr: 1.5 }} />
//                 <Typography variant="h6" color="#1e293b">
//                   Tarea completada
//                 </Typography>
//               </Box>
//               <Typography variant="body2" color="#64748b">
//                 Completaste "Diseñar nuevo dashboard"
//               </Typography>
//               <Typography variant="caption" color="#94a3b8">
//                 Hace 1 día
//               </Typography>
//             </Paper>
//           </Box>
//         </Box>

//         {/* CV Section */}
//         <Box sx={{ mt: 6 }}>
//           <Typography
//             variant="h5"
//             sx={{
//               color: '#1e293b',
//               mb: 3,
//               fontWeight: 600
//             }}
//           >
//             Gestión de CVs
//           </Typography>

//           <Card sx={{ 
//             backgroundColor: '#ffffff',
//             border: '1px solid rgba(0, 0, 0, 0.05)',
//             borderRadius: 3,
//             boxShadow: '0 8px 25px rgba(0,0,0,0.05)',
//             p: 3
//           }}>
//             <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
//               <Box>
//                 <Typography variant="h6" color="#1e293b">
//                   Mis currículums
//                 </Typography>
//                 <Typography variant="body2" color="#64748b">
//                   Administra y visualiza tus currículums profesionales
//                 </Typography>
//               </Box>

//               <Box sx={{ display: 'flex', gap: 1 }}>
//                 <IconButton sx={{ color: '#64748b' }}>
//                   <MoreVert />
//                 </IconButton>
//               </Box>
//             </Box>

//             <Box sx={{ 
//               display: 'flex', 
//               flexDirection: { xs: 'column', sm: 'row' },
//               gap: 2,
//               flexWrap: 'wrap'
//             }}>
//               <Button
//                 variant="outlined"
//                 startIcon={<AddRounded />}
//                 sx={{
//                   color: '#4f46e5',
//                   borderColor: 'rgba(79, 70, 229, 0.3)',
//                   borderRadius: 2,
//                   py: 1.5,
//                   '&:hover': {
//                     borderColor: '#4f46e5',
//                     backgroundColor: 'rgba(79, 70, 229, 0.08)'
//                   }
//                 }}
//               >
//                 Crear CV
//               </Button>

//               <Button
//                 variant="outlined"
//                 startIcon={<Visibility />}
//                 sx={{
//                   color: '#0ea5e9',
//                   borderColor: 'rgba(14, 165, 233, 0.3)',
//                   borderRadius: 2,
//                   py: 1.5,
//                   '&:hover': {
//                     borderColor: '#0ea5e9',
//                     backgroundColor: 'rgba(14, 165, 233, 0.08)'
//                   }
//                 }}
//               >
//                 Vista previa
//               </Button>

//               <Button
//                 variant="outlined"
//                 startIcon={<PictureAsPdf />}
//                 sx={{
//                   color: '#ef4444',
//                   borderColor: 'rgba(239, 68, 68, 0.3)',
//                   borderRadius: 2,
//                   py: 1.5,
//                   '&:hover': {
//                     borderColor: '#ef4444',
//                     backgroundColor: 'rgba(239, 68, 68, 0.08)'
//                   }
//                 }}
//               >
//                 Exportar PDF
//               </Button>

//               <Button
//                 variant="outlined"
//                 startIcon={<Share />}
//                 sx={{
//                   color: '#10b981',
//                   borderColor: 'rgba(16, 185, 129, 0.3)',
//                   borderRadius: 2,
//                   py: 1.5,
//                   '&:hover': {
//                     borderColor: '#10b981',
//                     backgroundColor: 'rgba(16, 185, 129, 0.08)'
//                   }
//                 }}
//               >
//                 Compartir
//               </Button>
//             </Box>
//           </Card>
//         </Box>
//       </Container>
//     </Box>
//   );
// }

'use client';

import { useEffect, useState } from 'react';
import {
  Container,
  Typography,
  Button,
  Box,
  Card,
  CardContent,
  useTheme,
  useMediaQuery,
  IconButton,
  Divider,
  Chip,
  Avatar
} from '@mui/material';
import {
  LogoutRounded,
  SettingsRounded,
  EditRounded,
  DashboardRounded,
  NotificationsRounded,
  AccountCircleRounded,
  AnalyticsRounded,
  TaskRounded,
  TrendingUpRounded,
  EmailRounded,
  VpnKeyRounded
} from '@mui/icons-material';
import { useAppSelector, useAppDispatch } from '../store/hooks';
import { logout } from '../store/features/authSlice';
import { useRouter } from 'next/router';
import DashboardLayout from '@/components/Dashboard/DashboardLayout';
import StatCard from '@/components/Dashboard/StatCard';
import Config from '@/components/Config/Config';
import ApiKeys from '@/components/Config/ApiKeys';
import EmailConfig from '@/components/Config/EmailConfig';

export default function Dashboard() {
  const { user } = useAppSelector((state) => state.auth);
  const dispatch = useAppDispatch();
  const router = useRouter();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const [mounted, setMounted] = useState(false);
  const [selectedItem, setSelectedItem] = useState('home');

  const handleLogout = () => {
    dispatch(logout());
    router.push('/');
  };

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!user) {
      router.push('/');
    }
  }, [user, router]);

  const drawerItems = [
    {
      text: 'Inicio',
      icon: <DashboardRounded />,
      onClick: () => setSelectedItem('home'),
      selected: selectedItem === 'home',
    },
    {
      text: 'Configuración',
      icon: <SettingsRounded />,
      onClick: () => setSelectedItem('settings'),
      selected: selectedItem === 'settings',
    },
    {
      text: 'Configurar Email',
      icon: <EmailRounded />,
      onClick: () => setSelectedItem('email'),
      selected: selectedItem === 'email',
    },
    {
      text: 'API Keys',
      icon: <VpnKeyRounded />,
      onClick: () => setSelectedItem('api'),
      selected: selectedItem === 'api',
    },
  ];

  if (!mounted || !user) {
    return (
      <Box sx={{
        backgroundColor: '#f8fafc',
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundImage: 'linear-gradient(to top, #f3e7e9 0%, #e3eeff 99%, #e3eeff 100%)'
      }}>
        <Typography variant="h6" color="#64748b">
          Cargando...
        </Typography>
      </Box>
    );
  }

  const renderContent = () => {
    switch (selectedItem) {
      case 'settings':
        return <Config user={user} />;
      case 'email':
        return <EmailConfig user={user} />;
      case 'api':
        return <ApiKeys />;
      default:
        return (
          <>
            <Box sx={{ mb: 4 }}>
              <Typography variant="h4" component="h1" gutterBottom fontWeight={600} color="#1e293b">
                Bienvenido de nuevo, {user.name}
              </Typography>
              <Typography variant="body1" color="#64748b">
                Gestiona tu cuenta y configuración
              </Typography>
            </Box>

            {/* Tarjetas de estadísticas */}
            <Box sx={{
              display: 'flex',
              flexWrap: 'wrap',
              gap: 3,
              mb: 4,
              justifyContent: { xs: 'center', md: 'flex-start' }
            }}>
              <Box sx={{
                width: { xs: '100%', sm: 'calc(50% - 12px)', md: 'calc(25% - 12px)' },
                minWidth: { xs: '100%', sm: '200px' }
              }}>
                <StatCard
                  title="Proyectos"
                  value="12"
                  subtitle="Totales"
                  trend={{ value: 12, isPositive: true }}
                  icon={<DashboardRounded />}
                  color="primary"
                />
              </Box>
              <Box sx={{
                width: { xs: '100%', sm: 'calc(50% - 12px)', md: 'calc(25% - 12px)' },
                minWidth: { xs: '100%', sm: '200px' }
              }}>
                <StatCard
                  title="Tareas"
                  value="47"
                  subtitle="Pendientes"
                  trend={{ value: 8, isPositive: true }}
                  icon={<TaskRounded />}
                  color="secondary"
                />
              </Box>
              <Box sx={{
                width: { xs: '100%', sm: 'calc(50% - 12px)', md: 'calc(25% - 12px)' },
                minWidth: { xs: '100%', sm: '200px' }
              }}>
                <StatCard
                  title="Completadas"
                  value="9"
                  subtitle="Este mes"
                  trend={{ value: -3, isPositive: false }}
                  icon={<TrendingUpRounded />}
                  color="info"
                />
              </Box>
              <Box sx={{
                width: { xs: '100%', sm: 'calc(50% - 12px)', md: 'calc(25% - 12px)' },
                minWidth: { xs: '100%', sm: '200px' }
              }}>
                <StatCard
                  title="Rendimiento"
                  value="24.3%"
                  subtitle="Este año"
                  trend={{ value: 18, isPositive: true }}
                  icon={<AnalyticsRounded />}
                  color="success"
                />
              </Box>
            </Box>

            {/* Información del usuario */}
            <Card
              sx={{
                backgroundColor: '#ffffff',
                border: '1px solid rgba(0, 0, 0, 0.05)',
                borderRadius: 3,
                boxShadow: '0 8px 25px rgba(0,0,0,0.05)',
                transition: 'all 0.3s ease',
                '&:hover': {
                  transform: 'translateY(-5px)',
                  boxShadow: '0 15px 35px rgba(79, 70, 229, 0.1)'
                }
              }}
            >
              <CardContent sx={{ p: 4 }}>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
                  <Avatar
                    sx={{
                      width: 60,
                      height: 60,
                      bgcolor: 'rgba(79, 70, 229, 0.15)',
                      color: '#4f46e5',
                      fontWeight: 600,
                      mr: 2.5
                    }}
                  >
                    {user.name.charAt(0).toUpperCase()}
                  </Avatar>
                  <Box>
                    <Typography variant="h6" color="#1e293b" fontWeight="600">
                      {user.name}
                    </Typography>
                    <Chip
                      label="Usuario Premium"
                      size="small"
                      sx={{
                        bgcolor: 'rgba(79, 70, 229, 0.15)',
                        color: '#4f46e5',
                        fontSize: '0.7rem',
                        height: 22,
                        mt: 0.5
                      }}
                    />
                  </Box>
                </Box>

                <Divider sx={{ borderColor: 'rgba(0, 0, 0, 0.05)', my: 3 }} />

                <Box sx={{
                  display: 'flex',
                  flexWrap: 'wrap',
                  justifyContent: 'space-between',
                  gap: 2
                }}>
                  <Box sx={{ width: { xs: '100%', sm: '45%' } }}>
                    <Typography variant="overline" color="#64748b" fontSize="0.7rem">
                      Correo electrónico
                    </Typography>
                    <Typography variant="body2" color="#334155" sx={{ wordBreak: 'break-all' }}>
                      {user.email}
                    </Typography>
                  </Box>

                  <Box sx={{ width: { xs: '100%', sm: '45%' } }}>
                    <Typography variant="overline" color="#64748b" fontSize="0.7rem">
                      Miembro desde
                    </Typography>
                    <Typography variant="body2" color="#334155">
                      {new Date().toLocaleDateString('es-ES', { month: 'long', day: 'numeric', year: 'numeric' })}
                    </Typography>
                  </Box>

                  <Box sx={{ width: { xs: '100%', sm: '45%' } }}>
                    <Typography variant="overline" color="#64748b" fontSize="0.7rem">
                      Estado de la cuenta
                    </Typography>
                    <Typography variant="body2" color="#334155">
                      Verificada
                    </Typography>
                  </Box>

                  <Box sx={{ width: { xs: '100%', sm: '45%' } }}>
                    <Typography variant="overline" color="#64748b" fontSize="0.7rem">
                      ID de usuario
                    </Typography>
                    <Typography variant="body2" color="#64748b" sx={{ fontFamily: 'monospace' }}>
                      #{(user.id || 'N/A').slice(0, 8)}
                    </Typography>
                  </Box>
                </Box>

                <Button
                  fullWidth
                  variant="outlined"
                  startIcon={<EditRounded />}
                  sx={{
                    mt: 3,
                    color: '#64748b',
                    borderColor: 'rgba(0, 0, 0, 0.1)',
                    py: 1.2,
                    '&:hover': {
                      borderColor: '#4f46e5',
                      backgroundColor: 'rgba(79, 70, 229, 0.05)'
                    }
                  }}
                  onClick={() => setSelectedItem('settings')}
                >
                  Editar perfil
                </Button>
              </CardContent>
            </Card>
          </>
        );
    }
  };

  return (
    <DashboardLayout
      title="EleganceAI"
      drawerItems={drawerItems}
      headerContent={
        <>
          <IconButton sx={{ color: '#64748b', mr: 1 }}>
            <NotificationsRounded />
          </IconButton>

          <Button
            variant="outlined"
            onClick={handleLogout}
            startIcon={<LogoutRounded />}
            sx={{
              color: '#4f46e5',
              borderColor: 'rgba(79, 70, 229, 0.3)',
              borderRadius: 2,
              px: 2,
              py: 0.8,
              '&:hover': {
                borderColor: '#4f46e5',
                backgroundColor: 'rgba(79, 70, 229, 0.08)'
              }
            }}
          >
            Cerrar sesión
          </Button>
        </>
      }
    >
      {renderContent()}
    </DashboardLayout>
  );
}