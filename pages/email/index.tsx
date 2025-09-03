"use client";

import EmailSender from '@/components/Emails/EmailComponent/EmailSender';
import { Email } from '@mui/icons-material';
import { MenuItem } from '@mui/material';
import React, { useState } from 'react';
import { Suspense } from 'react';

const EmailPage = () => {
    const [emailOpen, setEmailOpen] = useState(false);
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null); // Estado correctamente definido

    const handleMenuClose = () => {
        setAnchorEl(null);
    };

    return (
        <div>
            <MenuItem onClick={() => { 
                setEmailOpen(true); 
                handleMenuClose(); 
            }}>
                <Email sx={{ mr: 1 }} /> Enviar Email
            </MenuItem>
            <EmailSender open={emailOpen} onClose={() => setEmailOpen(false)} />
        </div>
    );
};

export default EmailPage;