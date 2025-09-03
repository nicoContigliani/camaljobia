// // // 'use client';

// // // import React, { useState, useEffect } from 'react';
// // // import {
// // //   Box,
// // //   Tabs,
// // //   Tab,
// // //   Typography,
// // //   Button,
// // //   FormControl,
// // //   InputLabel,
// // //   Select,
// // //   MenuItem,
// // //   TextField,
// // //   Paper,
// // //   Alert,
// // //   CircularProgress,
// // //   Dialog,
// // //   DialogTitle,
// // //   DialogContent,
// // //   DialogActions,
// // // } from '@mui/material';
// // // import { Send, Email } from '@mui/icons-material';
// // // import { useSelector } from 'react-redux';
// // // import { RootState } from '@/store/store';

// // // interface EmailData {
// // //   to: string;
// // //   subject: string;
// // //   html: string;
// // //   from?: string;
// // // }

// // // interface CoverLetter {
// // //   _id: string;
// // //   title: string;
// // //   content: string;
// // //   isDefault?: boolean;
// // // }

// // // interface CV {
// // //   _id: string;
// // //   profile: string;
// // //   isDefault?: boolean;
// // //   user?: string;
// // //   // Otras propiedades del CV según tu modelo
// // // }

// // // interface EmailSenderProps {
// // //   open: boolean;
// // //   onClose: () => void;
// // // }

// // // const EmailSender: React.FC<EmailSenderProps> = ({ open, onClose }) => {
// // //   const [tabValue, setTabValue] = useState(0);
// // //   const [selectedCV, setSelectedCV] = useState('');
// // //   const [selectedCoverLetter, setSelectedCoverLetter] = useState('');
// // //   const [coverLetters, setCoverLetters] = useState<CoverLetter[]>([]);
// // //   const [cvs, setCVs] = useState<CV[]>([]); // Cambiado a estado local
// // //   const [emailData, setEmailData] = useState({
// // //     to: '',
// // //     subject: '',
// // //     message: ''
// // //   });
// // //   const [loading, setLoading] = useState(false);
// // //   const [status, setStatus] = useState<{ type: 'success' | 'error' | ''; message: string }>({ type: '', message: '' });

// // //   const userProfile = useSelector((state: RootState) => state.profiles.profile);
// // //   const { isAuthenticated, user } = useSelector((state: RootState) => state.auth);

// // //   useEffect(() => {
// // //     if (open && isAuthenticated && user?.id) {
// // //       fetchCVs();
// // //       fetchCoverLetters();
// // //     }
// // //   }, [open, isAuthenticated, user?.id]);

// // //   const fetchCVs = async () => {
// // //     try {
// // //       const token = localStorage.getItem('token');
// // //       const response = await fetch('/api/cv', {
// // //         headers: {
// // //           'Authorization': `Bearer ${token}`
// // //         }
// // //       });
      
// // //       if (response.ok) {
// // //         const cvData = await response.json();
// // //         setCVs(cvData);
        
// // //         // Establecer CV por defecto si existe
// // //         const defaultCV = cvData.find((cv: CV) => cv.isDefault) || (cvData.length > 0 ? cvData[0] : null);
// // //         if (defaultCV) {
// // //           setSelectedCV(defaultCV._id);
// // //         }
// // //       } else {
// // //         console.error('Error fetching CVs:', response.statusText);
// // //       }
// // //     } catch (error) {
// // //       console.error('Error fetching CVs:', error);
// // //     }
// // //   };

// // //   const fetchCoverLetters = async () => {
// // //     try {
// // //       const token = localStorage.getItem('token');
// // //       const response = await fetch('/api/coverletter', {
// // //         headers: {
// // //           'Authorization': `Bearer ${token}`
// // //         }
// // //       });
      
// // //       if (response.ok) {
// // //         const letters = await response.json();
// // //         setCoverLetters(letters);
        
// // //         // Establecer carta por defecto si existe
// // //         const defaultLetter = letters.find((letter: CoverLetter) => letter.isDefault) || (letters.length > 0 ? letters[0] : null);
// // //         if (defaultLetter) {
// // //           setSelectedCoverLetter(defaultLetter._id);
// // //         }
// // //       }
// // //     } catch (error) {
// // //       console.error('Error fetching cover letters:', error);
// // //     }
// // //   };

// // //   const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
// // //     setTabValue(newValue);
// // //   };

// // //   const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
// // //     const { name, value } = e.target;
// // //     setEmailData(prev => ({ ...prev, [name]: value }));
// // //   };

// // //   const generateEmailHTML = async (cvId: string, coverLetterId: string, customMessage: string = ''): Promise<string> => {
// // //     try {
// // //       // Obtener el CV seleccionado
// // //       const token = localStorage.getItem('token');
// // //       const cvResponse = await fetch(`/api/cv/${cvId}`, {
// // //         headers: {
// // //           'Authorization': `Bearer ${token}`
// // //         }
// // //       });
      
// // //       if (!cvResponse.ok) throw new Error('Error fetching CV');
// // //       const cvData = await cvResponse.json();

// // //       // Obtener la carta de presentación
// // //       let coverLetterContent = '';
// // //       if (coverLetterId) {
// // //         const letterResponse = await fetch(`/api/coverletter/${coverLetterId}`, {
// // //           headers: {
// // //             'Authorization': `Bearer ${token}`
// // //           }
// // //         });
        
// // //         if (letterResponse.ok) {
// // //           const letterData = await letterResponse.json();
// // //           coverLetterContent = letterData.content;
// // //         }
// // //       }

// // //       // Obtener datos del perfil del usuario
// // //       let userProfileData = null;
// // //       try {
// // //         const profileResponse = await fetch(`/api/profile/${user?.id}`, {
// // //           headers: {
// // //             'Authorization': `Bearer ${token}`
// // //           }
// // //         });
        
// // //         if (profileResponse.ok) {
// // //           userProfileData = await profileResponse.json();
// // //         }
// // //       } catch (error) {
// // //         console.error('Error fetching user profile:', error);
// // //       }

// // //       // Combinar datos del CV con datos del perfil
// // //       const combinedData = {
// // //         ...cvData,
// // //         // Sobrescribir con datos del perfil si están disponibles
// // //         fullname: userProfileData?.fullname || userProfile?.fullname || '',
// // //         email: userProfileData?.email || userProfile?.email || '',
// // //         phone: userProfileData?.phone || userProfile?.phone || '',
// // //         linkedin: userProfileData?.linkedin || userProfile?.linkedin || '',
// // //       };

// // //       // Generar HTML con estilo profesional
// // //       return `
// // //         <!DOCTYPE html>
// // //         <html>
// // //         <head>
// // //           <meta charset="utf-8">
// // //           <style>
// // //             body {
// // //               font-family: 'Arial', sans-serif;
// // //               line-height: 1.6;
// // //               color: #333;
// // //               max-width: 800px;
// // //               margin: 0 auto;
// // //               padding: 20px;
// // //             }
// // //             .header {
// // //               text-align: center;
// // //               margin-bottom: 30px;
// // //               border-bottom: 2px solid #2c5aa0;
// // //               padding-bottom: 20px;
// // //             }
// // //             .contact-info {
// // //               display: flex;
// // //               justify-content: center;
// // //               flex-wrap: wrap;
// // //               gap: 15px;
// // //               margin: 15px 0;
// // //             }
// // //             .section {
// // //               margin: 25px 0;
// // //             }
// // //             .section-title {
// // //               color: #2c5aa0;
// // //               border-bottom: 1px solid #eee;
// // //               padding-bottom: 5px;
// // //               margin-bottom: 15px;
// // //             }
// // //             .skills-container {
// // //               display: flex;
// // //               flex-wrap: wrap;
// // //               gap: 8px;
// // //             }
// // //             .skill-chip {
// // //               background-color: #e8f0fe;
// // //               color: #2c5aa0;
// // //               padding: 5px 12px;
// // //               border-radius: 15px;
// // //               font-size: 0.9em;
// // //             }
// // //             .experience-item, .education-item {
// // //               margin-bottom: 20px;
// // //             }
// // //             .date {
// // //               color: #666;
// // //               font-style: italic;
// // //             }
// // //             .cover-letter {
// // //               background-color: #f9f9f9;
// // //               padding: 20px;
// // //               border-left: 4px solid #2c5aa0;
// // //               margin: 20px 0;
// // //             }
// // //             .custom-message {
// // //               background-color: #fff8e1;
// // //               padding: 15px;
// // //               border-left: 4px solid #ffc107;
// // //               margin: 20px 0;
// // //               font-style: italic;
// // //             }
// // //             .footer {
// // //               text-align: center;
// // //               margin-top: 40px;
// // //               padding-top: 20px;
// // //               border-top: 1px solid #eee;
// // //               color: #666;
// // //               font-size: 0.9em;
// // //             }
// // //           </style>
// // //         </head>
// // //         <body>
// // //           <div class="header">
// // //             <h1>${combinedData.fullname || 'Curriculum Vitae'}</h1>
// // //             <div class="contact-info">
// // //               ${combinedData.email ? `<span>📧 ${combinedData.email}</span>` : ''}
// // //               ${combinedData.phone ? `<span>📞 ${combinedData.phone}</span>` : ''}
// // //               ${combinedData.linkedin ? `<span>🔗 ${combinedData.linkedin}</span>` : ''}
// // //               ${combinedData.address ? `<span>📍 ${combinedData.address}</span>` : ''}
// // //             </div>
// // //           </div>

// // //           ${customMessage ? `
// // //           <div class="custom-message">
// // //             <p>${customMessage.replace(/\n/g, '<br>')}</p>
// // //           </div>
// // //           ` : ''}

// // //           ${coverLetterContent ? `
// // //           <div class="cover-letter">
// // //             <h2 class="section-title">Carta de Presentación</h2>
// // //             <div>${coverLetterContent}</div>
// // //           </div>
// // //           ` : ''}

// // //           ${cvData.professional_summary ? `
// // //           <div class="section">
// // //             <h2 class="section-title">Resumen Profesional</h2>
// // //             <p>${cvData.professional_summary}</p>
// // //           </div>
// // //           ` : ''}

// // //           ${cvData.skills && Object.keys(cvData.skills).length > 0 ? `
// // //           <div class="section">
// // //             <h2 class="section-title">Habilidades</h2>
// // //             <div class="skills-container">
// // //               ${Object.entries(cvData.skills).map(([category, skills]: [string, any]) => 
// // //                 Array.isArray(skills) ? 
// // //                   skills.map((skill: string) => 
// // //                     `<span class="skill-chip">${skill}</span>`
// // //                   ).join('')
// // //                 : ''
// // //               ).join('')}
// // //             </div>
// // //           </div>
// // //           ` : ''}

// // //           ${cvData.work_experience && cvData.work_experience.length > 0 ? `
// // //           <div class="section">
// // //             <h2 class="section-title">Experiencia Laboral</h2>
// // //             ${cvData.work_experience.map((exp: any) => `
// // //               <div class="experience-item">
// // //                 <h3>${exp.position || ''}</h3>
// // //                 <div class="date">${exp.company || ''} | ${exp.period || ''}</div>
// // //                 ${exp.description ? `<ul>${Array.isArray(exp.description) ? 
// // //                   exp.description.map((desc: string) => `<li>${desc}</li>`).join('') 
// // //                   : `<li>${exp.description}</li>`}</ul>` : ''}
// // //               </div>
// // //             `).join('')}
// // //           </div>
// // //           ` : ''}

// // //           ${cvData.education && cvData.education.length > 0 ? `
// // //           <div class="section">
// // //             <h2 class="section-title">Formación Académica</h2>
// // //             ${cvData.education.map((edu: any) => `
// // //               <div class="education-item">
// // //                 <h3>${edu.degree || ''}</h3>
// // //                 <div class="date">${edu.institution || ''} | ${edu.period || ''}</div>
// // //                 ${edu.field_of_study ? `<div>${edu.field_of_study}</div>` : ''}
// // //               </div>
// // //             `).join('')}
// // //           </div>
// // //           ` : ''}

// // //           <div class="footer">
// // //             <p>Este CV fue generado automáticamente desde Mi Portfolio Profesional</p>
// // //           </div>
// // //         </body>
// // //         </html>
// // //       `;
// // //     } catch (error) {
// // //       console.error('Error generating email HTML:', error);
// // //       return '<p>Error al generar el contenido del email.</p>';
// // //     }
// // //   };

// // //   const handleSendEmail = async () => {
// // //     if (!emailData.to || !emailData.subject) {
// // //       setStatus({ type: 'error', message: 'Por favor, completa los campos obligatorios' });
// // //       return;
// // //     }

// // //     setLoading(true);
// // //     setStatus({ type: '', message: '' });

// // //     try {
// // //       let htmlContent = '';

// // //       if (tabValue === 0) { // Predeterminado
// // //         // Usar CV por defecto y carta por defecto
// // //         const defaultCV = cvs.find(cv => cv.isDefault) || cvs[0];
// // //         const defaultLetter = coverLetters.find(letter => letter.isDefault) || coverLetters[0];
        
// // //         if (!defaultCV) {
// // //           setStatus({ type: 'error', message: 'No hay CVs disponibles' });
// // //           setLoading(false);
// // //           return;
// // //         }
        
// // //         htmlContent = await generateEmailHTML(
// // //           defaultCV._id, 
// // //           defaultLetter?._id || '',
// // //           emailData.message
// // //         );
// // //       } else if (tabValue === 1) { // Selección
// // //         if (!selectedCV) {
// // //           setStatus({ type: 'error', message: 'Por favor, selecciona un CV' });
// // //           setLoading(false);
// // //           return;
// // //         }
        
// // //         htmlContent = await generateEmailHTML(
// // //           selectedCV, 
// // //           selectedCoverLetter,
// // //           emailData.message
// // //         );
// // //       } else { // Inteligente (placeholder)
// // //         setStatus({ type: 'error', message: 'Función inteligente no implementada aún' });
// // //         setLoading(false);
// // //         return;
// // //       }

// // //       const emailPayload: EmailData = {
// // //         to: emailData.to,
// // //         subject: emailData.subject,
// // //         html: htmlContent
// // //       };

// // //       const token = localStorage.getItem('token');
// // //       const response = await fetch('/api/email/send', {
// // //         method: 'POST',
// // //         headers: {
// // //           'Content-Type': 'application/json',
// // //           'Authorization': `Bearer ${token}`
// // //         },
// // //         body: JSON.stringify(emailPayload)
// // //       });

// // //       if (response.ok) {
// // //         setStatus({ type: 'success', message: 'Email enviado correctamente' });
// // //         setEmailData({ to: '', subject: '', message: '' });
// // //         setTimeout(() => onClose(), 2000);
// // //       } else {
// // //         const errorData = await response.json();
// // //         setStatus({ type: 'error', message: errorData.error || 'Error al enviar el email' });
// // //       }
// // //     } catch (error) {
// // //       console.error('Error sending email:', error);
// // //       setStatus({ type: 'error', message: 'Error al enviar el email' });
// // //     } finally {
// // //       setLoading(false);
// // //     }
// // //   };

// // //   return (
// // //     <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
// // //       <DialogTitle>
// // //         <Box display="flex" alignItems="center">
// // //           <Email sx={{ mr: 1 }} />
// // //           Enviar Email
// // //         </Box>
// // //       </DialogTitle>
      
// // //       <DialogContent>
// // //         <Box sx={{ borderBottom: 1, borderColor: 'divider', mb: 2 }}>
// // //           <Tabs value={tabValue} onChange={handleTabChange}>
// // //             <Tab label="Predeterminado" />
// // //             <Tab label="Selección" />
// // //             <Tab label="Inteligente" disabled />
// // //           </Tabs>
// // //         </Box>

// // //         {status.message && (
// // //           <Alert severity={status.type as any} sx={{ mb: 2 }}>
// // //             {status.message}
// // //           </Alert>
// // //         )}

// // //         <TextField
// // //           fullWidth
// // //           label="Destinatario"
// // //           name="to"
// // //           value={emailData.to}
// // //           onChange={handleInputChange}
// // //           required
// // //           sx={{ mb: 2 }}
// // //         />

// // //         <TextField
// // //           fullWidth
// // //           label="Asunto"
// // //           name="subject"
// // //           value={emailData.subject}
// // //           onChange={handleInputChange}
// // //           required
// // //           sx={{ mb: 2 }}
// // //         />

// // //         <TextField
// // //           fullWidth
// // //           label="Mensaje personalizado (opcional)"
// // //           name="message"
// // //           value={emailData.message}
// // //           onChange={handleInputChange}
// // //           multiline
// // //           rows={3}
// // //           sx={{ mb: 2 }}
// // //         />

// // //         {tabValue === 1 && (
// // //           <>
// // //             <FormControl fullWidth sx={{ mb: 2 }}>
// // //               <InputLabel>Seleccionar CV</InputLabel>
// // //               <Select
// // //                 value={selectedCV}
// // //                 label="Seleccionar CV"
// // //                 onChange={(e) => setSelectedCV(e.target.value)}
// // //               >
// // //                 {cvs.map((cv) => (
// // //                   <MenuItem key={cv._id} value={cv._id}>
// // //                     {cv.profile}
// // //                   </MenuItem>
// // //                 ))}
// // //               </Select>
// // //             </FormControl>

// // //             <FormControl fullWidth sx={{ mb: 2 }}>
// // //               <InputLabel>Seleccionar Carta de Presentación</InputLabel>
// // //               <Select
// // //                 value={selectedCoverLetter}
// // //                 label="Seleccionar Carta de Presentación"
// // //                 onChange={(e) => setSelectedCoverLetter(e.target.value)}
// // //               >
// // //                 {coverLetters.map((letter) => (
// // //                   <MenuItem key={letter._id} value={letter._id}>
// // //                     {letter.title}
// // //                   </MenuItem>
// // //                 ))}
// // //               </Select>
// // //             </FormControl>
// // //           </>
// // //         )}

// // //         {tabValue === 2 && (
// // //           <Paper variant="outlined" sx={{ p: 2, textAlign: 'center', bgcolor: 'grey.50' }}>
// // //             <Typography variant="body2" color="text.secondary">
// // //               La función inteligente analizará automáticamente el puesto de trabajo y seleccionará
// // //               el CV y carta de presentación más adecuados. (Próximamente)
// // //             </Typography>
// // //           </Paper>
// // //         )}
// // //       </DialogContent>

// // //       <DialogActions>
// // //         <Button onClick={onClose}>Cancelar</Button>
// // //         <Button
// // //           onClick={handleSendEmail}
// // //           disabled={loading}
// // //           variant="contained"
// // //           startIcon={loading ? <CircularProgress size={16} /> : <Send />}
// // //         >
// // //           {loading ? 'Enviando...' : 'Enviar Email'}
// // //         </Button>
// // //       </DialogActions>
// // //     </Dialog>
// // //   );
// // // };

// // // export default EmailSender;


// // 'use client';

// // import React, { useState, useEffect } from 'react';
// // import {
// //   Box,
// //   Tabs,
// //   Tab,
// //   Typography,
// //   Button,
// //   FormControl,
// //   InputLabel,
// //   Select,
// //   MenuItem,
// //   TextField,
// //   Paper,
// //   Alert,
// //   CircularProgress,
// //   Dialog,
// //   DialogTitle,
// //   DialogContent,
// //   DialogActions,
// //   IconButton,
// //   Divider,
// //   Stack,
// //   Chip,
// //   List,
// //   ListItem,
// //   ListItemText,
// //   Collapse,
// // } from '@mui/material';
// // import {
// //   Send,
// //   Email,
// //   Close,
// //   ExpandMore,
// //   ExpandLess,
// //   Preview,
// // } from '@mui/icons-material';
// // import { useSelector } from 'react-redux';
// // import { RootState } from '@/store/store';

// // interface EmailData {
// //   to: string;
// //   subject: string;
// //   html: string;
// //   from?: string;
// // }

// // interface CoverLetter {
// //   _id: string;
// //   title: string;
// //   content: string;
// //   isDefault?: boolean;
// // }

// // interface SkillSet {
// //   languages?: string[];
// //   frameworks_libraries?: string[];
// //   databases?: string[];
// //   tools_environments?: string[];
// //   methodologies?: string[];
// //   security?: string[];
// //   mobile?: string[];
// //   analysis_management?: string[];
// //   communication?: string[];
// //   [key: string]: string[] | undefined;
// // }

// // interface WorkExperience {
// //   position?: string;
// //   company?: string;
// //   period?: string;
// //   description?: string[];
// // }

// // interface Education {
// //   degree?: string;
// //   institution?: string;
// //   field_of_study?: string;
// //   period?: string;
// //   description?: string[];
// // }

// // interface Course {
// //   name?: string;
// //   institution?: string;
// //   completion_date?: string;
// //   duration_hours?: string;
// //   certificate_url?: string;
// //   description?: string[];
// // }

// // interface CV {
// //   _id: string;
// //   profile: string;
// //   isDefault?: boolean;
// //   user?: string;
// //   professional_summary?: string;
// //   skills?: SkillSet;
// //   work_experience?: WorkExperience[];
// //   education?: Education[];
// //   courses?: Course[];
// // }

// // interface EmailSenderProps {
// //   open: boolean;
// //   onClose: () => void;
// // }

// // interface CVPreviewModalProps {
// //   open: boolean;
// //   onClose: () => void;
// //   cv: CV;
// //   title?: string;
// // }

// // const CVPreviewModal: React.FC<CVPreviewModalProps> = ({
// //   open,
// //   onClose,
// //   cv,
// //   title = "Vista Previa del CV"
// // }) => {
// //   const [expandedSections, setExpandedSections] = useState<Record<string, boolean>>({
// //     skills: true,
// //     experience: true,
// //     education: true,
// //     courses: true
// //   });

// //   const toggleSection = (section: string) => {
// //     setExpandedSections(prev => ({
// //       ...prev,
// //       [section]: !prev[section]
// //     }));
// //   };

// //   const renderSkillsSection = () => {
// //     const skillCategories = [
// //       { key: 'languages', label: 'Lenguajes' },
// //       { key: 'frameworks_libraries', label: 'Frameworks y Librerías' },
// //       { key: 'databases', label: 'Bases de Datos' },
// //       { key: 'tools_environments', label: 'Herramientas y Entornos' },
// //       { key: 'methodologies', label: 'Metodologías' },
// //       { key: 'security', label: 'Seguridad' },
// //       { key: 'mobile', label: 'Móvil' },
// //       { key: 'analysis_management', label: 'Análisis y Gestión' },
// //       { key: 'communication', label: 'Comunicación' },
// //     ] as const;

// //     return (
// //       <Box mb={3}>
// //         <Box 
// //           display="flex" 
// //           justifyContent="space-between" 
// //           alignItems="center" 
// //           mb={2}
// //           sx={{ cursor: 'pointer' }}
// //           onClick={() => toggleSection('skills')}
// //         >
// //           <Typography variant="h5">Habilidades</Typography>
// //           <IconButton size="small">
// //             {expandedSections.skills ? <ExpandLess /> : <ExpandMore />}
// //           </IconButton>
// //         </Box>

// //         <Collapse in={expandedSections.skills}>
// //           {skillCategories.map(({ key, label }) => (
// //             cv.skills && cv.skills[key] && cv.skills[key]!.length > 0 && (
// //               <Box key={key} mb={2}>
// //                 <Typography variant="h6" gutterBottom>
// //                   {label}
// //                 </Typography>
// //                 <Stack direction="row" spacing={1} flexWrap="wrap" useFlexGap>
// //                   {cv.skills[key]!.map((skill: string, index: number) => (
// //                     <Chip key={index} label={skill} variant="outlined" sx={{ mb: 1 }} />
// //                   ))}
// //                 </Stack>
// //               </Box>
// //             )
// //           ))}
// //         </Collapse>
// //       </Box>
// //     );
// //   };

// //   const renderWorkExperience = () => {
// //     if (!cv.work_experience || cv.work_experience.length === 0) return null;

// //     return (
// //       <Box>
// //         <Box 
// //           display="flex" 
// //           justifyContent="space-between" 
// //           alignItems="center" 
// //           mb={2}
// //           sx={{ cursor: 'pointer' }}
// //           onClick={() => toggleSection('experience')}
// //         >
// //           <Typography variant="h5">Experiencia Laboral</Typography>
// //           <IconButton size="small">
// //             {expandedSections.experience ? <ExpandLess /> : <ExpandMore />}
// //           </IconButton>
// //         </Box>

// //         <Collapse in={expandedSections.experience}>
// //           <List>
// //             {cv.work_experience.map((exp, index) => (
// //               <ListItem key={index} alignItems="flex-start" sx={{ flexDirection: 'column', alignItems: 'flex-start' }}>
// //                 <ListItemText
// //                   primary={
// //                     <Box display="flex" justifyContent="space-between" flexWrap="wrap" width="100%">
// //                       <Typography variant="h6">{exp.position || 'Posición no especificada'}</Typography>
// //                       <Typography variant="body2" color="text.secondary">
// //                         {exp.period || 'Período no especificado'}
// //                       </Typography>
// //                     </Box>
// //                   }
// //                   secondary={
// //                     <>
// //                       <Typography variant="subtitle1" color="text.primary" sx={{ mt: 1 }}>
// //                         {exp.company || 'Empresa no especificada'}
// //                       </Typography>
// //                       {exp.description && exp.description.length > 0 && (
// //                         <Box component="ul" sx={{ pl: 2, mt: 1, mb: 0 }}>
// //                           {exp.description.map((desc, i) => (
// //                             <Typography
// //                               key={i}
// //                               variant="body2"
// //                               component="li"
// //                               sx={{ mb: 0.5 }}
// //                             >
// //                               {desc}
// //                             </Typography>
// //                           ))}
// //                         </Box>
// //                       )}
// //                     </>
// //                   }
// //                 />
// //                 {index < cv.work_experience!.length - 1 && (
// //                   <Divider sx={{ width: '100%', my: 2 }} />
// //                 )}
// //               </ListItem>
// //             ))}
// //           </List>
// //         </Collapse>
// //       </Box>
// //     );
// //   };

// //   const renderEducation = () => {
// //     if (!cv.education || cv.education.length === 0) return null;

// //     return (
// //       <Box>
// //         <Box 
// //           display="flex" 
// //           justifyContent="space-between" 
// //           alignItems="center" 
// //           mb={2}
// //           sx={{ cursor: 'pointer' }}
// //           onClick={() => toggleSection('education')}
// //         >
// //           <Typography variant="h5">Educación</Typography>
// //           <IconButton size="small">
// //             {expandedSections.education ? <ExpandLess /> : <ExpandMore />}
// //           </IconButton>
// //         </Box>

// //         <Collapse in={expandedSections.education}>
// //           <List>
// //             {cv.education.map((edu, index) => (
// //               <ListItem key={index} alignItems="flex-start" sx={{ flexDirection: 'column', alignItems: 'flex-start' }}>
// //                 <ListItemText
// //                   primary={
// //                     <Box display="flex" justifyContent="space-between" flexWrap="wrap" width="100%">
// //                       <Typography variant="h6">{edu.degree || 'Título no especificado'}</Typography>
// //                       <Typography variant="body2" color="text.secondary">
// //                         {edu.period || 'Período no especificado'}
// //                       </Typography>
// //                     </Box>
// //                   }
// //                   secondary={
// //                     <>
// //                       <Typography variant="subtitle1" color="text.primary" sx={{ mt: 1 }}>
// //                         {edu.institution || 'Institución no especificada'} 
// //                         {edu.field_of_study && ` - ${edu.field_of_study}`}
// //                       </Typography>
// //                       {edu.description && edu.description.length > 0 && (
// //                         <Box component="ul" sx={{ pl: 2, mt: 1, mb: 0 }}>
// //                           {edu.description.map((desc, i) => (
// //                             <Typography
// //                               key={i}
// //                               variant="body2"
// //                               component="li"
// //                               sx={{ mb: 0.5 }}
// //                             >
// //                               {desc}
// //                             </Typography>
// //                           ))}
// //                         </Box>
// //                       )}
// //                     </>
// //                   }
// //                 />
// //                 {index < cv.education!.length - 1 && (
// //                   <Divider sx={{ width: '100%', my: 2 }} />
// //                 )}
// //               </ListItem>
// //             ))}
// //           </List>
// //         </Collapse>
// //       </Box>
// //     );
// //   };

// //   const renderCourses = () => {
// //     if (!cv.courses || cv.courses.length === 0) return null;

// //     return (
// //       <Box>
// //         <Box 
// //           display="flex" 
// //           justifyContent="space-between" 
// //           alignItems="center" 
// //           mb={2}
// //           sx={{ cursor: 'pointer' }}
// //           onClick={() => toggleSection('courses')}
// //         >
// //           <Typography variant="h5">Cursos y Certificaciones</Typography>
// //           <IconButton size="small">
// //             {expandedSections.courses ? <ExpandLess /> : <ExpandMore />}
// //           </IconButton>
// //         </Box>

// //         <Collapse in={expandedSections.courses}>
// //           <List>
// //             {cv.courses.map((course, index) => (
// //               <ListItem key={index} alignItems="flex-start" sx={{ flexDirection: 'column', alignItems: 'flex-start' }}>
// //                 <ListItemText
// //                   primary={
// //                     <Box display="flex" justifyContent="space-between" flexWrap="wrap" width="100%">
// //                       <Typography variant="h6">{course.name || 'Curso no especificado'}</Typography>
// //                       <Typography variant="body2" color="text.secondary">
// //                         {course.completion_date || 'Fecha no especificada'}
// //                       </Typography>
// //                     </Box>
// //                   }
// //                   secondary={
// //                     <>
// //                       <Typography variant="subtitle1" color="text.primary" sx={{ mt: 1 }}>
// //                         {course.institution || 'Institución no especificada'} 
// //                         {course.duration_hours && ` - ${course.duration_hours} horas`}
// //                       </Typography>
// //                       {course.certificate_url && (
// //                         <Typography variant="body2" sx={{ mt: 0.5 }}>
// //                           <a href={course.certificate_url} target="_blank" rel="noopener noreferrer">
// //                             Ver certificado
// //                           </a>
// //                         </Typography>
// //                       )}
// //                       {course.description && course.description.length > 0 && (
// //                         <Box component="ul" sx={{ pl: 2, mt: 1, mb: 0 }}>
// //                           {course.description.map((desc, i) => (
// //                             <Typography
// //                               key={i}
// //                               variant="body2"
// //                               component="li"
// //                               sx={{ mb: 0.5 }}
// //                             >
// //                               {desc}
// //                             </Typography>
// //                           ))}
// //                         </Box>
// //                       )}
// //                     </>
// //                   }
// //                 />
// //                 {index < cv.courses!.length - 1 && (
// //                   <Divider sx={{ width: '100%', my: 2 }} />
// //                 )}
// //               </ListItem>
// //             ))}
// //           </List>
// //         </Collapse>
// //       </Box>
// //     );
// //   };

// //   return (
// //     <Dialog
// //       open={open}
// //       onClose={onClose}
// //       maxWidth="lg"
// //       fullWidth
// //       sx={{
// //         '& .MuiDialog-paper': {
// //           height: '90vh',
// //           maxHeight: '90vh'
// //         }
// //       }}
// //     >
// //       <DialogTitle sx={{ m: 0, p: 2, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
// //         {title}
// //         <IconButton
// //           aria-label="close"
// //           onClick={onClose}
// //           sx={{ color: (theme) => theme.palette.grey[500] }}
// //         >
// //           <Close />
// //         </IconButton>
// //       </DialogTitle>

// //       <DialogContent dividers sx={{ overflow: 'auto' }}>
// //         <Paper elevation={0} sx={{ p: 3 }}>
// //           {/* Profile Section */}
// //           <Box mb={3}>
// //             <Typography variant="h4" gutterBottom>
// //               {cv.profile}
// //             </Typography>
// //             {cv.professional_summary && (
// //               <Typography variant="body1" color="text.secondary">
// //                 {cv.professional_summary}
// //               </Typography>
// //             )}
// //           </Box>

// //           <Divider sx={{ my: 2 }} />

// //           {/* Skills Section */}
// //           {cv.skills && Object.keys(cv.skills).length > 0 && renderSkillsSection()}

// //           {cv.work_experience && cv.work_experience.length > 0 && (
// //             <>
// //               <Divider sx={{ my: 2 }} />
// //               {renderWorkExperience()}
// //             </>
// //           )}

// //           {cv.education && cv.education.length > 0 && (
// //             <>
// //               <Divider sx={{ my: 2 }} />
// //               {renderEducation()}
// //             </>
// //           )}

// //           {cv.courses && cv.courses.length > 0 && (
// //             <>
// //               <Divider sx={{ my: 2 }} />
// //               {renderCourses()}
// //             </>
// //           )}
// //         </Paper>
// //       </DialogContent>
// //     </Dialog>
// //   );
// // };

// // const EmailSender: React.FC<EmailSenderProps> = ({ open, onClose }) => {
// //   const [tabValue, setTabValue] = useState(0);
// //   const [selectedCV, setSelectedCV] = useState('');
// //   const [selectedCoverLetter, setSelectedCoverLetter] = useState('');
// //   const [coverLetters, setCoverLetters] = useState<CoverLetter[]>([]);
// //   const [cvs, setCVs] = useState<CV[]>([]);
// //   const [emailData, setEmailData] = useState({
// //     to: '',
// //     subject: '',
// //     message: ''
// //   });
// //   const [loading, setLoading] = useState(false);
// //   const [status, setStatus] = useState<{ type: 'success' | 'error' | ''; message: string }>({ type: '', message: '' });
// //   const [previewCV, setPreviewCV] = useState<CV | null>(null);
// //   const [previewOpen, setPreviewOpen] = useState(false);

// //   const userProfile = useSelector((state: RootState) => state.profiles.profile);
// //   const { isAuthenticated, user } = useSelector((state: RootState) => state.auth);

// //   useEffect(() => {
// //     if (open && isAuthenticated && user?.id) {
// //       fetchCVs();
// //       fetchCoverLetters();
// //     }
// //   }, [open, isAuthenticated, user?.id]);

// //   const fetchCVs = async () => {
// //     try {
// //       const token = localStorage.getItem('token');
// //       const response = await fetch('/api/cv', {
// //         headers: {
// //           'Authorization': `Bearer ${token}`
// //         }
// //       });
      
// //       if (response.ok) {
// //         const cvData = await response.json();
// //         setCVs(cvData);
        
// //         // Establecer CV por defecto si existe
// //         const defaultCV = cvData.find((cv: CV) => cv.isDefault) || (cvData.length > 0 ? cvData[0] : null);
// //         if (defaultCV) {
// //           setSelectedCV(defaultCV._id);
// //         }
// //       } else {
// //         console.error('Error fetching CVs:', response.statusText);
// //       }
// //     } catch (error) {
// //       console.error('Error fetching CVs:', error);
// //     }
// //   };

// //   const fetchCoverLetters = async () => {
// //     try {
// //       const token = localStorage.getItem('token');
// //       const response = await fetch('/api/coverletter', {
// //         headers: {
// //           'Authorization': `Bearer ${token}`
// //         }
// //       });
      
// //       if (response.ok) {
// //         const letters = await response.json();
// //         setCoverLetters(letters);
        
// //         // Establecer carta por defecto si existe
// //         const defaultLetter = letters.find((letter: CoverLetter) => letter.isDefault) || (letters.length > 0 ? letters[0] : null);
// //         if (defaultLetter) {
// //           setSelectedCoverLetter(defaultLetter._id);
// //         }
// //       }
// //     } catch (error) {
// //       console.error('Error fetching cover letters:', error);
// //     }
// //   };

// //   const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
// //     setTabValue(newValue);
// //   };

// //   const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
// //     const { name, value } = e.target;
// //     setEmailData(prev => ({ ...prev, [name]: value }));
// //   };

// //   const handlePreview = async (id: string) => {
// //     try {
// //       const token = localStorage.getItem('token');
// //       const response = await fetch(`/api/cv/${id}`, {
// //         headers: {
// //           'Authorization': `Bearer ${token}`
// //         }
// //       });
      
// //       if (response.ok) {
// //         const cvData = await response.json();
// //         setPreviewCV(cvData);
// //         setPreviewOpen(true);
// //       }
// //     } catch (error) {
// //       console.error('Error fetching CV preview:', error);
// //     }
// //   };

// //   const generateEmailHTML = async (cvId: string, coverLetterId: string, customMessage: string = ''): Promise<string> => {
// //     try {
// //       // Obtener el CV seleccionado
// //       const token = localStorage.getItem('token');
// //       const cvResponse = await fetch(`/api/cv/${cvId}`, {
// //         headers: {
// //           'Authorization': `Bearer ${token}`
// //         }
// //       });
      
// //       if (!cvResponse.ok) throw new Error('Error fetching CV');
// //       const cvData = await cvResponse.json();

// //       // Obtener la carta de presentación
// //       let coverLetterContent = '';
// //       if (coverLetterId) {
// //         const letterResponse = await fetch(`/api/coverletter/${coverLetterId}`, {
// //           headers: {
// //             'Authorization': `Bearer ${token}`
// //           }
// //         });
        
// //         if (letterResponse.ok) {
// //           const letterData = await letterResponse.json();
// //           coverLetterContent = letterData.content;
// //         }
// //       }

// //       // Obtener datos del perfil del usuario
// //       let userProfileData = null;
// //       try {
// //         const profileResponse = await fetch(`/api/profile/${user?.id}`, {
// //           headers: {
// //             'Authorization': `Bearer ${token}`
// //           }
// //         });
        
// //         if (profileResponse.ok) {
// //           userProfileData = await profileResponse.json();
// //         }
// //       } catch (error) {
// //         console.error('Error fetching user profile:', error);
// //       }

// //       // Combinar datos del CV con datos del perfil
// //       const combinedData = {
// //         ...cvData,
// //         // Sobrescribir con datos del perfil si están disponibles
// //         fullname: userProfileData?.fullname || userProfile?.fullname || '',
// //         email: userProfileData?.email || userProfile?.email || '',
// //         phone: userProfileData?.phone || userProfile?.phone || '',
// //         linkedin: userProfileData?.linkedin || userProfile?.linkedin || '',
// //       };

// //       // Generar HTML con estilo profesional
// //       return `
// //         <!DOCTYPE html>
// //         <html>
// //         <head>
// //           <meta charset="utf-8">
// //           <style>
// //             body {
// //               font-family: 'Arial', sans-serif;
// //               line-height: 1.6;
// //               color: #333;
// //               max-width: 800px;
// //               margin: 0 auto;
// //               padding: 20px;
// //             }
// //             .header {
// //               text-align: center;
// //               margin-bottom: 30px;
// //               border-bottom: 2px solid #2c5aa0;
// //               padding-bottom: 20px;
// //             }
// //             .contact-info {
// //               display: flex;
// //               justify-content: center;
// //               flex-wrap: wrap;
// //               gap: 15px;
// //               margin: 15px 0;
// //             }
// //             .section {
// //               margin: 25px 0;
// //             }
// //             .section-title {
// //               color: #2c5aa0;
// //               border-bottom: 1px solid #eee;
// //               padding-bottom: 5px;
// //               margin-bottom: 15px;
// //             }
// //             .skills-container {
// //               display: flex;
// //               flex-wrap: wrap;
// //               gap: 8px;
// //             }
// //             .skill-chip {
// //               background-color: #e8f0fe;
// //               color: #2c5aa0;
// //               padding: 5px 12px;
// //               border-radius: 15px;
// //               font-size: 0.9em;
// //             }
// //             .experience-item, .education-item {
// //               margin-bottom: 20px;
// //             }
// //             .date {
// //               color: #666;
// //               font-style: italic;
// //             }
// //             .cover-letter {
// //               background-color: #f9f9f9;
// //               padding: 20px;
// //               border-left: 4px solid #2c5aa0;
// //               margin: 20px 0;
// //             }
// //             .custom-message {
// //               background-color: #fff8e1;
// //               padding: 15px;
// //               border-left: 4px solid #ffc107;
// //               margin: 20px 0;
// //               font-style: italic;
// //             }
// //             .footer {
// //               text-align: center;
// //               margin-top: 40px;
// //               padding-top: 20px;
// //               border-top: 1px solid #eee;
// //               color: #666;
// //               font-size: 0.9em;
// //             }
// //           </style>
// //         </head>
// //         <body>
// //           <div class="header">
// //             <h1>${combinedData.fullname || 'Curriculum Vitae'}</h1>
// //             <div class="contact-info">
// //               ${combinedData.email ? `<span>📧 ${combinedData.email}</span>` : ''}
// //               ${combinedData.phone ? `<span>📞 ${combinedData.phone}</span>` : ''}
// //               ${combinedData.linkedin ? `<span>🔗 ${combinedData.linkedin}</span>` : ''}
// //               ${combinedData.address ? `<span>📍 ${combinedData.address}</span>` : ''}
// //             </div>
// //           </div>

// //           ${customMessage ? `
// //           <div class="custom-message">
// //             <p>${customMessage.replace(/\n/g, '<br>')}</p>
// //           </div>
// //           ` : ''}

// //           ${coverLetterContent ? `
// //           <div class="cover-letter">
// //             <h2 class="section-title">Carta de Presentación</h2>
// //             <div>${coverLetterContent}</div>
// //           </div>
// //           ` : ''}

// //           ${cvData.professional_summary ? `
// //           <div class="section">
// //             <h2 class="section-title">Resumen Profesional</h2>
// //             <p>${cvData.professional_summary}</p>
// //           </div>
// //           ` : ''}

// //           ${cvData.skills && Object.keys(cvData.skills).length > 0 ? `
// //           <div class="section">
// //             <h2 class="section-title">Habilidades</h2>
// //             <div class="skills-container">
// //               ${Object.entries(cvData.skills).map(([category, skills]: [string, any]) => 
// //                 Array.isArray(skills) ? 
// //                   skills.map((skill: string) => 
// //                     `<span class="skill-chip">${skill}</span>`
// //                   ).join('')
// //                 : ''
// //               ).join('')}
// //             </div>
// //           </div>
// //           ` : ''}

// //           ${cvData.work_experience && cvData.work_experience.length > 0 ? `
// //           <div class="section">
// //             <h2 class="section-title">Experiencia Laboral</h2>
// //             ${cvData.work_experience.map((exp: any) => `
// //               <div class="experience-item">
// //                 <h3>${exp.position || ''}</h3>
// //                 <div class="date">${exp.company || ''} | ${exp.period || ''}</div>
// //                 ${exp.description ? `<ul>${Array.isArray(exp.description) ? 
// //                   exp.description.map((desc: string) => `<li>${desc}</li>`).join('') 
// //                   : `<li>${exp.description}</li>`}</ul>` : ''}
// //               </div>
// //             `).join('')}
// //           </div>
// //           ` : ''}

// //           ${cvData.education && cvData.education.length > 0 ? `
// //           <div class="section">
// //             <h2 class="section-title">Formación Académica</h2>
// //             ${cvData.education.map((edu: any) => `
// //               <div class="education-item">
// //                 <h3>${edu.degree || ''}</h3>
// //                 <div class="date">${edu.institution || ''} | ${edu.period || ''}</div>
// //                 ${edu.field_of_study ? `<div>${edu.field_of_study}</div>` : ''}
// //               </div>
// //             `).join('')}
// //           </div>
// //           ` : ''}

// //           <div class="footer">
// //             <p>Este CV fue generado automáticamente desde Mi Portfolio Profesional</p>
// //           </div>
// //         </body>
// //         </html>
// //       `;
// //     } catch (error) {
// //       console.error('Error generating email HTML:', error);
// //       return '<p>Error al generar el contenido del email.</p>';
// //     }
// //   };

// //   const handleSendEmail = async () => {
// //     if (!emailData.to || !emailData.subject) {
// //       setStatus({ type: 'error', message: 'Por favor, completa los campos obligatorios' });
// //       return;
// //     }

// //     setLoading(true);
// //     setStatus({ type: '', message: '' });

// //     try {
// //       let htmlContent = '';

// //       if (tabValue === 0) { // Predeterminado
// //         // Usar CV por defecto y carta por defecto
// //         const defaultCV = cvs.find(cv => cv.isDefault) || cvs[0];
// //         const defaultLetter = coverLetters.find(letter => letter.isDefault) || coverLetters[0];
        
// //         if (!defaultCV) {
// //           setStatus({ type: 'error', message: 'No hay CVs disponibles' });
// //           setLoading(false);
// //           return;
// //         }
        
// //         htmlContent = await generateEmailHTML(
// //           defaultCV._id, 
// //           defaultLetter?._id || '',
// //           emailData.message
// //         );
// //       } else if (tabValue === 1) { // Selección
// //         if (!selectedCV) {
// //           setStatus({ type: 'error', message: 'Por favor, selecciona un CV' });
// //           setLoading(false);
// //           return;
// //         }
        
// //         htmlContent = await generateEmailHTML(
// //           selectedCV, 
// //           selectedCoverLetter,
// //           emailData.message
// //         );
// //       } else { // Inteligente (placeholder)
// //         setStatus({ type: 'error', message: 'Función inteligente no implementada aún' });
// //         setLoading(false);
// //         return;
// //       }

// //       const emailPayload: EmailData = {
// //         to: emailData.to,
// //         subject: emailData.subject,
// //         html: htmlContent
// //       };

// //       const token = localStorage.getItem('token');
// //       const response = await fetch('/api/email/send', {
// //         method: 'POST',
// //         headers: {
// //           'Content-Type': 'application/json',
// //           'Authorization': `Bearer ${token}`
// //         },
// //         body: JSON.stringify(emailPayload)
// //       });

// //       if (response.ok) {
// //         setStatus({ type: 'success', message: 'Email enviado correctamente' });
// //         setEmailData({ to: '', subject: '', message: '' });
// //         setTimeout(() => onClose(), 2000);
// //       } else {
// //         const errorData = await response.json();
// //         setStatus({ type: 'error', message: errorData.error || 'Error al enviar el email' });
// //       }
// //     } catch (error) {
// //       console.error('Error sending email:', error);
// //       setStatus({ type: 'error', message: 'Error al enviar el email' });
// //     } finally {
// //       setLoading(false);
// //     }
// //   };

// //   return (
// //     <>
// //       <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
// //         <DialogTitle>
// //           <Box display="flex" alignItems="center">
// //             <Email sx={{ mr: 1 }} />
// //             Enviar Email
// //           </Box>
// //         </DialogTitle>
        
// //         <DialogContent>
// //           <Box sx={{ borderBottom: 1, borderColor: 'divider', mb: 2 }}>
// //             <Tabs value={tabValue} onChange={handleTabChange}>
// //               <Tab label="Predeterminado" />
// //               <Tab label="Selección" />
// //               <Tab label="Inteligente" disabled />
// //             </Tabs>
// //           </Box>

// //           {status.message && (
// //             <Alert severity={status.type as any} sx={{ mb: 2 }}>
// //               {status.message}
// //             </Alert>
// //           )}

// //           <TextField
// //             fullWidth
// //             label="Destinatario"
// //             name="to"
// //             value={emailData.to}
// //             onChange={handleInputChange}
// //             required
// //             sx={{ mb: 2 }}
// //           />

// //           <TextField
// //             fullWidth
// //             label="Asunto"
// //             name="subject"
// //             value={emailData.subject}
// //             onChange={handleInputChange}
// //             required
// //             sx={{ mb: 2 }}
// //           />

// //           <TextField
// //             fullWidth
// //             label="Mensaje personalizado (opcional)"
// //             name="message"
// //             value={emailData.message}
// //             onChange={handleInputChange}
// //             multiline
// //             rows={3}
// //             sx={{ mb: 2 }}
// //           />

// //           {tabValue === 1 && (
// //             <>
// //               <FormControl fullWidth sx={{ mb: 2 }}>
// //                 <Box display="flex" alignItems="center" justifyContent="space-between">
// //                   <InputLabel>Seleccionar CV</InputLabel>
// //                   <IconButton 
// //                     size="small" 
// //                     onClick={() => selectedCV && handlePreview(selectedCV)}
// //                     disabled={!selectedCV}
// //                     sx={{ mr: 1 }}
// //                   >
// //                     <Preview />
// //                   </IconButton>
// //                 </Box>
// //                 <Select
// //                   value={selectedCV}
// //                   label="Seleccionar CV"
// //                   onChange={(e) => setSelectedCV(e.target.value)}
// //                 >
// //                   {cvs.map((cv) => (
// //                     <MenuItem key={cv._id} value={cv._id}>
// //                       {cv.profile}
// //                     </MenuItem>
// //                   ))}
// //                 </Select>
// //               </FormControl>

// //               <FormControl fullWidth sx={{ mb: 2 }}>
// //                 <InputLabel>Seleccionar Carta de Presentación</InputLabel>
// //                 <Select
// //                   value={selectedCoverLetter}
// //                   label="Seleccionar Carta de Presentación"
// //                   onChange={(e) => setSelectedCoverLetter(e.target.value)}
// //                 >
// //                   {coverLetters.map((letter) => (
// //                     <MenuItem key={letter._id} value={letter._id}>
// //                       {letter.title}
// //                     </MenuItem>
// //                   ))}
// //                 </Select>
// //               </FormControl>
// //             </>
// //           )}

// //           {tabValue === 2 && (
// //             <Paper variant="outlined" sx={{ p: 2, textAlign: 'center', bgcolor: 'grey.50' }}>
// //               <Typography variant="body2" color="text.secondary">
// //                 La función inteligente analizará automáticamente el puesto de trabajo y seleccionará
// //                 el CV y carta de presentación más adecuados. (Próximamente)
// //               </Typography>
// //             </Paper>
// //           )}
// //         </DialogContent>

// //         <DialogActions>
// //           <Button onClick={onClose}>Cancelar</Button>
// //           <Button
// //             onClick={handleSendEmail}
// //             disabled={loading}
// //             variant="contained"
// //             startIcon={loading ? <CircularProgress size={16} /> : <Send />}
// //           >
// //             {loading ? 'Enviando...' : 'Enviar Email'}
// //           </Button>
// //         </DialogActions>
// //       </Dialog>

// //       {previewCV && (
// //         <CVPreviewModal
// //           open={previewOpen}
// //           onClose={() => setPreviewOpen(false)}
// //           cv={previewCV}
// //           title={`Vista Previa: ${previewCV.profile || 'CV'}`}
// //         />
// //       )}
// //     </>
// //   );
// // };

// // export default EmailSender;



// 'use client';

// import React, { useState, useEffect } from 'react';
// import {
//   Box,
//   Tabs,
//   Tab,
//   Typography,
//   Button,
//   FormControl,
//   InputLabel,
//   Select,
//   MenuItem,
//   TextField,
//   Paper,
//   Alert,
//   CircularProgress,
//   Dialog,
//   DialogTitle,
//   DialogContent,
//   DialogActions,
//   IconButton,
//   Divider,
//   Stack,
//   Chip,
//   List,
//   ListItem,
//   ListItemText,
//   Collapse,
//   useMediaQuery,
//   useTheme,
// } from '@mui/material';
// import {
//   Send,
//   Email,
//   Close,
//   ExpandMore,
//   ExpandLess,
//   Preview,
// } from '@mui/icons-material';
// import { useSelector } from 'react-redux';
// import { RootState } from '@/store/store';

// interface EmailData {
//   to: string;
//   subject: string;
//   html: string;
//   from?: string;
// }

// interface CoverLetter {
//   _id: string;
//   title: string;
//   content: string;
//   isDefault?: boolean;
// }

// interface SkillSet {
//   languages?: string[];
//   frameworks_libraries?: string[];
//   databases?: string[];
//   tools_environments?: string[];
//   methodologies?: string[];
//   security?: string[];
//   mobile?: string[];
//   analysis_management?: string[];
//   communication?: string[];
//   [key: string]: string[] | undefined;
// }

// interface WorkExperience {
//   position?: string;
//   company?: string;
//   period?: string;
//   description?: string[];
// }

// interface Education {
//   degree?: string;
//   institution?: string;
//   field_of_study?: string;
//   period?: string;
//   description?: string[];
// }

// interface Course {
//   name?: string;
//   institution?: string;
//   completion_date?: string;
//   duration_hours?: string;
//   certificate_url?: string;
//   description?: string[];
// }

// interface CV {
//   _id: string;
//   profile: string;
//   isDefault?: boolean;
//   user?: string;
//   professional_summary?: string;
//   skills?: SkillSet;
//   work_experience?: WorkExperience[];
//   education?: Education[];
//   courses?: Course[];
// }

// interface EmailSenderProps {
//   open: boolean;
//   onClose: () => void;
// }

// interface CVPreviewModalProps {
//   open: boolean;
//   onClose: () => void;
//   cv: CV;
//   title?: string;
// }

// interface CoverLetterPreviewModalProps {
//   open: boolean;
//   onClose: () => void;
//   coverLetter: CoverLetter;
//   title?: string;
// }

// const CoverLetterPreviewModal: React.FC<CoverLetterPreviewModalProps> = ({
//   open,
//   onClose,
//   coverLetter,
//   title = "Vista Previa de Carta de Presentación"
// }) => {
//   const theme = useTheme();
//   const fullScreen = useMediaQuery(theme.breakpoints.down('md'));

//   return (
//     <Dialog
//       open={open}
//       onClose={onClose}
//       maxWidth="md"
//       fullWidth
//       fullScreen={fullScreen}
//       sx={{
//         '& .MuiDialog-paper': {
//           height: fullScreen ? '100%' : '80vh',
//           maxHeight: fullScreen ? '100%' : '80vh',
//           m: fullScreen ? 0 : 2,
//         }
//       }}
//     >
//       <DialogTitle sx={{ m: 0, p: 2, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
//         {title}
//         <IconButton
//           aria-label="close"
//           onClick={onClose}
//           sx={{ color: (theme) => theme.palette.grey[500] }}
//         >
//           <Close />
//         </IconButton>
//       </DialogTitle>

//       <DialogContent dividers sx={{ overflow: 'auto' }}>
//         <Paper elevation={0} sx={{ p: 3 }}>
//           <Box mb={3}>
//             <Typography variant="h4" gutterBottom>
//               {coverLetter.title}
//             </Typography>
//           </Box>

//           <Divider sx={{ my: 2 }} />

//           <Box>
//             <Typography variant="body1" component="div" sx={{ 
//               whiteSpace: 'pre-wrap',
//               lineHeight: 1.6,
//               '& p': { mb: 2 }
//             }}>
//               {coverLetter.content.split('\n').map((paragraph, index) => (
//                 <p key={index}>{paragraph}</p>
//               ))}
//             </Typography>
//           </Box>
//         </Paper>
//       </DialogContent>
//     </Dialog>
//   );
// };

// const CVPreviewModal: React.FC<CVPreviewModalProps> = ({
//   open,
//   onClose,
//   cv,
//   title = "Vista Previa del CV"
// }) => {
//   const theme = useTheme();
//   const fullScreen = useMediaQuery(theme.breakpoints.down('md'));
//   const [expandedSections, setExpandedSections] = useState<Record<string, boolean>>({
//     skills: true,
//     experience: true,
//     education: true,
//     courses: true
//   });

//   const toggleSection = (section: string) => {
//     setExpandedSections(prev => ({
//       ...prev,
//       [section]: !prev[section]
//     }));
//   };

//   const renderSkillsSection = () => {
//     const skillCategories = [
//       { key: 'languages', label: 'Lenguajes' },
//       { key: 'frameworks_libraries', label: 'Frameworks y Librerías' },
//       { key: 'databases', label: 'Bases de Datos' },
//       { key: 'tools_environments', label: 'Herramientas y Entornos' },
//       { key: 'methodologies', label: 'Metodologías' },
//       { key: 'security', label: 'Seguridad' },
//       { key: 'mobile', label: 'Móvil' },
//       { key: 'analysis_management', label: 'Análisis y Gestión' },
//       { key: 'communication', label: 'Comunicación' },
//     ] as const;

//     return (
//       <Box mb={3}>
//         <Box 
//           display="flex" 
//           justifyContent="space-between" 
//           alignItems="center" 
//           mb={2}
//           sx={{ cursor: 'pointer' }}
//           onClick={() => toggleSection('skills')}
//         >
//           <Typography variant="h5">Habilidades</Typography>
//           <IconButton size="small">
//             {expandedSections.skills ? <ExpandLess /> : <ExpandMore />}
//           </IconButton>
//         </Box>

//         <Collapse in={expandedSections.skills}>
//           {skillCategories.map(({ key, label }) => (
//             cv.skills && cv.skills[key] && cv.skills[key]!.length > 0 && (
//               <Box key={key} mb={2}>
//                 <Typography variant="h6" gutterBottom>
//                   {label}
//                 </Typography>
//                 <Stack direction="row" spacing={1} flexWrap="wrap" useFlexGap>
//                   {cv.skills[key]!.map((skill: string, index: number) => (
//                     <Chip key={index} label={skill} variant="outlined" sx={{ mb: 1 }} />
//                   ))}
//                 </Stack>
//               </Box>
//             )
//           ))}
//         </Collapse>
//       </Box>
//     );
//   };

//   const renderWorkExperience = () => {
//     if (!cv.work_experience || cv.work_experience.length === 0) return null;

//     return (
//       <Box>
//         <Box 
//           display="flex" 
//           justifyContent="space-between" 
//           alignItems="center" 
//           mb={2}
//           sx={{ cursor: 'pointer' }}
//           onClick={() => toggleSection('experience')}
//         >
//           <Typography variant="h5">Experiencia Laboral</Typography>
//           <IconButton size="small">
//             {expandedSections.experience ? <ExpandLess /> : <ExpandMore />}
//           </IconButton>
//         </Box>

//         <Collapse in={expandedSections.experience}>
//           <List>
//             {cv.work_experience.map((exp, index) => (
//               <ListItem key={index} alignItems="flex-start" sx={{ flexDirection: 'column', alignItems: 'flex-start' }}>
//                 <ListItemText
//                   primary={
//                     <Box display="flex" justifyContent="space-between" flexWrap="wrap" width="100%">
//                       <Typography variant="h6">{exp.position || 'Posición no especificada'}</Typography>
//                       <Typography variant="body2" color="text.secondary">
//                         {exp.period || 'Período no especificado'}
//                       </Typography>
//                     </Box>
//                   }
//                   secondary={
//                     <>
//                       <Typography variant="subtitle1" color="text.primary" sx={{ mt: 1 }}>
//                         {exp.company || 'Empresa no especificada'}
//                       </Typography>
//                       {exp.description && exp.description.length > 0 && (
//                         <Box component="ul" sx={{ pl: 2, mt: 1, mb: 0 }}>
//                           {exp.description.map((desc, i) => (
//                             <Typography
//                               key={i}
//                               variant="body2"
//                               component="li"
//                               sx={{ mb: 0.5 }}
//                             >
//                               {desc}
//                             </Typography>
//                           ))}
//                         </Box>
//                       )}
//                     </>
//                   }
//                 />
//                 {index < cv.work_experience!.length - 1 && (
//                   <Divider sx={{ width: '100%', my: 2 }} />
//                 )}
//               </ListItem>
//             ))}
//           </List>
//         </Collapse>
//       </Box>
//     );
//   };

//   const renderEducation = () => {
//     if (!cv.education || cv.education.length === 0) return null;

//     return (
//       <Box>
//         <Box 
//           display="flex" 
//           justifyContent="space-between" 
//           alignItems="center" 
//           mb={2}
//           sx={{ cursor: 'pointer' }}
//           onClick={() => toggleSection('education')}
//         >
//           <Typography variant="h5">Educación</Typography>
//           <IconButton size="small">
//             {expandedSections.education ? <ExpandLess /> : <ExpandMore />}
//           </IconButton>
//         </Box>

//         <Collapse in={expandedSections.education}>
//           <List>
//             {cv.education.map((edu, index) => (
//               <ListItem key={index} alignItems="flex-start" sx={{ flexDirection: 'column', alignItems: 'flex-start' }}>
//                 <ListItemText
//                   primary={
//                     <Box display="flex" justifyContent="space-between" flexWrap="wrap" width="100%">
//                       <Typography variant="h6">{edu.degree || 'Título no especificado'}</Typography>
//                       <Typography variant="body2" color="text.secondary">
//                         {edu.period || 'Período no especificado'}
//                       </Typography>
//                     </Box>
//                   }
//                   secondary={
//                     <>
//                       <Typography variant="subtitle1" color="text.primary" sx={{ mt: 1 }}>
//                         {edu.institution || 'Institución no especificada'} 
//                         {edu.field_of_study && ` - ${edu.field_of_study}`}
//                       </Typography>
//                       {edu.description && edu.description.length > 0 && (
//                         <Box component="ul" sx={{ pl: 2, mt: 1, mb: 0 }}>
//                           {edu.description.map((desc, i) => (
//                             <Typography
//                               key={i}
//                               variant="body2"
//                               component="li"
//                               sx={{ mb: 0.5 }}
//                             >
//                               {desc}
//                             </Typography>
//                           ))}
//                         </Box>
//                       )}
//                     </>
//                   }
//                 />
//                 {index < cv.education!.length - 1 && (
//                   <Divider sx={{ width: '100%', my: 2 }} />
//                 )}
//               </ListItem>
//             ))}
//           </List>
//         </Collapse>
//       </Box>
//     );
//   };

//   const renderCourses = () => {
//     if (!cv.courses || cv.courses.length === 0) return null;

//     return (
//       <Box>
//         <Box 
//           display="flex" 
//           justifyContent="space-between" 
//           alignItems="center" 
//           mb={2}
//           sx={{ cursor: 'pointer' }}
//           onClick={() => toggleSection('courses')}
//         >
//           <Typography variant="h5">Cursos y Certificaciones</Typography>
//           <IconButton size="small">
//             {expandedSections.courses ? <ExpandLess /> : <ExpandMore />}
//           </IconButton>
//         </Box>

//         <Collapse in={expandedSections.courses}>
//           <List>
//             {cv.courses.map((course, index) => (
//               <ListItem key={index} alignItems="flex-start" sx={{ flexDirection: 'column', alignItems: 'flex-start' }}>
//                 <ListItemText
//                   primary={
//                     <Box display="flex" justifyContent="space-between" flexWrap="wrap" width="100%">
//                       <Typography variant="h6">{course.name || 'Curso no especificado'}</Typography>
//                       <Typography variant="body2" color="text.secondary">
//                         {course.completion_date || 'Fecha no especificada'}
//                       </Typography>
//                     </Box>
//                   }
//                   secondary={
//                     <>
//                       <Typography variant="subtitle1" color="text.primary" sx={{ mt: 1 }}>
//                         {course.institution || 'Institución no especificada'} 
//                         {course.duration_hours && ` - ${course.duration_hours} horas`}
//                       </Typography>
//                       {course.certificate_url && (
//                         <Typography variant="body2" sx={{ mt: 0.5 }}>
//                           <a href={course.certificate_url} target="_blank" rel="noopener noreferrer">
//                             Ver certificado
//                           </a>
//                         </Typography>
//                       )}
//                       {course.description && course.description.length > 0 && (
//                         <Box component="ul" sx={{ pl: 2, mt: 1, mb: 0 }}>
//                           {course.description.map((desc, i) => (
//                             <Typography
//                               key={i}
//                               variant="body2"
//                               component="li"
//                               sx={{ mb: 0.5 }}
//                             >
//                               {desc}
//                             </Typography>
//                           ))}
//                         </Box>
//                       )}
//                     </>
//                   }
//                 />
//                 {index < cv.courses!.length - 1 && (
//                   <Divider sx={{ width: '100%', my: 2 }} />
//                 )}
//               </ListItem>
//             ))}
//           </List>
//         </Collapse>
//       </Box>
//     );
//   };

//   return (
//     <Dialog
//       open={open}
//       onClose={onClose}
//       maxWidth="lg"
//       fullWidth
//       fullScreen={fullScreen}
//       sx={{
//         '& .MuiDialog-paper': {
//           height: fullScreen ? '100%' : '90vh',
//           maxHeight: fullScreen ? '100%' : '90vh',
//           m: fullScreen ? 0 : 2,
//         }
//       }}
//     >
//       <DialogTitle sx={{ m: 0, p: 2, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
//         {title}
//         <IconButton
//           aria-label="close"
//           onClick={onClose}
//           sx={{ color: (theme) => theme.palette.grey[500] }}
//         >
//           <Close />
//         </IconButton>
//       </DialogTitle>

//       <DialogContent dividers sx={{ overflow: 'auto' }}>
//         <Paper elevation={0} sx={{ p: 3 }}>
//           {/* Profile Section */}
//           <Box mb={3}>
//             <Typography variant="h4" gutterBottom>
//               {cv.profile}
//             </Typography>
//             {cv.professional_summary && (
//               <Typography variant="body1" color="text.secondary">
//                 {cv.professional_summary}
//               </Typography>
//             )}
//           </Box>

//           <Divider sx={{ my: 2 }} />

//           {/* Skills Section */}
//           {cv.skills && Object.keys(cv.skills).length > 0 && renderSkillsSection()}

//           {cv.work_experience && cv.work_experience.length > 0 && (
//             <>
//               <Divider sx={{ my: 2 }} />
//               {renderWorkExperience()}
//             </>
//           )}

//           {cv.education && cv.education.length > 0 && (
//             <>
//               <Divider sx={{ my: 2 }} />
//               {renderEducation()}
//             </>
//           )}

//           {cv.courses && cv.courses.length > 0 && (
//             <>
//               <Divider sx={{ my: 2 }} />
//               {renderCourses()}
//             </>
//           )}
//         </Paper>
//       </DialogContent>
//     </Dialog>
//   );
// };

// const EmailSender: React.FC<EmailSenderProps> = ({ open, onClose }) => {
//   const theme = useTheme();
//   const fullScreen = useMediaQuery(theme.breakpoints.down('md'));
//   const [tabValue, setTabValue] = useState(0);
//   const [selectedCV, setSelectedCV] = useState('');
//   const [selectedCoverLetter, setSelectedCoverLetter] = useState('');
//   const [coverLetters, setCoverLetters] = useState<CoverLetter[]>([]);
//   const [cvs, setCVs] = useState<CV[]>([]);
//   const [emailData, setEmailData] = useState({
//     to: '',
//     subject: '',
//     message: ''
//   });
//   const [loading, setLoading] = useState(false);
//   const [status, setStatus] = useState<{ type: 'success' | 'error' | ''; message: string }>({ type: '', message: '' });
//   const [previewCV, setPreviewCV] = useState<CV | null>(null);
//   const [previewCoverLetter, setPreviewCoverLetter] = useState<CoverLetter | null>(null);
//   const [previewOpen, setPreviewOpen] = useState(false);
//   const [previewType, setPreviewType] = useState<'cv' | 'coverletter'>('cv');

//   const userProfile = useSelector((state: RootState) => state.profiles.profile);
//   const { isAuthenticated, user } = useSelector((state: RootState) => state.auth);

//   useEffect(() => {
//     if (open && isAuthenticated && user?.id) {
//       fetchCVs();
//       fetchCoverLetters();
//     }
//   }, [open, isAuthenticated, user?.id]);

//   const fetchCVs = async () => {
//     try {
//       const token = localStorage.getItem('token');
//       const response = await fetch('/api/cv', {
//         headers: {
//           'Authorization': `Bearer ${token}`
//         }
//       });
      
//       if (response.ok) {
//         const cvData = await response.json();
//         setCVs(cvData);
        
//         // Establecer CV por defecto si existe
//         const defaultCV = cvData.find((cv: CV) => cv.isDefault) || (cvData.length > 0 ? cvData[0] : null);
//         if (defaultCV) {
//           setSelectedCV(defaultCV._id);
//         }
//       } else {
//         console.error('Error fetching CVs:', response.statusText);
//       }
//     } catch (error) {
//       console.error('Error fetching CVs:', error);
//     }
//   };

//   const fetchCoverLetters = async () => {
//     try {
//       const token = localStorage.getItem('token');
//       const response = await fetch('/api/coverletter', {
//         headers: {
//           'Authorization': `Bearer ${token}`
//         }
//       });
      
//       if (response.ok) {
//         const letters = await response.json();
//         setCoverLetters(letters);
        
//         // Establecer carta por defecto si existe
//         const defaultLetter = letters.find((letter: CoverLetter) => letter.isDefault) || (letters.length > 0 ? letters[0] : null);
//         if (defaultLetter) {
//           setSelectedCoverLetter(defaultLetter._id);
//         }
//       }
//     } catch (error) {
//       console.error('Error fetching cover letters:', error);
//     }
//   };

//   const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
//     setTabValue(newValue);
//   };

//   const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
//     const { name, value } = e.target;
//     setEmailData(prev => ({ ...prev, [name]: value }));
//   };

//   const handlePreview = async (type: 'cv' | 'coverletter', id: string) => {
//     try {
//       const token = localStorage.getItem('token');
//       setPreviewType(type);
      
//       if (type === 'cv') {
//         const response = await fetch(`/api/cv/${id}`, {
//           headers: {
//             'Authorization': `Bearer ${token}`
//           }
//         });
        
//         if (response.ok) {
//           const cvData = await response.json();
//           setPreviewCV(cvData);
//           setPreviewOpen(true);
//         }
//       } else {
//         const response = await fetch(`/api/coverletter/${id}`, {
//           headers: {
//             'Authorization': `Bearer ${token}`
//           }
//         });
        
//         if (response.ok) {
//           const coverLetterData = await response.json();
//           setPreviewCoverLetter(coverLetterData);
//           setPreviewOpen(true);
//         }
//       }
//     } catch (error) {
//       console.error('Error fetching preview:', error);
//     }
//   };

//   const generateEmailHTML = async (cvId: string, coverLetterId: string, customMessage: string = ''): Promise<string> => {
//     try {
//       // Obtener el CV seleccionado
//       const token = localStorage.getItem('token');
//       const cvResponse = await fetch(`/api/cv/${cvId}`, {
//         headers: {
//           'Authorization': `Bearer ${token}`
//         }
//       });
      
//       if (!cvResponse.ok) throw new Error('Error fetching CV');
//       const cvData = await cvResponse.json();

//       // Obtener la carta de presentación
//       let coverLetterContent = '';
//       if (coverLetterId) {
//         const letterResponse = await fetch(`/api/coverletter/${coverLetterId}`, {
//           headers: {
//             'Authorization': `Bearer ${token}`
//           }
//         });
        
//         if (letterResponse.ok) {
//           const letterData = await letterResponse.json();
//           coverLetterContent = letterData.content;
//         }
//       }

//       // Obtener datos del perfil del usuario
//       let userProfileData = null;
//       try {
//         const profileResponse = await fetch(`/api/profile/${user?.id}`, {
//           headers: {
//             'Authorization': `Bearer ${token}`
//           }
//         });
        
//         if (profileResponse.ok) {
//           userProfileData = await profileResponse.json();
//         }
//       } catch (error) {
//         console.error('Error fetching user profile:', error);
//       }

//       // Combinar datos del CV con datos del perfil
//       const combinedData = {
//         ...cvData,
//         // Sobrescribir con datos del perfil si están disponibles
//         fullname: userProfileData?.fullname || userProfile?.fullname || '',
//         email: userProfileData?.email || userProfile?.email || '',
//         phone: userProfileData?.phone || userProfile?.phone || '',
//         linkedin: userProfileData?.linkedin || userProfile?.linkedin || '',
//       };

//       // Generar HTML con estilo profesional
//       return `
//         <!DOCTYPE html>
//         <html>
//         <head>
//           <meta charset="utf-8">
//           <style>
//             body {
//               font-family: 'Arial', sans-serif;
//               line-height: 1.6;
//               color: #333;
//               max-width: 800px;
//               margin: 0 auto;
//               padding: 20px;
//             }
//             .header {
//               text-align: center;
//               margin-bottom: 30px;
//               border-bottom: 2px solid #2c5aa0;
//               padding-bottom: 20px;
//             }
//             .contact-info {
//               display: flex;
//               justify-content: center;
//               flex-wrap: wrap;
//               gap: 15px;
//               margin: 15px 0;
//             }
//             .section {
//               margin: 25px 0;
//             }
//             .section-title {
//               color: #2c5aa0;
//               border-bottom: 1px solid #eee;
//               padding-bottom: 5px;
//               margin-bottom: 15px;
//             }
//             .skills-container {
//               display: flex;
//               flex-wrap: wrap;
//               gap: 8px;
//             }
//             .skill-chip {
//               background-color: #e8f0fe;
//               color: #2c5aa0;
//               padding: 5px 12px;
//               border-radius: 15px;
//               font-size: 0.9em;
//             }
//             .experience-item, .education-item {
//               margin-bottom: 20px;
//             }
//             .date {
//               color: #666;
//               font-style: italic;
//             }
//             .cover-letter {
//               background-color: #f9f9f9;
//               padding: 20px;
//               border-left: 4px solid #2c5aa0;
//               margin: 20px 0;
//             }
//             .custom-message {
//               background-color: #fff8e1;
//               padding: 15px;
//               border-left: 4px solid #ffc107;
//               margin: 20px 0;
//               font-style: italic;
//             }
//             .footer {
//               text-align: center;
//               margin-top: 40px;
//               padding-top: 20px;
//               border-top: 1px solid #eee;
//               color: #666;
//               font-size: 0.9em;
//             }
//           </style>
//         </head>
//         <body>
//           <div class="header">
//             <h1>${combinedData.fullname || 'Curriculum Vitae'}</h1>
//             <div class="contact-info">
//               ${combinedData.email ? `<span>📧 ${combinedData.email}</span>` : ''}
//               ${combinedData.phone ? `<span>📞 ${combinedData.phone}</span>` : ''}
//               ${combinedData.linkedin ? `<span>🔗 ${combinedData.linkedin}</span>` : ''}
//               ${combinedData.address ? `<span>📍 ${combinedData.address}</span>` : ''}
//             </div>
//           </div>

//           ${customMessage ? `
//           <div class="custom-message">
//             <p>${customMessage.replace(/\n/g, '<br>')}</p>
//           </div>
//           ` : ''}

//           ${coverLetterContent ? `
//           <div class="cover-letter">
//             <h2 class="section-title">Carta de Presentación</h2>
//             <div>${coverLetterContent}</div>
//           </div>
//           ` : ''}

//           ${cvData.professional_summary ? `
//           <div class="section">
//             <h2 class="section-title">Resumen Profesional</h2>
//             <p>${cvData.professional_summary}</p>
//           </div>
//           ` : ''}

//           ${cvData.skills && Object.keys(cvData.skills).length > 0 ? `
//           <div class="section">
//             <h2 class="section-title">Habilidades</h2>
//             <div class="skills-container">
//               ${Object.entries(cvData.skills).map(([category, skills]: [string, any]) => 
//                 Array.isArray(skills) ? 
//                   skills.map((skill: string) => 
//                     `<span class="skill-chip">${skill}</span>`
//                   ).join('')
//                 : ''
//               ).join('')}
//             </div>
//           </div>
//           ` : ''}

//           ${cvData.work_experience && cvData.work_experience.length > 0 ? `
//           <div class="section">
//             <h2 class="section-title">Experiencia Laboral</h2>
//             ${cvData.work_experience.map((exp: any) => `
//               <div class="experience-item">
//                 <h3>${exp.position || ''}</h3>
//                 <div class="date">${exp.company || ''} | ${exp.period || ''}</div>
//                 ${exp.description ? `<ul>${Array.isArray(exp.description) ? 
//                   exp.description.map((desc: string) => `<li>${desc}</li>`).join('') 
//                   : `<li>${exp.description}</li>`}</ul>` : ''}
//               </div>
//             `).join('')}
//           </div>
//           ` : ''}

//           ${cvData.education && cvData.education.length > 0 ? `
//           <div class="section">
//             <h2 class="section-title">Formación Académica</h2>
//             ${cvData.education.map((edu: any) => `
//               <div class="education-item">
//                 <h3>${edu.degree || ''}</h3>
//                 <div class="date">${edu.institution || ''} | ${edu.period || ''}</div>
//                 ${edu.field_of_study ? `<div>${edu.field_of_study}</div>` : ''}
//               </div>
//             `).join('')}
//           </div>
//           ` : ''}

//           <div class="footer">
//             <p>Este CV fue generado automáticamente desde Mi Portfolio Profesional</p>
//           </div>
//         </body>
//         </html>
//       `;
//     } catch (error) {
//       console.error('Error generating email HTML:', error);
//       return '<p>Error al generar el contenido del email.</p>';
//     }
//   };

//   const handleSendEmail = async () => {
//     if (!emailData.to || !emailData.subject) {
//       setStatus({ type: 'error', message: 'Por favor, completa los campos obligatorios' });
//       return;
//     }

//     setLoading(true);
//     setStatus({ type: '', message: '' });

//     try {
//       let htmlContent = '';

//       if (tabValue === 0) { // Predeterminado
//         // Usar CV por defecto y carta por defecto
//         const defaultCV = cvs.find(cv => cv.isDefault) || cvs[0];
//         const defaultLetter = coverLetters.find(letter => letter.isDefault) || coverLetters[0];
        
//         if (!defaultCV) {
//           setStatus({ type: 'error', message: 'No hay CVs disponibles' });
//           setLoading(false);
//           return;
//         }
        
//         htmlContent = await generateEmailHTML(
//           defaultCV._id, 
//           defaultLetter?._id || '',
//           emailData.message
//         );
//       } else if (tabValue === 1) { // Selección
//         if (!selectedCV) {
//           setStatus({ type: 'error', message: 'Por favor, selecciona un CV' });
//           setLoading(false);
//           return;
//         }
        
//         htmlContent = await generateEmailHTML(
//           selectedCV, 
//           selectedCoverLetter,
//           emailData.message
//         );
//       } else { // Inteligente (placeholder)
//         setStatus({ type: 'error', message: 'Función inteligente no implementada aún' });
//         setLoading(false);
//         return;
//       }

//       const emailPayload: EmailData = {
//         to: emailData.to,
//         subject: emailData.subject,
//         html: htmlContent
//       };

//       const token = localStorage.getItem('token');
//       const response = await fetch('/api/email/send', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//           'Authorization': `Bearer ${token}`
//         },
//         body: JSON.stringify(emailPayload)
//       });

//       if (response.ok) {
//         setStatus({ type: 'success', message: 'Email enviado correctamente' });
//         setEmailData({ to: '', subject: '', message: '' });
//         setTimeout(() => onClose(), 2000);
//       } else {
//         const errorData = await response.json();
//         setStatus({ type: 'error', message: errorData.error || 'Error al enviar el email' });
//       }
//     } catch (error) {
//       console.error('Error sending email:', error);
//       setStatus({ type: 'error', message: 'Error al enviar el email' });
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <>
//       <Dialog 
//         open={open} 
//         onClose={onClose} 
//         maxWidth="md" 
//         fullWidth 
//         fullScreen={fullScreen}
//         sx={{
//           '& .MuiDialog-paper': {
//             m: fullScreen ? 0 : 2
//           }
//         }}
//       >
//         <DialogTitle>
//           <Box display="flex" alignItems="center">
//             <Email sx={{ mr: 1 }} />
//             Enviar Email
//           </Box>
//         </DialogTitle>
        
//         <DialogContent>
//           <Box sx={{ borderBottom: 1, borderColor: 'divider', mb: 2 }}>
//             <Tabs value={tabValue} onChange={handleTabChange} variant="fullWidth">
//               <Tab label="Predeterminado" />
//               <Tab label="Selección" />
//               <Tab label="Inteligente" disabled />
//             </Tabs>
//           </Box>

//           {status.message && (
//             <Alert severity={status.type as any} sx={{ mb: 2 }}>
//               {status.message}
//             </Alert>
//           )}

//           <TextField
//             fullWidth
//             label="Destinatario"
//             name="to"
//             value={emailData.to}
//             onChange={handleInputChange}
//             required
//             sx={{ mb: 2 }}
//           />

//           <TextField
//             fullWidth
//             label="Asunto"
//             name="subject"
//             value={emailData.subject}
//             onChange={handleInputChange}
//             required
//             sx={{ mb: 2 }}
//           />

//           <TextField
//             fullWidth
//             label="Mensaje personalizado (opcional)"
//             name="message"
//             value={emailData.message}
//             onChange={handleInputChange}
//             multiline
//             rows={3}
//             sx={{ mb: 2 }}
//           />

//           {tabValue === 1 && (
//             <>
//               <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
//                 <FormControl fullWidth>
//                   <InputLabel>Seleccionar CV</InputLabel>
//                   <Select
//                     value={selectedCV}
//                     label="Seleccionar CV"
//                     onChange={(e) => setSelectedCV(e.target.value)}
//                   >
//                     {cvs.map((cv) => (
//                       <MenuItem key={cv._id} value={cv._id}>
//                         {cv.profile}
//                       </MenuItem>
//                     ))}
//                   </Select>
//                 </FormControl>
//                 <IconButton 
//                   onClick={() => selectedCV && handlePreview('cv', selectedCV)}
//                   disabled={!selectedCV}
//                   sx={{ 
//                     bgcolor: 'primary.main', 
//                     color: 'white',
//                     '&:hover': { bgcolor: 'primary.dark' },
//                     '&:disabled': { bgcolor: 'grey.300' }
//                   }}
//                 >
//                   <Preview />
//                 </IconButton>
//               </Box>

//               <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
//                 <FormControl fullWidth>
//                   <InputLabel>Seleccionar Carta de Presentación</InputLabel>
//                   <Select
//                     value={selectedCoverLetter}
//                     label="Seleccionar Carta de Presentación"
//                     onChange={(e) => setSelectedCoverLetter(e.target.value)}
//                   >
//                     {coverLetters.map((letter) => (
//                       <MenuItem key={letter._id} value={letter._id}>
//                         {letter.title}
//                       </MenuItem>
//                     ))}
//                   </Select>
//                 </FormControl>
//                 <IconButton 
//                   onClick={() => selectedCoverLetter && handlePreview('coverletter', selectedCoverLetter)}
//                   disabled={!selectedCoverLetter}
//                   sx={{ 
//                     bgcolor: 'primary.main', 
//                     color: 'white',
//                     '&:hover': { bgcolor: 'primary.dark' },
//                     '&:disabled': { bgcolor: 'grey.300' }
//                   }}
//                 >
//                   <Preview />
//                 </IconButton>
//               </Box>
//             </>
//           )}

//           {tabValue === 2 && (
//             <Paper variant="outlined" sx={{ p: 2, textAlign: 'center', bgcolor: 'grey.50' }}>
//               <Typography variant="body2" color="text.secondary">
//                 La función inteligente analizará automáticamente el puesto de trabajo y seleccionará
//                 el CV y carta de presentación más adecuados. (Próximamente)
//               </Typography>
//             </Paper>
//           )}
//         </DialogContent>

//         <DialogActions sx={{ px: 3, pb: 2 }}>
//           <Button onClick={onClose}>Cancelar</Button>
//           <Button
//             onClick={handleSendEmail}
//             disabled={loading}
//             variant="contained"
//             startIcon={loading ? <CircularProgress size={16} /> : <Send />}
//           >
//             {loading ? 'Enviando...' : 'Enviar Email'}
//           </Button>
//         </DialogActions>
//       </Dialog>

//       {previewCV && (
//         <CVPreviewModal
//           open={previewOpen && previewType === 'cv'}
//           onClose={() => setPreviewOpen(false)}
//           cv={previewCV}
//           title={`Vista Previa: ${previewCV.profile || 'CV'}`}
//         />
//       )}

//       {previewCoverLetter && (
//         <CoverLetterPreviewModal
//           open={previewOpen && previewType === 'coverletter'}
//           onClose={() => setPreviewOpen(false)}
//           coverLetter={previewCoverLetter}
//           title={`Vista Previa: ${previewCoverLetter.title || 'Carta de Presentación'}`}
//         />
//       )}
//     </>
//   );
// };

// export default EmailSender;



'use client';

import React, { useState, useEffect } from 'react';
import {
  Box,
  Tabs,
  Tab,
  Typography,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  TextField,
  Paper,
  Alert,
  CircularProgress,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  IconButton,
  Divider,
  Stack,
  Chip,
  List,
  ListItem,
  ListItemText,
  Collapse,
  useMediaQuery,
  useTheme,
} from '@mui/material';
import {
  Send,
  Email,
  Close,
  ExpandMore,
  ExpandLess,
  Preview,
} from '@mui/icons-material';
import { useSelector } from 'react-redux';
import { RootState } from '@/store/store';

interface EmailData {
  to: string;
  subject: string;
  html: string;
  from?: string;
}

interface CoverLetter {
  _id: string;
  title: string;
  content: string;
  isDefault?: boolean;
}

interface SkillSet {
  languages?: string[];
  frameworks_libraries?: string[];
  databases?: string[];
  tools_environments?: string[];
  methodologies?: string[];
  security?: string[];
  mobile?: string[];
  analysis_management?: string[];
  communication?: string[];
  [key: string]: string[] | undefined;
}

interface WorkExperience {
  position?: string;
  company?: string;
  period?: string;
  description?: string[];
}

interface Education {
  degree?: string;
  institution?: string;
  field_of_study?: string;
  period?: string;
  description?: string[];
}

interface Course {
  name?: string;
  institution?: string;
  completion_date?: string;
  duration_hours?: string;
  certificate_url?: string;
  description?: string[];
}

interface CV {
  _id: string;
  profile: string;
  isDefault?: boolean;
  user?: string;
  professional_summary?: string;
  skills?: SkillSet;
  work_experience?: WorkExperience[];
  education?: Education[];
  courses?: Course[];
}

interface EmailSenderProps {
  open: boolean;
  onClose: () => void;
}

interface CVPreviewModalProps {
  open: boolean;
  onClose: () => void;
  cv: CV;
  title?: string;
}

interface CoverLetterPreviewModalProps {
  open: boolean;
  onClose: () => void;
  coverLetter: CoverLetter;
  title?: string;
}

const CoverLetterPreviewModal: React.FC<CoverLetterPreviewModalProps> = ({
  open,
  onClose,
  coverLetter,
  title = "Vista Previa de Carta de Presentación"
}) => {
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('md'));

  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="md"
      fullWidth
      fullScreen={fullScreen}
      sx={{
        '& .MuiDialog-paper': {
          height: fullScreen ? '100%' : '80vh',
          maxHeight: fullScreen ? '100%' : '80vh',
          m: fullScreen ? 0 : 2,
        }
      }}
    >
      <DialogTitle sx={{ m: 0, p: 2, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        {title}
        <IconButton
          aria-label="close"
          onClick={onClose}
          sx={{ color: (theme) => theme.palette.grey[500] }}
        >
          <Close />
        </IconButton>
      </DialogTitle>

      <DialogContent dividers sx={{ overflow: 'auto' }}>
        <Paper elevation={0} sx={{ p: 3 }}>
          <Box mb={3}>
            <Typography variant="h4" gutterBottom>
              {coverLetter.title}
            </Typography>
          </Box>

          <Divider sx={{ my: 2 }} />

          <Box>
            <Typography variant="body1" component="div" sx={{ 
              whiteSpace: 'pre-wrap',
              lineHeight: 1.6,
              '& p': { mb: 2 }
            }}>
              {coverLetter.content.split('\n').map((paragraph, index) => (
                <p key={index}>{paragraph}</p>
              ))}
            </Typography>
          </Box>
        </Paper>
      </DialogContent>
    </Dialog>
  );
};

const CVPreviewModal: React.FC<CVPreviewModalProps> = ({
  open,
  onClose,
  cv,
  title = "Vista Previa del CV"
}) => {
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('md'));
  const [expandedSections, setExpandedSections] = useState<Record<string, boolean>>({
    skills: true,
    experience: true,
    education: true,
    courses: true
  });

  const toggleSection = (section: string) => {
    setExpandedSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };

  const renderSkillsSection = () => {
    const skillCategories = [
      { key: 'languages', label: 'Lenguajes' },
      { key: 'frameworks_libraries', label: 'Frameworks y Librerías' },
      { key: 'databases', label: 'Bases de Datos' },
      { key: 'tools_environments', label: 'Herramientas y Entornos' },
      { key: 'methodologies', label: 'Metodologías' },
      { key: 'security', label: 'Seguridad' },
      { key: 'mobile', label: 'Móvil' },
      { key: 'analysis_management', label: 'Análisis y Gestión' },
      { key: 'communication', label: 'Comunicación' },
    ] as const;

    return (
      <Box mb={3}>
        <Box 
          display="flex" 
          justifyContent="space-between" 
          alignItems="center" 
          mb={2}
          sx={{ cursor: 'pointer' }}
          onClick={() => toggleSection('skills')}
        >
          <Typography variant="h5">Habilidades</Typography>
          <IconButton size="small">
            {expandedSections.skills ? <ExpandLess /> : <ExpandMore />}
          </IconButton>
        </Box>

        <Collapse in={expandedSections.skills}>
          {skillCategories.map(({ key, label }) => (
            cv.skills && cv.skills[key] && cv.skills[key]!.length > 0 && (
              <Box key={key} mb={2}>
                <Typography variant="h6" gutterBottom>
                  {label}
                </Typography>
                <Stack direction="row" spacing={1} flexWrap="wrap" useFlexGap>
                  {cv.skills[key]!.map((skill: string, index: number) => (
                    <Chip key={index} label={skill} variant="outlined" sx={{ mb: 1 }} />
                  ))}
                </Stack>
              </Box>
            )
          ))}
        </Collapse>
      </Box>
    );
  };

  const renderWorkExperience = () => {
    if (!cv.work_experience || cv.work_experience.length === 0) return null;

    return (
      <Box>
        <Box 
          display="flex" 
          justifyContent="space-between" 
          alignItems="center" 
          mb={2}
          sx={{ cursor: 'pointer' }}
          onClick={() => toggleSection('experience')}
        >
          <Typography variant="h5">Experiencia Laboral</Typography>
          <IconButton size="small">
            {expandedSections.experience ? <ExpandLess /> : <ExpandMore />}
          </IconButton>
        </Box>

        <Collapse in={expandedSections.experience}>
          <List>
            {cv.work_experience.map((exp, index) => (
              <ListItem key={index} alignItems="flex-start" sx={{ flexDirection: 'column', alignItems: 'flex-start' }}>
                <ListItemText
                  primary={
                    <Box display="flex" justifyContent="space-between" flexWrap="wrap" width="100%">
                      <Typography variant="h6">{exp.position || 'Posición no especificada'}</Typography>
                      <Typography variant="body2" color="text.secondary">
                        {exp.period || 'Período no especificado'}
                      </Typography>
                    </Box>
                  }
                  secondary={
                    <>
                      <Typography variant="subtitle1" color="text.primary" sx={{ mt: 1 }}>
                        {exp.company || 'Empresa no especificada'}
                      </Typography>
                      {exp.description && exp.description.length > 0 && (
                        <Box component="ul" sx={{ pl: 2, mt: 1, mb: 0 }}>
                          {exp.description.map((desc, i) => (
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
                      )}
                    </>
                  }
                />
                {index < cv.work_experience!.length - 1 && (
                  <Divider sx={{ width: '100%', my: 2 }} />
                )}
              </ListItem>
            ))}
          </List>
        </Collapse>
      </Box>
    );
  };

  const renderEducation = () => {
    if (!cv.education || cv.education.length === 0) return null;

    return (
      <Box>
        <Box 
          display="flex" 
          justifyContent="space-between" 
          alignItems="center" 
          mb={2}
          sx={{ cursor: 'pointer' }}
          onClick={() => toggleSection('education')}
        >
          <Typography variant="h5">Educación</Typography>
          <IconButton size="small">
            {expandedSections.education ? <ExpandLess /> : <ExpandMore />}
          </IconButton>
        </Box>

        <Collapse in={expandedSections.education}>
          <List>
            {cv.education.map((edu, index) => (
              <ListItem key={index} alignItems="flex-start" sx={{ flexDirection: 'column', alignItems: 'flex-start' }}>
                <ListItemText
                  primary={
                    <Box display="flex" justifyContent="space-between" flexWrap="wrap" width="100%">
                      <Typography variant="h6">{edu.degree || 'Título no especificado'}</Typography>
                      <Typography variant="body2" color="text.secondary">
                        {edu.period || 'Período no especificado'}
                      </Typography>
                    </Box>
                  }
                  secondary={
                    <>
                      <Typography variant="subtitle1" color="text.primary" sx={{ mt: 1 }}>
                        {edu.institution || 'Institución no especificada'} 
                        {edu.field_of_study && ` - ${edu.field_of_study}`}
                      </Typography>
                      {edu.description && edu.description.length > 0 && (
                        <Box component="ul" sx={{ pl: 2, mt: 1, mb: 0 }}>
                          {edu.description.map((desc, i) => (
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
                      )}
                    </>
                  }
                />
                {index < cv.education!.length - 1 && (
                  <Divider sx={{ width: '100%', my: 2 }} />
                )}
              </ListItem>
            ))}
          </List>
        </Collapse>
      </Box>
    );
  };

  const renderCourses = () => {
    if (!cv.courses || cv.courses.length === 0) return null;

    return (
      <Box>
        <Box 
          display="flex" 
          justifyContent="space-between" 
          alignItems="center" 
          mb={2}
          sx={{ cursor: 'pointer' }}
          onClick={() => toggleSection('courses')}
        >
          <Typography variant="h5">Cursos y Certificaciones</Typography>
          <IconButton size="small">
            {expandedSections.courses ? <ExpandLess /> : <ExpandMore />}
          </IconButton>
        </Box>

        <Collapse in={expandedSections.courses}>
          <List>
            {cv.courses.map((course, index) => (
              <ListItem key={index} alignItems="flex-start" sx={{ flexDirection: 'column', alignItems: 'flex-start' }}>
                <ListItemText
                  primary={
                    <Box display="flex" justifyContent="space-between" flexWrap="wrap" width="100%">
                      <Typography variant="h6">{course.name || 'Curso no especificado'}</Typography>
                      <Typography variant="body2" color="text.secondary">
                        {course.completion_date || 'Fecha no especificada'}
                      </Typography>
                    </Box>
                  }
                  secondary={
                    <>
                      <Typography variant="subtitle1" color="text.primary" sx={{ mt: 1 }}>
                        {course.institution || 'Institución no especificada'} 
                        {course.duration_hours && ` - ${course.duration_hours} horas`}
                      </Typography>
                      {course.certificate_url && (
                        <Typography variant="body2" sx={{ mt: 0.5 }}>
                          <a href={course.certificate_url} target="_blank" rel="noopener noreferrer">
                            Ver certificado
                          </a>
                        </Typography>
                      )}
                      {course.description && course.description.length > 0 && (
                        <Box component="ul" sx={{ pl: 2, mt: 1, mb: 0 }}>
                          {course.description.map((desc, i) => (
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
                      )}
                    </>
                  }
                />
                {index < cv.courses!.length - 1 && (
                  <Divider sx={{ width: '100%', my: 2 }} />
                )}
              </ListItem>
            ))}
          </List>
        </Collapse>
      </Box>
    );
  };

  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="lg"
      fullWidth
      fullScreen={fullScreen}
      sx={{
        '& .MuiDialog-paper': {
          height: fullScreen ? '100%' : '90vh',
          maxHeight: fullScreen ? '100%' : '90vh',
          m: fullScreen ? 0 : 2,
        }
      }}
    >
      <DialogTitle sx={{ m: 0, p: 2, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        {title}
        <IconButton
          aria-label="close"
          onClick={onClose}
          sx={{ color: (theme) => theme.palette.grey[500] }}
        >
          <Close />
        </IconButton>
      </DialogTitle>

      <DialogContent dividers sx={{ overflow: 'auto' }}>
        <Paper elevation={0} sx={{ p: 3 }}>
          {/* Profile Section */}
          <Box mb={3}>
            <Typography variant="h4" gutterBottom>
              {cv.profile}
            </Typography>
            {cv.professional_summary && (
              <Typography variant="body1" color="text.secondary">
                {cv.professional_summary}
              </Typography>
            )}
          </Box>

          <Divider sx={{ my: 2 }} />

          {/* Skills Section */}
          {cv.skills && Object.keys(cv.skills).length > 0 && renderSkillsSection()}

          {cv.work_experience && cv.work_experience.length > 0 && (
            <>
              <Divider sx={{ my: 2 }} />
              {renderWorkExperience()}
            </>
          )}

          {cv.education && cv.education.length > 0 && (
            <>
              <Divider sx={{ my: 2 }} />
              {renderEducation()}
            </>
          )}

          {cv.courses && cv.courses.length > 0 && (
            <>
              <Divider sx={{ my: 2 }} />
              {renderCourses()}
            </>
          )}
        </Paper>
      </DialogContent>
    </Dialog>
  );
};

const EmailSender: React.FC<EmailSenderProps> = ({ open, onClose }) => {
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('md'));
  const [tabValue, setTabValue] = useState(0);
  const [selectedCV, setSelectedCV] = useState('');
  const [selectedCoverLetter, setSelectedCoverLetter] = useState('');
  const [coverLetters, setCoverLetters] = useState<CoverLetter[]>([]);
  const [cvs, setCVs] = useState<CV[]>([]);
  const [emailData, setEmailData] = useState({
    to: '',
    subject: '',
    message: '',
    jobPosition: '' // Nuevo campo para el puesto de trabajo
  });
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState<{ type: 'success' | 'error' | ''; message: string }>({ type: '', message: '' });
  const [previewCV, setPreviewCV] = useState<CV | null>(null);
  const [previewCoverLetter, setPreviewCoverLetter] = useState<CoverLetter | null>(null);
  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewType, setPreviewType] = useState<'cv' | 'coverletter'>('cv');

  const userProfile = useSelector((state: RootState) => state.profiles.profile);
  const { isAuthenticated, user } = useSelector((state: RootState) => state.auth);

  useEffect(() => {
    if (open && isAuthenticated && user?.id) {
      fetchCVs();
      fetchCoverLetters();
    }
  }, [open, isAuthenticated, user?.id]);

  const fetchCVs = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch('/api/cv', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      
      if (response.ok) {
        const cvData = await response.json();
        setCVs(cvData);
        
        // Establecer CV por defecto si existe
        const defaultCV = cvData.find((cv: CV) => cv.isDefault) || (cvData.length > 0 ? cvData[0] : null);
        if (defaultCV) {
          setSelectedCV(defaultCV._id);
        }
      } else {
        console.error('Error fetching CVs:', response.statusText);
      }
    } catch (error) {
      console.error('Error fetching CVs:', error);
    }
  };

  const fetchCoverLetters = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch('/api/coverletter', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      
      if (response.ok) {
        const letters = await response.json();
        setCoverLetters(letters);
        
        // Establecer carta por defecto si existe
        const defaultLetter = letters.find((letter: CoverLetter) => letter.isDefault) || (letters.length > 0 ? letters[0] : null);
        if (defaultLetter) {
          setSelectedCoverLetter(defaultLetter._id);
        }
      }
    } catch (error) {
      console.error('Error fetching cover letters:', error);
    }
  };

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setEmailData(prev => ({ ...prev, [name]: value }));
  };

  const handlePreview = async (type: 'cv' | 'coverletter', id: string) => {
    try {
      const token = localStorage.getItem('token');
      setPreviewType(type);
      
      if (type === 'cv') {
        const response = await fetch(`/api/cv/${id}`, {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
        
        if (response.ok) {
          const cvData = await response.json();
          setPreviewCV(cvData);
          setPreviewOpen(true);
        }
      } else {
        const response = await fetch(`/api/coverletter/${id}`, {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
        
        if (response.ok) {
          const coverLetterData = await response.json();
          setPreviewCoverLetter(coverLetterData);
          setPreviewOpen(true);
        }
      }
    } catch (error) {
      console.error('Error fetching preview:', error);
    }
  };

  const generateEmailHTML = async (cvId: string, coverLetterId: string, customMessage: string = '', jobPosition: string = ''): Promise<string> => {
    try {
      // Obtener el CV seleccionado
      const token = localStorage.getItem('token');
      const cvResponse = await fetch(`/api/cv/${cvId}`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      
      if (!cvResponse.ok) throw new Error('Error fetching CV');
      const cvData = await cvResponse.json();

      // Obtener la carta de presentación
      let coverLetterContent = '';
      if (coverLetterId) {
        const letterResponse = await fetch(`/api/coverletter/${coverLetterId}`, {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
        
        if (letterResponse.ok) {
          const letterData = await letterResponse.json();
          coverLetterContent = letterData.content;
          
          // Reemplazar [puesto] en la carta de presentación si existe
          if (jobPosition && coverLetterContent.includes('[puesto]')) {
            coverLetterContent = coverLetterContent.replace(/\[puesto\]/g, jobPosition);
          }
        }
      }

      // Obtener datos del perfil del usuario
      let userProfileData = null;
      try {
        const profileResponse = await fetch(`/api/profile/${user?.id}`, {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
        
        if (profileResponse.ok) {
          userProfileData = await profileResponse.json();
        }
      } catch (error) {
        console.error('Error fetching user profile:', error);
      }

      // Combinar datos del CV con datos del perfil
      const combinedData = {
        ...cvData,
        // Sobrescribir con datos del perfil si están disponibles
        fullname: userProfileData?.fullname || userProfile?.fullname || '',
        email: userProfileData?.email || userProfile?.email || '',
        phone: userProfileData?.phone || userProfile?.phone || '',
        linkedin: userProfileData?.linkedin || userProfile?.linkedin || '',
      };

      // Generar HTML con estilo profesional
      return `
        <!DOCTYPE html>
        <html>
        <head>
          <meta charset="utf-8">
          <style>
            body {
              font-family: 'Arial', sans-serif;
              line-height: 1.6;
              color: #333;
              max-width: 800px;
              margin: 0 auto;
              padding: 20px;
            }
            .header {
              text-align: center;
              margin-bottom: 30px;
              border-bottom: 2px solid #2c5aa0;
              padding-bottom: 20px;
            }
            .contact-info {
              display: flex;
              justify-content: center;
              flex-wrap: wrap;
              gap: 15px;
              margin: 15px 0;
            }
            .section {
              margin: 25px 0;
            }
            .section-title {
              color: #2c5aa0;
              border-bottom: 1px solid #eee;
              padding-bottom: 5px;
              margin-bottom: 15px;
            }
            .skills-container {
              display: flex;
              flex-wrap: wrap;
              gap: 8px;
            }
            .skill-chip {
              background-color: #e8f0fe;
              color: #2c5aa0;
              padding: 5px 12px;
              border-radius: 15px;
              font-size: 0.9em;
            }
            .experience-item, .education-item {
              margin-bottom: 20px;
            }
            .date {
              color: #666;
              font-style: italic;
            }
            .cover-letter {
              background-color: #f9f9f9;
              padding: 20px;
              border-left: 4px solid #2c5aa0;
              margin: 20px 0;
            }
            .custom-message {
              background-color: #fff8e1;
              padding: 15px;
              border-left: 4px solid #ffc107;
              margin: 20px 0;
              font-style: italic;
            }
            .footer {
              text-align: center;
              margin-top: 40px;
              padding-top: 20px;
              border-top: 1px solid #eee;
              color: #666;
              font-size: 0.9em;
            }
          </style>
        </head>
        <body>
          <div class="header">
            <h1>${combinedData.fullname || 'Curriculum Vitae'}</h1>
            <div class="contact-info">
              ${combinedData.email ? `<span>📧 ${combinedData.email}</span>` : ''}
              ${combinedData.phone ? `<span>📞 ${combinedData.phone}</span>` : ''}
              ${combinedData.linkedin ? `<span>🔗 ${combinedData.linkedin}</span>` : ''}
              ${combinedData.address ? `<span>📍 ${combinedData.address}</span>` : ''}
            </div>
          </div>

          ${customMessage ? `
          <div class="custom-message">
            <p>${customMessage.replace(/\n/g, '<br>')}</p>
          </div>
          ` : ''}

          ${coverLetterContent ? `
          <div class="cover-letter">
            <h2 class="section-title">Carta de Presentación</h2>
            <div>${coverLetterContent}</div>
          </div>
          ` : ''}

          ${cvData.professional_summary ? `
          <div class="section">
            <h2 class="section-title">Resumen Profesional</h2>
            <p>${cvData.professional_summary}</p>
          </div>
          ` : ''}

          ${cvData.skills && Object.keys(cvData.skills).length > 0 ? `
          <div class="section">
            <h2 class="section-title">Habilidades</h2>
            <div class="skills-container">
              ${Object.entries(cvData.skills).map(([category, skills]: [string, any]) => 
                Array.isArray(skills) ? 
                  skills.map((skill: string) => 
                    `<span class="skill-chip">${skill}</span>`
                  ).join('')
                : ''
              ).join('')}
            </div>
          </div>
          ` : ''}

          ${cvData.work_experience && cvData.work_experience.length > 0 ? `
          <div class="section">
            <h2 class="section-title">Experiencia Laboral</h2>
            ${cvData.work_experience.map((exp: any) => `
              <div class="experience-item">
                <h3>${exp.position || ''}</h3>
                <div class="date">${exp.company || ''} | ${exp.period || ''}</div>
                ${exp.description ? `<ul>${Array.isArray(exp.description) ? 
                  exp.description.map((desc: string) => `<li>${desc}</li>`).join('') 
                  : `<li>${exp.description}</li>`}</ul>` : ''}
              </div>
            `).join('')}
          </div>
          ` : ''}

          ${cvData.education && cvData.education.length > 0 ? `
          <div class="section">
            <h2 class="section-title">Formación Académica</h2>
            ${cvData.education.map((edu: any) => `
              <div class="education-item">
                <h3>${edu.degree || ''}</h3>
                <div class="date">${edu.institution || ''} | ${edu.period || ''}</div>
                ${edu.field_of_study ? `<div>${edu.field_of_study}</div>` : ''}
              </div>
            `).join('')}
          </div>
          ` : ''}

          <div class="footer">
            <p>Este CV fue generado automáticamente desde Mi Portfolio Profesional</p>
          </div>
        </body>
        </html>
      `;
    } catch (error) {
      console.error('Error generating email HTML:', error);
      return '<p>Error al generar el contenido del email.</p>';
    }
  };

  const handleSendEmail = async () => {
    if (!emailData.to || !emailData.subject) {
      setStatus({ type: 'error', message: 'Por favor, completa los campos obligatorios' });
      return;
    }

    setLoading(true);
    setStatus({ type: '', message: '' });

    try {
      let htmlContent = '';

      if (tabValue === 0) { // Predeterminado
        // Usar CV por defecto y carta por defecto
        const defaultCV = cvs.find(cv => cv.isDefault) || cvs[0];
        const defaultLetter = coverLetters.find(letter => letter.isDefault) || coverLetters[0];
        
        if (!defaultCV) {
          setStatus({ type: 'error', message: 'No hay CVs disponibles' });
          setLoading(false);
          return;
        }
        
        htmlContent = await generateEmailHTML(
          defaultCV._id, 
          defaultLetter?._id || '',
          emailData.message,
          emailData.jobPosition // Pasar el puesto de trabajo
        );
      } else if (tabValue === 1) { // Selección
        if (!selectedCV) {
          setStatus({ type: 'error', message: 'Por favor, selecciona un CV' });
          setLoading(false);
          return;
        }
        
        htmlContent = await generateEmailHTML(
          selectedCV, 
          selectedCoverLetter,
          emailData.message,
          emailData.jobPosition // Pasar el puesto de trabajo
        );
      } else { // Inteligente (placeholder)
        setStatus({ type: 'error', message: 'Función inteligente no implementada aún' });
        setLoading(false);
        return;
      }

      const emailPayload: EmailData = {
        to: emailData.to,
        subject: emailData.subject,
        html: htmlContent
      };

      const token = localStorage.getItem('token');
      const response = await fetch('/api/email/send', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(emailPayload)
      });

      if (response.ok) {
        setStatus({ type: 'success', message: 'Email enviado correctamente' });
        setEmailData({ to: '', subject: '', message: '', jobPosition: '' });
        setTimeout(() => onClose(), 2000);
      } else {
        const errorData = await response.json();
        setStatus({ type: 'error', message: errorData.error || 'Error al enviar el email' });
      }
    } catch (error) {
      console.error('Error sending email:', error);
      setStatus({ type: 'error', message: 'Error al enviar el email' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Dialog 
        open={open} 
        onClose={onClose} 
        maxWidth="md" 
        fullWidth 
        fullScreen={fullScreen}
        sx={{
          '& .MuiDialog-paper': {
            m: fullScreen ? 0 : 2
          }
        }}
      >
        <DialogTitle>
          <Box display="flex" alignItems="center">
            <Email sx={{ mr: 1 }} />
            Enviar Email
          </Box>
        </DialogTitle>
        
        <DialogContent>
          <Box sx={{ borderBottom: 1, borderColor: 'divider', mb: 2 }}>
            <Tabs value={tabValue} onChange={handleTabChange} variant="fullWidth">
              <Tab label="Predeterminado" />
              <Tab label="Selección" />
              <Tab label="Inteligente" disabled />
            </Tabs>
          </Box>

          {status.message && (
            <Alert severity={status.type as any} sx={{ mb: 2 }}>
              {status.message}
            </Alert>
          )}

          <TextField
            fullWidth
            label="Destinatario"
            name="to"
            value={emailData.to}
            onChange={handleInputChange}
            required
            sx={{ mb: 2 }}
          />

          <TextField
            fullWidth
            label="Asunto"
            name="subject"
            value={emailData.subject}
            onChange={handleInputChange}
            required
            sx={{ mb: 2 }}
          />

          <TextField
            fullWidth
            label="Puesto de trabajo (para reemplazar [puesto] en la carta)"
            name="jobPosition"
            value={emailData.jobPosition}
            onChange={handleInputChange}
            placeholder="Ej: Desarrollador Frontend Senior"
            sx={{ mb: 2 }}
          />

          <TextField
            fullWidth
            label="Mensaje personalizado (opcional)"
            name="message"
            value={emailData.message}
            onChange={handleInputChange}
            multiline
            rows={3}
            sx={{ mb: 2 }}
          />

          {tabValue === 1 && (
            <>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
                <FormControl fullWidth>
                  <InputLabel>Seleccionar CV</InputLabel>
                  <Select
                    value={selectedCV}
                    label="Seleccionar CV"
                    onChange={(e) => setSelectedCV(e.target.value)}
                  >
                    {cvs.map((cv) => (
                      <MenuItem key={cv._id} value={cv._id}>
                        {cv.profile}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
                <IconButton 
                  onClick={() => selectedCV && handlePreview('cv', selectedCV)}
                  disabled={!selectedCV}
                  sx={{ 
                    bgcolor: 'primary.main', 
                    color: 'white',
                    '&:hover': { bgcolor: 'primary.dark' },
                    '&:disabled': { bgcolor: 'grey.300' }
                  }}
                >
                  <Preview />
                </IconButton>
              </Box>

              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
                <FormControl fullWidth>
                  <InputLabel>Seleccionar Carta de Presentación</InputLabel>
                  <Select
                    value={selectedCoverLetter}
                    label="Seleccionar Carta de Presentación"
                    onChange={(e) => setSelectedCoverLetter(e.target.value)}
                  >
                    {coverLetters.map((letter) => (
                      <MenuItem key={letter._id} value={letter._id}>
                        {letter.title}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
                <IconButton 
                  onClick={() => selectedCoverLetter && handlePreview('coverletter', selectedCoverLetter)}
                  disabled={!selectedCoverLetter}
                  sx={{ 
                    bgcolor: 'primary.main', 
                    color: 'white',
                    '&:hover': { bgcolor: 'primary.dark' },
                    '&:disabled': { bgcolor: 'grey.300' }
                  }}
                >
                  <Preview />
                </IconButton>
              </Box>
            </>
          )}

          {tabValue === 2 && (
            <Paper variant="outlined" sx={{ p: 2, textAlign: 'center', bgcolor: 'grey.50' }}>
              <Typography variant="body2" color="text.secondary">
                La función inteligente analizará automáticamente el puesto de trabajo y seleccionará
                el CV y carta de presentación más adecuados. (Próximamente)
              </Typography>
            </Paper>
          )}
        </DialogContent>

        <DialogActions sx={{ px: 3, pb: 2 }}>
          <Button onClick={onClose}>Cancelar</Button>
          <Button
            onClick={handleSendEmail}
            disabled={loading}
            variant="contained"
            startIcon={loading ? <CircularProgress size={16} /> : <Send />}
          >
            {loading ? 'Enviando...' : 'Enviar Email'}
          </Button>
        </DialogActions>
      </Dialog>

      {previewCV && (
        <CVPreviewModal
          open={previewOpen && previewType === 'cv'}
          onClose={() => setPreviewOpen(false)}
          cv={previewCV}
          title={`Vista Previa: ${previewCV.profile || 'CV'}`}
        />
      )}

      {previewCoverLetter && (
        <CoverLetterPreviewModal
          open={previewOpen && previewType === 'coverletter'}
          onClose={() => setPreviewOpen(false)}
          coverLetter={previewCoverLetter}
          title={`Vista Previa: ${previewCoverLetter.title || 'Carta de Presentación'}`}
        />
      )}
    </>
  );
};

export default EmailSender;