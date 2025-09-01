'use client';

import React, { useState } from 'react';
import {
  FacebookShareButton,
  TwitterShareButton,
  LinkedinShareButton,
  WhatsappShareButton,
  TelegramShareButton,
  EmailShareButton,
  RedditShareButton,
  PinterestShareButton,
  FacebookIcon,
  TwitterIcon,
  LinkedinIcon,
  WhatsappIcon,
  TelegramIcon,
  EmailIcon,
  RedditIcon,
  PinterestIcon,
} from 'react-share';
import {
  Box,
  Paper,
  Typography,
  IconButton,
  Tooltip,
  Snackbar,
  Alert,
  useTheme,
  useMediaQuery,
} from '@mui/material';
import {
  Share as ShareIcon,
  ContentCopy as CopyIcon,
  Check as CheckIcon,
  Facebook,
  Twitter,
  LinkedIn,
  Message,
  Mail,
  Telegram,
  Reddit,
  Bookmark,
} from '@mui/icons-material';

export interface SocialShareProps {
  /** URL que se compartirá */
  url: string;
  /** Título del contenido */
  title?: string;
  /** Descripción del contenido */
  description?: string;
  /** Imagen para Pinterest */
  image?: string;
  /** Tags para Twitter */
  hashtags?: string[];
  /** Tamaño de los iconos */
  iconSize?: number;
  /** Mostrar tooltips */
  showTooltips?: boolean;
  /** Incluir botón de copiar enlace */
  showCopyLink?: boolean;
  /** Redes sociales a mostrar */
  networks?: Array<
    | 'facebook'
    | 'twitter'
    | 'linkedin'
    | 'whatsapp'
    | 'telegram'
    | 'email'
    | 'reddit'
    | 'pinterest'
  >;
  /** Clases personalizadas */
  className?: string;
  /** Estilo del contenedor */
  variant?: 'minimal' | 'standard' | 'expanded';
  /** Dirección del layout */
  direction?: 'horizontal' | 'vertical';
  /** Mostrar etiquetas de texto */
  showLabels?: boolean;
}

// Mapeo de iconos de Material-UI para cada red social
const socialIcons = {
  facebook: Facebook,
  twitter: Twitter,
  linkedin: LinkedIn,
  whatsapp: Message,
  telegram: Telegram,
  email: Mail,
  reddit: Reddit,
  pinterest: Bookmark,
};

// Interfaces para el tipado de las configuraciones de red
interface NetworkConfig {
  component: React.ComponentType<any>;
  icon: React.ComponentType<any>;
  label: string;
  tooltip: string;
  props: Record<string, any>;
}

const SocialShare: React.FC<SocialShareProps> = ({
  url,
  title = '',
  description = '',
  image = '',
  hashtags = [],
  iconSize = 40,
  showTooltips = true,
  showCopyLink = true,
  networks = ['facebook', 'twitter', 'linkedin', 'whatsapp', 'telegram', 'email'],
  variant = 'standard',
  direction = 'horizontal',
  showLabels = false,
}) => {
  const [copied, setCopied] = useState(false);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setSnackbarOpen(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Error al copiar el enlace:', err);
    }
  };

  const handleCloseSnackbar = () => {
    setSnackbarOpen(false);
  };

  const getNetworkConfig = (network: string): NetworkConfig | null => {
    const baseProps = { url };

    switch (network) {
      case 'facebook':
        return {
          component: FacebookShareButton,
          icon: FacebookIcon,
          label: 'Facebook',
          tooltip: 'Compartir en Facebook',
          props: {
            ...baseProps,
            quote: title || description,
            hashtag: hashtags.length > 0 ? hashtags[0].replace('#', '') : undefined,
          },
        };
      case 'twitter':
        return {
          component: TwitterShareButton,
          icon: TwitterIcon,
          label: 'Twitter',
          tooltip: 'Compartir en Twitter',
          props: {
            ...baseProps,
            title: title || description,
            hashtags: hashtags.length > 0 ? hashtags.map(tag => tag.replace('#', '')) : undefined,
          },
        };
      case 'linkedin':
        return {
          component: LinkedinShareButton,
          icon: LinkedinIcon,
          label: 'LinkedIn',
          tooltip: 'Compartir en LinkedIn',
          props: {
            ...baseProps,
            title,
            summary: description,
          },
        };
      case 'whatsapp':
        return {
          component: WhatsappShareButton,
          icon: WhatsappIcon,
          label: 'WhatsApp',
          tooltip: 'Compartir en WhatsApp',
          props: {
            ...baseProps,
            title: `${title}${description ? ` - ${description}` : ''}`,
          },
        };
      case 'telegram':
        return {
          component: TelegramShareButton,
          icon: TelegramIcon,
          label: 'Telegram',
          tooltip: 'Compartir en Telegram',
          props: {
            ...baseProps,
            title: title || description,
          },
        };
      case 'email':
        return {
          component: EmailShareButton,
          icon: EmailIcon,
          label: 'Email',
          tooltip: 'Compartir por email',
          props: {
            ...baseProps,
            subject: title,
            body: `${description}\n\n${url}`,
          },
        };
      case 'reddit':
        return {
          component: RedditShareButton,
          icon: RedditIcon,
          label: 'Reddit',
          tooltip: 'Compartir en Reddit',
          props: {
            ...baseProps,
            title: title || description,
          },
        };
      case 'pinterest':
        return {
          component: PinterestShareButton,
          icon: PinterestIcon,
          label: 'Pinterest',
          tooltip: 'Compartir en Pinterest',
          props: {
            ...baseProps,
            media: image,
            description: description || title,
          },
        };
      default:
        return null;
    }
  };

  const isMinimal = variant === 'minimal';
  const isExpanded = variant === 'expanded';
  const isVertical = direction === 'vertical';

  return (
    <Box 
      sx={{ 
        width: '100%', 
        display: 'flex', 
        justifyContent: 'center',
        alignItems: 'center',
        my: 2
      }}
    >
      <Paper
        elevation={1}
        sx={{
          p: 2,
          display: 'flex',
          flexDirection: isVertical ? 'column' : 'row',
          alignItems: 'center',
          justifyContent: 'center',
          gap: 2,
          borderRadius: 2,
          backgroundColor: theme.palette.background.paper,
          maxWidth: 'fit-content',
          mx: 'auto'
        }}
      >
        {(isExpanded || variant === 'standard') && (
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              gap: 1,
              color: 'text.secondary',
            }}
          >
            <ShareIcon fontSize="small" />
            <Typography variant="body2">Compartir:</Typography>
          </Box>
        )}

        <Box
          sx={{
            display: 'flex',
            flexDirection: isVertical ? 'column' : 'row',
            gap: 1,
            flexWrap: 'wrap',
            justifyContent: 'center',
            alignItems: 'center'
          }}
        >
          {networks.map((network) => {
            const config = getNetworkConfig(network);
            if (!config) return null;

            // Para Pinterest, si no hay imagen, no mostrar el botón
            if (network === 'pinterest' && !image) return null;

            const ShareButton = config.component;
            const ShareIconComponent = config.icon;
            const MaterialIcon = socialIcons[network as keyof typeof socialIcons];

            return (
              <Tooltip key={network} title={showTooltips ? config.tooltip : ''} arrow>
                <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                  <ShareButton {...config.props}>
                    <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      <IconButton
                        size="medium"
                        sx={{
                          borderRadius: 1,
                          p: isMinimal ? 0.5 : 1,
                          color: 'primary.main',
                          '&:hover': {
                            backgroundColor: 'action.hover',
                          },
                        }}
                      >
                        {isMinimal ? (
                          <MaterialIcon fontSize="small" />
                        ) : (
                          <ShareIconComponent
                            size={iconSize}
                            round
                            borderRadius={8}
                          />
                        )}
                      </IconButton>
                      {showLabels && (
                        <Typography variant="caption" sx={{ ml: 1 }}>
                          {config.label}
                        </Typography>
                      )}
                    </Box>
                  </ShareButton>
                </Box>
              </Tooltip>
            );
          })}

          {showCopyLink && (
            <Tooltip title={copied ? '¡Copiado!' : 'Copiar enlace'} arrow>
              <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <IconButton
                  onClick={handleCopyLink}
                  size="medium"
                  sx={{
                    borderRadius: 1,
                    p: isMinimal ? 0.5 : 1,
                    color: copied ? 'success.main' : 'primary.main',
                    '&:hover': {
                      backgroundColor: 'action.hover',
                    },
                  }}
                >
                  {copied ? <CheckIcon fontSize="small" /> : <CopyIcon fontSize="small" />}
                </IconButton>
                {showLabels && (
                  <Typography variant="caption" sx={{ ml: 1 }}>
                    {copied ? 'Copiado' : 'Copiar'}
                  </Typography>
                )}
              </Box>
            </Tooltip>
          )}
        </Box>
      </Paper>

      <Snackbar
        open={snackbarOpen}
        autoHideDuration={2000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert onClose={handleCloseSnackbar} severity="success" sx={{ width: '100%' }}>
          Enlace copiado al portapapeles
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default SocialShare;