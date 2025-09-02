import React from 'react';
import {
  Drawer as MuiDrawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Divider,
  IconButton,
  useTheme,
  useMediaQuery,
  styled,
  CSSObject,
  Theme
} from '@mui/material';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';

// ==================================================
// PALETA DE COLORES Y ESQUEMA CROMÁTICO
// ==================================================
/*
 * Colores principales: 
 * - Primario: #3f51b5 (índigo) - Transmite confianza y profesionalismo
 * - Secundario: #f50057 (rosa intenso) - Proporciona contraste y energía
 * 
 * Colores de acento:
 * - #ff4081 (rosa más vibrante) - Para elementos destacados
 * - #757de8 (índigo claro) - Para estados hover y seleccionados
 * 
 * Psicología del color:
 * - Índigo: Estabilidad, profundidad, confianza (común en interfaces profesionales)
 * - Rosa: Creatividad, energía, llamada a la acción (contraste efectivo)
 * 
 * Jerarquía visual:
 * - Fondo del drawer: #ffffff (blanco puro) para máxima legibilidad
 * - Texto: #333333 (casi negro) para alto contraste
 * - Iconos: #3f51b5 (primario) para coherencia visual
 */

// ==================================================
// TIPOGRAFÍA Y JERARQUÍA TEXTUAL
// ==================================================
/*
 * Familia de fuentes: 'Roboto' (predeterminada de Material-UI)
 * Sistema de escalado tipográfico:
 * - h6: 1.25rem (20px) - Para títulos de sección
 * - body1: 1rem (16px) - Para texto principal
 * - body2: 0.875rem (14px) - Para texto secundario
 * 
 * Pesos:
 * - Regular (400): Texto normal
 * - Medium (500): Texto destacado
 * - Bold (700): Títulos y elementos importantes
 */

// ==================================================
// DISEÑO RESPONSIVO Y BREAKPOINTS
// ==================================================
/*
 * Breakpoints implementados (Material-UI default):
 * - xs: 0px - 599px (móviles)
 * - sm: 600px - 899px (tablets)
 * - md: 900px - 1199px (desktops pequeños)
 * - lg: 1200px - 1535px (desktops)
 * - xl: 1536px+ (desktops grandes)
 * 
 * Adaptaciones:
 * - Móviles: Drawer temporal que ocupa toda la pantalla
 * - Desktop: Drawer permanente con ancho fijo de 240px
 * 
 * Técnicas responsive:
 * - Media queries con useMediaQuery de Material-UI
 * - Cambio entre variantes temporary y permanent
 */

// ==================================================
// COMPONENTES MATERIAL-UI PERSONALIZADOS
// ==================================================
/*
 * Componentes customizados:
 * - Drawer: Modificado con styled API para animación suave
 * - ListItemButton: Personalizado para estados hover y selected
 */

// Estilos para el drawer abierto
const openedMixin = (theme: Theme): CSSObject => ({
  width: 240,
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: 'hidden',
});

// Estilos para el drawer cerrado
const closedMixin = (theme: Theme): CSSObject => ({
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: 'hidden',
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up('sm')]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
});

// Drawer personalizado con transiciones suaves
const CustomDrawer = styled(MuiDrawer, { 
  shouldForwardProp: (prop) => prop !== 'open' 
})(({ theme, open }) => ({
  width: 240,
  flexShrink: 0,
  whiteSpace: 'nowrap',
  boxSizing: 'border-box',
  ...(open && {
    ...openedMixin(theme),
    '& .MuiDrawer-paper': openedMixin(theme),
  }),
  ...(!open && {
    ...closedMixin(theme),
    '& .MuiDrawer-paper': closedMixin(theme),
  }),
}));

// ==================================================
// EFECTOS VISUALES Y TRANSICIONES
// ==================================================
/*
 * Sombras: 
 * - Drawer: Elevación 16 (sombra suave para sensación de profundidad)
 * - Botones: Elevación 2 en hover (efecto de elevación sutil)
 * 
 * Transiciones:
 * - Todas las transiciones duran 0.3s con easing sharp
 * - Animación suave al abrir/cerrar el drawer
 * 
 * Efectos de profundidad:
 * - Drawer con sombra para separación del contenido principal
 * - Estados hover con cambio de color y elevación
 */

// ==================================================
// SISTEMA DE ESPACIADO Y ALINEACIÓN
// ==================================================
/*
 * Sistema de espaciado: 
 * - Basado en el theme.spacing de Material-UI (8px base)
 * - Padding: 2 (16px) para items de lista
 * - Margin: 1 (8px) para separación entre elementos
 * 
 * Alineación:
 * - Flexbox para alinear íconos y texto
 * - Alineación vertical centrada en items de lista
 */

// ==================================================
// ESTILOS CONDICIONALES Y STATES
// ==================================================
/*
 * Estados implementados:
 * - Hover: Cambio de color de fondo a #f5f5f5
 * - Selected: Fondo color primario (#3f51b5) y texto blanco
 * - Active: Mismo estilo que selected para coherencia
 */

// ==================================================
// ESTRATEGIA DE ORGANIZACIÓN DE ESTILOS
// ==================================================
/*
 * Organización:
 * - Estilos definidos con styled API de Material-UI
 * - Uso de sx prop para estilos inline simples
 * - Mixins para reutilizar estilos comunes
 * 
 * Patrón de nomenclatura:
 * - Nombres descriptivos en inglés
 * - Prefijo "Styled" para componentes estilizados
 */

// Props del componente
export interface DrawerItem {
  text: string;
  icon: React.ReactElement;
  onClick?: () => void;
  selected?: boolean;
}

export interface DrawerProps {
  open: boolean;
  onClose: () => void;
  items: DrawerItem[];
  header?: React.ReactNode;
  footer?: React.ReactNode;
}

const Drawer: React.FC<DrawerProps> = ({ open, onClose, items, header, footer }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  return (
    <CustomDrawer
      variant={isMobile ? 'temporary' : 'permanent'}
      open={open}
      onClose={onClose}
      sx={{
        '& .MuiDrawer-paper': {
          backgroundColor: '#ffffff',
          color: '#333333',
          boxShadow: theme.shadows[16],
        },
      }}
    >
      {/* Header del drawer */}
      {header || (
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'flex-end',
            padding: theme.spacing(0, 1),
            ...theme.mixins.toolbar,
          }}
        >
          <IconButton onClick={onClose} sx={{ color: '#3f51b5' }}>
            {theme.direction === 'rtl' ? <ChevronRightIcon /> : <ChevronLeftIcon />}
          </IconButton>
        </div>
      )}

      <Divider />

      {/* Lista de items */}
      <List>
        {items.map((item, index) => (
          <ListItem key={index} disablePadding sx={{ display: 'block' }}>
            <ListItemButton
              onClick={item.onClick}
              selected={item.selected}
              sx={{
                minHeight: 48,
                justifyContent: open ? 'initial' : 'center',
                px: 2.5,
                backgroundColor: item.selected ? '#3f51b5' : 'inherit',
                '&:hover': {
                  backgroundColor: item.selected ? '#757de8' : '#f5f5f5',
                },
                '&.Mui-selected': {
                  color: '#ffffff',
                },
              }}
            >
              <ListItemIcon
                sx={{
                  minWidth: 0,
                  mr: open ? 3 : 'auto',
                  justifyContent: 'center',
                  color: item.selected ? '#ffffff' : '#3f51b5',
                }}
              >
                {item.icon}
              </ListItemIcon>
              <ListItemText 
                primary={item.text} 
                primaryTypographyProps={{ 
                  fontSize: '1rem',
                  fontWeight: item.selected ? 700 : 400,
                }}
                sx={{ 
                  opacity: open ? 1 : 0,
                  color: item.selected ? '#ffffff' : 'inherit',
                }}
              />
            </ListItemButton>
          </ListItem>
        ))}
      </List>

      <Divider />

      {/* Footer del drawer */}
      {footer && (
        <div style={{ marginTop: 'auto', padding: theme.spacing(2) }}>
          {footer}
        </div>
      )}
    </CustomDrawer>
  );
};

export default Drawer;