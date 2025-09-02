// components/DashboardCard.tsx
import React from 'react';
import {
  Card,
  CardContent,
  CardHeader,
  CardActions,
  Typography,
  IconButton,
  Box,
  SxProps,
  Theme,
} from '@mui/material';
import MoreVertIcon from '@mui/icons-material/MoreVert';

export interface DashboardCardProps {
  title: string;
  subtitle?: string;
  children: React.ReactNode;
  action?: React.ReactNode;
  sx?: SxProps<Theme>;
  contentSx?: SxProps<Theme>;
}

const DashboardCard: React.FC<DashboardCardProps> = ({
  title,
  subtitle,
  children,
  action,
  sx,
  contentSx,
}) => {
  return (
    <Card
      sx={{
        borderRadius: 2,
        boxShadow: 3,
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        transition: 'all 0.3s ease-in-out',
        '&:hover': {
          boxShadow: 4,
          transform: 'translateY(-4px)',
        },
        ...sx,
      }}
    >
      <CardHeader
        title={
          <Typography variant="h6" component="h3" fontWeight="600">
            {title}
          </Typography>
        }
        subheader={subtitle && (
          <Typography variant="body2" color="text.secondary">
            {subtitle}
          </Typography>
        )}
        action={action || (
          <IconButton aria-label="settings" size="small">
            <MoreVertIcon />
          </IconButton>
        )}
        sx={{
          pb: 1,
          borderBottom: '1px solid',
          borderColor: 'divider',
        }}
      />
      <CardContent
        sx={{
          flexGrow: 1,
          p: 3,
          '&:last-child': {
            pb: 3,
          },
          ...contentSx,
        }}
      >
        {children}
      </CardContent>
    </Card>
  );
};

export default DashboardCard;