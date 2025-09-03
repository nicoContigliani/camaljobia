'use client';

import React, { useState } from 'react';
import {
    Dialog,
    DialogTitle,
    DialogContent,
    IconButton,
    Typography,
    Box,
    Divider,
    Stack,
    Chip,
    List,
    ListItem,
    ListItemText,
    Paper,
    Collapse,
} from '@mui/material';
import {
    Close,
    ExpandMore,
    ExpandLess,
} from '@mui/icons-material';
import { CVData } from '@/store/features/cvSlice';

interface CVPreviewModalProps {
    open: boolean;
    onClose: () => void;
    cv: CVData;
    title?: string;
}

const CVPreviewModal: React.FC<CVPreviewModalProps> = ({
    open,
    onClose,
    cv,
    title = "Vista Previa del CV"
}) => {
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
                        cv.skills[key]?.length > 0 && (
                            <Box key={key} mb={2}>
                                <Typography variant="h6" gutterBottom>
                                    {label}
                                </Typography>
                                <Stack direction="row" spacing={1} flexWrap="wrap" useFlexGap>
                                    {cv.skills[key].map((skill, index) => (
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
                                {index < cv.work_experience.length - 1 && (
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
                                {index < cv.education.length - 1 && (
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
                                {index < cv.courses.length - 1 && (
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
            sx={{
                '& .MuiDialog-paper': {
                    height: '90vh',
                    maxHeight: '90vh'
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
                        <Typography variant="body1" color="text.secondary">
                            {cv.professional_summary}
                        </Typography>
                    </Box>

                    <Divider sx={{ my: 2 }} />

                    {/* Skills Section */}
                    {renderSkillsSection()}

                    <Divider sx={{ my: 2 }} />

                    {/* Work Experience Section */}
                    {cv.work_experience && cv.work_experience.length > 0 && renderWorkExperience()}

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

export default CVPreviewModal;