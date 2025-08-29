// // import { useEffect } from 'react';
// // import {
// //   Container,
// //   Typography,
// //   Button,
// //   Box,
// //   Card,
// //   CardContent
// // } from '@mui/material';
// // import { useAppSelector, useAppDispatch } from '../store/hooks';
// // import { logout } from '../store/features/authSlice';
// // import { useRouter } from 'next/router';

// // export default function Dashboard() {
// //   const { user } = useAppSelector((state) => state.auth);
// //   const dispatch = useAppDispatch();
// //   const router = useRouter();

// //   const handleLogout = () => {
// //     dispatch(logout());
// //     router.push('/');
// //   };

// //   if (!user) {
// //     return null;
// //   }

// //   return (
// //     <Container maxWidth="md" sx={{ mt: 4 }}>
// //       <Box display="flex" justifyContent="space-between" alignItems="center" mb={4}>
// //         <Typography variant="h4" component="h1">
// //           Dashboard
// //         </Typography>
// //         <Button variant="outlined" onClick={handleLogout}>
// //           Logout
// //         </Button>
// //       </Box>

// //       <Card>
// //         <CardContent>
// //           <Typography variant="h6" gutterBottom>
// //             Welcome, {user.name}!
// //           </Typography>
// //           <Typography variant="body1" color="text.secondary">
// //             Email: {user.email}
// //           </Typography>
// //         </CardContent>
// //       </Card>
// //     </Container>
// //   );
// // }



// import { useEffect } from 'react';
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
//   useMediaQuery
// } from '@mui/material';
// import { useAppSelector, useAppDispatch } from '../store/hooks';
// import { logout } from '../store/features/authSlice';
// import { useRouter } from 'next/router';

// export default function Dashboard() {
//   const { user } = useAppSelector((state) => state.auth);
//   const dispatch = useAppDispatch();
//   const router = useRouter();
//   const theme = useTheme();
//   const isMobile = useMediaQuery(theme.breakpoints.down('md'));

//   const handleLogout = () => {
//     dispatch(logout());
//     router.push('/');
//   };

//   useEffect(() => {
//     if (!user) {
//       router.push('/');
//     }
//   }, [user, router]);

//   if (!user) {
//     return null;
//   }

//   return (
//     <Box sx={{ backgroundColor: '#000', minHeight: '100vh' }}>
//       <AppBar
//         position="static"
//         elevation={0}
//         sx={{
//           backgroundColor: 'transparent',
//           color: '#fff',
//           borderBottom: '1px solid rgba(255, 255, 255, 0.1)'
//         }}
//       >
//         <Toolbar>
//           <Typography
//             variant="h6"
//             component="div"
//             sx={{
//               flexGrow: 1,
//               fontWeight: 300,
//               color: '#fff'
//             }}
//           >
//             My App
//           </Typography>
//           <Button
//             variant="outlined"
//             onClick={handleLogout}
//             sx={{
//               color: '#00ffc8',
//               borderColor: 'rgba(0, 255, 200, 0.5)',
//               '&:hover': {
//                 borderColor: '#00ffc8',
//                 backgroundColor: 'rgba(0, 255, 200, 0.1)'
//               }
//             }}
//           >
//             Logout
//           </Button>
//         </Toolbar>
//       </AppBar>

//       <Container maxWidth="lg" sx={{ py: 4 }}>
//         <Box sx={{ mb: 4, textAlign: 'center' }}>
//           <Typography
//             variant="h3"
//             component="h1"
//             sx={{
//               background: 'linear-gradient(45deg, #00ffc8 30%, #00b8a9 90%)',
//               backgroundClip: 'text',
//               textFillColor: 'transparent',
//               WebkitBackgroundClip: 'text',
//               WebkitTextFillColor: 'transparent',
//               fontWeight: 700,
//               mb: 2
//             }}
//           >
//             Dashboard
//           </Typography>
//           <Typography variant="h6" color="rgba(255, 255, 255, 0.7)">
//             Welcome to your personal space
//           </Typography>
//         </Box>

//         <Box sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' }, gap: 3 }}>
//           {/* Información del usuario */}
//           <Card
//             sx={{
//               flex: 1,
//               backgroundColor: 'rgba(18, 18, 18, 0.9)',
//               border: '1px solid rgba(255, 255, 255, 0.1)',
//               borderRadius: 2,
//               backdropFilter: 'blur(10px)',
//               boxShadow: '0 8px 32px rgba(0, 255, 200, 0.1)',
//               transition: 'transform 0.3s ease, box-shadow 0.3s ease',
//               '&:hover': {
//                 transform: 'translateY(-5px)',
//                 boxShadow: '0 12px 40px rgba(0, 255, 200, 0.2)'
//               }
//             }}
//           >
//             <CardContent sx={{ p: 4 }}>
//               <Typography
//                 variant="h5"
//                 gutterBottom
//                 sx={{
//                   color: '#00ffc8',
//                   mb: 3,
//                   display: 'flex',
//                   alignItems: 'center',
//                   gap: 1
//                 }}
//               >
//                 👋 Welcome, {user.name}!
//               </Typography>

//               <Box sx={{ mb: 2 }}>
//                 <Typography variant="overline" color="rgba(255, 255, 255, 0.5)">
//                   Email Address
//                 </Typography>
//                 <Typography variant="body1" color="rgba(255, 255, 255, 0.9)">
//                   {user.email}
//                 </Typography>
//               </Box>

//               <Box sx={{ mb: 2 }}>
//                 <Typography variant="overline" color="rgba(255, 255, 255, 0.5)">
//                   Member Since
//                 </Typography>
//                 <Typography variant="body1" color="rgba(255, 255, 255, 0.9)">
//                   {new Date().toLocaleDateString()}
//                 </Typography>
//               </Box>
//             </CardContent>
//           </Card>

//           {/* Estadísticas o información adicional */}
//           <Card
//             sx={{
//               flex: 1,
//               backgroundColor: 'rgba(18, 18, 18, 0.9)',
//               border: '1px solid rgba(255, 255, 255, 0.1)',
//               borderRadius: 2,
//               backdropFilter: 'blur(10px)',
//               boxShadow: '0 8px 32px rgba(0, 100, 255, 0.1)',
//               transition: 'transform 0.3s ease, box-shadow 0.3s ease',
//               '&:hover': {
//                 transform: 'translateY(-5px)',
//                 boxShadow: '0 12px 40px rgba(0, 100, 255, 0.2)'
//               }
//             }}
//           >
//             <CardContent sx={{ p: 4 }}>
//               <Typography
//                 variant="h5"
//                 gutterBottom
//                 sx={{
//                   color: '#0064ff',
//                   mb: 3
//                 }}
//               >
//                 📊 Your Stats
//               </Typography>

//               <Box sx={{ display: 'flex', justifyContent: 'space-around', textAlign: 'center' }}>
//                 <Box>
//                   <Typography variant="h4" color="#00ffc8">
//                     0
//                   </Typography>
//                   <Typography variant="body2" color="rgba(255, 255, 255, 0.7)">
//                     Projects
//                   </Typography>
//                 </Box>

//                 <Box>
//                   <Typography variant="h4" color="#00ffc8">
//                     0
//                   </Typography>
//                   <Typography variant="body2" color="rgba(255, 255, 255, 0.7)">
//                     Tasks
//                   </Typography>
//                 </Box>

//                 <Box>
//                   <Typography variant="h4" color="#00ffc8">
//                     0
//                   </Typography>
//                   <Typography variant="body2" color="rgba(255, 255, 255, 0.7)">
//                     Achievements
//                   </Typography>
//                 </Box>
//               </Box>
//             </CardContent>
//           </Card>
//         </Box>

//         {/* Sección de acciones rápidas */}
//         <Box sx={{ mt: 4 }}>
//           <Typography
//             variant="h5"
//             sx={{
//               color: 'rgba(255, 255, 255, 0.9)',
//               mb: 3,
//               textAlign: 'center'
//             }}
//           >
//             Quick Actions
//           </Typography>

//           <Box sx={{ display: 'flex', justifyContent: 'center', gap: 2, flexWrap: 'wrap' }}>
//             <Button
//               variant="outlined"
//               sx={{
//                 color: '#00ffc8',
//                 borderColor: 'rgba(0, 255, 200, 0.5)',
//                 '&:hover': {
//                   borderColor: '#00ffc8',
//                   backgroundColor: 'rgba(0, 255, 200, 0.1)'
//                 }
//               }}
//             >
//               Edit Profile
//             </Button>

//             <Button
//               variant="outlined"
//               sx={{
//                 color: '#0064ff',
//                 borderColor: 'rgba(0, 100, 255, 0.5)',
//                 '&:hover': {
//                   borderColor: '#0064ff',
//                   backgroundColor: 'rgba(0, 100, 255, 0.1)'
//                 }
//               }}
//             >
//               Create Project
//             </Button>

//             <Button
//               variant="outlined"
//               sx={{
//                 color: '#ff00aa',
//                 borderColor: 'rgba(255, 0, 170, 0.5)',
//                 '&:hover': {
//                   borderColor: '#ff00aa',
//                   backgroundColor: 'rgba(255, 0, 170, 0.1)'
//                 }
//               }}
//             >
//               Settings
//             </Button>
//           </Box>
//         </Box>
//       </Container>
//     </Box>
//   );
// }


import { useEffect, useState } from 'react';
import {
  Container,
  Typography,
  Button,
  Box,
  Card,
  CardContent,
  AppBar,
  Toolbar,
  useTheme,
  useMediaQuery,
  IconButton,
  Divider,
  Chip,
  Avatar,
  alpha
} from '@mui/material';
import {
  LogoutRounded,
  SettingsRounded,
  EditRounded,
  AddRounded,
  DashboardRounded,
  NotificationsRounded,
  AccountCircleRounded,
  AnalyticsRounded,
  TaskRounded,
  TrendingUpRounded
} from '@mui/icons-material';
import { useAppSelector, useAppDispatch } from '../store/hooks';
import { logout } from '../store/features/authSlice';
import { useRouter } from 'next/router';

export default function Dashboard() {
  const { user } = useAppSelector((state) => state.auth);
  const dispatch = useAppDispatch();
  const router = useRouter();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  const handleLogout = () => {
    dispatch(logout());
    router.push('/');
  };

  useEffect(() => {
    if (!user) {
      router.push('/');
    }
  }, [user, router]);

  if (!user) {
    return null;
  }

  return (
    <Box sx={{ 
      backgroundColor: '#0A0A0F', 
      minHeight: '100vh',
      backgroundImage: 'radial-gradient(circle at 15% 50%, rgba(28, 28, 50, 0.4) 0%, transparent 40%), radial-gradient(circle at 85% 30%, rgba(38, 38, 60, 0.3) 0%, transparent 40%)'
    }}>
      <AppBar
        position="static"
        elevation={0}
        sx={{
          backgroundColor: 'rgba(10, 10, 15, 0.8)',
          color: '#fff',
          borderBottom: '1px solid rgba(255, 255, 255, 0.08)',
          backdropFilter: 'blur(10px)'
        }}
      >
        <Toolbar sx={{ px: { xs: 2, md: 4 } }}>
          <Box sx={{ display: 'flex', alignItems: 'center', flexGrow: 1 }}>
            <DashboardRounded sx={{ mr: 1.5, color: '#7C4DFF' }} />
            <Typography
              variant="h6"
              component="div"
              sx={{
                fontWeight: 600,
                background: 'linear-gradient(45deg, #7C4DFF 30%, #448AFF 90%)',
                backgroundClip: 'text',
                textFillColor: 'transparent',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
              }}
            >
              ELEGANCE
            </Typography>
          </Box>
          
          <IconButton sx={{ color: 'rgba(255, 255, 255, 0.7)', mr: 1 }}>
            <NotificationsRounded />
          </IconButton>
          
          <Button
            variant="outlined"
            onClick={handleLogout}
            startIcon={<LogoutRounded />}
            sx={{
              color: 'rgba(124, 77, 255, 0.9)',
              borderColor: 'rgba(124, 77, 255, 0.3)',
              borderRadius: 2,
              px: 2,
              py: 0.8,
              '&:hover': {
                borderColor: '#7C4DFF',
                backgroundColor: 'rgba(124, 77, 255, 0.08)'
              }
            }}
          >
            Logout
          </Button>
        </Toolbar>
      </AppBar>

      <Container maxWidth="lg" sx={{ py: 5 }}>
        <Box sx={{ mb: 6, textAlign: 'center' }}>
          <Typography
            variant="h3"
            component="h1"
            sx={{
              background: 'linear-gradient(45deg, #7C4DFF 20%, #448AFF 80%)',
              backgroundClip: 'text',
              textFillColor: 'transparent',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              fontWeight: 700,
              mb: 1.5,
              letterSpacing: '-0.5px'
            }}
          >
            Welcome back, {user.name}
          </Typography>
          <Typography variant="h6" color="rgba(255, 255, 255, 0.6)" fontWeight="400">
            Here's what's happening with your projects today
          </Typography>
        </Box>

        <Box sx={{ 
          display: 'flex', 
          flexDirection: { xs: 'column', md: 'row' }, 
          gap: 3, 
          mb: 4 
        }}>
          {/* Información del usuario */}
          <Card
            sx={{
              flex: 1,
              backgroundColor: 'rgba(18, 18, 26, 0.7)',
              border: '1px solid rgba(255, 255, 255, 0.09)',
              borderRadius: 3,
              backdropFilter: 'blur(12px)',
              boxShadow: '0 10px 30px rgba(0, 0, 0, 0.2)',
              transition: 'all 0.3s ease',
              backgroundImage: 'linear-gradient(rgba(255, 255, 255, 0.03), rgba(255, 255, 255, 0.03))',
              '&:hover': {
                transform: 'translateY(-5px)',
                boxShadow: '0 15px 35px rgba(124, 77, 255, 0.1)'
              }
            }}
          >
            <CardContent sx={{ p: 4 }}>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
                <Avatar
                  sx={{
                    width: 60,
                    height: 60,
                    bgcolor: 'rgba(124, 77, 255, 0.15)',
                    color: '#7C4DFF',
                    fontWeight: 600,
                    mr: 2.5
                  }}
                >
                  {user.name.charAt(0).toUpperCase()}
                </Avatar>
                <Box>
                  <Typography variant="h6" color="rgba(255, 255, 255, 0.95)" fontWeight="600">
                    {user.name}
                  </Typography>
                  <Chip 
                    label="Premium Member" 
                    size="small" 
                    sx={{ 
                      bgcolor: 'rgba(124, 77, 255, 0.15)', 
                      color: '#7C4DFF', 
                      fontSize: '0.7rem',
                      height: 22,
                      mt: 0.5
                    }} 
                  />
                </Box>
              </Box>

              <Divider sx={{ borderColor: 'rgba(255, 255, 255, 0.08)', my: 3 }} />

              <Box sx={{ 
                display: 'flex', 
                flexWrap: 'wrap',
                justifyContent: 'space-between',
                gap: 2
              }}>
                <Box sx={{ width: { xs: '100%', sm: '45%' } }}>
                  <Typography variant="overline" color="rgba(255, 255, 255, 0.5)" fontSize="0.7rem">
                    Email Address
                  </Typography>
                  <Typography variant="body2" color="rgba(255, 255, 255, 0.9)" sx={{ wordBreak: 'break-all' }}>
                    {user.email}
                  </Typography>
                </Box>

                <Box sx={{ width: { xs: '100%', sm: '45%' } }}>
                  <Typography variant="overline" color="rgba(255, 255, 255, 0.5)" fontSize="0.7rem">
                    Member Since
                  </Typography>
                  <Typography variant="body2" color="rgba(255, 255, 255, 0.9)">
                    {new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
                  </Typography>
                </Box>

                <Box sx={{ width: { xs: '100%', sm: '45%' } }}>
                  <Typography variant="overline" color="rgba(255, 255, 255, 0.5)" fontSize="0.7rem">
                    Account Status
                  </Typography>
                  <Typography variant="body2" color="rgba(255, 255, 255, 0.9)">
                    Verified
                  </Typography>
                </Box>

                <Box sx={{ width: { xs: '100%', sm: '45%' } }}>
                  <Typography variant="overline" color="rgba(255, 255, 255, 0.5)" fontSize="0.7rem">
                    User ID
                  </Typography>
                  <Typography variant="body2" color="rgba(255, 255, 255, 0.7)" sx={{ fontFamily: 'monospace' }}>
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
                  color: 'rgba(255, 255, 255, 0.8)',
                  borderColor: 'rgba(255, 255, 255, 0.2)',
                  py: 1.2,
                  '&:hover': {
                    borderColor: 'rgba(255, 255, 255, 0.4)',
                    backgroundColor: 'rgba(255, 255, 255, 0.05)'
                  }
                }}
              >
                Edit Profile
              </Button>
            </CardContent>
          </Card>

          {/* Estadísticas */}
          <Card
            sx={{
              flex: 1,
              backgroundColor: 'rgba(18, 18, 26, 0.7)',
              border: '1px solid rgba(255, 255, 255, 0.09)',
              borderRadius: 3,
              backdropFilter: 'blur(12px)',
              boxShadow: '0 10px 30px rgba(0, 0, 0, 0.2)',
              transition: 'all 0.3s ease',
              backgroundImage: 'linear-gradient(rgba(255, 255, 255, 0.03), rgba(255, 255, 255, 0.03))',
              '&:hover': {
                transform: 'translateY(-5px)',
                boxShadow: '0 15px 35px rgba(68, 138, 255, 0.1)'
              }
            }}
          >
            <CardContent sx={{ p: 4 }}>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
                <Box sx={{ 
                  width: 42, 
                  height: 42, 
                  borderRadius: 2, 
                  bgcolor: 'rgba(68, 138, 255, 0.15)', 
                  display: 'flex', 
                  alignItems: 'center', 
                  justifyContent: 'center',
                  mr: 2
                }}>
                  <AnalyticsRounded sx={{ color: '#448AFF' }} />
                </Box>
                <Typography variant="h6" color="rgba(255, 255, 255, 0.95)" fontWeight="600">
                  Performance Overview
                </Typography>
              </Box>

              <Divider sx={{ borderColor: 'rgba(255, 255, 255, 0.08)', my: 3 }} />

              <Box sx={{ 
                display: 'flex', 
                flexDirection: { xs: 'column', sm: 'row' },
                justifyContent: 'space-between',
                gap: 3,
                textAlign: 'center'
              }}>
                <Box sx={{ 
                  flex: 1,
                  bgcolor: 'rgba(124, 77, 255, 0.08)', 
                  borderRadius: 3, 
                  py: 2.5,
                  border: '1px solid rgba(124, 77, 255, 0.12)'
                }}>
                  <Typography variant="h4" color="#7C4DFF" fontWeight="700">
                    12
                  </Typography>
                  <Typography variant="body2" color="rgba(255, 255, 255, 0.7)" sx={{ mt: 0.5 }}>
                    Projects
                  </Typography>
                </Box>

                <Box sx={{ 
                  flex: 1,
                  bgcolor: 'rgba(68, 138, 255, 0.08)', 
                  borderRadius: 3, 
                  py: 2.5,
                  border: '1px solid rgba(68, 138, 255, 0.12)'
                }}>
                  <Typography variant="h4" color="#448AFF" fontWeight="700">
                    47
                  </Typography>
                  <Typography variant="body2" color="rgba(255, 255, 255, 0.7)" sx={{ mt: 0.5 }}>
                    Tasks
                  </Typography>
                </Box>

                <Box sx={{ 
                  flex: 1,
                  bgcolor: 'rgba(255, 100, 150, 0.08)', 
                  borderRadius: 3, 
                  py: 2.5,
                  border: '1px solid rgba(255, 100, 150, 0.12)'
                }}>
                  <Typography variant="h4" color="#FF6496" fontWeight="700">
                    9
                  </Typography>
                  <Typography variant="body2" color="rgba(255, 255, 255, 0.7)" sx={{ mt: 0.5 }}>
                    Completed
                  </Typography>
                </Box>
              </Box>

              <Box sx={{ mt: 3, display: 'flex', justifyContent: 'center' }}>
                <Chip 
                  icon={<TrendingUpRounded />}
                  label="+12% from last month" 
                  size="small" 
                  sx={{ 
                    bgcolor: 'rgba(124, 77, 255, 0.15)', 
                    color: '#7C4DFF', 
                    fontSize: '0.75rem',
                  }} 
                />
              </Box>
            </CardContent>
          </Card>
        </Box>

        {/* Sección de acciones rápidas */}
        <Box sx={{ mt: 6 }}>
          <Typography
            variant="h5"
            sx={{
              color: 'rgba(255, 255, 255, 0.9)',
              mb: 3.5,
              fontWeight: 600,
              display: 'flex',
              alignItems: 'center'
            }}
          >
            Quick Actions
            <Chip 
              label="4" 
              size="small" 
              sx={{ 
                bgcolor: 'rgba(124, 77, 255, 0.15)', 
                color: '#7C4DFF', 
                ml: 1.5,
                height: 22,
                fontSize: '0.7rem'
              }} 
            />
          </Typography>

          <Box sx={{ 
            display: 'flex', 
            flexDirection: { xs: 'column', sm: 'row' },
            flexWrap: 'wrap',
            gap: 2
          }}>
            <Button
              variant="outlined"
              startIcon={<AddRounded />}
              sx={{
                flex: { xs: '1 1 100%', sm: '1 1 45%', md: '1' },
                color: '#7C4DFF',
                borderColor: 'rgba(124, 77, 255, 0.3)',
                borderRadius: 2,
                py: 1.8,
                '&:hover': {
                  borderColor: '#7C4DFF',
                  backgroundColor: 'rgba(124, 77, 255, 0.08)'
                }
              }}
            >
              New Project
            </Button>

            <Button
              variant="outlined"
              startIcon={<EditRounded />}
              sx={{
                flex: { xs: '1 1 100%', sm: '1 1 45%', md: '1' },
                color: '#448AFF',
                borderColor: 'rgba(68, 138, 255, 0.3)',
                borderRadius: 2,
                py: 1.8,
                '&:hover': {
                  borderColor: '#448AFF',
                  backgroundColor: 'rgba(68, 138, 255, 0.08)'
                }
              }}
            >
              Edit Profile
            </Button>

            <Button
              variant="outlined"
              startIcon={<SettingsRounded />}
              sx={{
                flex: { xs: '1 1 100%', sm: '1 1 45%', md: '1' },
                color: '#FF6496',
                borderColor: 'rgba(255, 100, 150, 0.3)',
                borderRadius: 2,
                py: 1.8,
                '&:hover': {
                  borderColor: '#FF6496',
                  backgroundColor: 'rgba(255, 100, 150, 0.08)'
                }
              }}
            >
              Settings
            </Button>

            <Button
              variant="outlined"
              startIcon={<DashboardRounded />}
              sx={{
                flex: { xs: '1 1 100%', sm: '1 1 45%', md: '1' },
                color: '#FFC107',
                borderColor: 'rgba(255, 193, 7, 0.3)',
                borderRadius: 2,
                py: 1.8,
                '&:hover': {
                  borderColor: '#FFC107',
                  backgroundColor: 'rgba(255, 193, 7, 0.08)'
                }
              }}
            >
              Templates
            </Button>
          </Box>
        </Box>

        {/* Recent Activity Section */}
        <Box sx={{ mt: 6 }}>
          <Typography
            variant="h5"
            sx={{
              color: 'rgba(255, 255, 255, 0.9)',
              mb: 3,
              fontWeight: 600
            }}
          >
            Recent Activity
          </Typography>
          
          <Box sx={{ 
            display: 'flex', 
            flexDirection: { xs: 'column', md: 'row' },
            gap: 3
          }}>
            <Card sx={{ 
              flex: 1, 
              backgroundColor: 'rgba(18, 18, 26, 0.5)',
              border: '1px solid rgba(124, 77, 255, 0.1)',
              borderRadius: 3,
              p: 3
            }}>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <AccountCircleRounded sx={{ color: '#7C4DFF', mr: 1.5 }} />
                <Typography variant="h6" color="rgba(255, 255, 255, 0.9)">
                  Profile Updated
                </Typography>
              </Box>
              <Typography variant="body2" color="rgba(255, 255, 255, 0.7)">
                You updated your profile information
              </Typography>
              <Typography variant="caption" color="rgba(255, 255, 255, 0.5)">
                2 hours ago
              </Typography>
            </Card>
            
            <Card sx={{ 
              flex: 1, 
              backgroundColor: 'rgba(18, 18, 26, 0.5)',
              border: '1px solid rgba(68, 138, 255, 0.1)',
              borderRadius: 3,
              p: 3
            }}>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <TaskRounded sx={{ color: '#448AFF', mr: 1.5 }} />
                <Typography variant="h6" color="rgba(255, 255, 255, 0.9)">
                Task Completed
                </Typography>
              </Box>
              <Typography variant="body2" color="rgba(255, 255, 255, 0.7)">
                You completed "Design new dashboard"
              </Typography>
              <Typography variant="caption" color="rgba(255, 255, 255, 0.5)">
                1 day ago
              </Typography>
            </Card>
          </Box>
        </Box>
      </Container>
    </Box>
  );
}