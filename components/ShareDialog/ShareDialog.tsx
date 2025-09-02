import { ContentCopy } from "@mui/icons-material";
import { Dialog, DialogTitle, Box, DialogContent, Typography, TextField, Button, CircularProgress, DialogActions } from "@mui/material";
import Link from "next/link";
import { useState } from "react";

export const ShareDialog: React.FC<{
  open: boolean;
  onClose: () => void;
  shareLink: string;
  onGenerateLink: () => void;
  isGeneratingLink: boolean;
}> = ({ open, onClose, shareLink, onGenerateLink, isGeneratingLink }) => {
  const [copied, setCopied] = useState(false);

  const handleCopyLink = () => {
    navigator.clipboard.writeText(shareLink)
      .then(() => {
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      })
      .catch(err => {
        console.error('Error copying to clipboard:', err);
      });
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
      <DialogTitle>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <Link href={""} /> Compartir CV
        </Box>
      </DialogTitle>
      <DialogContent>
        <Typography variant="body1" sx={{ mb: 2 }}>
          Genera un enlace único para compartir tu CV. Las personas con este enlace podrán ver y descargar tu CV, pero necesitarán iniciar sesión para acceder a él.
        </Typography>

        {shareLink ? (
          <>
            <TextField
              fullWidth
              value={shareLink}
              label="Enlace para compartir"
              InputProps={{
                readOnly: true,
              }}
              sx={{ mb: 2 }}
            />
            <Button
              variant="outlined"
              startIcon={<ContentCopy />}
              onClick={handleCopyLink}
              fullWidth
            >
              {copied ? '¡Enlace copiado!' : 'Copiar enlace'}
            </Button>
          </>
        ) : (
          <Box sx={{ textAlign: 'center', py: 3 }}>
            <Button
              variant="contained"
              onClick={onGenerateLink}
              disabled={isGeneratingLink}
              startIcon={isGeneratingLink ? <CircularProgress size={16} /> : <Link href={""} />}
            >
              {isGeneratingLink ? 'Generando enlace...' : 'Generar enlace para compartir'}
            </Button>
          </Box>
        )}
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cerrar</Button>
      </DialogActions>
    </Dialog>
  );
};