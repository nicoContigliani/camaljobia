import { Box } from '@mui/material'
import React from 'react'

const HardSkill = (props: any) => {
    const { cv } = props
    return (
        <>
            <Box sx={{ marginBottom: '15px' }}>
                <h2 style={{
                    margin: '0 0 10px 0',
                    fontSize: '14px',
                    borderBottom: '1px solid #ddd',
                    paddingBottom: '5px',
                    textTransform: 'uppercase',
                    color: '#1976d2'
                }}>
                    Habilidades Técnicas
                </h2>
                {Object.entries(cv.skills).map(([category, skills]: [string, any]) => (
                    skills.length > 0 && (
                        <Box key={category} sx={{ marginBottom: '8px' }}>
                            <strong style={{ textTransform: 'capitalize' }}>
                                {category.replace(/_/g, ' ')}:
                            </strong>{' '}
                            {skills.join(', ')}
                        </Box>
                    )
                ))}
            </Box>
        </>
    )
}

export default HardSkill