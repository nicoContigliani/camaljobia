// components/StatCard.tsx
import React from 'react';
import {
  Card,
  CardContent,
  Typography,
  Box,
  SxProps,
  Theme,
} from '@mui/material';
import { TrendingUp, TrendingDown, Equalizer } from '@mui/icons-material';

export interface StatCardProps {
  title: string;
  value: string | number;
  subtitle?: string;
  trend?: {
    value: number;
    isPositive: boolean;
  };
  icon?: React.ReactNode;
  color?: 'primary' | 'secondary' | 'success' | 'error' | 'warning' | 'info';
  sx?: SxProps<Theme>;
}

const StatCard: React.FC<StatCardProps> = ({
  title,
  value,
  subtitle,
  trend,
  icon,
  color = 'primary',
  sx,
}) => {
  const getColor = () => {
    switch (color) {
      case 'primary':
        return '#3f51b5';
      case 'secondary':
        return '#f50057';
      case 'success':
        return '#4caf50';
      case 'error':
        return '#f44336';
      case 'warning':
        return '#ff9800';
      case 'info':
        return '#2196f3';
      default:
        return '#3f51b5';
    }
  };

  const getTrendIcon = () => {
    if (!trend) return null;
    
    if (trend.value === 0) {
      return <Equalizer sx={{ fontSize: 16, color: 'text.secondary' }} />;
    }
    
    return trend.isPositive ? (
      <TrendingUp sx={{ fontSize: 16, color: '#4caf50' }} />
    ) : (
      <TrendingDown sx={{ fontSize: 16, color: '#f44336' }} />
    );
  };

  return (
    <Card
      sx={{
        borderRadius: 2,
        boxShadow: 2,
        height: '100%',
        position: 'relative',
        overflow: 'visible',
        transition: 'all 0.3s ease-in-out',
        '&:hover': {
          boxShadow: 4,
          transform: 'translateY(-4px)',
        },
        ...sx,
      }}
    >
      <CardContent sx={{ p: 3, position: 'relative' }}>
        {icon && (
          <Box
            sx={{
              position: 'absolute',
              top: -16,
              right: 16,
              backgroundColor: getColor(),
              color: 'white',
              width: 48,
              height: 48,
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: 3,
            }}
          >
            {icon}
          </Box>
        )}
        
        <Typography
          color="text.secondary"
          gutterBottom
          variant="body2"
          sx={{ fontWeight: 500, textTransform: 'uppercase' }}
        >
          {title}
        </Typography>
        
        <Typography variant="h4" component="div" sx={{ fontWeight: 700, mb: 1 }}>
          {value}
        </Typography>
        
        {(subtitle || trend) && (
          <Box sx={{ display: 'flex', alignItems: 'center', mt: 1 }}>
            {trend && (
              <Box sx={{ display: 'flex', alignItems: 'center', mr: 1 }}>
                {getTrendIcon()}
                <Typography
                  variant="body2"
                  sx={{
                    ml: 0.5,
                    color: trend.value === 0 
                      ? 'text.secondary' 
                      : trend.isPositive ? '#4caf50' : '#f44336',
                    fontWeight: 500,
                  }}
                >
                  {trend.value > 0 ? '+' : ''}{trend.value}%
                </Typography>
              </Box>
            )}
            
            {subtitle && (
              <Typography variant="caption" color="text.secondary">
                {subtitle}
              </Typography>
            )}
          </Box>
        )}
      </CardContent>
    </Card>
  );
};

export default StatCard;