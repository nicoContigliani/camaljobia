// // import { useState } from 'react';
// // import {
// //   Paper,
// //   Tabs,
// //   Tab,
// //   Box,
// //   Typography,
// //   AppBar,
// //   Toolbar,
// //   useTheme,
// //   useMediaQuery
// // } from '@mui/material';
// // import LoginForm from '../components/LoginForm';
// // import RegisterForm from '../components/RegisterForm';
// // import { useAppSelector } from '../store/hooks';
// // import { useRouter } from 'next/router';
// // import { useEffect } from 'react';

// // interface TabPanelProps {
// //   children?: React.ReactNode;
// //   index: number;
// //   value: number;
// // }

// // function TabPanel(props: TabPanelProps) {
// //   const { children, value, index, ...other } = props;

// //   return (
// //     <div
// //       role="tabpanel"
// //       hidden={value !== index}
// //       id={`auth-tabpanel-${index}`}
// //       aria-labelledby={`auth-tab-${index}`}
// //       {...other}
// //     >
// //       {value === index && (
// //         <Box sx={{ p: 3 }}>
// //           {children}
// //         </Box>
// //       )}
// //     </div>
// //   );
// // }

// // function a11yProps(index: number) {
// //   return {
// //     id: `auth-tab-${index}`,
// //     'aria-controls': `auth-tabpanel-${index}`,
// //   };
// // }

// // export default function Home() {
// //   const [tabValue, setTabValue] = useState(0);
// //   const { isAuthenticated } = useAppSelector((state) => state.auth);
// //   const router = useRouter();
// //   const theme = useTheme();
// //   const isMobile = useMediaQuery(theme.breakpoints.down('md'));

// //   const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
// //     setTabValue(newValue);
// //   };

// //   useEffect(() => {
// //     if (isAuthenticated) {
// //       router.push('/dashboard');
// //     }
// //   }, [isAuthenticated, router]);

// //   if (isAuthenticated) {
// //     return null;
// //   }

// //   return (
// //     <Box sx={{ backgroundColor: '#000', minHeight: '100vh' }}>
// //       <AppBar 
// //         position="static" 
// //         elevation={0} 
// //         sx={{ 
// //           backgroundColor: 'transparent',
// //           color: '#fff'
// //         }}
// //       >
// //         <Toolbar>
// //           <Typography 
// //             variant="h6" 
// //             component="div" 
// //             sx={{ 
// //               flexGrow: 1, 
// //               fontWeight: 300,
// //               color: '#fff'
// //             }}
// //           >
// //             CamalJob IA
// //           </Typography>
// //         </Toolbar>
// //       </AppBar>

// //       <Box sx={{ 
// //         display: 'flex', 
// //         minHeight: 'calc(100vh - 64px)',
// //         flexDirection: { xs: 'column', md: 'row' }
// //       }}>
// //         {/* Sección del camaleón */}
// //         {!isMobile && (
// //           <Box sx={{ 
// //             flex: 1, 
// //             display: 'flex', 
// //             alignItems: 'center', 
// //             justifyContent: 'center',
// //             // backgroundColor: 'rgba(30, 30, 30, 0.337)',
// //             position: 'relative',
// //             overflow: 'hidden'
// //           }}>
// //             <Box
// //               component="img"
// //               src="/los-colores-brillantes-del-neon-brillan-en-el-camaleon-salvaje.jpg"
// //               alt="Chameleon"

// //               sx={{ 
// //                 width: '90%', 
// //                 maxWidth: 500,
// //                 borderRadius: 2,
// //                 boxShadow: '0 0 30px rgba(0, 255, 200, 0.533)',
// //                 transition: 'transform 0.3s ease',
// //                 objectFit: 'cover',
// //                 '&:hover': {
// //                   transform: 'scale(1.02)'
// //                 }

// //               }}
// //             />
// //             <Box 
// //               sx={{
// //                 position: 'absolute',
// //                 top: 0,
// //                 left: 0,
// //                 right: 0,
// //                 bottom: 0,
// //                 // background: 'linear-gradient(45deg, rgba(0,255,200,0.1) 0%, rgba(0,100,255,0.1) 100%)',
// //                 zIndex: 0
// //               }}
// //             />
// //           </Box>
// //         )}

// //         {/* Sección del formulario */}
// //         <Box sx={{ 
// //           flex: 1, 
// //           display: 'flex', 
// //           alignItems: 'center', 
// //           justifyContent: 'center',
// //           p: 3,
// //           backgroundColor: '#000'
// //         }}>
// //           <Paper 
// //             elevation={8} 
// //             sx={{ 
// //               maxWidth: 450, 
// //               width: '100%', 
// //               backgroundColor: 'rgba(18, 18, 18, 0.9)',
// //               border: '1px solid',
// //               borderColor: 'rgba(255, 255, 255, 0.1)',
// //               borderRadius: 2,
// //               backdropFilter: 'blur(10px)',
// //               boxShadow: '0 8px 32px rgba(0, 255, 200, 0.1)'
// //             }}
// //           >
// //             <Tabs
// //               value={tabValue}
// //               onChange={handleTabChange}
// //               aria-label="auth tabs"
// //               variant="fullWidth"
// //               sx={{ 
// //                 borderBottom: '1px solid',
// //                 borderColor: 'rgba(255, 255, 255, 0.1)',
// //                 '& .MuiTab-root': {
// //                   color: 'rgba(255, 255, 255, 0.7)',
// //                   fontWeight: 400,
// //                   '&.Mui-selected': {
// //                     color: '#00ffc8'
// //                   }
// //                 },
// //                 '& .MuiTabs-indicator': {
// //                   backgroundColor: '#00ffc81b'
// //                 }
// //               }}
// //             >
// //               <Tab label="Login" {...a11yProps(0)} />
// //               <Tab label="Register" {...a11yProps(1)} />
// //             </Tabs>

// //             <TabPanel value={tabValue} index={0}>
// //               <LoginForm />
// //             </TabPanel>

// //             <TabPanel value={tabValue} index={1}>
// //               <RegisterForm />
// //             </TabPanel>
// //           </Paper>
// //         </Box>
// //       </Box>
// //     </Box>
// //   );
// // }



// import { useState, useEffect } from 'react';
// import {
//   Paper,
//   Tabs,
//   Tab,
//   Box,
//   Typography,
//   AppBar,
//   Toolbar,
//   useTheme,
//   useMediaQuery,
//   Container,
//   alpha
// } from '@mui/material';
// import LoginForm from '../components/LoginForm';
// import RegisterForm from '../components/RegisterForm';
// import { useAppSelector } from '../store/hooks';
// import { useRouter } from 'next/router';

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
//       id={`auth-tabpanel-${index}`}
//       aria-labelledby={`auth-tab-${index}`}
//       {...other}
//     >
//       {value === index && (
//         <Box sx={{ p: 3 }}>
//           {children}
//         </Box>
//       )}
//     </div>
//   );
// }

// function a11yProps(index: number) {
//   return {
//     id: `auth-tab-${index}`,
//     'aria-controls': `auth-tabpanel-${index}`,
//   };
// }

// export default function Home() {
//   const [tabValue, setTabValue] = useState(0);
//   const { isAuthenticated } = useAppSelector((state) => state.auth);
//   const router = useRouter();
//   const theme = useTheme();
//   const isMobile = useMediaQuery(theme.breakpoints.down('md'));

//   const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
//     setTabValue(newValue);
//   };

//   useEffect(() => {
//     if (isAuthenticated) {
//       router.push('/dashboard');
//     }
//   }, [isAuthenticated, router]);

//   if (isAuthenticated) {
//     return null;
//   }

//   return (
//     <Box sx={{
//       backgroundColor: '#fafafa',
//       minHeight: '100vh',
//       backgroundImage: 'linear-gradient(120deg, #fdfbfb 0%, #ebedee 100%)'
//     }}>
//       <AppBar
//         position="static"
//         elevation={0}
//         sx={{
//           backgroundColor: 'transparent',
//           color: '#333',
//           boxShadow: 'none'
//         }}
//       >
//         <Toolbar>
//           <Typography
//             variant="h4"
//             component="div"
//             sx={{
//               flexGrow: 1,
//               fontWeight: 600,
//               color: '#2d2d2d',
//               pt: 2,
//               pl: { xs: 2, md: 4 }
//             }}
//           >
//             CamalJob
//             <Box component="span" sx={{ color: '#6C63FF', fontWeight: 700 }}>IA</Box>
//           </Typography>
//         </Toolbar>
//       </AppBar>

//       <Container maxWidth="lg" sx={{ py: 4 }}>
//         <Box sx={{
//           display: 'flex',
//           minHeight: '80vh',
//           flexDirection: { xs: 'column', md: 'row' },
//           borderRadius: 4,
//           overflow: 'hidden',
//           boxShadow: '0 20px 40px rgba(0,0,0,0.07)'
//         }}>
//           {/* Sección de imagen/ilustración */}
//           {!isMobile && (
//             <Box sx={{
//               flex: 1,
//               display: 'flex',
//               alignItems: 'center',
//               justifyContent: 'center',
//               backgroundColor: '#6b63ff1d',
//               background: 'linear-gradient(135deg, #6C63FF 0%, #4a43c2 100%)',
//               position: 'relative',
//               overflow: 'hidden',
//               p: 4
//             }}>
//               <Box
//                 component="img"
//                 src="/los-colores-brillantes-del-neon-brillan-en-el-camaleon-salvaje.jpg"
//                 alt="Chameleon"
//                 sx={{
//                   width: '100%',
//                   maxWidth: 400,
//                   borderRadius: 2,
//                   boxShadow: '0 15px 35px rgba(0,0,0,0.2)',
//                   transition: 'transform 0.4s ease',
//                   objectFit: 'cover',
//                   '&:hover': {
//                     transform: 'scale(1.03)'
//                   }
//                 }}
//               />
//               <Box sx={{
//                 position: 'absolute',
//                 bottom: 40,
//                 left: 40,
//                 color: 'white',
//                 textAlign: 'left',
//                 zIndex: 10
//               }}>
//                 <Typography variant="h4" sx={{ fontWeight: 600, mb: 1 }}>
//                   Bienvenido a CamalJob
//                 </Typography>
//                 <Typography variant="body1" sx={{ opacity: 0.9 }}>
//                   La plataforma inteligente para tu próximo paso profesional
//                 </Typography>
//               </Box>

//               {/* Elementos decorativos */}
//               <Box
//                 sx={{
//                   position: 'absolute',
//                   top: -50,
//                   right: -50,
//                   width: 200,
//                   height: 200,
//                   borderRadius: '50%',
//                   backgroundColor: alpha('#fff', 0.1)
//                 }}
//               />
//               <Box
//                 sx={{
//                   position: 'absolute',
//                   bottom: -80,
//                   left: -80,
//                   width: 250,
//                   height: 250,
//                   borderRadius: '50%',
//                   backgroundColor: alpha('#fff', 0.08)
//                 }}
//               />
//             </Box>
//           )}

//           {/* Sección del formulario */}
//           <Box sx={{
//             flex: 1,
//             display: 'flex',
//             alignItems: 'center',
//             justifyContent: 'center',
//             p: { xs: 2, md: 4 },
//             backgroundColor: '#ffffff'
//           }}>
//             <Paper
//               elevation={0}
//               sx={{
//                 maxWidth: 450,
//                 width: '100%',
//                 backgroundColor: '#ffffff',
//                 border: '1px solid',
//                 borderColor: 'rgba(0, 0, 0, 0.05)',
//                 borderRadius: 3,
//                 overflow: 'hidden',
//                 boxShadow: '0 10px 30px rgba(0,0,0,0.05)'
//               }}
//             >
//               <Box sx={{ px: 3, pt: 4, pb: 1 }}>
//                 <Typography variant="h4" sx={{
//                   fontWeight: 600,
//                   color: '#2d2d2d',
//                   textAlign: 'center',
//                   mb: 1
//                 }}>
//                   {tabValue === 0 ? 'Iniciar Sesión' : 'Crear Cuenta'}
//                 </Typography>
//                 <Typography variant="body2" sx={{
//                   color: 'text.secondary',
//                   textAlign: 'center',
//                   mb: 3
//                 }}>
//                   {tabValue === 0
//                     ? 'Ingresa a tu cuenta para continuar'
//                     : 'Únete a nuestra plataforma hoy mismo'
//                   }
//                 </Typography>
//               </Box>

//               <Tabs
//                 value={tabValue}
//                 onChange={handleTabChange}
//                 aria-label="auth tabs"
//                 variant="fullWidth"
//                 sx={{
//                   borderBottom: '1px solid',
//                   borderColor: 'rgba(0, 0, 0, 0.05)',
//                   '& .MuiTab-root': {
//                     color: 'rgba(0, 0, 0, 0.5)',
//                     fontWeight: 500,
//                     fontSize: '1rem',
//                     textTransform: 'none',
//                     py: 2.5,
//                     '&.Mui-selected': {
//                       color: '#6C63FF'
//                     }
//                   },
//                   '& .MuiTabs-indicator': {
//                     backgroundColor: '#6C63FF',
//                     height: 3
//                   }
//                 }}
//               >
//                 <Tab label="Iniciar Sesión" {...a11yProps(0)} />
//                 <Tab label="Registrarse" {...a11yProps(1)} />
//               </Tabs>

//               <TabPanel value={tabValue} index={0}>
//                 <LoginForm />
//               </TabPanel>

//               <TabPanel value={tabValue} index={1}>
//                 <RegisterForm />
//               </TabPanel>
//             </Paper>
//           </Box>
//         </Box>
//       </Container>
//     </Box>
//   );
// }


import { useState, useEffect } from 'react';
import {
  Paper,
  Tabs,
  Tab,
  Box,
  Typography,
  AppBar,
  Toolbar,
  useTheme,
  useMediaQuery,
  Container,
  alpha
} from '@mui/material';
import LoginForm from '../components/LoginForm';
import RegisterForm from '../components/RegisterForm';
import { useAppSelector } from '../store/hooks';
import { useRouter } from 'next/router';

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
      id={`auth-tabpanel-${index}`}
      aria-labelledby={`auth-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          {children}
        </Box>
      )}
    </div>
  );
}

function a11yProps(index: number) {
  return {
    id: `auth-tab-${index}`,
    'aria-controls': `auth-tabpanel-${index}`,
  };
}

export default function Home() {
  const [tabValue, setTabValue] = useState(0);
  const { isAuthenticated } = useAppSelector((state) => state.auth);
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
              {/* <Box sx={{ 
                position: 'relative', 
                bottom: 40, 
                left: 40, 
                color: '#334155',
                textAlign: 'left',
                pt:25,
                zIndex: 10
              }}>
                <br /><br />
                <Typography variant="h4" sx={{ fontWeight: 600, mb: 1, color: '#1e293b',pt:15 }}>
                  Bienvenido a CamalJob
                </Typography>
                <Typography variant="body1" sx={{ color: '#64748b' }}>
                  La plataforma inteligente para tu próximo paso profesional
                </Typography>
              </Box> */}
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
                <LoginForm />
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
}