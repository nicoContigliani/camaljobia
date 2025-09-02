import { Box } from '@mui/material'
import React from 'react'

const Summary = (props: any) => {
    const {  cv } = props
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
                    Resumen Profesional
                </h2>
                <p style={{ margin: '0', textAlign: 'justify' }}>{cv.professional_summary}</p>
            </Box>
        </>
    )
}

export default Summary