// 'use client';

// import React, { useState } from 'react';
// import {
//     Box,
//     Paper,
//     Typography,
//     Chip,
//     List,
//     ListItem,
//     ListItemText,
//     Divider,
//     Stack,
//     IconButton,
//     Button,
//     Dialog,
//     DialogTitle,
//     DialogContent,
//     DialogActions,
//     TextField,
//     Menu,
//     MenuItem,
//     Snackbar,
//     Alert,
//     Card,
//     CardContent,
//     CardActions,
//     Collapse,
// } from '@mui/material';
// import {
//     Edit,
//     Delete,
//     MoreVert,
//     Add,
//     ExpandMore,
//     ExpandLess,
//     DragIndicator,
// } from '@mui/icons-material';
// import { CVData } from '@/store/features/cvSlice';
// import { useAppDispatch } from '@/store/hooks';
// import { updateCV, deleteCV } from '@/store/features/cvSlice';
// import {
//     DragDropContext,
//     Droppable,
//     Draggable,
//     DropResult,
//     DraggableProvided,
//     DraggableStateSnapshot,
//     DroppableProvided,
// } from '@hello-pangea/dnd';
// import FormGenerator, { FormConfig, FormField } from '@/components/FormGenerator';

// interface CVViewProps {
//     cv: CVData;
// }

// const CVView: React.FC<CVViewProps> = ({ cv }) => {
//     const dispatch = useAppDispatch();
//     const [editMode, setEditMode] = useState(false);
//     const [editedCV, setEditedCV] = useState<CVData>({ ...cv });
//     const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
//     const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' });
//     const [deleteConfirmOpen, setDeleteConfirmOpen] = useState(false);
//     const [expandedSections, setExpandedSections] = useState<Record<string, boolean>>({
//         skills: true,
//         experience: true
//     });
//     const [showFormGenerator, setShowFormGenerator] = useState(false);

//     const handleMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
//         setAnchorEl(event.currentTarget);
//     };

//     const handleMenuClose = () => {
//         setAnchorEl(null);
//     };

//     const handleEdit = () => {
//         setEditedCV({ ...cv });
//         setEditMode(true);
//         handleMenuClose();
//     };

//     const handleSave = async () => {
//         try {
//             await dispatch(updateCV({ id: cv._id, cvData: editedCV })).unwrap();
//             setEditMode(false);
//             setSnackbar({ open: true, message: 'CV actualizado correctamente', severity: 'success' });
//         } catch (error) {
//             setSnackbar({ open: true, message: 'Error al actualizar el CV', severity: 'error' });
//         }
//     };

//     const handleCancel = () => {
//         setEditedCV({ ...cv });
//         setEditMode(false);
//     };

//     const handleDelete = () => {
//         setDeleteConfirmOpen(true);
//         handleMenuClose();
//     };

//     const confirmDelete = async () => {
//         try {
//             await dispatch(deleteCV(cv._id)).unwrap();
//             setDeleteConfirmOpen(false);
//             setSnackbar({ open: true, message: 'CV eliminado correctamente', severity: 'success' });
//         } catch (error) {
//             setSnackbar({ open: true, message: 'Error al eliminar el CV', severity: 'error' });
//         }
//     };

//     const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
//         const { name, value } = e.target;
//         setEditedCV(prev => ({ ...prev, [name]: value }));
//     };

//     const handleSkillChange = (category: keyof typeof cv.skills, index: number, value: string) => {
//         setEditedCV(prev => {
//             const newSkills = { ...prev.skills };
//             newSkills[category] = [...newSkills[category]];
//             newSkills[category][index] = value;
//             return { ...prev, skills: newSkills };
//         });
//     };

//     const addSkill = (category: keyof typeof cv.skills) => {
//         setEditedCV(prev => {
//             const newSkills = { ...prev.skills };
//             newSkills[category] = [...newSkills[category], ''];
//             return { ...prev, skills: newSkills };
//         });
//     };

//     const removeSkill = (category: keyof typeof cv.skills, index: number) => {
//         setEditedCV(prev => {
//             const newSkills = { ...prev.skills };
//             newSkills[category] = newSkills[category].filter((_, i) => i !== index);
//             return { ...prev, skills: newSkills };
//         });
//     };

//     const handleWorkExperienceChange = (index: number, field: string, value: string) => {
//         setEditedCV(prev => {
//             const newWorkExperience = [...prev.work_experience];
//             newWorkExperience[index] = { ...newWorkExperience[index], [field]: value };
//             return { ...prev, work_experience: newWorkExperience };
//         });
//     };

//     const handleWorkExperienceDescriptionChange = (expIndex: number, descIndex: number, value: string) => {
//         setEditedCV(prev => {
//             const newWorkExperience = [...prev.work_experience];
//             const newDescription = [...newWorkExperience[expIndex].description];
//             newDescription[descIndex] = value;
//             newWorkExperience[expIndex] = {
//                 ...newWorkExperience[expIndex],
//                 description: newDescription
//             };
//             return { ...prev, work_experience: newWorkExperience };
//         });
//     };

//     const addWorkExperienceDescription = (expIndex: number) => {
//         setEditedCV(prev => {
//             const newWorkExperience = [...prev.work_experience];
//             newWorkExperience[expIndex] = {
//                 ...newWorkExperience[expIndex],
//                 description: [...newWorkExperience[expIndex].description, '']
//             };
//             return { ...prev, work_experience: newWorkExperience };
//         });
//     };

//     const removeWorkExperienceDescription = (expIndex: number, descIndex: number) => {
//         setEditedCV(prev => {
//             const newWorkExperience = [...prev.work_experience];
//             newWorkExperience[expIndex] = {
//                 ...newWorkExperience[expIndex],
//                 description: newWorkExperience[expIndex].description.filter((_, i) => i !== descIndex)
//             };
//             return { ...prev, work_experience: newWorkExperience };
//         });
//     };

//     const addWorkExperience = () => {
//         setEditedCV(prev => ({
//             ...prev,
//             work_experience: [
//                 ...prev.work_experience,
//                 { company: '', period: '', position: '', description: [''] }
//             ]
//         }));
//     };

//     const removeWorkExperience = (index: number) => {
//         setEditedCV(prev => ({
//             ...prev,
//             work_experience: prev.work_experience.filter((_, i) => i !== index)
//         }));
//     };

//     const toggleSection = (section: string) => {
//         setExpandedSections(prev => ({
//             ...prev,
//             [section]: !prev[section]
//         }));
//     };

//     // Función para manejar el drag and drop
//     const onDragEnd = (result: DropResult) => {
//         const { destination, source } = result;

//         // Si no hay destino o es la misma posición, no hacer nada
//         if (!destination || destination.index === source.index) {
//             return;
//         }

//         // Reordenar las experiencias
//         const reorderedExperiences = Array.from(editedCV.work_experience);
//         const [movedItem] = reorderedExperiences.splice(source.index, 1);
//         reorderedExperiences.splice(destination.index, 0, movedItem);

//         // Actualizar el estado
//         setEditedCV(prev => ({
//             ...prev,
//             work_experience: reorderedExperiences
//         }));
//     };

//     // Configuración del formulario para datos básicos
//     const basicInfoFormConfig: FormConfig = {
//         title: 'Editar Información Básica',
//         fields: [
//             {
//                 id: 'profile',
//                 type: 'text',
//                 label: 'Perfil',
//                 required: true,
//                 validation: {
//                     minLength: {
//                         value: 3,
//                         message: 'El perfil debe tener al menos 3 caracteres'
//                     }
//                 }
//             },
//             {
//                 id: 'professional_summary',
//                 type: 'textarea',
//                 label: 'Resumen Profesional',
//                 required: true,
//                 validation: {
//                     minLength: {
//                         value: 10,
//                         message: 'El resumen profesional debe tener al menos 10 caracteres'
//                     }
//                 }
//             }
//         ],
//         submitButtonText: 'Guardar Cambios',
//         onSubmit: (data) => {
//             setEditedCV(prev => ({ ...prev, ...data }));
//             setShowFormGenerator(false);
//         }
//     };

//     const renderSkillsSection = () => {
//         const skillCategories = [
//             { key: 'languages', label: 'Lenguajes' },
//             { key: 'frameworks_libraries', label: 'Frameworks y Librerías' },
//             { key: 'databases', label: 'Bases de Datos' },
//             { key: 'tools_environments', label: 'Herramientas y Entornos' },
//             { key: 'methodologies', label: 'Metodologías' },
//             { key: 'security', label: 'Seguridad' },
//             { key: 'mobile', label: 'Móvil' },
//             { key: 'analysis_management', label: 'Análisis y Gestión' },
//             { key: 'communication', label: 'Comunicación' },
//         ] as const;

//         return (
//             <Box mb={3}>
//                 <Box 
//                     display="flex" 
//                     justifyContent="space-between" 
//                     alignItems="center" 
//                     mb={2}
//                     sx={{ cursor: 'pointer' }}
//                     onClick={() => toggleSection('skills')}
//                 >
//                     <Typography variant="h5">Habilidades</Typography>
//                     <IconButton size="small">
//                         {expandedSections.skills ? <ExpandLess /> : <ExpandMore />}
//                     </IconButton>
//                 </Box>

//                 <Collapse in={expandedSections.skills}>
//                     {skillCategories.map(({ key, label }) => (
//                         (editedCV.skills[key]?.length > 0 || editMode) && (
//                             <Box key={key} mb={2}>
//                                 <Box display="flex" justifyContent="space-between" alignItems="center">
//                                     <Typography variant="h6" gutterBottom>
//                                         {label}
//                                     </Typography>
//                                     {editMode && (
//                                         <Button 
//                                             size="small" 
//                                             startIcon={<Add />}
//                                             onClick={() => addSkill(key)}
//                                         >
//                                             Agregar
//                                         </Button>
//                                     )}
//                                 </Box>

//                                 {editMode ? (
//                                     <Box display="flex" flexWrap="wrap" gap={1}>
//                                         {editedCV.skills[key].map((skill, index) => (
//                                             <Box key={index} display="flex" alignItems="center" width="100%" maxWidth="300px">
//                                                 <TextField
//                                                     fullWidth
//                                                     size="small"
//                                                     value={skill}
//                                                     onChange={(e) => handleSkillChange(key, index, e.target.value)}
//                                                     placeholder={`Nueva ${label.toLowerCase()}`}
//                                                 />
//                                                 <IconButton 
//                                                     size="small" 
//                                                     onClick={() => removeSkill(key, index)}
//                                                     sx={{ ml: 1 }}
//                                                 >
//                                                     <Delete fontSize="small" />
//                                                 </IconButton>
//                                             </Box>
//                                         ))}
//                                     </Box>
//                                 ) : (
//                                     <Stack direction="row" spacing={1} flexWrap="wrap" useFlexGap>
//                                         {editedCV.skills[key].map((skill, index) => (
//                                             <Chip key={index} label={skill} variant="outlined" sx={{ mb: 1 }} />
//                                         ))}
//                                     </Stack>
//                                 )}
//                             </Box>
//                         )
//                     ))}
//                 </Collapse>
//             </Box>
//         );
//     };

//     const renderWorkExperience = () => {
//         return (
//             <Box>
//                 <Box 
//                     display="flex" 
//                     justifyContent="space-between" 
//                     alignItems="center" 
//                     mb={2}
//                     sx={{ cursor: 'pointer' }}
//                     onClick={() => toggleSection('experience')}
//                 >
//                     <Typography variant="h5">Experiencia Laboral</Typography>
//                     <IconButton size="small">
//                         {expandedSections.experience ? <ExpandLess /> : <ExpandMore />}
//                     </IconButton>
//                 </Box>

//                 <Collapse in={expandedSections.experience}>
//                     {editMode && (
//                         <Box mb={2}>
//                             <Button 
//                                 variant="outlined" 
//                                 startIcon={<Add />}
//                                 onClick={addWorkExperience}
//                                 fullWidth
//                             >
//                                 Agregar Nueva Experiencia
//                             </Button>
//                         </Box>
//                     )}

//                     {editMode ? (
//                         <DragDropContext onDragEnd={onDragEnd}>
//                             <Droppable droppableId="work-experiences">
//                                 {(provided: DroppableProvided) => (
//                                     <Box {...provided.droppableProps} ref={provided.innerRef}>
//                                         {editedCV.work_experience.map((exp, index) => (
//                                             <Draggable key={index} draggableId={`exp-${index}`} index={index}>
//                                                 {(provided: DraggableProvided, snapshot: DraggableStateSnapshot) => (
//                                                     <Card 
//                                                         ref={provided.innerRef}
//                                                         {...provided.draggableProps}
//                                                         variant="outlined" 
//                                                         sx={{ 
//                                                             mb: 2,
//                                                             backgroundColor: snapshot.isDragging ? 'action.hover' : 'background.paper'
//                                                         }}
//                                                     >
//                                                         <CardContent>
//                                                             <Box display="flex" alignItems="flex-start" gap={1}>
//                                                                 {/* Handle de arrastre */}
//                                                                 <Box 
//                                                                     {...provided.dragHandleProps}
//                                                                     sx={{ 
//                                                                         cursor: snapshot.isDragging ? 'grabbing' : 'grab',
//                                                                         padding: '8px 0',
//                                                                         display: 'flex',
//                                                                         alignItems: 'center'
//                                                                     }}
//                                                                 >
//                                                                     <DragIndicator color="action" />
//                                                                 </Box>

//                                                                 <Box display="flex" flexDirection="column" gap={2} flex={1}>
//                                                                     <Box display="flex" flexWrap="wrap" gap={2}>
//                                                                         <TextField
//                                                                             fullWidth
//                                                                             label="Empresa"
//                                                                             value={exp.company}
//                                                                             onChange={(e) => handleWorkExperienceChange(index, 'company', e.target.value)}
//                                                                             sx={{ flex: '1 1 300px' }}
//                                                                         />
//                                                                         <TextField
//                                                                             fullWidth
//                                                                             label="Período"
//                                                                             value={exp.period}
//                                                                             onChange={(e) => handleWorkExperienceChange(index, 'period', e.target.value)}
//                                                                             placeholder="Ej: Enero 2020 - Presente"
//                                                                             sx={{ flex: '1 1 300px' }}
//                                                                         />
//                                                                     </Box>
//                                                                     <TextField
//                                                                         fullWidth
//                                                                         label="Posición"
//                                                                         value={exp.position}
//                                                                         onChange={(e) => handleWorkExperienceChange(index, 'position', e.target.value)}
//                                                                     />
//                                                                     <Box>
//                                                                         <Typography variant="subtitle2" gutterBottom>
//                                                                             Descripción:
//                                                                         </Typography>
//                                                                         {exp.description.map((desc, descIndex) => (
//                                                                             <Box key={descIndex} display="flex" alignItems="center" mb={1}>
//                                                                                 <TextField
//                                                                                     fullWidth
//                                                                                     multiline
//                                                                                     rows={2}
//                                                                                     value={desc}
//                                                                                     onChange={(e) => handleWorkExperienceDescriptionChange(index, descIndex, e.target.value)}
//                                                                                     placeholder="Descripción de responsabilidades y logros"
//                                                                                 />
//                                                                                 <IconButton 
//                                                                                     size="small" 
//                                                                                     onClick={() => removeWorkExperienceDescription(index, descIndex)}
//                                                                                     sx={{ ml: 1 }}
//                                                                                 >
//                                                                                     <Delete fontSize="small" />
//                                                                                 </IconButton>
//                                                                             </Box>
//                                                                         ))}
//                                                                         <Button 
//                                                                             size="small" 
//                                                                             startIcon={<Add />}
//                                                                             onClick={() => addWorkExperienceDescription(index)}
//                                                                             sx={{ mt: 1 }}
//                                                                         >
//                                                                             Agregar Punto
//                                                                         </Button>
//                                                                     </Box>
//                                                                 </Box>
//                                                             </Box>
//                                                         </CardContent>
//                                                         <CardActions sx={{ pl: 6 }}>
//                                                             <Button 
//                                                                 color="error" 
//                                                                 size="small" 
//                                                                 startIcon={<Delete />}
//                                                                 onClick={() => removeWorkExperience(index)}
//                                                             >
//                                                                 Eliminar Experiencia
//                                                             </Button>
//                                                         </CardActions>
//                                                     </Card>
//                                                 )}
//                                             </Draggable>
//                                         ))}
//                                         {provided.placeholder}
//                                     </Box>
//                                 )}
//                             </Droppable>
//                         </DragDropContext>
//                     ) : (
//                         <List>
//                             {editedCV.work_experience.map((exp, index) => (
//                                 <ListItem key={index} alignItems="flex-start" sx={{ flexDirection: 'column', alignItems: 'flex-start' }}>
//                                     <ListItemText
//                                         primary={
//                                             <Box display="flex" justifyContent="space-between" flexWrap="wrap" width="100%">
//                                                 <Typography variant="h6">{exp.position}</Typography>
//                                                 <Typography variant="body2" color="text.secondary">
//                                                     {exp.period}
//                                                 </Typography>
//                                             </Box>
//                                         }
//                                         secondary={
//                                             <>
//                                                 <Typography variant="subtitle1" color="text.primary" sx={{ mt: 1 }}>
//                                                     {exp.company}
//                                                 </Typography>
//                                                 <Box component="ul" sx={{ pl: 2, mt: 1, mb: 0 }}>
//                                                     {exp.description.map((desc, i) => (
//                                                         <Typography
//                                                             key={i}
//                                                             variant="body2"
//                                                             component="li"
//                                                             sx={{ mb: 0.5 }}
//                                                         >
//                                                             {desc}
//                                                         </Typography>
//                                                     ))}
//                                                 </Box>
//                                             </>
//                                         }
//                                     />
//                                     {index < editedCV.work_experience.length - 1 && (
//                                         <Divider sx={{ width: '100%', my: 2 }} />
//                                     )}
//                                 </ListItem>
//                             ))}
//                         </List>
//                     )}
//                 </Collapse>
//             </Box>
//         );
//     };

//     return (
//         <>
//             <Paper elevation={3} sx={{ p: 3, position: 'relative' }}>
//                 {/* Botones de acción */}
//                 <Box position="absolute" top={16} right={16}>
//                     <IconButton onClick={handleMenuOpen}>
//                         <MoreVert />
//                     </IconButton>
//                     <Menu
//                         anchorEl={anchorEl}
//                         open={Boolean(anchorEl)}
//                         onClose={handleMenuClose}
//                     >
//                         <MenuItem onClick={handleEdit}>
//                             <Edit sx={{ mr: 1 }} /> Editar
//                         </MenuItem>
//                         <MenuItem onClick={() => setShowFormGenerator(true)}>
//                             <Edit sx={{ mr: 1 }} /> Editar Información Básica
//                         </MenuItem>
//                         <MenuItem onClick={handleDelete}>
//                             <Delete sx={{ mr: 1 }} /> Eliminar
//                         </MenuItem>
//                     </Menu>
//                 </Box>

//                 {/* Profile Section */}
//                 <Box mb={3}>
//                     {editMode ? (
//                         <Box display="flex" flexDirection="column" gap={2}>
//                             <TextField
//                                 fullWidth
//                                 label="Perfil"
//                                 name="profile"
//                                 value={editedCV.profile}
//                                 onChange={handleInputChange}
//                                 multiline
//                                 rows={2}
//                             />
//                             <TextField
//                                 fullWidth
//                                 label="Resumen Profesional"
//                                 name="professional_summary"
//                                 value={editedCV.professional_summary}
//                                 onChange={handleInputChange}
//                                 multiline
//                                 rows={4}
//                             />
//                         </Box>
//                     ) : (
//                         <>
//                             <Typography variant="h4" gutterBottom>
//                                 {editedCV.profile}
//                             </Typography>
//                             <Typography variant="body1" color="text.secondary">
//                                 {editedCV.professional_summary}
//                             </Typography>
//                         </>
//                     )}
//                 </Box>

//                 <Divider sx={{ my: 2 }} />

//                 {/* Skills Section */}
//                 {renderSkillsSection()}

//                 <Divider sx={{ my: 2 }} />

//                 {/* Work Experience Section */}
//                 {renderWorkExperience()}

//                 {/* Botones de guardar/cancelar en modo edición */}
//                 {editMode && (
//                     <Box mt={3} display="flex" justifyContent="flex-end" gap={2}>
//                         <Button variant="outlined" onClick={handleCancel}>
//                             Cancelar
//                         </Button>
//                         <Button variant="contained" onClick={handleSave}>
//                             Guardar Cambios
//                         </Button>
//                     </Box>
//                 )}
//             </Paper>

//             {/* Diálogo de confirmación de eliminación */}
//             <Dialog open={deleteConfirmOpen} onClose={() => setDeleteConfirmOpen(false)}>
//                 <DialogTitle>Confirmar Eliminación</DialogTitle>
//                 <DialogContent>
//                     <Typography>¿Estás seguro de que deseas eliminar este CV? Esta acción no se puede deshacer.</Typography>
//                 </DialogContent>
//                 <DialogActions>
//                     <Button onClick={() => setDeleteConfirmOpen(false)}>Cancelar</Button>
//                     <Button onClick={confirmDelete} color="error">
//                         Eliminar
//                     </Button>
//                 </DialogActions>
//             </Dialog>

//             {/* FormGenerator para editar información básica */}
//             <Dialog 
//                 open={showFormGenerator} 
//                 onClose={() => setShowFormGenerator(false)}
//                 maxWidth="md"
//                 fullWidth
//             >
//                 <DialogTitle>Editar Información Básica</DialogTitle>
//                 <DialogContent>
//                     <FormGenerator 
//                         config={basicInfoFormConfig} 
//                         defaultValues={{
//                             profile: editedCV.profile,
//                             professional_summary: editedCV.professional_summary
//                         }}
//                     />
//                 </DialogContent>
//                 <DialogActions>
//                     <Button onClick={() => setShowFormGenerator(false)}>Cancelar</Button>
//                 </DialogActions>
//             </Dialog>

//             {/* Snackbar para notificaciones */}
//             <Snackbar
//                 open={snackbar.open}
//                 autoHideDuration={6000}
//                 onClose={() => setSnackbar({ ...snackbar, open: false })}
//             >
//                 <Alert 
//                     onClose={() => setSnackbar({ ...snackbar, open: false })} 
//                     severity={snackbar.severity as any} 
//                     sx={{ width: '100%' }}
//                 >
//                     {snackbar.message}
//                 </Alert>
//             </Snackbar>
//         </>
//     );
// };

// export default CVView;



'use client';

import React, { useState } from 'react';
import {
    Box,
    Paper,
    Typography,
    Chip,
    List,
    ListItem,
    ListItemText,
    Divider,
    Stack,
    IconButton,
    Button,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    TextField,
    Menu,
    MenuItem,
    Snackbar,
    Alert,
    Card,
    CardContent,
    CardActions,
    Collapse,
    Tabs,
    Tab,
} from '@mui/material';
import {
    Edit,
    Delete,
    MoreVert,
    Add,
    ExpandMore,
    ExpandLess,
    DragIndicator,
    ContentCopy,
    Visibility,
} from '@mui/icons-material';
import { CVData } from '@/store/features/cvSlice';
import { useAppDispatch } from '@/store/hooks';
import { updateCV, deleteCV } from '@/store/features/cvSlice';
import {
    DragDropContext,
    Droppable,
    Draggable,
    DropResult,
    DraggableProvided,
    DraggableStateSnapshot,
    DroppableProvided,
} from '@hello-pangea/dnd';
import FormGenerator, { FormConfig, FormField } from '@/components/FormGenerator';

interface CVViewProps {
    cv: CVData;
}

const CVView: React.FC<CVViewProps> = ({ cv }) => {
    const dispatch = useAppDispatch();
    const [editMode, setEditMode] = useState(false);
    const [editedCV, setEditedCV] = useState<CVData>({ ...cv });
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' });
    const [deleteConfirmOpen, setDeleteConfirmOpen] = useState(false);
    const [expandedSections, setExpandedSections] = useState<Record<string, boolean>>({
        skills: true,
        experience: true,
        education: true,
        courses: true
    });
    const [showFormGenerator, setShowFormGenerator] = useState(false);
    const [jsonExampleOpen, setJsonExampleOpen] = useState(false);
    const [activeTab, setActiveTab] = useState(0);

    const handleMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleMenuClose = () => {
        setAnchorEl(null);
    };

    const handleEdit = () => {
        setEditedCV({ ...cv });
        setEditMode(true);
        handleMenuClose();
    };

    const handleSave = async () => {
        try {
            await dispatch(updateCV({ id: cv._id, cvData: editedCV })).unwrap();
            setEditMode(false);
            setSnackbar({ open: true, message: 'CV actualizado correctamente', severity: 'success' });
        } catch (error) {
            setSnackbar({ open: true, message: 'Error al actualizar el CV', severity: 'error' });
        }
    };

    const handleCancel = () => {
        setEditedCV({ ...cv });
        setEditMode(false);
    };

    const handleDelete = () => {
        setDeleteConfirmOpen(true);
        handleMenuClose();
    };

    const confirmDelete = async () => {
        try {
            await dispatch(deleteCV(cv._id)).unwrap();
            setDeleteConfirmOpen(false);
            setSnackbar({ open: true, message: 'CV eliminado correctamente', severity: 'success' });
        } catch (error) {
            setSnackbar({ open: true, message: 'Error al eliminar el CV', severity: 'error' });
        }
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setEditedCV(prev => ({ ...prev, [name]: value }));
    };

    const handleSkillChange = (category: keyof typeof cv.skills, index: number, value: string) => {
        setEditedCV(prev => {
            const newSkills = { ...prev.skills };
            newSkills[category] = [...newSkills[category]];
            newSkills[category][index] = value;
            return { ...prev, skills: newSkills };
        });
    };

    const addSkill = (category: keyof typeof cv.skills) => {
        setEditedCV(prev => {
            const newSkills = { ...prev.skills };
            newSkills[category] = [...newSkills[category], ''];
            return { ...prev, skills: newSkills };
        });
    };

    const removeSkill = (category: keyof typeof cv.skills, index: number) => {
        setEditedCV(prev => {
            const newSkills = { ...prev.skills };
            newSkills[category] = newSkills[category].filter((_, i) => i !== index);
            return { ...prev, skills: newSkills };
        });
    };

    const handleWorkExperienceChange = (index: number, field: string, value: string) => {
        setEditedCV(prev => {
            const newWorkExperience = [...prev.work_experience];
            newWorkExperience[index] = { ...newWorkExperience[index], [field]: value };
            return { ...prev, work_experience: newWorkExperience };
        });
    };

    const handleWorkExperienceDescriptionChange = (expIndex: number, descIndex: number, value: string) => {
        setEditedCV(prev => {
            const newWorkExperience = [...prev.work_experience];
            const newDescription = [...newWorkExperience[expIndex].description];
            newDescription[descIndex] = value;
            newWorkExperience[expIndex] = {
                ...newWorkExperience[expIndex],
                description: newDescription
            };
            return { ...prev, work_experience: newWorkExperience };
        });
    };

    const addWorkExperienceDescription = (expIndex: number) => {
        setEditedCV(prev => {
            const newWorkExperience = [...prev.work_experience];
            newWorkExperience[expIndex] = {
                ...newWorkExperience[expIndex],
                description: [...newWorkExperience[expIndex].description, '']
            };
            return { ...prev, work_experience: newWorkExperience };
        });
    };

    const removeWorkExperienceDescription = (expIndex: number, descIndex: number) => {
        setEditedCV(prev => {
            const newWorkExperience = [...prev.work_experience];
            newWorkExperience[expIndex] = {
                ...newWorkExperience[expIndex],
                description: newWorkExperience[expIndex].description.filter((_, i) => i !== descIndex)
            };
            return { ...prev, work_experience: newWorkExperience };
        });
    };

    const addWorkExperience = () => {
        setEditedCV(prev => ({
            ...prev,
            work_experience: [
                ...prev.work_experience,
                { company: '', period: '', position: '', description: [''] }
            ]
        }));
    };

    const removeWorkExperience = (index: number) => {
        setEditedCV(prev => ({
            ...prev,
            work_experience: prev.work_experience.filter((_, i) => i !== index)
        }));
    };

    // Funciones para educación
    const handleEducationChange = (index: number, field: string, value: string) => {
        setEditedCV(prev => {
            const newEducation = [...prev.education];
            newEducation[index] = { ...newEducation[index], [field]: value };
            return { ...prev, education: newEducation };
        });
    };

    const handleEducationDescriptionChange = (eduIndex: number, descIndex: number, value: string) => {
        setEditedCV(prev => {
            const newEducation = [...prev.education];
            const newDescription = [...newEducation[eduIndex].description];
            newDescription[descIndex] = value;
            newEducation[eduIndex] = {
                ...newEducation[eduIndex],
                description: newDescription
            };
            return { ...prev, education: newEducation };
        });
    };

    const addEducationDescription = (eduIndex: number) => {
        setEditedCV(prev => {
            const newEducation = [...prev.education];
            newEducation[eduIndex] = {
                ...newEducation[eduIndex],
                description: [...newEducation[eduIndex].description, '']
            };
            return { ...prev, education: newEducation };
        });
    };

    const removeEducationDescription = (eduIndex: number, descIndex: number) => {
        setEditedCV(prev => {
            const newEducation = [...prev.education];
            newEducation[eduIndex] = {
                ...newEducation[eduIndex],
                description: newEducation[eduIndex].description.filter((_, i) => i !== descIndex)
            };
            return { ...prev, education: newEducation };
        });
    };

    const addEducation = () => {
        setEditedCV(prev => ({
            ...prev,
            education: [
                ...prev.education,
                { institution: '', degree: '', field_of_study: '', period: '', description: [''] }
            ]
        }));
    };

    const removeEducation = (index: number) => {
        setEditedCV(prev => ({
            ...prev,
            education: prev.education.filter((_, i) => i !== index)
        }));
    };

    // Funciones para cursos
    const handleCourseChange = (index: number, field: string, value: string | number) => {
        setEditedCV(prev => {
            const newCourses = [...prev.courses];
            newCourses[index] = { ...newCourses[index], [field]: value };
            return { ...prev, courses: newCourses };
        });
    };

    const handleCourseDescriptionChange = (courseIndex: number, descIndex: number, value: string) => {
        setEditedCV(prev => {
            const newCourses = [...prev.courses];
            const newDescription = [...newCourses[courseIndex].description];
            newDescription[descIndex] = value;
            newCourses[courseIndex] = {
                ...newCourses[courseIndex],
                description: newDescription
            };
            return { ...prev, courses: newCourses };
        });
    };

    const addCourseDescription = (courseIndex: number) => {
        setEditedCV(prev => {
            const newCourses = [...prev.courses];
            newCourses[courseIndex] = {
                ...newCourses[courseIndex],
                description: [...newCourses[courseIndex].description, '']
            };
            return { ...prev, courses: newCourses };
        });
    };

    const removeCourseDescription = (courseIndex: number, descIndex: number) => {
        setEditedCV(prev => {
            const newCourses = [...prev.courses];
            newCourses[courseIndex] = {
                ...newCourses[courseIndex],
                description: newCourses[courseIndex].description.filter((_, i) => i !== descIndex)
            };
            return { ...prev, courses: newCourses };
        });
    };

    const addCourse = () => {
        setEditedCV(prev => ({
            ...prev,
            courses: [
                ...prev.courses,
                { 
                    name: '', 
                    institution: '', 
                    completion_date: '', 
                    duration_hours: 0, 
                    certificate_url: '', 
                    description: [''] 
                }
            ]
        }));
    };

    const removeCourse = (index: number) => {
        setEditedCV(prev => ({
            ...prev,
            courses: prev.courses.filter((_, i) => i !== index)
        }));
    };

    const toggleSection = (section: string) => {
        setExpandedSections(prev => ({
            ...prev,
            [section]: !prev[section]
        }));
    };

    // Función para manejar el drag and drop
    const onDragEnd = (result: DropResult) => {
        const { destination, source, type } = result;

        // Si no hay destino o es la misma posición, no hacer nada
        if (!destination || (destination.droppableId === source.droppableId && destination.index === source.index)) {
            return;
        }

        // Reordenar según el tipo
        if (type === 'work_experience') {
            const reorderedItems = Array.from(editedCV.work_experience);
            const [movedItem] = reorderedItems.splice(source.index, 1);
            reorderedItems.splice(destination.index, 0, movedItem);
            setEditedCV(prev => ({ ...prev, work_experience: reorderedItems }));
        } else if (type === 'education') {
            const reorderedItems = Array.from(editedCV.education);
            const [movedItem] = reorderedItems.splice(source.index, 1);
            reorderedItems.splice(destination.index, 0, movedItem);
            setEditedCV(prev => ({ ...prev, education: reorderedItems }));
        } else if (type === 'courses') {
            const reorderedItems = Array.from(editedCV.courses);
            const [movedItem] = reorderedItems.splice(source.index, 1);
            reorderedItems.splice(destination.index, 0, movedItem);
            setEditedCV(prev => ({ ...prev, courses: reorderedItems }));
        }
    };

    // Configuración del formulario para datos básicos
    const basicInfoFormConfig: FormConfig = {
        title: 'Editar Información Básica',
        fields: [
            {
                id: 'profile',
                type: 'text',
                label: 'Perfil',
                required: true,
                validation: {
                    minLength: {
                        value: 3,
                        message: 'El perfil debe tener al menos 3 caracteres'
                    }
                }
            },
            {
                id: 'professional_summary',
                type: 'textarea',
                label: 'Resumen Profesional',
                required: true,
                validation: {
                    minLength: {
                        value: 10,
                        message: 'El resumen profesional debe tener al menos 10 caracteres'
                    }
                }
            }
        ],
        submitButtonText: 'Guardar Cambios',
        onSubmit: (data) => {
            setEditedCV(prev => ({ ...prev, ...data }));
            setShowFormGenerator(false);
        }
    };

    // Ejemplo de JSON para importar
    const jsonExample = {
        curriculum_vitae: [
            {
                perfil: "Desarrollador Full Stack con 5 años de experiencia",
                resumen_profesional: "Especializado en tecnologías JavaScript y desarrollo de aplicaciones web escalables.",
                habilidades: {
                    lenguajes: ["JavaScript", "TypeScript", "Python"],
                    frameworks_y_librerias: ["React", "Node.js", "Express"],
                    bases_de_datos: ["MongoDB", "PostgreSQL", "Redis"],
                    herramientas_y_entornos: ["Docker", "Git", "AWS"],
                    metodologias: ["Agile", "Scrum", "Kanban"],
                    seguridad: ["OAuth", "JWT", "HTTPS"],
                    movil: ["React Native", "Ionic"],
                    analisis_y_gestion: ["JIRA", "Trello", "Slack"],
                    comunicacion: ["Español nativo", "Inglés avanzado"]
                },
                experiencia_laboral: [
                    {
                        empresa: "Tech Solutions Inc.",
                        periodo: "2020 - Presente",
                        puesto: "Desarrollador Full Stack",
                        descripcion: [
                            "Desarrollo de aplicaciones web con React y Node.js",
                            "Implementación de APIs RESTful",
                            "Colaboración con equipo de diseño para implementar interfaces responsivas"
                        ]
                    }
                ],
                educacion: [
                    {
                        institucion: "Universidad Tecnológica",
                        titulo: "Ingeniería en Sistemas",
                        campo_estudio: "Informática",
                        periodo: "2015 - 2019",
                        descripcion: ["Graduado con honores", "Proyecto final: Sistema de gestión de inventarios"]
                    }
                ],
                cursos: [
                    {
                        nombre: "React Avanzado",
                        institucion: "Platzi",
                        fecha_finalizacion: "2022-03-15",
                        duracion_horas: 40,
                        url_certificado: "https://platzi.com/certificates/abc123",
                        descripcion: ["Curso sobre hooks avanzados, context API y Redux"]
                    }
                ]
            }
        ]
    };

    const copyJsonExample = () => {
        navigator.clipboard.writeText(JSON.stringify(jsonExample, null, 2));
        setSnackbar({ open: true, message: 'Ejemplo JSON copiado al portapapeles', severity: 'success' });
        setJsonExampleOpen(false);
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
                        (editedCV.skills[key]?.length > 0 || editMode) && (
                            <Box key={key} mb={2}>
                                <Box display="flex" justifyContent="space-between" alignItems="center">
                                    <Typography variant="h6" gutterBottom>
                                        {label}
                                    </Typography>
                                    {editMode && (
                                        <Button 
                                            size="small" 
                                            startIcon={<Add />}
                                            onClick={() => addSkill(key)}
                                        >
                                            Agregar
                                        </Button>
                                    )}
                                </Box>

                                {editMode ? (
                                    <Box display="flex" flexWrap="wrap" gap={1}>
                                        {editedCV.skills[key].map((skill, index) => (
                                            <Box key={index} display="flex" alignItems="center" width="100%" maxWidth="300px">
                                                <TextField
                                                    fullWidth
                                                    size="small"
                                                    value={skill}
                                                    onChange={(e) => handleSkillChange(key, index, e.target.value)}
                                                    placeholder={`Nueva ${label.toLowerCase()}`}
                                                />
                                                <IconButton 
                                                    size="small" 
                                                    onClick={() => removeSkill(key, index)}
                                                    sx={{ ml: 1 }}
                                                >
                                                    <Delete fontSize="small" />
                                                </IconButton>
                                            </Box>
                                        ))}
                                    </Box>
                                ) : (
                                    <Stack direction="row" spacing={1} flexWrap="wrap" useFlexGap>
                                        {editedCV.skills[key].map((skill, index) => (
                                            <Chip key={index} label={skill} variant="outlined" sx={{ mb: 1 }} />
                                        ))}
                                    </Stack>
                                )}
                            </Box>
                        )
                    ))}
                </Collapse>
            </Box>
        );
    };

    const renderWorkExperience = () => {
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
                    {editMode && (
                        <Box mb={2}>
                            <Button 
                                variant="outlined" 
                                startIcon={<Add />}
                                onClick={addWorkExperience}
                                fullWidth
                            >
                                Agregar Nueva Experiencia
                            </Button>
                        </Box>
                    )}

                    {editMode ? (
                        <DragDropContext onDragEnd={onDragEnd}>
                            <Droppable droppableId="work-experiences" type="work_experience">
                                {(provided: DroppableProvided) => (
                                    <Box {...provided.droppableProps} ref={provided.innerRef}>
                                        {editedCV.work_experience.map((exp, index) => (
                                            <Draggable key={index} draggableId={`exp-${index}`} index={index}>
                                                {(provided: DraggableProvided, snapshot: DraggableStateSnapshot) => (
                                                    <Card 
                                                        ref={provided.innerRef}
                                                        {...provided.draggableProps}
                                                        variant="outlined" 
                                                        sx={{ 
                                                            mb: 2,
                                                            backgroundColor: snapshot.isDragging ? 'action.hover' : 'background.paper'
                                                        }}
                                                    >
                                                        <CardContent>
                                                            <Box display="flex" alignItems="flex-start" gap={1}>
                                                                {/* Handle de arrastre */}
                                                                <Box 
                                                                    {...provided.dragHandleProps}
                                                                    sx={{ 
                                                                        cursor: snapshot.isDragging ? 'grabbing' : 'grab',
                                                                        padding: '8px 0',
                                                                        display: 'flex',
                                                                        alignItems: 'center'
                                                                    }}
                                                                >
                                                                    <DragIndicator color="action" />
                                                                </Box>

                                                                <Box display="flex" flexDirection="column" gap={2} flex={1}>
                                                                    <Box display="flex" flexWrap="wrap" gap={2}>
                                                                        <TextField
                                                                            fullWidth
                                                                            label="Empresa"
                                                                            value={exp.company}
                                                                            onChange={(e) => handleWorkExperienceChange(index, 'company', e.target.value)}
                                                                            sx={{ flex: '1 1 300px' }}
                                                                        />
                                                                        <TextField
                                                                            fullWidth
                                                                            label="Período"
                                                                            value={exp.period}
                                                                            onChange={(e) => handleWorkExperienceChange(index, 'period', e.target.value)}
                                                                            placeholder="Ej: Enero 2020 - Presente"
                                                                            sx={{ flex: '1 1 300px' }}
                                                                        />
                                                                    </Box>
                                                                    <TextField
                                                                        fullWidth
                                                                        label="Posición"
                                                                        value={exp.position}
                                                                        onChange={(e) => handleWorkExperienceChange(index, 'position', e.target.value)}
                                                                    />
                                                                    <Box>
                                                                        <Typography variant="subtitle2" gutterBottom>
                                                                            Descripción:
                                                                        </Typography>
                                                                        {exp.description.map((desc, descIndex) => (
                                                                            <Box key={descIndex} display="flex" alignItems="center" mb={1}>
                                                                                <TextField
                                                                                    fullWidth
                                                                                    multiline
                                                                                    rows={2}
                                                                                    value={desc}
                                                                                    onChange={(e) => handleWorkExperienceDescriptionChange(index, descIndex, e.target.value)}
                                                                                    placeholder="Descripción de responsabilidades y logros"
                                                                                />
                                                                                <IconButton 
                                                                                    size="small" 
                                                                                    onClick={() => removeWorkExperienceDescription(index, descIndex)}
                                                                                    sx={{ ml: 1 }}
                                                                                >
                                                                                    <Delete fontSize="small" />
                                                                                </IconButton>
                                                                            </Box>
                                                                        ))}
                                                                        <Button 
                                                                            size="small" 
                                                                            startIcon={<Add />}
                                                                            onClick={() => addWorkExperienceDescription(index)}
                                                                            sx={{ mt: 1 }}
                                                                        >
                                                                            Agregar Punto
                                                                        </Button>
                                                                    </Box>
                                                                </Box>
                                                            </Box>
                                                        </CardContent>
                                                        <CardActions sx={{ pl: 6 }}>
                                                            <Button 
                                                                color="error" 
                                                                size="small" 
                                                                startIcon={<Delete />}
                                                                onClick={() => removeWorkExperience(index)}
                                                            >
                                                                Eliminar Experiencia
                                                            </Button>
                                                        </CardActions>
                                                    </Card>
                                                )}
                                            </Draggable>
                                        ))}
                                        {provided.placeholder}
                                    </Box>
                                )}
                            </Droppable>
                        </DragDropContext>
                    ) : (
                        <List>
                            {editedCV.work_experience.map((exp, index) => (
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
                                            </>
                                        }
                                    />
                                    {index < editedCV.work_experience.length - 1 && (
                                        <Divider sx={{ width: '100%', my: 2 }} />
                                    )}
                                </ListItem>
                            ))}
                        </List>
                    )}
                </Collapse>
            </Box>
        );
    };

    const renderEducation = () => {
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
                    {editMode && (
                        <Box mb={2}>
                            <Button 
                                variant="outlined" 
                                startIcon={<Add />}
                                onClick={addEducation}
                                fullWidth
                            >
                                Agregar Nueva Educación
                            </Button>
                        </Box>
                    )}

                    {editMode ? (
                        <DragDropContext onDragEnd={onDragEnd}>
                            <Droppable droppableId="education" type="education">
                                {(provided: DroppableProvided) => (
                                    <Box {...provided.droppableProps} ref={provided.innerRef}>
                                        {editedCV.education.map((edu, index) => (
                                            <Draggable key={index} draggableId={`edu-${index}`} index={index}>
                                                {(provided: DraggableProvided, snapshot: DraggableStateSnapshot) => (
                                                    <Card 
                                                        ref={provided.innerRef}
                                                        {...provided.draggableProps}
                                                        variant="outlined" 
                                                        sx={{ 
                                                            mb: 2,
                                                            backgroundColor: snapshot.isDragging ? 'action.hover' : 'background.paper'
                                                        }}
                                                    >
                                                        <CardContent>
                                                            <Box display="flex" alignItems="flex-start" gap={1}>
                                                                {/* Handle de arrastre */}
                                                                <Box 
                                                                    {...provided.dragHandleProps}
                                                                    sx={{ 
                                                                        cursor: snapshot.isDragging ? 'grabbing' : 'grab',
                                                                        padding: '8px 0',
                                                                        display: 'flex',
                                                                        alignItems: 'center'
                                                                    }}
                                                                >
                                                                    <DragIndicator color="action" />
                                                                </Box>

                                                                <Box display="flex" flexDirection="column" gap={2} flex={1}>
                                                                    <Box display="flex" flexWrap="wrap" gap={2}>
                                                                        <TextField
                                                                            fullWidth
                                                                            label="Institución"
                                                                            value={edu.institution}
                                                                            onChange={(e) => handleEducationChange(index, 'institution', e.target.value)}
                                                                            sx={{ flex: '1 1 300px' }}
                                                                        />
                                                                        <TextField
                                                                            fullWidth
                                                                            label="Período"
                                                                            value={edu.period}
                                                                            onChange={(e) => handleEducationChange(index, 'period', e.target.value)}
                                                                            placeholder="Ej: 2015 - 2019"
                                                                            sx={{ flex: '1 1 300px' }}
                                                                        />
                                                                    </Box>
                                                                    <Box display="flex" flexWrap="wrap" gap={2}>
                                                                        <TextField
                                                                            fullWidth
                                                                            label="Título"
                                                                            value={edu.degree}
                                                                            onChange={(e) => handleEducationChange(index, 'degree', e.target.value)}
                                                                            sx={{ flex: '1 1 300px' }}
                                                                        />
                                                                        <TextField
                                                                            fullWidth
                                                                            label="Campo de Estudio"
                                                                            value={edu.field_of_study}
                                                                            onChange={(e) => handleEducationChange(index, 'field_of_study', e.target.value)}
                                                                            sx={{ flex: '1 1 300px' }}
                                                                        />
                                                                    </Box>
                                                                    <Box>
                                                                        <Typography variant="subtitle2" gutterBottom>
                                                                            Descripción:
                                                                        </Typography>
                                                                        {edu.description.map((desc, descIndex) => (
                                                                            <Box key={descIndex} display="flex" alignItems="center" mb={1}>
                                                                                <TextField
                                                                                    fullWidth
                                                                                    multiline
                                                                                    rows={2}
                                                                                    value={desc}
                                                                                    onChange={(e) => handleEducationDescriptionChange(index, descIndex, e.target.value)}
                                                                                    placeholder="Logros o detalles relevantes"
                                                                                />
                                                                                <IconButton 
                                                                                    size="small" 
                                                                                    onClick={() => removeEducationDescription(index, descIndex)}
                                                                                    sx={{ ml: 1 }}
                                                                                >
                                                                                    <Delete fontSize="small" />
                                                                                </IconButton>
                                                                            </Box>
                                                                        ))}
                                                                        <Button 
                                                                            size="small" 
                                                                            startIcon={<Add />}
                                                                            onClick={() => addEducationDescription(index)}
                                                                            sx={{ mt: 1 }}
                                                                        >
                                                                            Agregar Punto
                                                                        </Button>
                                                                    </Box>
                                                                </Box>
                                                            </Box>
                                                        </CardContent>
                                                        <CardActions sx={{ pl: 6 }}>
                                                            <Button 
                                                                color="error" 
                                                                size="small" 
                                                                startIcon={<Delete />}
                                                                onClick={() => removeEducation(index)}
                                                            >
                                                                Eliminar Educación
                                                            </Button>
                                                        </CardActions>
                                                    </Card>
                                                )}
                                            </Draggable>
                                        ))}
                                        {provided.placeholder}
                                    </Box>
                                )}
                            </Droppable>
                        </DragDropContext>
                    ) : (
                        <List>
                            {editedCV.education.map((edu, index) => (
                                <ListItem key={index} alignItems="flex-start" sx={{ flexDirection: 'column', alignItems: 'flex-start' }}>
                                    <ListItemText
                                        primary={
                                            <Box display="flex" justifyContent="space-between" flexWrap="wrap" width="100%">
                                                <Typography variant="h6">{edu.degree}</Typography>
                                                <Typography variant="body2" color="text.secondary">
                                                    {edu.period}
                                                </Typography>
                                            </Box>
                                        }
                                        secondary={
                                            <>
                                                <Typography variant="subtitle1" color="text.primary" sx={{ mt: 1 }}>
                                                    {edu.institution} - {edu.field_of_study}
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
                                    {index < editedCV.education.length - 1 && (
                                        <Divider sx={{ width: '100%', my: 2 }} />
                                    )}
                                </ListItem>
                            ))}
                        </List>
                    )}
                </Collapse>
            </Box>
        );
    };

    const renderCourses = () => {
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
                    {editMode && (
                        <Box mb={2}>
                            <Button 
                                variant="outlined" 
                                startIcon={<Add />}
                                onClick={addCourse}
                                fullWidth
                            >
                                Agregar Nuevo Curso
                            </Button>
                        </Box>
                    )}

                    {editMode ? (
                        <DragDropContext onDragEnd={onDragEnd}>
                            <Droppable droppableId="courses" type="courses">
                                {(provided: DroppableProvided) => (
                                    <Box {...provided.droppableProps} ref={provided.innerRef}>
                                        {editedCV.courses.map((course, index) => (
                                            <Draggable key={index} draggableId={`course-${index}`} index={index}>
                                                {(provided: DraggableProvided, snapshot: DraggableStateSnapshot) => (
                                                    <Card 
                                                        ref={provided.innerRef}
                                                        {...provided.draggableProps}
                                                        variant="outlined" 
                                                        sx={{ 
                                                            mb: 2,
                                                            backgroundColor: snapshot.isDragging ? 'action.hover' : 'background.paper'
                                                        }}
                                                    >
                                                        <CardContent>
                                                            <Box display="flex" alignItems="flex-start" gap={1}>
                                                                {/* Handle de arrastre */}
                                                                <Box 
                                                                    {...provided.dragHandleProps}
                                                                    sx={{ 
                                                                        cursor: snapshot.isDragging ? 'grabbing' : 'grab',
                                                                        padding: '8px 0',
                                                                        display: 'flex',
                                                                        alignItems: 'center'
                                                                    }}
                                                                >
                                                                    <DragIndicator color="action" />
                                                                </Box>

                                                                <Box display="flex" flexDirection="column" gap={2} flex={1}>
                                                                    <Box display="flex" flexWrap="wrap" gap={2}>
                                                                        <TextField
                                                                            fullWidth
                                                                            label="Nombre del Curso"
                                                                            value={course.name}
                                                                            onChange={(e) => handleCourseChange(index, 'name', e.target.value)}
                                                                            sx={{ flex: '1 1 300px' }}
                                                                        />
                                                                        <TextField
                                                                            fullWidth
                                                                            label="Institución"
                                                                            value={course.institution}
                                                                            onChange={(e) => handleCourseChange(index, 'institution', e.target.value)}
                                                                            sx={{ flex: '1 1 300px' }}
                                                                        />
                                                                    </Box>
                                                                    <Box display="flex" flexWrap="wrap" gap={2}>
                                                                        <TextField
                                                                            fullWidth
                                                                            label="Fecha de Finalización"
                                                                            type="date"
                                                                            value={course.completion_date}
                                                                            onChange={(e) => handleCourseChange(index, 'completion_date', e.target.value)}
                                                                            InputLabelProps={{ shrink: true }}
                                                                            sx={{ flex: '1 1 200px' }}
                                                                        />
                                                                        <TextField
                                                                            fullWidth
                                                                            label="Duración (horas)"
                                                                            type="number"
                                                                            value={course.duration_hours || ''}
                                                                            onChange={(e) => handleCourseChange(index, 'duration_hours', parseInt(e.target.value) || 0)}
                                                                            sx={{ flex: '1 1 200px' }}
                                                                        />
                                                                        <TextField
                                                                            fullWidth
                                                                            label="URL del Certificado"
                                                                            value={course.certificate_url || ''}
                                                                            onChange={(e) => handleCourseChange(index, 'certificate_url', e.target.value)}
                                                                            sx={{ flex: '1 1 200px' }}
                                                                        />
                                                                    </Box>
                                                                    <Box>
                                                                        <Typography variant="subtitle2" gutterBottom>
                                                                            Descripción:
                                                                        </Typography>
                                                                        {course.description.map((desc, descIndex) => (
                                                                            <Box key={descIndex} display="flex" alignItems="center" mb={1}>
                                                                                <TextField
                                                                                    fullWidth
                                                                                    multiline
                                                                                    rows={2}
                                                                                    value={desc}
                                                                                    onChange={(e) => handleCourseDescriptionChange(index, descIndex, e.target.value)}
                                                                                    placeholder="Detalles del curso o habilidades adquiridas"
                                                                                />
                                                                                <IconButton 
                                                                                    size="small" 
                                                                                    onClick={() => removeCourseDescription(index, descIndex)}
                                                                                    sx={{ ml: 1 }}
                                                                                >
                                                                                    <Delete fontSize="small" />
                                                                                </IconButton>
                                                                            </Box>
                                                                        ))}
                                                                        <Button 
                                                                            size="small" 
                                                                            startIcon={<Add />}
                                                                            onClick={() => addCourseDescription(index)}
                                                                            sx={{ mt: 1 }}
                                                                        >
                                                                            Agregar Punto
                                                                        </Button>
                                                                    </Box>
                                                                </Box>
                                                            </Box>
                                                        </CardContent>
                                                        <CardActions sx={{ pl: 6 }}>
                                                            <Button 
                                                                color="error" 
                                                                size="small" 
                                                                startIcon={<Delete />}
                                                                onClick={() => removeCourse(index)}
                                                            >
                                                                Eliminar Curso
                                                            </Button>
                                                        </CardActions>
                                                    </Card>
                                                )}
                                            </Draggable>
                                        ))}
                                        {provided.placeholder}
                                    </Box>
                                )}
                            </Droppable>
                        </DragDropContext>
                    ) : (
                        <List>
                            {editedCV.courses.map((course, index) => (
                                <ListItem key={index} alignItems="flex-start" sx={{ flexDirection: 'column', alignItems: 'flex-start' }}>
                                    <ListItemText
                                        primary={
                                            <Box display="flex" justifyContent="space-between" flexWrap="wrap" width="100%">
                                                <Typography variant="h6">{course.name}</Typography>
                                                <Typography variant="body2" color="text.secondary">
                                                    {course.completion_date}
                                                </Typography>
                                            </Box>
                                        }
                                        secondary={
                                            <>
                                                <Typography variant="subtitle1" color="text.primary" sx={{ mt: 1 }}>
                                                    {course.institution} 
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
                                    {index < editedCV.courses.length - 1 && (
                                        <Divider sx={{ width: '100%', my: 2 }} />
                                    )}
                                </ListItem>
                            ))}
                        </List>
                    )}
                </Collapse>
            </Box>
        );
    };

    return (
        <>
            <Paper elevation={3} sx={{ p: 3, position: 'relative' }}>
                {/* Botones de acción */}
                <Box position="absolute" top={16} right={16}>
                    <IconButton onClick={handleMenuOpen}>
                        <MoreVert />
                    </IconButton>
                    <Menu
                        anchorEl={anchorEl}
                        open={Boolean(anchorEl)}
                        onClose={handleMenuClose}
                    >
                        <MenuItem onClick={handleEdit}>
                            <Edit sx={{ mr: 1 }} /> Editar
                        </MenuItem>
                        <MenuItem onClick={() => setShowFormGenerator(true)}>
                            <Edit sx={{ mr: 1 }} /> Editar Información Básica
                        </MenuItem>
                        <MenuItem onClick={() => setJsonExampleOpen(true)}>
                            <Visibility sx={{ mr: 1 }} /> Ver Ejemplo JSON
                        </MenuItem>
                        <MenuItem onClick={handleDelete}>
                            <Delete sx={{ mr: 1 }} /> Eliminar
                        </MenuItem>
                    </Menu>
                </Box>

                {/* Profile Section */}
                <Box mb={3}>
                    {editMode ? (
                        <Box display="flex" flexDirection="column" gap={2}>
                            <TextField
                                fullWidth
                                label="Perfil"
                                name="profile"
                                value={editedCV.profile}
                                onChange={handleInputChange}
                                multiline
                                rows={2}
                            />
                            <TextField
                                fullWidth
                                label="Resumen Profesional"
                                name="professional_summary"
                                value={editedCV.professional_summary}
                                onChange={handleInputChange}
                                multiline
                                rows={4}
                            />
                        </Box>
                    ) : (
                        <>
                            <Typography variant="h4" gutterBottom>
                                {editedCV.profile}
                            </Typography>
                            <Typography variant="body1" color="text.secondary">
                                {editedCV.professional_summary}
                            </Typography>
                        </>
                    )}
                </Box>

                <Divider sx={{ my: 2 }} />

                {/* Skills Section */}
                {renderSkillsSection()}

                <Divider sx={{ my: 2 }} />

                {/* Work Experience Section */}
                {renderWorkExperience()}

                <Divider sx={{ my: 2 }} />

                {/* Education Section */}
                {editedCV.education && editedCV.education.length > 0 && (
                    <>
                        {renderEducation()}
                        <Divider sx={{ my: 2 }} />
                    </>
                )}

                {/* Courses Section */}
                {editedCV.courses && editedCV.courses.length > 0 && (
                    <>
                        {renderCourses()}
                        <Divider sx={{ my: 2 }} />
                    </>
                )}

                {/* Botones de guardar/cancelar en modo edición */}
                {editMode && (
                    <Box mt={3} display="flex" justifyContent="flex-end" gap={2}>
                        <Button variant="outlined" onClick={handleCancel}>
                            Cancelar
                        </Button>
                        <Button variant="contained" onClick={handleSave}>
                            Guardar Cambios
                        </Button>
                    </Box>
                )}
            </Paper>

            {/* Diálogo de confirmación de eliminación */}
            <Dialog open={deleteConfirmOpen} onClose={() => setDeleteConfirmOpen(false)}>
                <DialogTitle>Confirmar Eliminación</DialogTitle>
                <DialogContent>
                    <Typography>¿Estás seguro de que deseas eliminar este CV? Esta acción no se puede deshacer.</Typography>
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setDeleteConfirmOpen(false)}>Cancelar</Button>
                    <Button onClick={confirmDelete} color="error">
                        Eliminar
                    </Button>
                </DialogActions>
            </Dialog>

            {/* FormGenerator para editar información básica */}
            <Dialog 
                open={showFormGenerator} 
                onClose={() => setShowFormGenerator(false)}
                maxWidth="md"
                fullWidth
            >
                <DialogTitle>Editar Información Básica</DialogTitle>
                <DialogContent>
                    <FormGenerator 
                        config={basicInfoFormConfig} 
                        defaultValues={{
                            profile: editedCV.profile,
                            professional_summary: editedCV.professional_summary
                        }}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setShowFormGenerator(false)}>Cancelar</Button>
                </DialogActions>
            </Dialog>

            {/* Diálogo para ver ejemplo JSON */}
            <Dialog 
                open={jsonExampleOpen} 
                onClose={() => setJsonExampleOpen(false)}
                maxWidth="md"
                fullWidth
                sx={{ '& .MuiDialog-paper': { height: '80vh' } }}
            >
                <DialogTitle>
                    Ejemplo de JSON para Importar
                    <Button 
                        variant="contained" 
                        startIcon={<ContentCopy />}
                        onClick={copyJsonExample}
                        sx={{ ml: 2 }}
                    >
                        Copiar JSON
                    </Button>
                </DialogTitle>
                <DialogContent dividers>
                    <Tabs value={activeTab} onChange={(e, newValue) => setActiveTab(newValue)}>
                        <Tab label="Vista Previa" />
                        <Tab label="JSON Completo" />
                    </Tabs>
                    <Box mt={2} sx={{ overflow: 'auto', maxHeight: '50vh' }}>
                        {activeTab === 0 ? (
                            <Box>
                                <Typography variant="h6" gutterBottom>Perfil:</Typography>
                                <Typography variant="body1" gutterBottom>{jsonExample.curriculum_vitae[0].perfil}</Typography>
                                
                                <Typography variant="h6" gutterBottom sx={{ mt: 2 }}>Resumen Profesional:</Typography>
                                <Typography variant="body1" gutterBottom>{jsonExample.curriculum_vitae[0].resumen_profesional}</Typography>
                                
                                <Typography variant="h6" gutterBottom sx={{ mt: 2 }}>Habilidades:</Typography>
                                {Object.entries(jsonExample.curriculum_vitae[0].habilidades).map(([category, skills]) => (
                                    skills.length > 0 && (
                                        <Box key={category} sx={{ mb: 1 }}>
                                            <Typography variant="subtitle1">{category.replace(/_/g, ' ').toUpperCase()}:</Typography>
                                            <Box display="flex" flexWrap="wrap" gap={0.5}>
                                                {skills.map((skill, index) => (
                                                    <Chip key={index} label={skill} size="small" variant="outlined" />
                                                ))}
                                            </Box>
                                        </Box>
                                    )
                                ))}
                                
                                <Typography variant="h6" gutterBottom sx={{ mt: 2 }}>Experiencia Laboral:</Typography>
                                {jsonExample.curriculum_vitae[0].experiencia_laboral.map((exp, index) => (
                                    <Box key={index} sx={{ mb: 2 }}>
                                        <Typography variant="subtitle1">{exp.puesto} - {exp.empresa}</Typography>
                                        <Typography variant="body2" color="text.secondary">{exp.periodo}</Typography>
                                        <Box component="ul" sx={{ pl: 2, mt: 1 }}>
                                            {exp.descripcion.map((desc, i) => (
                                                <Typography key={i} variant="body2" component="li">{desc}</Typography>
                                            ))}
                                        </Box>
                                    </Box>
                                ))}
                                
                                <Typography variant="h6" gutterBottom sx={{ mt: 2 }}>Educación:</Typography>
                                {jsonExample.curriculum_vitae[0].educacion.map((edu, index) => (
                                    <Box key={index} sx={{ mb: 2 }}>
                                        <Typography variant="subtitle1">{edu.titulo} - {edu.institucion}</Typography>
                                        <Typography variant="body2" color="text.secondary">{edu.periodo}</Typography>
                                        <Typography variant="body2">{edu.campo_estudio}</Typography>
                                        {edu.descripcion && edu.descripcion.length > 0 && (
                                            <Box component="ul" sx={{ pl: 2, mt: 1 }}>
                                                {edu.descripcion.map((desc, i) => (
                                                    <Typography key={i} variant="body2" component="li">{desc}</Typography>
                                                ))}
                                            </Box>
                                        )}
                                    </Box>
                                ))}
                                
                                <Typography variant="h6" gutterBottom sx={{ mt: 2 }}>Cursos:</Typography>
                                {jsonExample.curriculum_vitae[0].cursos.map((course, index) => (
                                    <Box key={index} sx={{ mb: 2 }}>
                                        <Typography variant="subtitle1">{course.nombre} - {course.institucion}</Typography>
                                        <Typography variant="body2" color="text.secondary">
                                            Finalizado: {course.fecha_finalizacion} {course.duracion_horas && `- ${course.duracion_horas} horas`}
                                        </Typography>
                                        {course.descripcion && course.descripcion.length > 0 && (
                                            <Box component="ul" sx={{ pl: 2, mt: 1 }}>
                                                {course.descripcion.map((desc, i) => (
                                                    <Typography key={i} variant="body2" component="li">{desc}</Typography>
                                                ))}
                                            </Box>
                                        )}
                                    </Box>
                                ))}
                            </Box>
                        ) : (
                            <pre style={{ fontSize: '12px', overflow: 'auto' }}>
                                {JSON.stringify(jsonExample, null, 2)}
                            </pre>
                        )}
                    </Box>
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setJsonExampleOpen(false)}>Cerrar</Button>
                </DialogActions>
            </Dialog>

            {/* Snackbar para notificaciones */}
            <Snackbar
                open={snackbar.open}
                autoHideDuration={6000}
                onClose={() => setSnackbar({ ...snackbar, open: false })}
            >
                <Alert 
                    onClose={() => setSnackbar({ ...snackbar, open: false })} 
                    severity={snackbar.severity as any} 
                    sx={{ width: '100%' }}
                >
                    {snackbar.message}
                </Alert>
            </Snackbar>
        </>
    );
};

export default CVView;