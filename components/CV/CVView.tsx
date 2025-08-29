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
} from '@mui/material';
import {
    Edit,
    Delete,
    MoreVert,
    Add,
    ExpandMore,
    ExpandLess,
} from '@mui/icons-material';
import { CVData } from '@/store/features/cvSlice';
import { useAppDispatch } from '@/store/hooks';
import { updateCV, deleteCV } from '@/store/features/cvSlice';

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
        experience: true
    });

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
                        <Box>
                            {editedCV.work_experience.map((exp, index) => (
                                <Card key={index} variant="outlined" sx={{ mb: 2 }}>
                                    <CardContent>
                                        <Box display="flex" flexDirection="column" gap={2}>
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
                                    </CardContent>
                                    <CardActions>
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
                            ))}
                        </Box>
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