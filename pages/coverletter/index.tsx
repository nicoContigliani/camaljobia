// import React, { useEffect, useState } from 'react';
// import {
//   Container,
//   Typography,
//   Paper,
//   Button,
//   Box,
//   Card,
//   CardContent,
//   CardActions,
//   IconButton,
//   Dialog,
//   Alert,
//   Chip,
//   useTheme,
//   useMediaQuery
// } from '@mui/material';
// import {
//   Add,
//   Edit,
//   Delete,
//   Email,
//   Description
// } from '@mui/icons-material';
// import { useSelector } from 'react-redux';
// import { RootState } from '@/store/store';
// import {
//   fetchCoverLetters,
//   createCoverLetter,
//   updateCoverLetter,
//   deleteCoverLetter,
//   selectCoverLetters,
//   selectCoverLetterLoading,
//   selectCoverLetterError,
//   CoverLetterData
// } from '@/store/features/coverLetterSlice';
// import CoverLetterEditor from '@/components/CoverLetter/CoverLetterEditor';
// import { useAppDispatch } from '@/store/hooks';

// const CoverLetterPage: React.FC = () => {
//   const dispatch = useAppDispatch();
//   const letters = useSelector(selectCoverLetters);
//   const loading = useSelector(selectCoverLetterLoading);
//   const error = useSelector(selectCoverLetterError);
//   const theme = useTheme();
//   const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  
//   const [editorOpen, setEditorOpen] = useState(false);
//   const [editingLetter, setEditingLetter] = useState<CoverLetterData | null>(null);

//   useEffect(() => {
//     dispatch(fetchCoverLetters());
//   }, [dispatch]);

//   const handleCreateLetter = () => {
//     setEditingLetter(null);
//     setEditorOpen(true);
//   };

//   const handleEditLetter = (letter: CoverLetterData) => {
//     setEditingLetter(letter);
//     setEditorOpen(true);
//   };

//   const handleDeleteLetter = async (id: string) => {
//     if (window.confirm('¿Estás seguro de que quieres eliminar esta carta?')) {
//       await dispatch(deleteCoverLetter(id));
//       dispatch(fetchCoverLetters());
//     }
//   };

//   const handleSaveLetter = async (letterData: Partial<CoverLetterData>) => {
//     if (editingLetter) {
//       await dispatch(updateCoverLetter({ id: editingLetter._id, letterData }));
//     } else {
//       await dispatch(createCoverLetter(letterData));
//     }
//     setEditorOpen(false);
//     dispatch(fetchCoverLetters());
//   };

//   const handleUseInEmail = (content: string) => {
//     navigator.clipboard.writeText(content);
//     alert('Contenido copiado al portapapeles para usar en el email');
//   };

//   return (
//     <Container maxWidth="lg" sx={{ py: 4 }}>
//       <Box sx={{ 
//         display: 'flex', 
//         flexDirection: isMobile ? 'column' : 'row', 
//         justifyContent: 'space-between', 
//         alignItems: isMobile ? 'flex-start' : 'center', 
//         mb: 3,
//         gap: isMobile ? 2 : 0
//       }}>
//         <Typography variant="h4">Cartas de Presentación</Typography>
//         <Button
//           variant="contained"
//           startIcon={<Add />}
//           onClick={handleCreateLetter}
//           sx={{ minWidth: isMobile ? '100%' : 'auto' }}
//         >
//           Nueva Carta
//         </Button>
//       </Box>

//       {error && (
//         <Alert severity="error" sx={{ mb: 2 }}>
//           {error}
//         </Alert>
//       )}

//       <Box sx={{ 
//         display: 'flex', 
//         flexDirection: 'column', 
//         gap: 3,
//         alignItems: letters.length === 0 ? 'center' : 'flex-start'
//       }}>
//         {letters.length > 0 && (
//           <Box sx={{ 
//             display: 'flex', 
//             flexWrap: 'wrap', 
//             gap: 3, 
//             width: '100%',
//             justifyContent: isMobile ? 'center' : 'flex-start'
//           }}>
//             {letters.map((letter) => (
//               <Card key={letter._id} sx={{ 
//                 width: isMobile ? '100%' : 'calc(50% - 12px)',
//                 minWidth: isMobile ? '100%' : 300,
//                 maxWidth: 500,
//                 margin: '0 auto'
//               }}>
//                 <CardContent>
//                   <Typography variant="h6" gutterBottom>
//                     {letter.title}
//                   </Typography>
//                   <Box sx={{ mb: 1 }}>
//                     {letter.company && (
//                       <Chip label={letter.company} size="small" sx={{ mr: 1, mb: 1 }} />
//                     )}
//                     {letter.position && (
//                       <Chip label={letter.position} size="small" sx={{ mb: 1 }} />
//                     )}
//                   </Box>
//                   <Typography
//                     variant="body2"
//                     color="text.secondary"
//                     sx={{
//                       overflow: 'hidden',
//                       textOverflow: 'ellipsis',
//                       display: '-webkit-box',
//                       WebkitLineClamp: 3,
//                       WebkitBoxOrient: 'vertical'
//                     }}
//                   >
//                     {letter.content}
//                   </Typography>
//                 </CardContent>
//                 <CardActions>
//                   <IconButton
//                     size="small"
//                     onClick={() => handleEditLetter(letter)}
//                     title="Editar"
//                   >
//                     <Edit />
//                   </IconButton>
//                   <IconButton
//                     size="small"
//                     onClick={() => handleUseInEmail(letter.content)}
//                     title="Usar en email"
//                   >
//                     <Email />
//                   </IconButton>
//                   <IconButton
//                     size="small"
//                     onClick={() => handleDeleteLetter(letter._id)}
//                     title="Eliminar"
//                     color="error"
//                   >
//                     <Delete />
//                   </IconButton>
//                 </CardActions>
//               </Card>
//             ))}
//           </Box>
//         )}

//         {letters.length === 0 && !loading && (
//           <Paper sx={{ 
//             p: 4, 
//             textAlign: 'center', 
//             width: isMobile ? '100%' : '70%', 
//             maxWidth: 600,
//             mx: 'auto'
//           }}>
//             <Description sx={{ fontSize: 48, color: 'text.secondary', mb: 2 }} />
//             <Typography variant="h6" gutterBottom>
//               No tienes cartas de presentación
//             </Typography>
//             <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
//               Crea tu primera carta para usar en tus aplicaciones por email
//             </Typography>
//             <Button variant="contained" onClick={handleCreateLetter}>
//               Crear Primera Carta
//             </Button>
//           </Paper>
//         )}
//       </Box>

//       <Dialog
//         open={editorOpen}
//         onClose={() => setEditorOpen(false)}
//         maxWidth="md"
//         fullWidth
//       >
//         <CoverLetterEditor
//           letter={editingLetter}
//           onSave={handleSaveLetter}
//           onCancel={() => setEditorOpen(false)}
//           loading={loading}
//         />
//       </Dialog>
//     </Container>
//   );
// };

// export default CoverLetterPage;


import React, { useEffect, useState } from 'react';
import {
  Container,
  Typography,
  Paper,
  Button,
  Box,
  Card,
  CardContent,
  CardActions,
  IconButton,
  Dialog,
  Alert,
  Chip,
  useTheme,
  useMediaQuery,
  TextField,
  InputAdornment,
  Pagination,
  Menu,
  MenuItem,
  ListItemIcon,
  ListItemText,
  Divider,
  Fab,
  Avatar,
  Tooltip,
  alpha,
  DialogTitle,
  DialogContent,
  DialogActions,
  CircularProgress
} from '@mui/material';
import {
  Add,
  Edit,
  Delete,
  Email,
  Description,
  Search,
  FilterList,
  ContentCopy,
  Share,
  Download,
  MoreVert,
  Business,
  Work,
  AccessTime,
  Close
} from '@mui/icons-material';
import { useSelector } from 'react-redux';
import { RootState } from '@/store/store';
import {
  fetchCoverLetters,
  createCoverLetter,
  updateCoverLetter,
  deleteCoverLetter,
  selectCoverLetters,
  selectCoverLetterLoading,
  selectCoverLetterError,
  CoverLetterData
} from '@/store/features/coverLetterSlice';
import CoverLetterEditor from '@/components/CoverLetter/CoverLetterEditor';
import { useAppDispatch } from '@/store/hooks';

const CoverLetterPage: React.FC = () => {
  const dispatch = useAppDispatch();
  const letters = useSelector(selectCoverLetters);
  const loading = useSelector(selectCoverLetterLoading);
  const error = useSelector(selectCoverLetterError);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  
  const [editorOpen, setEditorOpen] = useState(false);
  const [previewOpen, setPreviewOpen] = useState(false);
  const [editingLetter, setEditingLetter] = useState<CoverLetterData | null>(null);
  const [previewLetter, setPreviewLetter] = useState<CoverLetterData | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [page, setPage] = useState(1);
  const [sortAnchorEl, setSortAnchorEl] = useState<null | HTMLElement>(null);
  const [selectedLetterMenu, setSelectedLetterMenu] = useState<null | HTMLElement>(null);
  const [selectedLetter, setSelectedLetter] = useState<CoverLetterData | null>(null);
  const [sortBy, setSortBy] = useState<'newest' | 'oldest' | 'title'>('newest');
  const [copied, setCopied] = useState(false);

  const itemsPerPage = 6;

  useEffect(() => {
    dispatch(fetchCoverLetters());
  }, [dispatch]);

  // Filtrar y ordenar cartas
  const filteredLetters = letters
    .filter(letter => 
      letter.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      letter.content.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (letter.company && letter.company.toLowerCase().includes(searchTerm.toLowerCase())) ||
      (letter.position && letter.position.toLowerCase().includes(searchTerm.toLowerCase()))
    )
    .sort((a, b) => {
      switch (sortBy) {
        case 'newest':
          return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
        case 'oldest':
          return new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime();
        case 'title':
          return a.title.localeCompare(b.title);
        default:
          return 0;
      }
    });

  const totalPages = Math.ceil(filteredLetters.length / itemsPerPage);
  const paginatedLetters = filteredLetters.slice(
    (page - 1) * itemsPerPage,
    page * itemsPerPage
  );

  const handleCreateLetter = () => {
    setEditingLetter(null);
    setEditorOpen(true);
  };

  const handleEditLetter = (letter: CoverLetterData) => {
    setEditingLetter(letter);
    setEditorOpen(true);
  };

  const handlePreviewLetter = (letter: CoverLetterData) => {
    setPreviewLetter(letter);
    setPreviewOpen(true);
  };

  const handleDeleteLetter = async (id: string) => {
    if (window.confirm('¿Estás seguro de que quieres eliminar esta carta?')) {
      await dispatch(deleteCoverLetter(id));
      dispatch(fetchCoverLetters());
    }
  };

  const handleSaveLetter = async (letterData: Partial<CoverLetterData>) => {
    if (editingLetter) {
      await dispatch(updateCoverLetter({ id: editingLetter._id, letterData }));
    } else {
      await dispatch(createCoverLetter(letterData));
    }
    setEditorOpen(false);
    dispatch(fetchCoverLetters());
  };

  const handleUseInEmail = (content: string) => {
    navigator.clipboard.writeText(content);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleShareLetter = (letter: CoverLetterData) => {
    const shareData = {
      title: `Carta de Presentación: ${letter.title}`,
      text: letter.content.substring(0, 100) + '...',
      url: window.location.href
    };

    if (navigator.share) {
      navigator.share(shareData).catch(console.error);
    } else {
      handleUseInEmail(letter.content);
    }
  };

  const handleDownloadLetter = (letter: CoverLetterData) => {
    const blob = new Blob([letter.content], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${letter.title.replace(/\s+/g, '_')}.txt`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleSortOpen = (event: React.MouseEvent<HTMLElement>) => {
    setSortAnchorEl(event.currentTarget);
  };

  const handleSortClose = () => {
    setSortAnchorEl(null);
  };

  const handleSortSelect = (sort: 'newest' | 'oldest' | 'title') => {
    setSortBy(sort);
    setSortAnchorEl(null);
    setPage(1);
  };

  const handleLetterMenuOpen = (event: React.MouseEvent<HTMLElement>, letter: CoverLetterData) => {
    setSelectedLetterMenu(event.currentTarget);
    setSelectedLetter(letter);
  };

  const handleLetterMenuClose = () => {
    setSelectedLetterMenu(null);
    setSelectedLetter(null);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('es-ES', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const getLetterPreview = (content: string) => {
    return content.length > 120 ? content.substring(0, 120) + '...' : content;
  };

  return (
    <Container maxWidth="xl" sx={{ py: 4, minHeight: '100vh' }}>
      {/* Header */}
      <Paper sx={{ 
        p: 4,
        mb: 4,
        textAlign: 'center',
        background: 'linear-gradient(135deg, #1f2937a5 0%, #37415117 100%)',
        color: 'white'
      }}>
        <Typography variant="h3" component="h1" gutterBottom sx={{ fontWeight: 'bold' }}>
          📝 Cartas de Presentación
        </Typography>
        <Typography variant="h6" sx={{ opacity: 0.9, mb: 3 }}>
          Gestiona tus cartas personalizadas para cada oportunidad laboral
        </Typography>
        
        <Button
          variant="contained"
          size="large"
          startIcon={<Add />}
          onClick={handleCreateLetter}
          sx={{
            backgroundColor: 'white',
            color: theme.palette.primary.main,
            '&:hover': {
              backgroundColor: alpha('#fff', 0.9),
              transform: 'translateY(-2px)',
            },
            px: 4,
            py: 1.5
          }}
        >
          Crear Nueva Carta
        </Button>
      </Paper>

      {/* Filtros y Búsqueda */}
      <Paper sx={{ p: 3, mb: 3 }}>
        <Box sx={{ display: 'flex', flexDirection: isMobile ? 'column' : 'row', gap: 2, alignItems: 'center' }}>
          <TextField
            fullWidth
            placeholder="Buscar en cartas..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Search />
                </InputAdornment>
              ),
            }}
          />
          
          <Button
            variant="outlined"
            startIcon={<FilterList />}
            onClick={handleSortOpen}
            sx={{ minWidth: 120, height: 56 }}
          >
            Ordenar
          </Button>
        </Box>

        <Menu
          anchorEl={sortAnchorEl}
          open={Boolean(sortAnchorEl)}
          onClose={handleSortClose}
        >
          <MenuItem onClick={() => handleSortSelect('newest')} selected={sortBy === 'newest'}>
            Más recientes
          </MenuItem>
          <MenuItem onClick={() => handleSortSelect('oldest')} selected={sortBy === 'oldest'}>
            Más antiguas
          </MenuItem>
          <MenuItem onClick={() => handleSortSelect('title')} selected={sortBy === 'title'}>
            Por título (A-Z)
          </MenuItem>
        </Menu>
      </Paper>

      {error && (
        <Alert severity="error" sx={{ mb: 3 }}>
          {error}
        </Alert>
      )}

      {/* Contador de resultados */}
      <Box sx={{ mb: 3 }}>
        <Typography variant="body2" color="text.secondary">
          {filteredLetters.length} {filteredLetters.length === 1 ? 'carta encontrada' : 'cartas encontradas'}
        </Typography>
      </Box>

      {/* Lista de Cartas */}
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
        {paginatedLetters.map((letter) => (
          <Card key={letter._id}>
            <CardContent sx={{ p: 3 }}>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 2 }}>
                <Box sx={{ flex: 1 }}>
                  <Typography variant="h6" gutterBottom sx={{ fontWeight: 'bold' }}>
                    {letter.title}
                  </Typography>
                  
                  <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mb: 2 }}>
                    {letter.company && (
                      <Chip 
                        icon={<Business />} 
                        label={letter.company} 
                        size="small" 
                        variant="outlined"
                      />
                    )}
                    {letter.position && (
                      <Chip 
                        icon={<Work />} 
                        label={letter.position} 
                        size="small" 
                        variant="outlined"
                      />
                    )}
                    <Chip 
                      icon={<AccessTime />} 
                      label={formatDate(letter.createdAt)} 
                      size="small" 
                      variant="outlined"
                    />
                  </Box>
                </Box>

                <IconButton onClick={(e) => handleLetterMenuOpen(e, letter)}>
                  <MoreVert />
                </IconButton>
              </Box>

              <Typography
                variant="body2"
                color="text.secondary"
                sx={{
                  lineHeight: 1.6,
                  mb: 2,
                  display: '-webkit-box',
                  WebkitLineClamp: 3,
                  WebkitBoxOrient: 'vertical',
                  overflow: 'hidden'
                }}
              >
                {getLetterPreview(letter.content)}
              </Typography>

              <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
                <Button
                  size="small"
                  startIcon={<Email />}
                  onClick={() => handleUseInEmail(letter.content)}
                  variant="outlined"
                >
                  {copied ? '¡Copiado!' : 'Usar en Email'}
                </Button>
                <Button
                  size="small"
                  startIcon={<Edit />}
                  onClick={() => handleEditLetter(letter)}
                  variant="outlined"
                >
                  Editar
                </Button>
                <Button
                  size="small"
                  onClick={() => handlePreviewLetter(letter)}
                  variant="outlined"
                >
                  Ver Completa
                </Button>
              </Box>
            </CardContent>
          </Card>
        ))}

        {filteredLetters.length === 0 && !loading && (
          <Paper sx={{ p: 6, textAlign: 'center' }}>
            <Description sx={{ fontSize: 64, color: 'text.secondary', mb: 2, opacity: 0.5 }} />
            <Typography variant="h6" gutterBottom color="text.secondary">
              No se encontraron cartas
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
              {searchTerm ? 'Intenta con otros términos de búsqueda' : 'Crea tu primera carta para comenzar'}
            </Typography>
            <Button variant="contained" onClick={handleCreateLetter}>
              Crear Primera Carta
            </Button>
          </Paper>
        )}
      </Box>

      {/* Paginación */}
      {totalPages > 1 && (
        <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
          <Pagination
            count={totalPages}
            page={page}
            onChange={(_, value) => setPage(value)}
            color="primary"
            size={isMobile ? "small" : "medium"}
          />
        </Box>
      )}

      {/* Menu de acciones para carta específica */}
      <Menu
        anchorEl={selectedLetterMenu}
        open={Boolean(selectedLetterMenu)}
        onClose={handleLetterMenuClose}
      >
        <MenuItem onClick={() => {
          handleUseInEmail(selectedLetter?.content || '');
          handleLetterMenuClose();
        }}>
          <ListItemIcon>
            <Email fontSize="small" />
          </ListItemIcon>
          <ListItemText>Usar en Email</ListItemText>
        </MenuItem>
        <MenuItem onClick={() => {
          selectedLetter && handleEditLetter(selectedLetter);
          handleLetterMenuClose();
        }}>
          <ListItemIcon>
            <Edit fontSize="small" />
          </ListItemIcon>
          <ListItemText>Editar</ListItemText>
        </MenuItem>
        <MenuItem onClick={() => {
          selectedLetter && handlePreviewLetter(selectedLetter);
          handleLetterMenuClose();
        }}>
          <ListItemIcon>
            <Description fontSize="small" />
          </ListItemIcon>
          <ListItemText>Ver Completa</ListItemText>
        </MenuItem>
        <MenuItem onClick={() => {
          selectedLetter && handleDownloadLetter(selectedLetter);
          handleLetterMenuClose();
        }}>
          <ListItemIcon>
            <Download fontSize="small" />
          </ListItemIcon>
          <ListItemText>Descargar</ListItemText>
        </MenuItem>
        <MenuItem onClick={() => {
          selectedLetter && handleShareLetter(selectedLetter);
          handleLetterMenuClose();
        }}>
          <ListItemIcon>
            <Share fontSize="small" />
          </ListItemIcon>
          <ListItemText>Compartir</ListItemText>
        </MenuItem>
        <Divider />
        <MenuItem 
          onClick={() => {
            selectedLetter && handleDeleteLetter(selectedLetter._id);
            handleLetterMenuClose();
          }}
          sx={{ color: 'error.main' }}
        >
          <ListItemIcon>
            <Delete fontSize="small" color="error" />
          </ListItemIcon>
          <ListItemText>Eliminar</ListItemText>
        </MenuItem>
      </Menu>

      {/* Dialog Editor */}
      <Dialog
        open={editorOpen}
        onClose={() => setEditorOpen(false)}
        maxWidth="md"
        fullWidth
      >
        <CoverLetterEditor
          letter={editingLetter}
          onSave={handleSaveLetter}
          onCancel={() => setEditorOpen(false)}
          loading={loading}
        />
      </Dialog>

      {/* Dialog Preview */}
      <Dialog
        open={previewOpen}
        onClose={() => setPreviewOpen(false)}
        maxWidth="md"
        fullWidth
        PaperProps={{ sx: { maxHeight: '80vh' } }}
      >
        <DialogTitle>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <Typography variant="h6">{previewLetter?.title}</Typography>
            <IconButton onClick={() => setPreviewOpen(false)}>
              <Close />
            </IconButton>
          </Box>
          {previewLetter?.company && (
            <Typography variant="subtitle1" color="primary">
              {previewLetter.company}
              {previewLetter.position && ` - ${previewLetter.position}`}
            </Typography>
          )}
        </DialogTitle>
        <DialogContent>
          <Paper sx={{ p: 3, backgroundColor: 'grey.50' }}>
            <Typography 
              variant="body1" 
              sx={{ 
                whiteSpace: 'pre-wrap',
                lineHeight: 1.8
              }}
            >
              {previewLetter?.content}
            </Typography>
          </Paper>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => previewLetter && handleUseInEmail(previewLetter.content)}>
            <ContentCopy sx={{ mr: 1 }} />
            Copiar al Portapapeles
          </Button>
          <Button onClick={() => previewLetter && handleDownloadLetter(previewLetter)}>
            <Download sx={{ mr: 1 }} />
            Descargar
          </Button>
        </DialogActions>
      </Dialog>

      {/* Floating Action Button para móvil */}
      {isMobile && (
        <Fab
          color="primary"
          aria-label="add"
          onClick={handleCreateLetter}
          sx={{
            position: 'fixed',
            bottom: 24,
            right: 24,
          }}
        >
          <Add />
        </Fab>
      )}
    </Container>
  );
};

export default CoverLetterPage;