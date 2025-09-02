import React, { ReactNode } from 'react';
import {
  Box,
  Drawer,
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  useTheme,
  useMediaQuery,
} from '@mui/material';
import { DashboardRounded, Menu as MenuIcon } from '@mui/icons-material';

interface DrawerItem {
  text: string;
  icon: React.ReactElement;
  onClick: () => void;
  selected: boolean;
}

interface DashboardLayoutProps {
  title: string;
  children: ReactNode;
  drawerItems: DrawerItem[];
  headerContent?: ReactNode;
}

const DashboardLayout: React.FC<DashboardLayoutProps> = ({
  title,
  children,
  drawerItems,
  headerContent,
}) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const [mobileOpen, setMobileOpen] = React.useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const drawer = (
    <Box sx={{ p: 2, width: 250 }}>
      <Typography variant="h6" sx={{ mb: 2, display: 'flex', alignItems: 'center' }}>
        <DashboardRounded sx={{ mr: 1, color: '#4f46e5' }} />
        {title}
      </Typography>
      {drawerItems.map((item) => (
        <Box
          key={item.text}
          onClick={item.onClick}
          sx={{
            display: 'flex',
            alignItems: 'center',
            p: 2,
            borderRadius: 1,
            mb: 1,
            cursor: 'pointer',
            backgroundColor: item.selected ? 'rgba(79, 70, 229, 0.1)' : 'transparent',
            color: item.selected ? '#4f46e5' : 'inherit',
            '&:hover': {
              backgroundColor: 'rgba(79, 70, 229, 0.05)',
            },
          }}
        >
          {React.cloneElement(item.icon, {
            sx: { mr: 2, color: item.selected ? '#4f46e5' : 'inherit' }
          })}
          {item.text}
        </Box>
      ))}
    </Box>
  );

  return (
    <Box sx={{ display: 'flex', backgroundColor: '#f8fafc', minHeight: '100vh' }}>
      <AppBar
        position="fixed"
        sx={{
          width: { md: `calc(100% - 250px)` },
          ml: { md: '250px' },
          backgroundColor: '#ffffff',
          color: '#334155',
          boxShadow: 'none',
          borderBottom: '1px solid rgba(0, 0, 0, 0.05)'
        }}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { md: 'none' } }}
          >
            <MenuIcon />
          </IconButton>
          <Box sx={{ flexGrow: 1 }} />
          {headerContent}
        </Toolbar>
      </AppBar>

      <Box
        component="nav"
        sx={{ width: { md: 250 }, flexShrink: { md: 0 } }}
      >
        <Drawer
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true,
          }}
          sx={{
            display: { xs: 'block', md: 'none' },
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: 250 },
          }}
        >
          {drawer}
        </Drawer>
        <Drawer
          variant="permanent"
          sx={{
            display: { xs: 'none', md: 'block' },
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: 250 },
          }}
          open
        >
          {drawer}
        </Drawer>
      </Box>

      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          width: { md: `calc(100% - 250px)` },
          mt: '64px'
        }}
      >
        {children}
      </Box>
    </Box>
  );
};

export default DashboardLayout;


//Ejemplo de uso 

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
//   Visibility,
//   Home as HomeIcon,
//   Person as PersonIcon,
//   ShoppingCart as CartIcon,
//   TrendingUp as TrendingIcon,
//   AccountBalance as BalanceIcon,
//   Info as InfoIcon
// } from '@mui/icons-material';
// import { useAppSelector, useAppDispatch } from '../store/hooks';
// import { logout } from '../store/features/authSlice';
// import { useRouter } from 'next/router';
// import DashboardLayout from '@/components/Dashboard/DashboardLayout';
// import DashboardCard from '@/components/Dashboard/DashboardCard';
// import DashboardTabs from '@/components/Dashboard/DashboardTabs';
// import StatCard from '@/components/Dashboard/StatCard';
// import DataTable from '@/components/Dashboard/DataTable';

// export default function Dashboard() {
//   const { user } = useAppSelector((state) => state.auth);
//   const dispatch = useAppDispatch();
//   const router = useRouter();
//   const theme = useTheme();
//   const isMobile = useMediaQuery(theme.breakpoints.down('md'));
//   const [mounted, setMounted] = useState(false);
//   const [selectedItem, setSelectedItem] = useState('home');

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

//   const drawerItems = [
//     {
//       text: 'Inicio',
//       icon: <HomeIcon />,
//       onClick: () => setSelectedItem('home'),
//       selected: selectedItem === 'home',
//     },
//     {
//       text: 'Usuarios',
//       icon: <PersonIcon />,
//       onClick: () => setSelectedItem('users'),
//       selected: selectedItem === 'users',
//     },
//     {
//       text: 'Pedidos',
//       icon: <CartIcon />,
//       onClick: () => setSelectedItem('orders'),
//       selected: selectedItem === 'orders',
//     },
//     {
//       text: 'Configuración',
//       icon: <SettingsRounded />,
//       onClick: () => setSelectedItem('settings'),
//       selected: selectedItem === 'settings',
//     },
//     {
//       text: 'Acerca de',
//       icon: <InfoIcon />,
//       onClick: () => setSelectedItem('about'),
//       selected: selectedItem === 'about',
//     },
//   ];

//   // Datos de ejemplo para la tabla
//   const columns = [
//     { id: 'name', label: 'Nombre', minWidth: 170 },
//     { id: 'email', label: 'Email', minWidth: 170 },
//     { id: 'role', label: 'Rol', minWidth: 100 },
//     {
//       id: 'status',
//       label: 'Estado',
//       minWidth: 100,
//       format: (value: string) => (
//         <Box
//           sx={{
//             display: 'inline-block',
//             px: 1,
//             py: 0.5,
//             borderRadius: 1,
//             backgroundColor: value === 'Activo' ? 'success.light' : 'error.light',
//             color: 'white',
//             fontSize: '0.75rem',
//           }}
//         >
//           {value}
//         </Box>
//       ),
//     },
//   ];

//   const rows = [
//     { id: 1, name: 'Juan Pérez', email: 'juan@example.com', role: 'Admin', status: 'Activo' },
//     { id: 2, name: 'María García', email: 'maria@example.com', role: 'Usuario', status: 'Inactivo' },
//     { id: 3, name: 'Carlos López', email: 'carlos@example.com', role: 'Editor', status: 'Activo' },
//     { id: 4, name: 'Ana Martínez', email: 'ana@example.com', role: 'Usuario', status: 'Activo' },
//     { id: 5, name: 'Pedro Rodríguez', email: 'pedro@example.com', role: 'Usuario', status: 'Inactivo' },
//   ];

//   const tabItems = [
//     {
//       label: 'Resumen',
//       content: (
//         <Typography>
//           Este es el contenido de la pestaña de resumen. Aquí puedes mostrar información general.
//         </Typography>
//       ),
//     },
//     {
//       label: 'Detalles',
//       content: (
//         <Typography>
//           Este es el contenido de la pestaña de detalles. Aquí puedes mostrar información más específica.
//         </Typography>
//       ),
//     },
//     {
//       label: 'Configuración',
//       content: (
//         <Typography>
//           Este es el contenido de la pestaña de configuración. Aquí puedes mostrar opciones de configuración.
//         </Typography>
//       ),
//     },
//   ];

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
//     <DashboardLayout 
//       title="EleganceAI" 
//       drawerItems={drawerItems}
//       headerContent={
//         <>
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
//         </>
//       }
//     >
//       <Box sx={{ mb: 4 }}>
//         <Typography variant="h4" component="h1" gutterBottom fontWeight={600} color="#1e293b">
//           Bienvenido de nuevo, {user.name}
//         </Typography>
//         <Typography variant="body1" color="#64748b">
//           Esto es lo que está sucediendo con tus proyectos hoy
//         </Typography>
//       </Box>

//       {/* Tarjetas de estadísticas */}
//       <Box sx={{ 
//         display: 'flex', 
//         flexWrap: 'wrap', 
//         gap: 3, 
//         mb: 4,
//         justifyContent: { xs: 'center', md: 'flex-start' }
//       }}>
//         <Box sx={{ 
//           width: { xs: '100%', sm: 'calc(50% - 12px)', md: 'calc(25% - 12px)' }, 
//           minWidth: { xs: '100%', sm: '200px' } 
//         }}>
//           <StatCard
//             title="Proyectos Totales"
//             value="12"
//             subtitle="Desde el inicio"
//             trend={{ value: 12, isPositive: true }}
//             icon={<DashboardRounded />}
//             color="primary"
//           />
//         </Box>
//         <Box sx={{ 
//           width: { xs: '100%', sm: 'calc(50% - 12px)', md: 'calc(25% - 12px)' }, 
//           minWidth: { xs: '100%', sm: '200px' } 
//         }}>
//           <StatCard
//             title="Tareas Pendientes"
//             value="47"
//             subtitle="Este mes"
//             trend={{ value: 8, isPositive: true }}
//             icon={<TaskRounded />}
//             color="secondary"
//           />
//         </Box>
//         <Box sx={{ 
//           width: { xs: '100%', sm: 'calc(50% - 12px)', md: 'calc(25% - 12px)' }, 
//           minWidth: { xs: '100%', sm: '200px' } 
//         }}>
//           <StatCard
//             title="Tareas Completadas"
//             value="9"
//             subtitle="Este mes"
//             trend={{ value: -3, isPositive: false }}
//             icon={<TrendingIcon />}
//             color="info"
//           />
//         </Box>
//         <Box sx={{ 
//           width: { xs: '100%', sm: 'calc(50% - 12px)', md: 'calc(25% - 12px)' }, 
//           minWidth: { xs: '100%', sm: '200px' } 
//         }}>
//           <StatCard
//             title="Rendimiento"
//             value="24.3%"
//             subtitle="Este año"
//             trend={{ value: 18, isPositive: true }}
//             icon={<AnalyticsRounded />}
//             color="success"
//           />
//         </Box>
//       </Box>

//       <Box sx={{ 
//         display: 'flex', 
//         flexDirection: { xs: 'column', md: 'row' }, 
//         gap: 3, 
//         mb: 4 
//       }}>
//         {/* Información del usuario */}
//         <Card
//           sx={{
//             flex: 1,
//             backgroundColor: '#ffffff',
//             border: '1px solid rgba(0, 0, 0, 0.05)',
//             borderRadius: 3,
//             boxShadow: '0 8px 25px rgba(0,0,0,0.05)',
//             transition: 'all 0.3s ease',
//             '&:hover': {
//               transform: 'translateY(-5px)',
//               boxShadow: '0 15px 35px rgba(79, 70, 229, 0.1)'
//             }
//           }}
//         >
//           <CardContent sx={{ p: 4 }}>
//             <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
//               <Avatar
//                 sx={{
//                   width: 60,
//                   height: 60,
//                   bgcolor: 'rgba(79, 70, 229, 0.15)',
//                   color: '#4f46e5',
//                   fontWeight: 600,
//                   mr: 2.5
//                 }}
//               >
//                 {user.name.charAt(0).toUpperCase()}
//               </Avatar>
//               <Box>
//                 <Typography variant="h6" color="#1e293b" fontWeight="600">
//                   {user.name}
//                 </Typography>
//                 <Chip 
//                   label="Miembro Premium" 
//                   size="small" 
//                   sx={{ 
//                     bgcolor: 'rgba(79, 70, 229, 0.15)', 
//                     color: '#4f46e5', 
//                     fontSize: '0.7rem',
//                     height: 22,
//                     mt: 0.5
//                   }} 
//                 />
//               </Box>
//             </Box>

//             <Divider sx={{ borderColor: 'rgba(0, 0, 0, 0.05)', my: 3 }} />

//             <Box sx={{ 
//               display: 'flex', 
//               flexWrap: 'wrap',
//               justifyContent: 'space-between',
//               gap: 2
//             }}>
//               <Box sx={{ width: { xs: '100%', sm: '45%' } }}>
//                 <Typography variant="overline" color="#64748b" fontSize="0.7rem">
//                   Correo electrónico
//                 </Typography>
//                 <Typography variant="body2" color="#334155" sx={{ wordBreak: 'break-all' }}>
//                   {user.email}
//                 </Typography>
//               </Box>

//               <Box sx={{ width: { xs: '100%', sm: '45%' } }}>
//                 <Typography variant="overline" color="#64748b" fontSize="0.7rem">
//                   Miembro desde
//                 </Typography>
//                 <Typography variant="body2" color="#334155">
//                   {new Date().toLocaleDateString('es-ES', { month: 'long', day: 'numeric', year: 'numeric' })}
//                 </Typography>
//               </Box>

//               <Box sx={{ width: { xs: '100%', sm: '45%' } }}>
//                 <Typography variant="overline" color="#64748b" fontSize="0.7rem">
//                   Estado de la cuenta
//                 </Typography>
//                 <Typography variant="body2" color="#334155">
//                   Verificada
//                 </Typography>
//               </Box>

//               <Box sx={{ width: { xs: '100%', sm: '45%' } }}>
//                 <Typography variant="overline" color="#64748b" fontSize="0.7rem">
//                   ID de usuario
//                 </Typography>
//                 <Typography variant="body2" color="#64748b" sx={{ fontFamily: 'monospace' }}>
//                   #{(user.id || 'N/A').slice(0, 8)}
//                 </Typography>
//               </Box>
//             </Box>

//             <Button
//               fullWidth
//               variant="outlined"
//               startIcon={<EditRounded />}
//               sx={{
//                 mt: 3,
//                 color: '#64748b',
//                 borderColor: 'rgba(0, 0, 0, 0.1)',
//                 py: 1.2,
//                 '&:hover': {
//                   borderColor: '#4f46e5',
//                   backgroundColor: 'rgba(79, 70, 229, 0.05)'
//                 }
//               }}
//             >
//               Editar perfil
//             </Button>
//           </CardContent>
//         </Card>

//         {/* Estadísticas */}
//         <Card
//           sx={{
//             flex: 1,
//             backgroundColor: '#ffffff',
//             border: '1px solid rgba(0, 0, 0, 0.05)',
//             borderRadius: 3,
//             boxShadow: '0 8px 25px rgba(0,0,0,0.05)',
//             transition: 'all 0.3s ease',
//             '&:hover': {
//               transform: 'translateY(-5px)',
//               boxShadow: '0 15px 35px rgba(14, 165, 233, 0.1)'
//             }
//           }}
//         >
//           <CardContent sx={{ p: 4 }}>
//             <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
//               <Box sx={{ 
//                 width: 42, 
//                 height: 42, 
//                 borderRadius: 2, 
//                 bgcolor: 'rgba(14, 165, 233, 0.15)', 
//                 display: 'flex', 
//                 alignItems: 'center', 
//                 justifyContent: 'center',
//                 mr: 2
//               }}>
//                 <AnalyticsRounded sx={{ color: '#0ea5e9' }} />
//               </Box>
//               <Typography variant="h6" color="#1e293b" fontWeight="600">
//                 Resumen de rendimiento
//               </Typography>
//             </Box>

//             <Divider sx={{ borderColor: 'rgba(0, 0, 0, 0.05)', my: 3 }} />

//             <Box sx={{ 
//               display: 'flex', 
//               flexDirection: { xs: 'column', sm: 'row' },
//               justifyContent: 'space-between',
//               gap: 3,
//               textAlign: 'center'
//             }}>
//               <Box sx={{ 
//                 flex: 1,
//                 bgcolor: 'rgba(79, 70, 229, 0.08)', 
//                 borderRadius: 3, 
//                 py: 2.5,
//                 border: '1px solid rgba(79, 70, 229, 0.12)'
//               }}>
//                 <Typography variant="h4" color="#4f46e5" fontWeight="700">
//                   12
//                 </Typography>
//                 <Typography variant="body2" color="#64748b" sx={{ mt: 0.5 }}>
//                   Proyectos
//                 </Typography>
//               </Box>

//               <Box sx={{ 
//                 flex: 1,
//                 bgcolor: 'rgba(14, 165, 233, 0.08)', 
//                 borderRadius: 3, 
//                 py: 2.5,
//                 border: '1px solid rgba(14, 165, 233, 0.12)'
//               }}>
//                 <Typography variant="h4" color="#0ea5e9" fontWeight="700">
//                   47
//                 </Typography>
//                 <Typography variant="body2" color="#64748b" sx={{ mt: 0.5 }}>
//                   Tareas
//                 </Typography>
//               </Box>

//               <Box sx={{ 
//                 flex: 1,
//                 bgcolor: 'rgba(239, 68, 68, 0.08)', 
//                 borderRadius: 3, 
//                 py: 2.5,
//                 border: '1px solid rgba(239, 68, 68, 0.12)'
//               }}>
//                 <Typography variant="h4" color="#ef4444" fontWeight="700">
//                   9
//                 </Typography>
//                 <Typography variant="body2" color="#64748b" sx={{ mt: 0.5 }}>
//                   Completadas
//                 </Typography>
//               </Box>
//             </Box>

//             <Box sx={{ mt: 3, display: 'flex', justifyContent: 'center' }}>
//               <Chip 
//                 icon={<TrendingUpRounded />}
//                 label="+12% desde el mes pasado" 
//                 size="small" 
//                 sx={{ 
//                   bgcolor: 'rgba(79, 70, 229, 0.15)', 
//                   color: '#4f46e5', 
//                   fontSize: '0.75rem',
//                 }} 
//               />
//             </Box>
//           </CardContent>
//         </Card>
//       </Box>

//       {/* Tarjeta con pestañas y acciones rápidas */}
//       <Box sx={{ 
//         display: 'flex', 
//         flexDirection: { xs: 'column', md: 'row' }, 
//         gap: 3, 
//         mb: 4 
//       }}>
//         <Box sx={{ width: { xs: '100%', md: '66%' } }}>
//           <DashboardCard title="Actividad Reciente" sx={{ height: '100%' }}>
//             <DashboardTabs tabs={tabItems} />
//           </DashboardCard>
//         </Box>
        
//         <Box sx={{ width: { xs: '100%', md: '33%' } }}>
//           <DashboardCard title="Acciones Rápidas">
//             <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
//               <Button 
//                 variant="outlined" 
//                 startIcon={<AddRounded />}
//                 sx={{
//                   color: '#4f46e5',
//                   borderColor: 'rgba(79, 70, 229, 0.3)',
//                   '&:hover': {
//                     borderColor: '#4f46e5',
//                     backgroundColor: 'rgba(79, 70, 229, 0.08)'
//                   }
//                 }}
//               >
//                 Nuevo proyecto
//               </Button>
//               <Button 
//                 variant="outlined" 
//                 startIcon={<EditRounded />}
//                 sx={{
//                   color: '#0ea5e9',
//                   borderColor: 'rgba(14, 165, 233, 0.3)',
//                   '&:hover': {
//                     borderColor: '#0ea5e9',
//                     backgroundColor: 'rgba(14, 165, 233, 0.08)'
//                   }
//                 }}
//               >
//                 Editar perfil
//               </Button>
//               <Button 
//                 variant="outlined" 
//                 startIcon={<SettingsRounded />}
//                 sx={{
//                   color: '#ef4444',
//                   borderColor: 'rgba(239, 68, 68, 0.3)',
//                   '&:hover': {
//                     borderColor: '#ef4444',
//                     backgroundColor: 'rgba(239, 68, 68, 0.08)'
//                   }
//                 }}
//               >
//                 Configuración
//               </Button>
//             </Box>
//           </DashboardCard>
//         </Box>
//       </Box>

//       {/* Tabla de datos */}
//       <Box sx={{ mt: 4 }}>
//         <DataTable
//           columns={columns}
//           rows={rows}
//           title="Lista de Usuarios"
//           pagination
//           selection
//           sortable
//         />
//       </Box>

//       {/* CV Section */}
//       <Box sx={{ mt: 6 }}>
//         <Typography
//           variant="h5"
//           sx={{
//             color: '#1e293b',
//             mb: 3,
//             fontWeight: 600
//           }}
//         >
//           Gestión de CVs
//         </Typography>
        
//         <Card sx={{ 
//           backgroundColor: '#ffffff',
//           border: '1px solid rgba(0, 0, 0, 0.05)',
//           borderRadius: 3,
//           boxShadow: '0 8px 25px rgba(0,0,0,0.05)',
//           p: 3
//         }}>
//           <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
//             <Box>
//               <Typography variant="h6" color="#1e293b">
//                 Mis currículums
//               </Typography>
//               <Typography variant="body2" color="#64748b">
//                 Administra y visualiza tus currículums profesionales
//               </Typography>
//             </Box>
            
//             <Box sx={{ display: 'flex', gap: 1 }}>
//               <IconButton sx={{ color: '#64748b' }}>
//                 <MoreVert />
//               </IconButton>
//             </Box>
//           </Box>
          
//           <Box sx={{ 
//             display: 'flex', 
//             flexDirection: { xs: 'column', sm: 'row' },
//             gap: 2,
//             flexWrap: 'wrap'
//           }}>
//             <Button
//               variant="outlined"
//               startIcon={<AddRounded />}
//               sx={{
//                 color: '#4f46e5',
//                 borderColor: 'rgba(79, 70, 229, 0.3)',
//                 borderRadius: 2,
//                 py: 1.5,
//                 '&:hover': {
//                   borderColor: '#4f46e5',
//                   backgroundColor: 'rgba(79, 70, 229, 0.08)'
//                 }
//               }}
//             >
//               Crear CV
//             </Button>

//             <Button
//               variant="outlined"
//               startIcon={<Visibility />}
//               sx={{
//                 color: '#0ea5e9',
//                 borderColor: 'rgba(14, 165, 233, 0.3)',
//                 borderRadius: 2,
//                 py: 1.5,
//                 '&:hover': {
//                   borderColor: '#0ea5e9',
//                   backgroundColor: 'rgba(14, 165, 233, 0.08)'
//                 }
//               }}
//             >
//               Vista previa
//             </Button>

//             <Button
//               variant="outlined"
//               startIcon={<PictureAsPdf />}
//               sx={{
//                 color: '#ef4444',
//                 borderColor: 'rgba(239, 68, 68, 0.3)',
//                 borderRadius: 2,
//                 py: 1.5,
//                 '&:hover': {
//                   borderColor: '#ef4444',
//                   backgroundColor: 'rgba(239, 68, 68, 0.08)'
//                 }
//               }}
//             >
//               Exportar PDF
//             </Button>

//             <Button
//               variant="outlined"
//               startIcon={<Share />}
//               sx={{
//                 color: '#10b981',
//                 borderColor: 'rgba(16, 185, 129, 0.3)',
//                 borderRadius: 2,
//                 py: 1.5,
//                 '&:hover': {
//                   borderColor: '#10b981',
//                   backgroundColor: 'rgba(16, 185, 129, 0.08)'
//                 }
//               }}
//             >
//               Compartir
//             </Button>
//           </Box>
//         </Card>
//       </Box>
//     </DashboardLayout>
//   );
// }