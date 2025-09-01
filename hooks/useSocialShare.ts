import { useState } from 'react';

export const useSocialShare = () => {
  const [isOpen, setIsOpen] = useState(false);

  const openShare = () => setIsOpen(true);
  const closeShare = () => setIsOpen(false);
  const toggleShare = () => setIsOpen(!isOpen);

  return {
    isOpen,
    openShare,
    closeShare,
    toggleShare,
  };
};