import { formatDate } from '@/lib/utils/formatDate'
import { Box } from '@mui/material'
import React from 'react'

const WorkExperience = (props: any) => {
    const {  cv } = props
    return (
        <>
            {cv.work_experience && cv.work_experience.length > 0 && (
                <Box sx={{ marginBottom: '15px' }}>
                    <h2 style={{
                        margin: '0 0 10px 0',
                        fontSize: '14px',
                        borderBottom: '1px solid #ddd',
                        paddingBottom: '5px',
                        textTransform: 'uppercase',
                        color: '#1976d2'
                    }}>
                        Experiencia Laboral
                    </h2>
                    {cv.work_experience.map((exp: any, index: number) => (
                        <Box key={index} sx={{ marginBottom: '10px', pageBreakInside: 'avoid' }}>
                            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                                <Box>
                                    <strong style={{ display: 'block' }}>{exp.position}</strong>
                                    <span style={{ fontStyle: 'italic' }}>{exp.company}</span>
                                </Box>
                                <span style={{ whiteSpace: 'nowrap' }}>
                                    {formatDate(exp?.start_date)} - {formatDate(exp?.end_date)}
                                </span>
                            </Box>
                            <ul style={{ margin: '5px 0', paddingLeft: '15px' }}>
                                {exp.description.map((desc: string, i: number) => (
                                    <li key={i} style={{ marginBottom: '3px' }}>{desc}</li>
                                ))}
                            </ul>
                        </Box>
                    ))}
                </Box>
            )}
        </>
    )
}

export default WorkExperience