export function a11yProps(index: number) {
    return {
      id: `auth-tab-${index}`,
      'aria-controls': `auth-tabpanel-${index}`,
    };
  }