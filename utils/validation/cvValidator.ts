// import { ICurriculum } from '@/lib/models/Curriculum';

// export function validateCVData(cvData: Partial<ICurriculum>): string[] {
//   const errors: string[] = [];

//   if (!cvData.profile || cvData.profile.trim().length === 0) {
//     errors.push('El perfil es requerido');
//   }

//   if (!cvData.professional_summary || cvData.professional_summary.trim().length === 0) {
//     errors.push('El resumen profesional es requerido');
//   }

//   if (!cvData.skills) {
//     errors.push('Las habilidades son requeridas');
//   }

//   if (!cvData.work_experience || cvData.work_experience.length === 0) {
//     errors.push('La experiencia laboral es requerida');
//   } else {
//     cvData.work_experience.forEach((exp, index) => {
//       if (!exp.company || exp.company.trim().length === 0) {
//         errors.push(`La empresa en la experiencia ${index + 1} es requerida`);
//       }
//       if (!exp.period || exp.period.trim().length === 0) {
//         errors.push(`El período en la experiencia ${index + 1} es requerido`);
//       }
//       if (!exp.position || exp.position.trim().length === 0) {
//         errors.push(`El puesto en la experiencia ${index + 1} es requerido`);
//       }
//       if (!exp.description || exp.description.length === 0) {
//         errors.push(`La descripción en la experiencia ${index + 1} es requerida`);
//       }
//     });
//   }

//   // Validación para educación (opcional pero con validación de campos si existe)
//   if (cvData.education && cvData.education.length > 0) {
//     cvData.education.forEach((edu, index) => {
//       if (!edu.institution || edu.institution.trim().length === 0) {
//         errors.push(`La institución en la educación ${index + 1} es requerida`);
//       }
//       if (!edu.degree || edu.degree.trim().length === 0) {
//         errors.push(`El título en la educación ${index + 1} es requerido`);
//       }
//       if (!edu.field_of_study || edu.field_of_study.trim().length === 0) {
//         errors.push(`El campo de estudio en la educación ${index + 1} es requerido`);
//       }
//       if (!edu.period || edu.period.trim().length === 0) {
//         errors.push(`El período en la educación ${index + 1} es requerido`);
//       }
//     });
//   }

//   // Validación para cursos (opcional pero con validación de campos si existe)
//   if (cvData.courses && cvData.courses.length > 0) {
//     cvData.courses.forEach((course, index) => {
//       if (!course.name || course.name.trim().length === 0) {
//         errors.push(`El nombre del curso ${index + 1} es requerido`);
//       }
//       if (!course.institution || course.institution.trim().length === 0) {
//         errors.push(`La institución del curso ${index + 1} es requerida`);
//       }
//       if (!course.completion_date) {
//         errors.push(`La fecha de finalización del curso ${index + 1} es requerida`);
//       }
//     });
//   }

//   return errors;
// }



import { ICurriculum } from '@/lib/models/Curriculum';

export function validateCVData(cvData: Partial<ICurriculum>): string[] {
  const errors: string[] = [];

  // Asegurarse de que cvData no sea null/undefined
  if (!cvData) {
    return ['Los datos del CV están vacíos'];
  }

  // Validar profile - con trim seguro
  if (!cvData.profile || (typeof cvData.profile === 'string' && cvData.profile.trim().length === 0)) {
    errors.push('El perfil es requerido');
  }

  // Validar professional_summary - con trim seguro
  if (!cvData.professional_summary || (typeof cvData.professional_summary === 'string' && cvData.professional_summary.trim().length === 0)) {
    errors.push('El resumen profesional es requerido');
  }

  // Validar skills - más flexible
  if (!cvData.skills) {
    errors.push('Las habilidades son requeridas');
  } else {
    // Validar que al menos tenga alguna habilidad
    const hasSkills = Object.values(cvData.skills).some(skillArray => 
      Array.isArray(skillArray) && skillArray.length > 0
    );
    if (!hasSkills) {
      errors.push('Debe haber al menos una habilidad definida');
    }
  }

  // Validar work_experience - más flexible
  if (!cvData.work_experience || cvData.work_experience.length === 0) {
    errors.push('La experiencia laboral es requerida');
  } else {
    cvData.work_experience.forEach((exp, index) => {
      if (!exp?.company || (typeof exp.company === 'string' && exp.company.trim().length === 0)) {
        errors.push(`La empresa en la experiencia ${index + 1} es requerida`);
      }
      if (!exp?.period || (typeof exp.period === 'string' && exp.period.trim().length === 0)) {
        errors.push(`El período en la experiencia ${index + 1} es requerido`);
      }
      if (!exp?.position || (typeof exp.position === 'string' && exp.position.trim().length === 0)) {
        errors.push(`El puesto en la experiencia ${index + 1} es requerido`);
      }
      if (!exp?.description || !Array.isArray(exp.description) || exp.description.length === 0) {
        errors.push(`La descripción en la experiencia ${index + 1} es requerida`);
      }
    });
  }

  // Validación para educación (opcional pero con validación de campos si existe)
  if (cvData.education && cvData.education.length > 0) {
    cvData.education.forEach((edu, index) => {
      if (!edu?.institution || (typeof edu.institution === 'string' && edu.institution.trim().length === 0)) {
        errors.push(`La institución en la educación ${index + 1} es requerida`);
      }
      if (!edu?.degree || (typeof edu.degree === 'string' && edu.degree.trim().length === 0)) {
        errors.push(`El título en la educación ${index + 1} es requerido`);
      }
      if (!edu?.field_of_study || (typeof edu.field_of_study === 'string' && edu.field_of_study.trim().length === 0)) {
        errors.push(`El campo de estudio en la educación ${index + 1} es requerido`);
      }
      if (!edu?.period || (typeof edu.period === 'string' && edu.period.trim().length === 0)) {
        errors.push(`El período en la educación ${index + 1} es requerido`);
      }
    });
  }

  // Validación para cursos (opcional pero con validación de campos si existe)
  if (cvData.courses && cvData.courses.length > 0) {
    cvData.courses.forEach((course, index) => {
      if (!course?.name || (typeof course.name === 'string' && course.name.trim().length === 0)) {
        errors.push(`El nombre del curso ${index + 1} es requerido`);
      }
      if (!course?.institution || (typeof course.institution === 'string' && course.institution.trim().length === 0)) {
        errors.push(`La institución del curso ${index + 1} es requerida`);
      }
      // Fecha de finalización es opcional según tu modelo original
      // if (!course?.completion_date) {
      //   errors.push(`La fecha de finalización del curso ${index + 1} es requerida`);
      // }
    });
  }

  return errors;
}