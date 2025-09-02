import { RootState } from "@/store/store";
import { useTheme } from "@emotion/react";
import { useMediaQuery, Box, AppBar, Toolbar, Typography, Container, Paper, Tabs, Tab } from "@mui/material";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import LoginForm from "../LoginForm";
import RegisterForm from "../RegisterForm";
import { TabPanel } from "../TabPanel/TabPanel";
import { a11yProps } from "../a11yProps/A11yProps";

export const AuthTabs: React.FC = () => {
  const [tabValue, setTabValue] = useState(0);
  const { isAuthenticated } = useSelector((state: RootState) => state.auth);
  const router = useRouter();
  const theme = useTheme();
  
  const isMobile = useMediaQuery('(max-width:900px)'); // md breakpoint is typically 900px

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