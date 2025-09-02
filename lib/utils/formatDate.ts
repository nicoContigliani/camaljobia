export const formatDate = (dateString: string) => {
  if (!dateString || dateString.toLowerCase() === 'presente') return 'Presente';

  try {
    const date = new Date(dateString);
    return isNaN(date.getTime()) ? 'Presente' : date.toLocaleDateString('es-ES', {
      year: 'numeric',
      month: 'short'
    });
  } catch {
    return 'Presente';
  }
};