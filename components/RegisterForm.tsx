// // // import { useState } from 'react';
// // // import {
// // //   TextField,
// // //   Button,
// // //   Box,
// // //   Alert,
// // //   CircularProgress,
// // //   IconButton,
// // //   InputAdornment
// // // } from '@mui/material';
// // // import Visibility from '@mui/icons-material/Visibility';
// // // import VisibilityOff from '@mui/icons-material/VisibilityOff';
// // // import { useAppDispatch, useAppSelector } from '../store/hooks';
// // // import { registerUser, clearError } from '../store/features/authSlice';
// // // import { useRouter } from 'next/router';

// // // export default function RegisterForm() {
// // //   const [formData, setFormData] = useState({
// // //     name: '',
// // //     email: '',
// // //     password: '',
// // //     confirmPassword: '',
// // //     showPassword: false,
// // //     showConfirmPassword: false
// // //   });
// // //   const [validationError, setValidationError] = useState('');

// // //   const dispatch = useAppDispatch();
// // //   const { loading, error } = useAppSelector((state) => state.auth);
// // //   const router = useRouter();

// // //   const handleSubmit = (e: React.FormEvent) => {
// // //     e.preventDefault();
    
// // //     if (formData.password !== formData.confirmPassword) {
// // //       setValidationError('Passwords do not match');
// // //       return;
// // //     }

// // //     setValidationError('');
// // //     dispatch(clearError());

// // //     dispatch(registerUser({
// // //       email: formData.email,
// // //       password: formData.password,
// // //       name: formData.name
// // //     }))
// // //       .unwrap()
// // //       .then(() => {
// // //         router.push('/dashboard');
// // //       });
// // //   };

// // //   const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
// // //     setFormData({
// // //       ...formData,
// // //       [e.target.name]: e.target.value
// // //     });
    
// // //     if (error || validationError) {
// // //       dispatch(clearError());
// // //       setValidationError('');
// // //     }
// // //   };

// // //   const handleClickShowPassword = (field: 'password' | 'confirmPassword') => {
// // //     setFormData({
// // //       ...formData,
// // //       [field === 'password' ? 'showPassword' : 'showConfirmPassword']: 
// // //         !formData[field === 'password' ? 'showPassword' : 'showConfirmPassword']
// // //     });
// // //   };

// // //   return (
// // //     <Box component="form" onSubmit={handleSubmit} sx={{ mt: 2 }}>
// // //       {(error || validationError) && (
// // //         <Alert 
// // //           severity="error" 
// // //           sx={{ mb: 2 }} 
// // //           onClose={() => {
// // //             dispatch(clearError());
// // //             setValidationError('');
// // //           }}
// // //         >
// // //           {error || validationError}
// // //         </Alert>
// // //       )}

// // //       <TextField
// // //         fullWidth
// // //         label="Full Name"
// // //         name="name"
// // //         value={formData.name}
// // //         onChange={handleChange}
// // //         required
// // //         margin="normal"
// // //         variant="outlined"
// // //       />

// // //       <TextField
// // //         fullWidth
// // //         label="Email"
// // //         name="email"
// // //         type="email"
// // //         value={formData.email}
// // //         onChange={handleChange}
// // //         required
// // //         margin="normal"
// // //         variant="outlined"
// // //       />

// // //       <TextField
// // //         fullWidth
// // //         label="Password"
// // //         name="password"
// // //         type={formData.showPassword ? 'text' : 'password'}
// // //         value={formData.password}
// // //         onChange={handleChange}
// // //         required
// // //         margin="normal"
// // //         variant="outlined"
// // //         InputProps={{
// // //           endAdornment: (
// // //             <InputAdornment position="end">
// // //               <IconButton
// // //                 onClick={() => handleClickShowPassword('password')}
// // //                 edge="end"
// // //               >
// // //                 {formData.showPassword ? <VisibilityOff /> : <Visibility />}
// // //               </IconButton>
// // //             </InputAdornment>
// // //           ),
// // //         }}
// // //       />

// // //       <TextField
// // //         fullWidth
// // //         label="Confirm Password"
// // //         name="confirmPassword"
// // //         type={formData.showConfirmPassword ? 'text' : 'password'}
// // //         value={formData.confirmPassword}
// // //         onChange={handleChange}
// // //         required
// // //         margin="normal"
// // //         variant="outlined"
// // //         InputProps={{
// // //           endAdornment: (
// // //             <InputAdornment position="end">
// // //               <IconButton
// // //                 onClick={() => handleClickShowPassword('confirmPassword')}
// // //                 edge="end"
// // //               >
// // //                 {formData.showConfirmPassword ? <VisibilityOff /> : <Visibility />}
// // //               </IconButton>
// // //             </InputAdornment>
// // //           ),
// // //         }}
// // //       />

// // //       <Button
// // //         type="submit"
// // //         fullWidth
// // //         variant="contained"
// // //         disabled={loading}
// // //         sx={{ mt: 3, mb: 2 }}
// // //       >
// // //         {loading ? <CircularProgress size={24} /> : 'Sign Up'}
// // //       </Button>
// // //     </Box>
// // //   );
// // // }



// // import { useState } from 'react';
// // import {
// //   Container,
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
// //     <>
// //       <AppBar position="static" elevation={0} sx={{ backgroundColor: 'transparent', color: 'text.primary' }}>
// //         <Toolbar>
// //           <Typography variant="h6" component="div" sx={{ flexGrow: 1, fontWeight: 300 }}>
// //             My App
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
// //             backgroundColor: 'primary.light',
// //             background: 'linear-gradient(135deg, #e0f7fa 0%, #b2ebf2 100%)'
// //           }}>
// //             <Box
// //               component="img"
// //               src="/chameleon.svg" // Asegúrate de tener esta imagen en tu directorio public
// //               alt="Chameleon"
// //               sx={{ 
// //                 width: '70%', 
// //                 maxWidth: 400,
// //                 filter: 'drop-shadow(0px 4px 12px rgba(0,0,0,0.1))'
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
// //           p: 3
// //         }}>
// //           <Paper 
// //             elevation={0} 
// //             sx={{ 
// //               maxWidth: 450, 
// //               width: '100%', 
// //               border: '1px solid',
// //               borderColor: 'divider',
// //               borderRadius: 2
// //             }}
// //           >
// //             <Tabs
// //               value={tabValue}
// //               onChange={handleTabChange}
// //               aria-label="auth tabs"
// //               variant="fullWidth"
// //               sx={{ 
// //                 borderBottom: '1px solid',
// //                 borderColor: 'divider'
// //               }}
// //             >
// //               <Tab label="Login" {...a11yProps(0)} sx={{ fontWeight: 500 }} />
// //               <Tab label="Register" {...a11yProps(1)} sx={{ fontWeight: 500 }} />
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
// //     </>
// //   );
// // }



// import { useState } from 'react';
// import {
//   TextField,
//   Button,
//   Box,
//   Alert,
//   CircularProgress,
//   IconButton,
//   InputAdornment
// } from '@mui/material';
// import Visibility from '@mui/icons-material/Visibility';
// import VisibilityOff from '@mui/icons-material/VisibilityOff';
// import { useAppDispatch, useAppSelector } from '../store/hooks';
// import { registerUser, clearError } from '../store/features/authSlice';
// import { useRouter } from 'next/router';

// export default function RegisterForm() {
//   const [formData, setFormData] = useState({
//     name: '',
//     email: '',
//     password: '',
//     confirmPassword: '',
//     showPassword: false,
//     showConfirmPassword: false
//   });
//   const [validationError, setValidationError] = useState('');

//   const dispatch = useAppDispatch();
//   const { loading, error } = useAppSelector((state) => state.auth);
//   const router = useRouter();

//   const handleSubmit = (e: React.FormEvent) => {
//     e.preventDefault();
    
//     if (formData.password !== formData.confirmPassword) {
//       setValidationError('Passwords do not match');
//       return;
//     }

//     setValidationError('');
//     dispatch(clearError());

//     dispatch(registerUser({
//       email: formData.email,
//       password: formData.password,
//       name: formData.name
//     }))
//       .unwrap()
//       .then(() => {
//         router.push('/dashboard');
//       });
//   };

//   const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     setFormData({
//       ...formData,
//       [e.target.name]: e.target.value
//     });
    
//     if (error || validationError) {
//       dispatch(clearError());
//       setValidationError('');
//     }
//   };

//   const handleClickShowPassword = (field: 'password' | 'confirmPassword') => {
//     setFormData({
//       ...formData,
//       [field === 'password' ? 'showPassword' : 'showConfirmPassword']: 
//         !formData[field === 'password' ? 'showPassword' : 'showConfirmPassword']
//     });
//   };

//   return (
//     <Box component="form" onSubmit={handleSubmit}>
//       {(error || validationError) && (
//         <Alert 
//           severity="error" 
//           sx={{ mb: 2 }} 
//           onClose={() => {
//             dispatch(clearError());
//             setValidationError('');
//           }}
//         >
//           {error || validationError}
//         </Alert>
//       )}

//       <TextField
//         fullWidth
//         label="Full Name"
//         name="name"
//         value={formData.name}
//         onChange={handleChange}
//         required
//         margin="normal"
//         variant="outlined"
//         size="small"
//       />

//       <TextField
//         fullWidth
//         label="Email"
//         name="email"
//         type="email"
//         value={formData.email}
//         onChange={handleChange}
//         required
//         margin="normal"
//         variant="outlined"
//         size="small"
//       />

//       <TextField
//         fullWidth
//         label="Password"
//         name="password"
//         type={formData.showPassword ? 'text' : 'password'}
//         value={formData.password}
//         onChange={handleChange}
//         required
//         margin="normal"
//         variant="outlined"
//         size="small"
//         InputProps={{
//           endAdornment: (
//             <InputAdornment position="end">
//               <IconButton
//                 onClick={() => handleClickShowPassword('password')}
//                 edge="end"
//                 size="small"
//               >
//                 {formData.showPassword ? <VisibilityOff /> : <Visibility />}
//               </IconButton>
//             </InputAdornment>
//           ),
//         }}
//       />

//       <TextField
//         fullWidth
//         label="Confirm Password"
//         name="confirmPassword"
//         type={formData.showConfirmPassword ? 'text' : 'password'}
//         value={formData.confirmPassword}
//         onChange={handleChange}
//         required
//         margin="normal"
//         variant="outlined"
//         size="small"
//         InputProps={{
//           endAdornment: (
//             <InputAdornment position="end">
//               <IconButton
//                 onClick={() => handleClickShowPassword('confirmPassword')}
//                 edge="end"
//                 size="small"
//               >
//                 {formData.showConfirmPassword ? <VisibilityOff /> : <Visibility />}
//               </IconButton>
//             </InputAdornment>
//           ),
//         }}
//       />

//       <Button
//         type="submit"
//         fullWidth
//         variant="contained"
//         disabled={loading}
//         sx={{ mt: 3, mb: 2, py: 1 }}
//       >
//         {loading ? <CircularProgress size={24} /> : 'Sign Up'}
//       </Button>
//     </Box>
//   );
// }



import { useState } from 'react';
import {
  TextField,
  Button,
  Box,
  Alert,
  CircularProgress,
  IconButton,
  InputAdornment
} from '@mui/material';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { registerUser, clearError } from '../store/features/authSlice';
import { useRouter } from 'next/router';

export default function RegisterForm() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    showPassword: false,
    showConfirmPassword: false
  });
  const [validationError, setValidationError] = useState('');

  const dispatch = useAppDispatch();
  const { loading, error } = useAppSelector((state) => state.auth);
  const router = useRouter();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (formData.password !== formData.confirmPassword) {
      setValidationError('Passwords do not match');
      return;
    }

    setValidationError('');
    dispatch(clearError());

    dispatch(registerUser({
      email: formData.email,
      password: formData.password,
      name: formData.name
    }))
      .unwrap()
      .then(() => {
        router.push('/dashboard');
      });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
    
    if (error || validationError) {
      dispatch(clearError());
      setValidationError('');
    }
  };

  const handleClickShowPassword = (field: 'password' | 'confirmPassword') => {
    setFormData({
      ...formData,
      [field === 'password' ? 'showPassword' : 'showConfirmPassword']: 
        !formData[field === 'password' ? 'showPassword' : 'showConfirmPassword']
    });
  };

  return (
    <Box component="form" onSubmit={handleSubmit}>
      {(error || validationError) && (
        <Alert 
          severity="error" 
          sx={{ 
            mb: 2,
            backgroundColor: 'rgba(211, 47, 47, 0.1)',
            color: '#ff5252',
            border: '1px solid rgba(211, 47, 47, 0.3)'
          }} 
          onClose={() => {
            dispatch(clearError());
            setValidationError('');
          }}
        >
          {error || validationError}
        </Alert>
      )}

      <TextField
        fullWidth
        label="Full Name"
        name="name"
        value={formData.name}
        onChange={handleChange}
        required
        margin="normal"
        variant="outlined"
        size="small"
        sx={{
          '& .MuiOutlinedInput-root': {
            color: '#fff',
            '& fieldset': {
              borderColor: 'rgba(255, 255, 255, 0.3)',
            },
            '&:hover fieldset': {
              borderColor: 'rgba(0, 255, 200, 0.5)',
            },
            '&.Mui-focused fieldset': {
              borderColor: '#00ffc8',
            },
          },
          '& .MuiInputLabel-root': {
            color: 'rgba(255, 255, 255, 0.6)',
          },
        }}
      />

      <TextField
        fullWidth
        label="Email"
        name="email"
        type="email"
        value={formData.email}
        onChange={handleChange}
        required
        margin="normal"
        variant="outlined"
        size="small"
        sx={{
          '& .MuiOutlinedInput-root': {
            color: '#fff',
            '& fieldset': {
              borderColor: 'rgba(255, 255, 255, 0.3)',
            },
            '&:hover fieldset': {
              borderColor: 'rgba(0, 255, 200, 0.5)',
            },
            '&.Mui-focused fieldset': {
              borderColor: '#00ffc8',
            },
          },
          '& .MuiInputLabel-root': {
            color: 'rgba(255, 255, 255, 0.6)',
          },
        }}
      />

      <TextField
        fullWidth
        label="Password"
        name="password"
        type={formData.showPassword ? 'text' : 'password'}
        value={formData.password}
        onChange={handleChange}
        required
        margin="normal"
        variant="outlined"
        size="small"
        sx={{
          '& .MuiOutlinedInput-root': {
            color: '#fff',
            '& fieldset': {
              borderColor: 'rgba(255, 255, 255, 0.3)',
            },
            '&:hover fieldset': {
              borderColor: 'rgba(0, 255, 200, 0.5)',
            },
            '&.Mui-focused fieldset': {
              borderColor: '#00ffc8',
            },
          },
          '& .MuiInputLabel-root': {
            color: 'rgba(255, 255, 255, 0.6)',
          },
        }}
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <IconButton
                onClick={() => handleClickShowPassword('password')}
                edge="end"
                size="small"
                sx={{ color: 'rgba(255, 255, 255, 0.5)' }}
              >
                {formData.showPassword ? <VisibilityOff /> : <Visibility />}
              </IconButton>
            </InputAdornment>
          ),
        }}
      />

      <TextField
        fullWidth
        label="Confirm Password"
        name="confirmPassword"
        type={formData.showConfirmPassword ? 'text' : 'password'}
        value={formData.confirmPassword}
        onChange={handleChange}
        required
        margin="normal"
        variant="outlined"
        size="small"
        sx={{
          '& .MuiOutlinedInput-root': {
            color: '#fff',
            '& fieldset': {
              borderColor: 'rgba(255, 255, 255, 0.3)',
            },
            '&:hover fieldset': {
              borderColor: 'rgba(0, 255, 200, 0.5)',
            },
            '&.Mui-focused fieldset': {
              borderColor: '#00ffc8',
            },
          },
          '& .MuiInputLabel-root': {
            color: 'rgba(255, 255, 255, 0.6)',
          },
        }}
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <IconButton
                onClick={() => handleClickShowPassword('confirmPassword')}
                edge="end"
                size="small"
                sx={{ color: 'rgba(255, 255, 255, 0.5)' }}
              >
                {formData.showConfirmPassword ? <VisibilityOff /> : <Visibility />}
              </IconButton>
            </InputAdornment>
          ),
        }}
      />

      <Button
        type="submit"
        fullWidth
        variant="contained"
        disabled={loading}
        sx={{ 
          mt: 3, 
          mb: 2, 
          py: 1.5,
          backgroundColor: '#00ffc8',
          color: '#000',
          fontWeight: 600,
          '&:hover': {
            backgroundColor: '#00e6b3',
            transform: 'translateY(-2px)',
            boxShadow: '0 6px 20px rgba(0, 255, 200, 0.4)'
          },
          transition: 'all 0.3s ease',
          boxShadow: '0 4px 15px rgba(0, 255, 200, 0.3)'
        }}
      >
        {loading ? <CircularProgress size={24} sx={{ color: '#000' }} /> : 'Sign Up'}
      </Button>
    </Box>
  );
}