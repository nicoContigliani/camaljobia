import { PictureAsPdf } from "@mui/icons-material";
import { Box, Button, Dialog, DialogContent, DialogTitle, Typography, useMediaQuery, useTheme } from "@mui/material";
import { CVPDFTemplate } from "../CVPDFTemplate/CVPDFTemplate";

export const PDFPreview: React.FC<{ cv: any; userProfile: any; onClose: () => void; onDownload: () => void }> =
  ({ cv, userProfile, onClose, onDownload }) => {
    const theme = useTheme();
    const fullScreen = useMediaQuery(theme.breakpoints.down('md'));

    return (
      <Dialog
        open={true}
        onClose={onClose}
        maxWidth="lg"
        fullWidth
        fullScreen={fullScreen}
        sx={{
          '& .MuiDialog-paper': {
            maxWidth: '210mm',
            height: '297mm',
            overflow: 'hidden'
          }
        }}
      >
        <DialogTitle sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          backgroundColor: '#f5f5f5',
          borderBottom: '1px solid #ddd'
        }}>
          <Typography variant="h6">Vista previa del CV</Typography>
          <Box>
            <Button
              variant="outlined"
              onClick={onClose}
              sx={{ mr: 1 }}
            >
              Cerrar
            </Button>
            <Button
              variant="contained"
              startIcon={<PictureAsPdf />}
              onClick={onDownload}
            >
              Descargar PDF
            </Button>
          </Box>
        </DialogTitle>
        <DialogContent sx={{
          overflow: 'auto',
          p: 0,
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'flex-start',
          backgroundColor: '#f9f9f9'
        }}>
          <Box sx={{
            width: '210mm',
            height: '297mm',
            boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
            backgroundColor: 'white'
          }}>
            <CVPDFTemplate cv={cv} userProfile={userProfile} />
          </Box>
        </DialogContent>
      </Dialog>
    );
  };
