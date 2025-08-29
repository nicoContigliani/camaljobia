// import { useState } from 'react';
// import {
//   Container,
//   Paper,
//   Tabs,
//   Tab,
//   Box,
//   Typography,
//   AppBar,
//   Toolbar
// } from '@mui/material';
// import LoginForm from '../components/LoginForm';
// import RegisterForm from '../components/RegisterForm';
// import { useAppSelector } from '../store/hooks';
// import { useRouter } from 'next/router';
// import { useEffect } from 'react';

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
//     <>
//       <AppBar position="static">
//         <Toolbar>
//           <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
//             My App
//           </Typography>
//         </Toolbar>
//       </AppBar>

//       <Container component="main" maxWidth="sm" sx={{ mt: 8 }}>
//         <Paper elevation={3}>
//           <Tabs
//             value={tabValue}
//             onChange={handleTabChange}
//             aria-label="auth tabs"
//             variant="fullWidth"
//           >
//             <Tab label="Login" {...a11yProps(0)} />
//             <Tab label="Register" {...a11yProps(1)} />
//           </Tabs>

//           <TabPanel value={tabValue} index={0}>
//             <LoginForm />
//           </TabPanel>

//           <TabPanel value={tabValue} index={1}>
//             <RegisterForm />
//           </TabPanel>
//         </Paper>
//       </Container>
//     </>
//   );
// }



import { useState } from 'react';
import {
  Paper,
  Tabs,
  Tab,
  Box,
  Typography,
  AppBar,
  Toolbar,
  useTheme,
  useMediaQuery
} from '@mui/material';
import LoginForm from '../components/LoginForm';
import RegisterForm from '../components/RegisterForm';
import { useAppSelector } from '../store/hooks';
import { useRouter } from 'next/router';
import { useEffect } from 'react';

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
    <Box sx={{ backgroundColor: '#000', minHeight: '100vh' }}>
      <AppBar 
        position="static" 
        elevation={0} 
        sx={{ 
          backgroundColor: 'transparent',
          color: '#fff'
        }}
      >
        <Toolbar>
          <Typography 
            variant="h6" 
            component="div" 
            sx={{ 
              flexGrow: 1, 
              fontWeight: 300,
              color: '#fff'
            }}
          >
            My App
          </Typography>
        </Toolbar>
      </AppBar>

      <Box sx={{ 
        display: 'flex', 
        minHeight: 'calc(100vh - 64px)',
        flexDirection: { xs: 'column', md: 'row' }
      }}>
        {/* Sección del camaleón */}
        {!isMobile && (
          <Box sx={{ 
            flex: 1, 
            display: 'flex', 
            alignItems: 'center', 
            justifyContent: 'center',
            // backgroundColor: 'rgba(30, 30, 30, 0.337)',
            position: 'relative',
            overflow: 'hidden'
          }}>
            <Box
              component="img"
              src="/los-colores-brillantes-del-neon-brillan-en-el-camaleon-salvaje.jpg"
              alt="Chameleon"
              
              sx={{ 
                width: '90%', 
                maxWidth: 500,
                borderRadius: 2,
                boxShadow: '0 0 30px rgba(0, 255, 200, 0.533)',
                transition: 'transform 0.3s ease',
                objectFit: 'cover',
                '&:hover': {
                  transform: 'scale(1.02)'
                }
                
              }}
            />
            <Box 
              sx={{
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                // background: 'linear-gradient(45deg, rgba(0,255,200,0.1) 0%, rgba(0,100,255,0.1) 100%)',
                zIndex: 0
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
          p: 3,
          backgroundColor: '#000'
        }}>
          <Paper 
            elevation={8} 
            sx={{ 
              maxWidth: 450, 
              width: '100%', 
              backgroundColor: 'rgba(18, 18, 18, 0.9)',
              border: '1px solid',
              borderColor: 'rgba(255, 255, 255, 0.1)',
              borderRadius: 2,
              backdropFilter: 'blur(10px)',
              boxShadow: '0 8px 32px rgba(0, 255, 200, 0.1)'
            }}
          >
            <Tabs
              value={tabValue}
              onChange={handleTabChange}
              aria-label="auth tabs"
              variant="fullWidth"
              sx={{ 
                borderBottom: '1px solid',
                borderColor: 'rgba(255, 255, 255, 0.1)',
                '& .MuiTab-root': {
                  color: 'rgba(255, 255, 255, 0.7)',
                  fontWeight: 400,
                  '&.Mui-selected': {
                    color: '#00ffc8'
                  }
                },
                '& .MuiTabs-indicator': {
                  backgroundColor: '#00ffc81b'
                }
              }}
            >
              <Tab label="Login" {...a11yProps(0)} />
              <Tab label="Register" {...a11yProps(1)} />
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
    </Box>
  );
}