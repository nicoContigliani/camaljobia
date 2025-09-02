import { Box } from '@mui/material'
import React from 'react'
import { formatDate } from '@/lib/utils/formatDate'

const Education = (props: any) => {
    const {  cv } = props
    return (
        <>
            {cv.education && cv.education.length > 0 && (
                <Box sx={{ marginBottom: '15px' }}>
                    <h2 style={{
                        margin: '0 0 10px 0',
                        fontSize: '14px',
                        borderBottom: '1px solid #ddd',
                        paddingBottom: '5px',
                        textTransform: 'uppercase',
                        color: '#1976d2'
                    }}>
                        Formación Académica
                    </h2>
                    {cv.education.map((edu: any, index: number) => (
                        <Box key={index} sx={{ marginBottom: '10px', pageBreakInside: 'avoid' }}>
                            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                                <Box>
                                    <strong style={{ display: 'block' }}>{edu.degree}</strong>
                                    <span style={{ fontStyle: 'italic' }}>{edu.institution}</span>
                                </Box>
                                <span style={{ whiteSpace: 'nowrap' }}>
                                    {formatDate(edu.start_date)} - {formatDate(edu.end_date)}
                                </span>
                            </Box>
                            {edu.field_of_study && <Box>Campo de estudio: {edu.field_of_study}</Box>}
                            {edu.description && edu.description.length > 0 && (
                                <ul style={{ margin: '5px 0', paddingLeft: '15px' }}>
                                    {edu.description.map((desc: string, i: number) => (
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

export default Education