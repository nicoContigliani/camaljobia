// import { useRouter } from 'next/router';
// import { useEffect, useState } from 'react';
// import { useSelector } from 'react-redux';
// import {
//   Container,
//   Typography,
//   Paper,
//   CircularProgress,
//   Alert,
//   Button,
//   Box,
//   Chip,
//   Divider,
//   useTheme,
//   useMediaQuery,
//   Snackbar,
//   ListItem,
//   ListItemText
// } from '@mui/material';
// import {
//   PictureAsPdf,
//   Share,
//   Email,
//   Phone,
//   LinkedIn,
//   Language
// } from '@mui/icons-material';
// import { RootState } from '../../store/store';
// import LoginForm from '../../components/LoginForm';
// import RegisterForm from '../../components/RegisterForm';
// import axios from 'axios';

// // Interfaces para el tipado
// interface SkillCategory {
//   [category: string]: string[] | string;
// }

// interface WorkExperience {
//   position: string;
//   company: string;
//   perdiod: string;
//   start_date: string;
//   end_date: string;
//   description: string[] | string;
// }

// interface Education {
//   degree: string;
//   institution: string;
//   start_date: string;
//   end_date: string;
//   field_of_study?: string;
//   description?: string[] | string;
// }

// interface Course {
//   name: string;
//   institution: string;
//   completion_date: string;
//   duration_hours?: number;
//   description?: string[] | string;
// }

// interface CVData {
//   _id: string;
//   user: string;
//   profile: string;
//   professional_summary: string;
//   skills: SkillCategory;
//   work_experience: WorkExperience[];
//   education: Education[];
//   courses?: Course[];
//   createdAt?: string;
//   updatedAt?: string;
// }

// interface PersonalInfo {
//   firstName?: string;
//   lastName?: string;
//   email?: string;
//   phone?: string;
//   address?: string;
// }

// interface ProfessionalInfo {
//   title?: string;
//   summary?: string;
//   skills?: string[];
// }

// interface UserProfile {
//   _id?: string;
//   user?: string;
//   fullname?: string;
//   email?: string;
//   phone?: string;
//   address?: string;
//   linkedin?: string;
//   portfolio?: string;
//   personalInfo?: PersonalInfo;
//   professionalInfo?: ProfessionalInfo;
// }

// // Declaración para html2canvas
// declare const html2canvas: any;

// export default function CVPage() {
//   const router = useRouter();
//   const { id } = router.query;
//   const { isAuthenticated, token } = useSelector((state: RootState) => state.auth);
//   const theme = useTheme();
//   const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

//   const [cv, setCv] = useState<CVData | null>(null);
//   const [profile, setProfile] = useState<UserProfile | null>(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState('');
//   const [showLogin, setShowLogin] = useState(true);
//   const [isGeneratingPdf, setIsGeneratingPdf] = useState(false);
//   const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' });

//   useEffect(() => {
//     if (!id) return;

//     const fetchCV = async () => {
//       try {
//         if (isAuthenticated && token) {
//           // Usuario autenticado - usar API normal
//           const cvResponse = await axios.get(`/api/cv/${id}`, {
//             headers: { Authorization: `Bearer ${token}` }
//           });

//           console.log("cv response", cvResponse);

//           // Obtener el perfil usando el ID de usuario del CV
//           const profileResponse = await axios.get(`/api/profile/${cvResponse.data.user}`, {
//             headers: { Authorization: `Bearer ${token}` }
//           });

//           setCv(cvResponse.data);
//           setProfile(profileResponse.data);
//         } else {
//           // No autenticado - mostrar error
//           setError('Debes iniciar sesión para ver este CV');
//         }
//       } catch (err: any) {
//         console.error('Error fetching CV:', err);
//         setError(err.response?.data?.message || 'Error al cargar el CV');
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchCV();
//   }, [id, isAuthenticated, token]);

//   // Función para extraer fechas de un rango
//   const extractDatesFromRange = (dateRange: string): { start: string, end: string } => {
//     if (!dateRange || typeof dateRange !== 'string') {
//       return { start: '', end: '' };
//     }

//     // Buscar el separador (puede ser "-", "–", "a", "hasta", "to")
//     const separators = [' - ', ' – ', ' a ', ' hasta ', ' to '];
//     let separator = '';

//     for (const sep of separators) {
//       if (dateRange.includes(sep)) {
//         separator = sep;
//         break;
//       }
//     }

//     if (!separator) {
//       // Si no hay separador, asumimos que es solo la fecha de inicio
//       return { start: dateRange.trim(), end: 'Presente' };
//     }

//     const parts = dateRange.split(separator);
//     if (parts.length !== 2) {
//       return { start: dateRange.trim(), end: 'Presente' };
//     }

//     return {
//       start: parts[0].trim(),
//       end: parts[1].trim()
//     };
//   };

//   // Función para formatear fechas individuales
//   const formatSingleDate = (dateString: string | null | undefined): string => {
//     if (!dateString) return '';
//     if (typeof dateString !== 'string') return '';

//     const trimmedDate = dateString.trim();
//     if (trimmedDate === '') return '';

//     // Palabras que indican fecha actual
//     const currentIndicators = ['presente', 'present', 'actualmente', 'current', 'ahora', 'now', 'actual', 'hoy', 'today'];
//     if (currentIndicators.includes(trimmedDate.toLowerCase())) {
//       return 'Presente';
//     }

//     // Si ya es una fecha formateada correctamente, devolverla tal cual
//     if (/^[A-Za-z]{3,} \d{4}$/.test(trimmedDate) || /^\d{1,2}\/\d{4}$/.test(trimmedDate)) {
//       return trimmedDate;
//     }

//     // Intentar parsear la fecha
//     try {
//       // Si es solo un año (ej: "2020")
//       if (/^\d{4}$/.test(trimmedDate)) {
//         return trimmedDate;
//       }

//       // Si es en formato "MM/YYYY" or "MM-YYYY"
//       if (/^\d{1,2}[\/\-]\d{4}$/.test(trimmedDate)) {
//         const [month, year] = trimmedDate.split(/[\/\-]/);
//         return `${month.padStart(2, '0')}/${year}`;
//       }

//       // Si es en formato "YYYY-MM" (formato ISO sin día)
//       if (/^\d{4}-\d{2}$/.test(trimmedDate)) {
//         const [year, month] = trimmedDate.split('-');
//         return `${month}/${year}`;
//       }

//       // Para fechas completas
//       const date = new Date(trimmedDate);

//       // Verificar si la fecha es válida
//       if (isNaN(date.getTime())) {
//         // Si no es una fecha válida, devolver el string original
//         return trimmedDate;
//       }

//       // Formatear como "mes/año" en español
//       return date.toLocaleDateString('es-ES', {
//         year: 'numeric',
//         month: 'short'
//       });
//     } catch {
//       // En caso de error, devolver el string original
//       return trimmedDate;
//     }
//   };

//   // Función para formatear un rango de fechas
//   const formatDateRange = (startDate: string, endDate: string): string => {
//     const formattedStart = formatSingleDate(startDate);
//     const formattedEnd = formatSingleDate(endDate);

//     if (!formattedStart && !formattedEnd) return '';
//     if (!formattedStart) return formattedEnd;
//     if (!formattedEnd) return formattedStart;

//     return `${formattedStart} - ${formattedEnd}`;
//   };

//   // Función para normalizar arrays (asegura que siempre sea un array)
//   const normalizeArray = (data: string[] | string | undefined): string[] => {
//     if (!data) return [];
//     if (Array.isArray(data)) return data;
//     if (typeof data === 'string') {
//       // Intentar parsear si es un string JSON
//       try {
//         const parsed = JSON.parse(data);
//         if (Array.isArray(parsed)) return parsed;
//         return [data];
//       } catch {
//         return [data];
//       }
//     }
//     return [];
//   };

//   // Función para generar PDF
//   const handleGeneratePDF = async () => {
//     if (!cv || !profile) return;

//     setIsGeneratingPdf(true);
//     try {
//       // Importación dinámica de jsPDF
//       const { default: jsPDF } = await import('jspdf');

//       // Crear un elemento temporal para renderizar el PDF
//       const element = document.createElement('div');
//       element.style.position = 'absolute';
//       element.style.left = '-9999px';
//       element.style.width = '210mm';
//       element.style.fontSize = '11px';
//       element.style.fontFamily = 'Arial, sans-serif';
//       element.style.padding = '15mm';
//       element.style.boxSizing = 'border-box';
//       element.style.backgroundColor = 'white';
//       document.body.appendChild(element);

//       // Renderizar el contenido del PDF
//       const fullname = profile.fullname ||
//         (profile.personalInfo?.firstName && profile.personalInfo?.lastName
//           ? `${profile.personalInfo.firstName} ${profile.personalInfo.lastName}`
//           : 'Nombre no disponible');

//       const email = profile.email || profile.personalInfo?.email || '';
//       const phone = profile.phone || profile.personalInfo?.phone || '';

//       // Corregido: Usar comillas simples para el valor de font-family
//       element.innerHTML = `
//         <div style="padding: 15mm; font-family: 'Arial, sans-serif'; font-size: 11px; line-height: 1.4; width: 210mm; box-sizing: border-box;">
//           <div style="text-align: center; margin-bottom: 15px; border-bottom: 2px solid #1976d2; padding-bottom: 10px;">
//             <h1 style="margin: 0; font-size: 20px; color: #1976d2; text-transform: uppercase;">
//               ${fullname}
//             </h1>
//             <p style="margin: 5px 0; font-size: 14px; font-weight: bold;">${cv.profile}</p>
//             <div style="display: flex; justify-content: center; flex-wrap: wrap; gap: 10px; font-size: 11px;">
//               ${email ? `<span>${email}</span>` : ''}
//               ${phone ? `<span>${phone}</span>` : ''}
//               ${profile.linkedin ? `<span>LinkedIn: ${profile.linkedin}</span>` : ''}
//               ${profile.portfolio ? `<span>Portfolio: ${profile.portfolio}</span>` : ''}
//             </div>
//           </div>
          
//           <div style="margin-bottom: 15px;">
//             <h2 style="margin: 0 0 10px 0; font-size: 14px; border-bottom: 1px solid #ddd; padding-bottom: 5px; text-transform: uppercase; color: #1976d2;">
//               Resumen Profesional
//             </h2>
//             <p style="margin: 0; text-align: justify;">${cv.professional_summary}</p>
//           </div>
          
//           <div style="margin-bottom: 15px;">
//             <h2 style="margin: 0 0 10px 0; font-size: 14px; border-bottom: 1px solid #ddd; padding-bottom: 5px; text-transform: uppercase; color: #1976d2;">
//               Habilidades Técnicas
//             </h2>
//             ${Object.entries(cv.skills).map(([category, skills]) => {
//         const skillsArray = normalizeArray(skills);
//         return skillsArray.length > 0 ? `
//                 <div style="margin-bottom: 8px;">
//                   <strong style="text-transform: capitalize;">${category.replace(/_/g, ' ')}:</strong>
//                   ${skillsArray.join(', ')}
//                 </div>
//               ` : '';
//       }).join('')}
//           </div>
          
//           ${cv.work_experience && cv.work_experience.length > 0 ? `
//             <div style="margin-bottom: 15px;">
//               <h2 style="margin: 0 0 10px 0; font-size: 14px; border-bottom: 1px solid #ddd; padding-bottom: 5px; text-transform: uppercase; color: #1976d2;">
//                 Experiencia Laboral
//               </h2>
//               ${cv.work_experience.map(exp => {
//         const descriptionArray = normalizeArray(exp.description);

//         // Extraer fechas del rango
//         const startDate = formatSingleDate(exp.start_date);
//         const endDate = formatSingleDate(exp.end_date);
//         const dateRange = formatDateRange(exp.start_date, exp.end_date);

//         return `
//                   <div style="margin-bottom: 10px; page-break-inside: avoid;">
//                     <div style="display: flex; justify-content: space-between; align-items: flex-start;">
//                       <div>
//                         <strong style="display: block;">${exp.position}</strong>
//                         <span style="font-style: italic;">${exp.company}</span>
//                       </div>
//                       <span style="white-space: nowrap;">
//                         ${dateRange}
//                       </span>
//                     </div>
//                     ${descriptionArray.length > 0 ? `
//                       <ul style="margin: 5px 0; padding-left: 15px;">
//                         ${descriptionArray.map(desc => `<li style="margin-bottom: 3px;">${desc}</li>`).join('')}
//                       </ul>
//                     ` : ''}
//                   </div>
//                 `;
//       }).join('')}
//             </div>
//           ` : ''}
          
//           ${cv.education && cv.education.length > 0 ? `
//             <div style="margin-bottom: 15px;">
//               <h2 style="margin: 0 0 10px 0; font-size: 14px; border-bottom: 1px solid #ddd; padding-bottom: 5px; text-transform: uppercase; color: #1976d2;">
//                 Formación Académica
//               </h2>
//               ${cv.education.map(edu => {
//         const dateRange = formatDateRange(edu.start_date, edu.end_date);
//         return `
//                   <div style="margin-bottom: 10px; page-break-inside: avoid;">
//                     <div style="display: flex; justify-content: space-between; align-items: flex-start;">
//                       <div>
//                         <strong style="display: block;">${edu.degree}</strong>
//                         <span style="font-style: italic;">${edu.institution}</span>
//                       </div>
//                       <span style="white-space: nowrap;">
//                         ${dateRange}
//                       </span>
//                     </div>
//                     ${edu.field_of_study ? `<div>Campo de estudio: ${edu.field_of_study}</div>` : ''}
//                   </div>
//                 `;
//       }).join('')}
//             </div>
//           ` : ''}
          
//           ${cv.courses && cv.courses.length > 0 ? `
//             <div style="margin-bottom: 15px;">
//               <h2 style="margin: 0 0 10px 0; font-size: 14px; border-bottom: 1px solid #ddd; padding-bottom: 5px; text-transform: uppercase; color: #1976d2;">
//                 Cursos y Certificaciones
//               </h2>
//               ${cv.courses.map(course => {
//         const completionDate = formatSingleDate(course.completion_date);
//         return `
//                   <div style="margin-bottom: 10px; page-break-inside: avoid;">
//                     <div style="display: flex; justify-content: space-between; align-items: flex-start;">
//                       <div>
//                         <strong style="display: block;">${course.name}</strong>
//                         <span style="font-style: italic;">${course.institution}</span>
//                       </div>
//                       <span style="white-space: nowrap;">
//                         ${completionDate}
//                       </span>
//                     </div>
//                     ${course.duration_hours ? `<div>Duración: ${course.duration_hours} horas</div>` : ''}
//                   </div>
//                 `;
//       }).join('')}
//             </div>
//           ` : ''}
//         </div>
//       `;

//       const canvas = await html2canvas(element, {
//         scale: 2,
//         useCORS: true,
//         logging: false,
//         width: 210 * 3.78,
//         height: element.scrollHeight,
//         windowWidth: 210 * 3.78
//       });

//       document.body.removeChild(element);

//       const imgData = canvas.toDataURL('image/png');
//       const pdf = new jsPDF('p', 'mm', 'a4');
//       const imgWidth = 210;
//       const imgHeight = (canvas.height * imgWidth) / canvas.width;

//       pdf.addImage(imgData, 'PNG', 0, 0, imgWidth, imgHeight);
//       pdf.save(`${fullname.replace(/\s+/g, '_')}_${cv.profile.replace(/\s+/g, '_')}.pdf`);

//       setSnackbar({ open: true, message: 'PDF generado correctamente', severity: 'success' });
//     } catch (error) {
//       console.error('Error generating PDF:', error);
//       setSnackbar({ open: true, message: 'Error al generar el PDF', severity: 'error' });
//     } finally {
//       setIsGeneratingPdf(false);
//     }
//   };

//   // Función para compartir
//   const handleShare = async () => {
//     if (!cv || !profile) return;

//     const fullname = profile.fullname ||
//       (profile.personalInfo?.firstName && profile.personalInfo?.lastName
//         ? `${profile.personalInfo.firstName} ${profile.personalInfo.lastName}`
//         : '');

//     const shareData = {
//       title: `${fullname} - ${cv.profile}`,
//       text: `Echa un vistazo al CV de ${fullname} - ${cv.profile}`,
//       url: window.location.href
//     };

//     try {
//       if (navigator.share) {
//         await navigator.share(shareData);
//       } else {
//         // Fallback para copiar al portapapeles
//         await navigator.clipboard.writeText(window.location.href);
//         setSnackbar({ open: true, message: 'Enlace copiado al portapapeles', severity: 'success' });
//       }
//     } catch (error) {
//       console.error('Error sharing:', error);
//       // No mostrar error si el usuario canceló la acción
//       if (error instanceof Error && error.name !== 'AbortError') {
//         setSnackbar({ open: true, message: 'Error al compartir', severity: 'error' });
//       }
//     }
//   };

//   if (loading) {
//     return (
//       <Container sx={{ py: 4, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: '50vh' }}>
//         <CircularProgress />
//         <Typography sx={{ mt: 2 }}>Cargando CV...</Typography>
//       </Container>
//     );
//   }

//   if (!isAuthenticated) {
//     return (
//       <Container maxWidth="sm" sx={{ py: 4 }}>
//         <Paper sx={{ p: 4, display: 'flex', flexDirection: 'column' }}>
//           <Typography variant="h5" gutterBottom textAlign="center">
//             Acceso Requerido
//           </Typography>
//           <Alert severity="info" sx={{ mb: 3 }}>
//             Debes iniciar sesión para ver este CV
//           </Alert>

//           <Box sx={{ display: 'flex', justifyContent: 'center', mb: 2 }}>
//             <Button
//               onClick={() => setShowLogin(!showLogin)}
//               variant="outlined"
//             >
//               {showLogin ? 'Crear cuenta' : 'Ya tengo cuenta'}
//             </Button>
//           </Box>

//           {showLogin ? <LoginForm /> : <RegisterForm />}
//         </Paper>
//       </Container>
//     );
//   }

//   if (error) {
//     return (
//       <Container sx={{ py: 4 }}>
//         <Alert severity="error">{error}</Alert>
//       </Container>
//     );
//   }

//   if (!cv || !profile) {
//     return (
//       <Container sx={{ py: 4 }}>
//         <Alert severity="warning">CV no encontrado</Alert>
//       </Container>
//     );
//   }

//   // Obtener información de contacto del perfil
//   const email = profile.email || profile.personalInfo?.email;
//   const phone = profile.phone || profile.personalInfo?.phone;
//   const fullname = profile.fullname ||
//     (profile.personalInfo?.firstName && profile.personalInfo?.lastName
//       ? `${profile.personalInfo.firstName} ${profile.personalInfo.lastName}`
//       : 'Nombre no disponible');
//   const title = cv.profile || profile.professionalInfo?.title;
//   const summary = cv.professional_summary || profile.professionalInfo?.summary;

//   return (
//     <Container maxWidth="lg" sx={{ py: 4 }}>
//       {/* Header con acciones */}
//       <Paper sx={{ p: 3, mb: 3, display: 'flex', flexDirection: isMobile ? 'column' : 'row', alignItems: 'center', justifyContent: 'space-between' }}>
//         <Box>
//           <Typography variant="h4" gutterBottom>
//             {fullname}
//           </Typography>
//           <Typography variant="h6" color="primary">
//             {title}
//           </Typography>
//         </Box>

//         <Box sx={{ display: 'flex', gap: 1, mt: isMobile ? 2 : 0 }}>
//           <Button
//             variant="outlined"
//             startIcon={<Share />}
//             onClick={handleShare}
//           >
//             Compartir
//           </Button>
//           <Button
//             variant="contained"
//             startIcon={<PictureAsPdf />}
//             onClick={handleGeneratePDF}
//             disabled={isGeneratingPdf}
//           >
//             {isGeneratingPdf ? 'Generando...' : 'PDF'}
//           </Button>
//         </Box>
//       </Paper>

//       {/* Información de contacto */}
//       {(email || phone || profile.linkedin || profile.portfolio) && (
//         <Paper sx={{ p: 3, mb: 3, display: 'flex', flexDirection: 'column', gap: 1 }}>
//           <Typography variant="h6" gutterBottom>
//             Información de Contacto
//           </Typography>
//           <Divider sx={{ mb: 2 }} />
//           <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2 }}>
//             {email && (
//               <Box sx={{ display: 'flex', alignItems: 'center' }}>
//                 <Email sx={{ mr: 1, color: 'primary.main' }} />
//                 <Typography>{email}</Typography>
//               </Box>
//             )}
//             {phone && (
//               <Box sx={{ display: 'flex', alignItems: 'center' }}>
//                 <Phone sx={{ mr: 1, color: 'primary.main' }} />
//                 <Typography>{phone}</Typography>
//               </Box>
//             )}
//             {profile.linkedin && (
//               <Box sx={{ display: 'flex', alignItems: 'center' }}>
//                 <LinkedIn sx={{ mr: 1, color: 'primary.main' }} />
//                 <Typography>{profile.linkedin}</Typography>
//               </Box>
//             )}
//             {profile.portfolio && (
//               <Box sx={{ display: 'flex', alignItems: 'center' }}>
//                 <Language sx={{ mr: 1, color: 'primary.main' }} />
//                 <Typography>{profile.portfolio}</Typography>
//               </Box>
//             )}
//           </Box>
//         </Paper>
//       )}

//       {/* Resumen profesional */}
//       {summary && (
//         <Paper sx={{ p: 3, mb: 3 }}>
//           <Typography variant="h6" gutterBottom>
//             Resumen Profesional
//           </Typography>
//           <Divider sx={{ mb: 2 }} />
//           <Typography>{summary}</Typography>
//         </Paper>
//       )}

//       {/* Habilidades */}
//       {cv.skills && Object.keys(cv.skills).length > 0 && (
//         <Paper sx={{ p: 3, mb: 3 }}>
//           <Typography variant="h6" gutterBottom>
//             Habilidades
//           </Typography>
//           <Divider sx={{ mb: 2 }} />
//           {Object.entries(cv.skills).map(([category, skills]) => {
//             const skillsArray = normalizeArray(skills);

//             return (
//               <Box key={category} sx={{ mb: 2 }}>
//                 <Typography variant="subtitle1" sx={{ textTransform: 'capitalize', mb: 1 }}>
//                   {category.replace(/_/g, ' ')}:
//                 </Typography>
//                 <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
//                   {skillsArray.map((skill: string, index: number) => (
//                     <Chip key={index} label={skill} variant="outlined" />
//                   ))}
//                 </Box>
//               </Box>
//             );
//           })}
//         </Paper>
//       )}

//       {/* Experiencia laboral */}
//       {cv.work_experience && cv.work_experience.length > 0 && (
//         <Paper sx={{ p: 3, mb: 3 }}>
//           <Typography variant="h6" gutterBottom>
//             Experiencia Laboral
//           </Typography>
//           <Divider sx={{ mb: 2 }} />

//           {cv.work_experience.map((exp: any, index) => {
//             const dateRange = formatDateRange(exp.start_date, exp.end_date);

//             return (
//               <ListItem key={index} alignItems="flex-start" sx={{ flexDirection: 'column', alignItems: 'flex-start' }}>
//                 <ListItemText
//                   primary={
//                     <Box display="flex" justifyContent="space-between" flexWrap="wrap" width="100%">
//                       <Typography variant="h6">{exp.position}</Typography>
//                       <Typography variant="body2" color="text.secondary">
//                         {exp.period}
//                       </Typography>
//                     </Box>
//                   }
//                   secondary={
//                     <>
//                       <Typography variant="subtitle1" color="text.primary" sx={{ mt: 1 }}>
//                         {exp.company}
//                       </Typography>
//                       <Box component="ul" sx={{ pl: 2, mt: 1, mb: 0 }}>
//                         {exp.description.map((desc: any, i: any) => (
//                           <Typography
//                             key={i}
//                             variant="body2"
//                             component="li"
//                             sx={{ mb: 0.5 }}
//                           >
//                             {desc}
//                           </Typography>
//                         ))}
//                       </Box>
//                     </>
//                   }
//                 />
//                 {index < cv.work_experience.length - 1 && (
//                   <Divider sx={{ width: '100%', my: 2 }} />
//                 )}
//               </ListItem>

//             );
//           })}

//         </Paper>
//       )}

//       {/* Educación */}
//       {cv.education && cv.education.length > 0 && (
//         <Paper sx={{ p: 3, mb: 3 }}>
//           <Typography variant="h6" gutterBottom>
//             Educación
//           </Typography>
//           <Divider sx={{ mb: 2 }} />
//           {cv.education.map((edu, index) => {
//             const dateRange = formatDateRange(edu.start_date, edu.end_date);

//             return (
//               <Box key={index} sx={{ mb: 3 }}>
//                 <Box sx={{ display: 'flex', flexDirection: isMobile ? 'column' : 'row', justifyContent: 'space-between', mb: 1 }}>
//                   <Typography variant="subtitle1" sx={{ fontWeight: 'bold' }}>
//                     {edu.degree}
//                   </Typography>
//                   <Typography variant="body2" color="text.secondary">
//                     {dateRange}
//                   </Typography>
//                 </Box>
//                 <Typography variant="body2" color="primary" sx={{ mb: 1 }}>
//                   {edu.institution}
//                 </Typography>
//                 {edu.field_of_study && (
//                   <Typography variant="body2">
//                     Campo de estudio: {edu.field_of_study}
//                   </Typography>
//                 )}
//                 {index < cv.education.length - 1 && <Divider sx={{ mt: 2 }} />}
//               </Box>
//             );
//           })}
//         </Paper>
//       )}

//       {/* Cursos y certificaciones */}
//       {cv.courses && cv.courses.length > 0 && (
//         <Paper sx={{ p: 3 }}>
//           <Typography variant="h6" gutterBottom>
//             Cursos y Certificaciones
//           </Typography>
//           <Divider sx={{ mb: 2 }} />
//           {cv.courses.map((course, index) => {
//             const completionDate = formatSingleDate(course.completion_date);

//             return (
//               <Box key={index} sx={{ mb: 3 }}>
//                 <Box sx={{ display: 'flex', flexDirection: isMobile ? 'column' : 'row', justifyContent: 'space-between', mb: 1 }}>
//                   <Typography variant="subtitle1" sx={{ fontWeight: 'bold' }}>
//                     {course.name}
//                   </Typography>
//                   <Typography variant="body2" color="text.secondary">
//                     {completionDate}
//                   </Typography>
//                 </Box>
//                 <Typography variant="body2" color="primary" sx={{ mb: 1 }}>
//                   {course.institution}
//                 </Typography>
//                 {course.duration_hours && course.duration_hours > 0 && (
//                   <Typography variant="body2">
//                     Duración: {course.duration_hours} horas
//                   </Typography>
//                 )}
//                 {course.description && normalizeArray(course.description).length > 0 && (
//                   <Box component="ul" sx={{ m: 0, pl: 2 }}>
//                     {normalizeArray(course.description).map((desc: string, i: number) => (
//                       <Typography key={i} component="li" variant="body2">
//                         {desc}
//                       </Typography>
//                     ))}
//                   </Box>
//                 )}
//                 {index < (cv.courses?.length || 0) - 1 && <Divider sx={{ mt: 2 }} />}
//               </Box>
//             );
//           })}
//         </Paper>
//       )}

//       {/* Snackbar para notificaciones */}
//       <Snackbar
//         open={snackbar.open}
//         autoHideDuration={6000}
//         onClose={() => setSnackbar({ ...snackbar, open: false })}
//       >
//         <Alert
//           onClose={() => setSnackbar({ ...snackbar, open: false })}
//           severity={snackbar.severity as 'success' | 'error'}
//           sx={{ width: '100%' }}
//         >
//           {snackbar.message}
//         </Alert>
//       </Snackbar>
//     </Container>
//   );
// }



import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import {
  Container,
  Typography,
  Paper,
  CircularProgress,
  Alert,
  Button,
  Box,
  Chip,
  Divider,
  useTheme,
  useMediaQuery,
  Snackbar,
  ListItem,
  ListItemText
} from '@mui/material';
import {
  PictureAsPdf,
  Share,
  Email,
  Phone,
  LinkedIn,
  Language
} from '@mui/icons-material';
import { RootState } from '../../store/store';
import LoginForm from '../../components/LoginForm';
import RegisterForm from '../../components/RegisterForm';
import axios from 'axios';

// Interfaces para el tipado
interface SkillCategory {
  [category: string]: string[] | string;
}

interface WorkExperience {
  position: string;
  company: string;
  perdiod: string;
  start_date: string;
  end_date: string;
  description: string[] | string;
}

interface Education {
  degree: string;
  institution: string;
  start_date: string;
  end_date: string;
  field_of_study?: string;
  description?: string[] | string;
}

interface Course {
  name: string;
  institution: string;
  completion_date: string;
  duration_hours?: number;
  description?: string[] | string;
}

interface CVData {
  _id: string;
  user: string;
  profile: string;
  professional_summary: string;
  skills: SkillCategory;
  work_experience: WorkExperience[];
  education: Education[];
  courses?: Course[];
  createdAt?: string;
  updatedAt?: string;
}

interface PersonalInfo {
  firstName?: string;
  lastName?: string;
  email?: string;
  phone?: string;
  address?: string;
}

interface ProfessionalInfo {
  title?: string;
  summary?: string;
  skills?: string[];
}

interface UserProfile {
  _id?: string;
  user?: string;
  fullname?: string;
  email?: string;
  phone?: string;
  address?: string;
  linkedin?: string;
  portfolio?: string;
  personalInfo?: PersonalInfo;
  professionalInfo?: ProfessionalInfo;
}

// Declaración para html2canvas
declare const html2canvas: any;

export default function CVPage() {
  const router = useRouter();
  const { id } = router.query;
  const { isAuthenticated, token } = useSelector((state: RootState) => state.auth);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const [cv, setCv] = useState<CVData | null>(null);
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [showLogin, setShowLogin] = useState(true);
  const [isGeneratingPdf, setIsGeneratingPdf] = useState(false);
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' });

  useEffect(() => {
    if (!id) return;

    const fetchCV = async () => {
      try {
        if (isAuthenticated && token) {
          // Usuario autenticado - usar API normal
          const cvResponse = await axios.get(`/api/cv/${id}`, {
            headers: { Authorization: `Bearer ${token}` }
          });

          console.log("cv response", cvResponse);

          // Obtener el perfil usando el ID de usuario del CV
          const profileResponse = await axios.get(`/api/profile/${cvResponse.data.user}`, {
            headers: { Authorization: `Bearer ${token}` }
          });

          setCv(cvResponse.data);
          setProfile(profileResponse.data);
        } else {
          // No autenticado - mostrar error
          setError('Debes iniciar sesión para ver este CV');
        }
      } catch (err: any) {
        console.error('Error fetching CV:', err);
        setError(err.response?.data?.message || 'Error al cargar el CV');
      } finally {
        setLoading(false);
      }
    };

    fetchCV();
  }, [id, isAuthenticated, token]);

  // Función para extraer fechas de un rango
  const extractDatesFromRange = (dateRange: string): { start: string, end: string } => {
    if (!dateRange || typeof dateRange !== 'string') {
      return { start: '', end: '' };
    }

    // Buscar el separador (puede ser "-", "–", "a", "hasta", "to")
    const separators = [' - ', ' – ', ' a ', ' hasta ', ' to '];
    let separator = '';

    for (const sep of separators) {
      if (dateRange.includes(sep)) {
        separator = sep;
        break;
      }
    }

    if (!separator) {
      // Si no hay separador, asumimos que es solo la fecha de inicio
      return { start: dateRange.trim(), end: 'Presente' };
    }

    const parts = dateRange.split(separator);
    if (parts.length !== 2) {
      return { start: dateRange.trim(), end: 'Presente' };
    }

    return {
      start: parts[0].trim(),
      end: parts[1].trim()
    };
  };

  // Función para formatear fechas individuales
  const formatSingleDate = (dateString: string | null | undefined): string => {
    if (!dateString) return '';
    if (typeof dateString !== 'string') return '';

    const trimmedDate = dateString.trim();
    if (trimmedDate === '') return '';

    // Palabras que indican fecha actual
    const currentIndicators = ['presente', 'present', 'actualmente', 'current', 'ahora', 'now', 'actual', 'hoy', 'today'];
    if (currentIndicators.includes(trimmedDate.toLowerCase())) {
      return 'Presente';
    }

    // Si ya es una fecha formateada correctamente, devolverla tal cual
    if (/^[A-Za-z]{3,} \d{4}$/.test(trimmedDate) || /^\d{1,2}\/\d{4}$/.test(trimmedDate)) {
      return trimmedDate;
    }

    // Intentar parsear la fecha
    try {
      // Si es solo un año (ej: "2020")
      if (/^\d{4}$/.test(trimmedDate)) {
        return trimmedDate;
      }

      // Si es en formato "MM/YYYY" or "MM-YYYY"
      if (/^\d{1,2}[\/\-]\d{4}$/.test(trimmedDate)) {
        const [month, year] = trimmedDate.split(/[\/\-]/);
        return `${month.padStart(2, '0')}/${year}`;
      }

      // Si es en formato "YYYY-MM" (formato ISO sin día)
      if (/^\d{4}-\d{2}$/.test(trimmedDate)) {
        const [year, month] = trimmedDate.split('-');
        return `${month}/${year}`;
      }

      // Para fechas completas
      const date = new Date(trimmedDate);

      // Verificar si la fecha es válida
      if (isNaN(date.getTime())) {
        // Si no es una fecha válida, devolver el string original
        return trimmedDate;
      }

      // Formatear como "mes/año" en español
      return date.toLocaleDateString('es-ES', {
        year: 'numeric',
        month: 'short'
      });
    } catch {
      // En caso de error, devolver el string original
      return trimmedDate;
    }
  };

  // Función para formatear un rango de fechas
  const formatDateRange = (startDate: string, endDate: string): string => {
    const formattedStart = formatSingleDate(startDate);
    const formattedEnd = formatSingleDate(endDate);

    if (!formattedStart && !formattedEnd) return '';
    if (!formattedStart) return formattedEnd;
    if (!formattedEnd) return formattedStart;

    return `${formattedStart} - ${formattedEnd}`;
  };

  // Función para normalizar arrays (asegura que siempre sea un array)
  const normalizeArray = (data: string[] | string | undefined): string[] => {
    if (!data) return [];
    if (Array.isArray(data)) return data;
    if (typeof data === 'string') {
      // Intentar parsear si es un string JSON
      try {
        const parsed = JSON.parse(data);
        if (Array.isArray(parsed)) return parsed;
        return [data];
      } catch {
        return [data];
      }
    }
    return [];
  };

  // Función para generar PDF
  const handleGeneratePDF = async () => {
    if (!cv || !profile) return;

    setIsGeneratingPdf(true);
    try {
      // Importación dinámica de jsPDF
      const { default: jsPDF } = await import('jspdf');

      // Crear un elemento temporal para renderizar el PDF
      const element = document.createElement('div');
      element.style.position = 'absolute';
      element.style.left = '-9999px';
      element.style.width = '210mm';
      element.style.fontSize = '11px';
      element.style.fontFamily = 'Arial, sans-serif';
      element.style.padding = '15mm';
      element.style.boxSizing = 'border-box';
      element.style.backgroundColor = 'white';
      document.body.appendChild(element);

      // Renderizar el contenido del PDF
      const fullname = profile.fullname ||
        (profile.personalInfo?.firstName && profile.personalInfo?.lastName
          ? `${profile.personalInfo.firstName} ${profile.personalInfo.lastName}`
          : 'Nombre no disponible');

      const email = profile.email || profile.personalInfo?.email || '';
      const phone = profile.phone || profile.personalInfo?.phone || '';

      // Corregido: Usar comillas simples para el valor de font-family
      element.innerHTML = `
        <div style="padding: 15mm; font-family: 'Arial, sans-serif'; font-size: 11px; line-height: 1.4; width: 210mm; box-sizing: border-box;">
          <div style="text-align: center; margin-bottom: 15px; border-bottom: 2px solid #1976d2; padding-bottom: 10px;">
            <h1 style="margin: 0; font-size: 20px; color: #1976d2; text-transform: uppercase;">
              ${fullname}
            </h1>
            <p style="margin: 5px 0; font-size: 14px; font-weight: bold;">${cv.profile}</p>
            <div style="display: flex; justify-content: center; flex-wrap: wrap; gap: 10px; font-size: 11px;">
              ${email ? `<span>${email}</span>` : ''}
              ${phone ? `<span>${phone}</span>` : ''}
              ${profile.linkedin ? `<span>LinkedIn: ${profile.linkedin}</span>` : ''}
              ${profile.portfolio ? `<span>Portfolio: ${profile.portfolio}</span>` : ''}
            </div>
          </div>
          
          <div style="margin-bottom: 15px;">
            <h2 style="margin: 0 0 10px 0; font-size: 14px; border-bottom: 1px solid #ddd; padding-bottom: 5px; text-transform: uppercase; color: #1976d2;">
              Resumen Profesional
            </h2>
            <p style="margin: 0; text-align: justify;">${cv.professional_summary}</p>
          </div>
          
          <div style="margin-bottom: 15px;">
            <h2 style="margin: 0 0 10px 0; font-size: 14px; border-bottom: 1px solid #ddd; padding-bottom: 5px; text-transform: uppercase; color: #1976d2;">
              Habilidades Técnicas
            </h2>
            ${Object.entries(cv.skills).map(([category, skills]) => {
        const skillsArray = normalizeArray(skills);
        return skillsArray.length > 0 ? `
                <div style="margin-bottom: 8px;">
                  <strong style="text-transform: capitalize;">${category.replace(/_/g, ' ')}:</strong>
                  ${skillsArray.join(', ')}
                </div>
              ` : '';
      }).join('')}
          </div>
          
          ${cv.work_experience && cv.work_experience.length > 0 ? `
            <div style="margin-bottom: 15px;">
              <h2 style="margin: 0 0 10px 0; font-size: 14px; border-bottom: 1px solid #ddd; padding-bottom: 5px; text-transform: uppercase; color: #1976d2;">
                Experiencia Laboral
              </h2>
              ${cv.work_experience.map(exp => {
        const descriptionArray = normalizeArray(exp.description);

        // Extraer fechas del rango
        const startDate = formatSingleDate(exp.start_date);
        const endDate = formatSingleDate(exp.end_date);
        const dateRange = formatDateRange(exp.start_date, exp.end_date);

        return `
                  <div style="margin-bottom: 10px; page-break-inside: avoid;">
                    <div style="display: flex; justify-content: space-between; align-items: flex-start;">
                      <div>
                        <strong style="display: block;">${exp.position}</strong>
                        <span style="font-style: italic;">${exp.company}</span>
                      </div>
                      <span style="white-space: nowrap;">
                        ${dateRange}
                      </span>
                    </div>
                    ${descriptionArray.length > 0 ? `
                      <ul style="margin: 5px 0; padding-left: 15px;">
                        ${descriptionArray.map(desc => `<li style="margin-bottom: 3px;">${desc}</li>`).join('')}
                      </ul>
                    ` : ''}
                  </div>
                `;
      }).join('')}
            </div>
          ` : ''}
          
          ${cv.education && cv.education.length > 0 ? `
            <div style="margin-bottom: 15px;">
              <h2 style="margin: 0 0 10px 0; font-size: 14px; border-bottom: 1px solid #ddd; padding-bottom: 5px; text-transform: uppercase; color: #1976d2;">
                Formación Académica
              </h2>
              ${cv.education.map(edu => {
        const dateRange = formatDateRange(edu.start_date, edu.end_date);
        return `
                  <div style="margin-bottom: 10px; page-break-inside: avoid;">
                    <div style="display: flex; justify-content: space-between; align-items: flex-start;">
                      <div>
                        <strong style="display: block;">${edu.degree}</strong>
                        <span style="font-style: italic;">${edu.institution}</span>
                      </div>
                      <span style="white-space: nowrap;">
                        ${dateRange}
                      </span>
                    </div>
                    ${edu.field_of_study ? `<div>Campo de estudio: ${edu.field_of_study}</div>` : ''}
                  </div>
                `;
      }).join('')}
            </div>
          ` : ''}
          
          ${cv.courses && cv.courses.length > 0 ? `
            <div style="margin-bottom: 15px;">
              <h2 style="margin: 0 0 10px 0; font-size: 14px; border-bottom: 1px solid #ddd; padding-bottom: 5px; text-transform: uppercase; color: #1976d2;">
                Cursos y Certificaciones
              </h2>
              ${cv.courses.map(course => {
        const completionDate = formatSingleDate(course.completion_date);
        return `
                  <div style="margin-bottom: 10px; page-break-inside: avoid;">
                    <div style="display: flex; justify-content: space-between; align-items: flex-start;">
                      <div>
                        <strong style="display: block;">${course.name}</strong>
                        <span style="font-style: italic;">${course.institution}</span>
                      </div>
                      <span style="white-space: nowrap;">
                        ${completionDate}
                      </span>
                    </div>
                    ${course.duration_hours ? `<div>Duración: ${course.duration_hours} horas</div>` : ''}
                  </div>
                `;
      }).join('')}
            </div>
          ` : ''}
        </div>
      `;

      const canvas = await html2canvas(element, {
        scale: 2,
        useCORS: true,
        logging: false,
        width: 210 * 3.78,
        height: element.scrollHeight,
        windowWidth: 210 * 3.78
      });

      document.body.removeChild(element);

      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF('p', 'mm', 'a4');
      const imgWidth = 210;
      const imgHeight = (canvas.height * imgWidth) / canvas.width;

      pdf.addImage(imgData, 'PNG', 0, 0, imgWidth, imgHeight);
      pdf.save(`${fullname.replace(/\s+/g, '_')}_${cv.profile.replace(/\s+/g, '_')}.pdf`);

      setSnackbar({ open: true, message: 'PDF generado correctamente', severity: 'success' });
    } catch (error) {
      console.error('Error generating PDF:', error);
      setSnackbar({ open: true, message: 'Error al generar el PDF', severity: 'error' });
    } finally {
      setIsGeneratingPdf(false);
    }
  };

  // Función para compartir - CORREGIDA para usar el enlace actual
  const handleShare = async () => {
    if (!cv || !profile) return;

    const fullname = profile.fullname ||
      (profile.personalInfo?.firstName && profile.personalInfo?.lastName
        ? `${profile.personalInfo.firstName} ${profile.personalInfo.lastName}`
        : '');

    const shareData = {
      title: `${fullname} - ${cv.profile}`,
      text: `Echa un vistazo al CV de ${fullname} - ${cv.profile}`,
      url: window.location.href // Usa el enlace actual de la página
    };

    try {
      if (navigator.share) {
        await navigator.share(shareData);
      } else {
        // Fallback para copiar al portapapeles
        await navigator.clipboard.writeText(window.location.href);
        setSnackbar({ open: true, message: 'Enlace copiado al portapapeles', severity: 'success' });
      }
    } catch (error) {
      console.error('Error sharing:', error);
      // No mostrar error si el usuario canceló la acción
      if (error instanceof Error && error.name !== 'AbortError') {
        setSnackbar({ open: true, message: 'Error al compartir', severity: 'error' });
      }
    }
  };

  if (loading) {
    return (
      <Container sx={{ py: 4, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: '50vh' }}>
        <CircularProgress />
        <Typography sx={{ mt: 2 }}>Cargando CV...</Typography>
      </Container>
    );
  }

  if (!isAuthenticated) {
    return (
      <Container maxWidth="sm" sx={{ py: 4 }}>
        <Paper sx={{ p: 4, display: 'flex', flexDirection: 'column' }}>
          <Typography variant="h5" gutterBottom textAlign="center">
            Acceso Requerido
          </Typography>
          <Alert severity="info" sx={{ mb: 3 }}>
            Debes iniciar sesión para ver este CV
          </Alert>

          <Box sx={{ display: 'flex', justifyContent: 'center', mb: 2 }}>
            <Button
              onClick={() => setShowLogin(!showLogin)}
              variant="outlined"
            >
              {showLogin ? 'Crear cuenta' : 'Ya tengo cuenta'}
            </Button>
          </Box>

          {showLogin ? <LoginForm /> : <RegisterForm />}
        </Paper>
      </Container>
    );
  }

  if (error) {
    return (
      <Container sx={{ py: 4 }}>
        <Alert severity="error">{error}</Alert>
      </Container>
    );
  }

  if (!cv || !profile) {
    return (
      <Container sx={{ py: 4 }}>
        <Alert severity="warning">CV no encontrado</Alert>
      </Container>
    );
  }

  // Obtener información de contacto del perfil
  const email = profile.email || profile.personalInfo?.email;
  const phone = profile.phone || profile.personalInfo?.phone;
  const fullname = profile.fullname ||
    (profile.personalInfo?.firstName && profile.personalInfo?.lastName
      ? `${profile.personalInfo.firstName} ${profile.personalInfo.lastName}`
      : 'Nombre no disponible');
  const title = cv.profile || profile.professionalInfo?.title;
  const summary = cv.professional_summary || profile.professionalInfo?.summary;

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      {/* Header con acciones */}
      <Paper sx={{ p: 3, mb: 3, display: 'flex', flexDirection: isMobile ? 'column' : 'row', alignItems: 'center', justifyContent: 'space-between' }}>
        <Box>
          <Typography variant="h4" gutterBottom>
            {fullname}
          </Typography>
          <Typography variant="h6" color="primary">
            {title}
          </Typography>
        </Box>

        <Box sx={{ display: 'flex', gap: 1, mt: isMobile ? 2 : 0 }}>
          <Button
            variant="outlined"
            startIcon={<Share />}
            onClick={handleShare}
          >
            Compartir
          </Button>
          <Button
            variant="contained"
            startIcon={<PictureAsPdf />}
            onClick={handleGeneratePDF}
            disabled={isGeneratingPdf}
          >
            {isGeneratingPdf ? 'Generando...' : 'PDF'}
          </Button>
        </Box>
      </Paper>

      {/* Información de contacto */}
      {(email || phone || profile.linkedin || profile.portfolio) && (
        <Paper sx={{ p: 3, mb: 3, display: 'flex', flexDirection: 'column', gap: 1 }}>
          <Typography variant="h6" gutterBottom>
            Información de Contacto
          </Typography>
          <Divider sx={{ mb: 2 }} />
          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2 }}>
            {email && (
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <Email sx={{ mr: 1, color: 'primary.main' }} />
                <Typography>{email}</Typography>
              </Box>
            )}
            {phone && (
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <Phone sx={{ mr: 1, color: 'primary.main' }} />
                <Typography>{phone}</Typography>
              </Box>
            )}
            {profile.linkedin && (
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <LinkedIn sx={{ mr: 1, color: 'primary.main' }} />
                <Typography>{profile.linkedin}</Typography>
              </Box>
            )}
            {profile.portfolio && (
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <Language sx={{ mr: 1, color: 'primary.main' }} />
                <Typography>{profile.portfolio}</Typography>
              </Box>
            )}
          </Box>
        </Paper>
      )}

      {/* Resumen profesional */}
      {summary && (
        <Paper sx={{ p: 3, mb: 3 }}>
          <Typography variant="h6" gutterBottom>
            Resumen Profesional
          </Typography>
          <Divider sx={{ mb: 2 }} />
          <Typography>{summary}</Typography>
        </Paper>
      )}

      {/* Habilidades */}
      {cv.skills && Object.keys(cv.skills).length > 0 && (
        <Paper sx={{ p: 3, mb: 3 }}>
          <Typography variant="h6" gutterBottom>
            Habilidades
          </Typography>
          <Divider sx={{ mb: 2 }} />
          {Object.entries(cv.skills).map(([category, skills]) => {
            const skillsArray = normalizeArray(skills);

            return (
              <Box key={category} sx={{ mb: 2 }}>
                <Typography variant="subtitle1" sx={{ textTransform: 'capitalize', mb: 1 }}>
                  {category.replace(/_/g, ' ')}:
                </Typography>
                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                  {skillsArray.map((skill: string, index: number) => (
                    <Chip key={index} label={skill} variant="outlined" />
                  ))}
                </Box>
              </Box>
            );
          })}
        </Paper>
      )}

      {/* Experiencia laboral */}
      {cv.work_experience && cv.work_experience.length > 0 && (
        <Paper sx={{ p: 3, mb: 3 }}>
          <Typography variant="h6" gutterBottom>
            Experiencia Laboral
          </Typography>
          <Divider sx={{ mb: 2 }} />

          {cv.work_experience.map((exp: any, index) => {
            const dateRange = formatDateRange(exp.start_date, exp.end_date);

            return (
              <ListItem key={index} alignItems="flex-start" sx={{ flexDirection: 'column', alignItems: 'flex-start' }}>
                <ListItemText
                  primary={
                    <Box display="flex" justifyContent="space-between" flexWrap="wrap" width="100%">
                      <Typography variant="h6">{exp.position}</Typography>
                      <Typography variant="body2" color="text.secondary">
                        {exp.period}
                      </Typography>
                    </Box>
                  }
                  secondary={
                    <>
                      <Typography variant="subtitle1" color="text.primary" sx={{ mt: 1 }}>
                        {exp.company}
                      </Typography>
                      <Box component="ul" sx={{ pl: 2, mt: 1, mb: 0 }}>
                        {exp.description.map((desc: any, i: any) => (
                          <Typography
                            key={i}
                            variant="body2"
                            component="li"
                            sx={{ mb: 0.5 }}
                          >
                            {desc}
                          </Typography>
                        ))}
                      </Box>
                    </>
                  }
                />
                {index < cv.work_experience.length - 1 && (
                  <Divider sx={{ width: '100%', my: 2 }} />
                )}
              </ListItem>

            );
          })}

        </Paper>
      )}

      {/* Educación */}
      {cv.education && cv.education.length > 0 && (
        <Paper sx={{ p: 3, mb: 3 }}>
          <Typography variant="h6" gutterBottom>
            Educación
          </Typography>
          <Divider sx={{ mb: 2 }} />
          {cv.education.map((edu, index) => {
            const dateRange = formatDateRange(edu.start_date, edu.end_date);

            return (
              <Box key={index} sx={{ mb: 3 }}>
                <Box sx={{ display: 'flex', flexDirection: isMobile ? 'column' : 'row', justifyContent: 'space-between', mb: 1 }}>
                  <Typography variant="subtitle1" sx={{ fontWeight: 'bold' }}>
                    {edu.degree}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {dateRange}
                  </Typography>
                </Box>
                <Typography variant="body2" color="primary" sx={{ mb: 1 }}>
                  {edu.institution}
                </Typography>
                {edu.field_of_study && (
                  <Typography variant="body2">
                    Campo de estudio: {edu.field_of_study}
                  </Typography>
                )}
                {index < cv.education.length - 1 && <Divider sx={{ mt: 2 }} />}
              </Box>
            );
          })}
        </Paper>
      )}

      {/* Cursos y certificaciones */}
      {cv.courses && cv.courses.length > 0 && (
        <Paper sx={{ p: 3 }}>
          <Typography variant="h6" gutterBottom>
            Cursos y Certificaciones
          </Typography>
          <Divider sx={{ mb: 2 }} />
          {cv.courses.map((course, index) => {
            const completionDate = formatSingleDate(course.completion_date);

            return (
              <Box key={index} sx={{ mb: 3 }}>
                <Box sx={{ display: 'flex', flexDirection: isMobile ? 'column' : 'row', justifyContent: 'space-between', mb: 1 }}>
                  <Typography variant="subtitle1" sx={{ fontWeight: 'bold' }}>
                    {course.name}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {completionDate}
                  </Typography>
                </Box>
                <Typography variant="body2" color="primary" sx={{ mb: 1 }}>
                  {course.institution}
                </Typography>
                {course.duration_hours && course.duration_hours > 0 && (
                  <Typography variant="body2">
                    Duración: {course.duration_hours} horas
                  </Typography>
                )}
                {course.description && normalizeArray(course.description).length > 0 && (
                  <Box component="ul" sx={{ m: 0, pl: 2 }}>
                    {normalizeArray(course.description).map((desc: string, i: number) => (
                      <Typography key={i} component="li" variant="body2">
                        {desc}
                      </Typography>
                    ))}
                  </Box>
                )}
                {index < (cv.courses?.length || 0) - 1 && <Divider sx={{ mt: 2 }} />}
              </Box>
            );
          })}
        </Paper>
      )}

      {/* Snackbar para notificaciones */}
      <Snackbar
        open={snackbar.open}
        autoHideDuration={6000}
        onClose={() => setSnackbar({ ...snackbar, open: false })}
      >
        <Alert
          onClose={() => setSnackbar({ ...snackbar, open: false })}
          severity={snackbar.severity as 'success' | 'error'}
          sx={{ width: '100%' }}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Container>
  );
}