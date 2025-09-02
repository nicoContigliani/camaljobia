// components/DashboardTabs.tsx
import React, { useState } from 'react';
import {
  Tabs,
  Tab,
  Box,
  Typography,
  useTheme,
  useMediaQuery,
} from '@mui/material';

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`dashboard-tabpanel-${index}`}
      aria-labelledby={`dashboard-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography component="div">{children}</Typography>
        </Box>
      )}
    </div>
  );
}

function a11yProps(index: number) {
  return {
    id: `dashboard-tab-${index}`,
    'aria-controls': `dashboard-tabpanel-${index}`,
  };
}

export interface TabItem {
  label: string;
  icon?: React.ReactElement;
  content: React.ReactNode;
  disabled?: boolean;
}

export interface DashboardTabsProps {
  tabs: TabItem[];
  centered?: boolean;
  variant?: 'standard' | 'scrollable' | 'fullWidth';
}

const DashboardTabs: React.FC<DashboardTabsProps> = ({
  tabs,
  centered = true,
  variant = 'standard',
}) => {
  const [value, setValue] = useState(0);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ width: '100%' }}>
      <Box
        sx={{
          borderBottom: 1,
          borderColor: 'divider',
          backgroundColor: 'background.paper',
          borderRadius: '8px 8px 0 0',
        }}
      >
        <Tabs
          value={value}
          onChange={handleChange}
          aria-label="Dashboard tabs"
          centered={centered && !isMobile}
          variant={isMobile ? 'scrollable' : variant}
          scrollButtons={isMobile ? 'auto' : false}
          sx={{
            minHeight: '48px',
            '& .MuiTab-root': {
              minHeight: '48px',
              py: 1,
              px: 2,
              fontSize: '0.875rem',
              fontWeight: 500,
              textTransform: 'none',
              color: 'text.secondary',
              '&.Mui-selected': {
                color: 'primary.main',
                fontWeight: 600,
              },
            },
            '& .MuiTabs-indicator': {
              backgroundColor: 'primary.main',
              height: 3,
            },
          }}
        >
          {tabs.map((tab, index) => (
            <Tab
              key={index}
              label={tab.label}
              icon={tab.icon}
              iconPosition="start"
              disabled={tab.disabled}
              {...a11yProps(index)}
            />
          ))}
        </Tabs>
      </Box>
      {tabs.map((tab, index) => (
        <TabPanel key={index} value={value} index={index}>
          {tab.content}
        </TabPanel>
      ))}
    </Box>
  );
};

export default DashboardTabs;