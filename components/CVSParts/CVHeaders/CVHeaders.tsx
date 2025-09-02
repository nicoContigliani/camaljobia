import cv from '@/pages/cv'
import { Box } from '@mui/material'
import React from 'react'

const CVHeaders = (props: any) => {
    const { userProfile, cv } = props
    return (
        <>
            <Box sx={{ textAlign: 'center', marginBottom: '15px', borderBottom: '2px solid #1976d2', paddingBottom: '10px' }}>
                <h1 style={{ margin: '0', fontSize: '20px', color: '#1976d2', textTransform: 'uppercase' }}>
                    {userProfile?.fullname || 'Nombre no disponible'}
                </h1>
                <div style={{ margin: '5px 0', fontSize: '14px', fontWeight: 'bold' }}>{cv.profile}</div>
                <Box sx={{ display: 'flex', justifyContent: 'center', flexWrap: 'wrap', gap: '10px', fontSize: '11px' }}>
                    {userProfile?.email && <span>{userProfile.email}</span>}
                    {userProfile?.phone && <span>{userProfile.phone}</span>}
                    {userProfile?.linkedin && <span>LinkedIn: {userProfile.linkedin}</span>}
                    {userProfile?.portfolio && <span>Portfolio: {userProfile.portfolio}</span>}
                </Box>
            </Box>

        </>
    )
}

export default CVHeaders