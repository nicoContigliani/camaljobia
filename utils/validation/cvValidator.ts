import { ICurriculum } from '@/lib/models/Curriculum';

export function validateCVData(cvData: Partial<ICurriculum>): string[] {
  const errors: string[] = [];

  if (!cvData.profile || cvData.profile.trim().length === 0) {
    errors.push('El perfil es requerido');
  }

  if (!cvData.professional_summary || cvData.professional_summary.trim().length === 0) {
    errors.push('El resumen profesional es requerido');
  }

  if (!cvData.skills) {
    errors.push('Las habilidades son requeridas');
  }

  if (!cvData.work_experience || cvData.work_experience.length === 0) {
    errors.push('La experiencia laboral es requerida');
  } else {
    cvData.work_experience.forEach((exp, index) => {
      if (!exp.company || exp.company.trim().length === 0) {
        errors.push(`La empresa en la experiencia ${index + 1} es requerida`);
      }
      if (!exp.period || exp.period.trim().length === 0) {
        errors.push(`El período en la experiencia ${index + 1} es requerido`);
      }
      if (!exp.position || exp.position.trim().length === 0) {
        errors.push(`El puesto en la experiencia ${index + 1} es requerido`);
      }
      if (!exp.description || exp.description.length === 0) {
        errors.push(`La descripción en la experiencia ${index + 1} es requerida`);
      }
    });
  }

  return errors;
}