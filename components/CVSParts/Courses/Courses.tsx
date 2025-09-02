import { formatDate } from '@/lib/utils/formatDate'
import { Box } from '@mui/material'
import React from 'react'

const Courses = (props: any) => {
    const { cv } = props
    return (
        <>
            {cv.courses && cv.courses.length > 0 && (
                <Box sx={{ marginBottom: '15px' }}>
                    <h2 style={{
                        margin: '0 0 10px 0',
                        fontSize: '14px',
                        borderBottom: '1px solid #ddd',
                        paddingBottom: '5px',
                        textTransform: 'uppercase',
                        color: '#1976d2'
                    }}>
                        Cursos y Certificaciones
                    </h2>
                    {cv.courses.map((course: any, index: number) => (
                        <Box key={index} sx={{ marginBottom: '10px', pageBreakInside: 'avoid' }}>
                            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                                <Box>
                                    <strong style={{ display: 'block' }}>{course.name}</strong>
                                    <span style={{ fontStyle: 'italic' }}>{course.institution}</span>
                                </Box>
                                <span style={{ whiteSpace: 'nowrap' }}>
                                    {formatDate(course.completion_date)}
                                </span>
                            </Box>
                            {course.duration_hours > 0 && <Box>Duración: {course.duration_hours} horas</Box>}
                            {course.description && course.description.length > 0 && (
                                <ul style={{ margin: '5px 0', paddingLeft: '15px' }}>
                                    {course.description.map((desc: string, i: number) => (
                                        <li key={i} style={{ marginBottom: '3px' }}>{desc}</li>
                                    ))}
                                </ul>
                            )}
                        </Box>
                    ))}
                </Box>
            )}
        </>
    )
}

export default Courses