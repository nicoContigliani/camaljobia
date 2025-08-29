import { Types } from 'mongoose';
import { ICurriculum, ISkillCategory, IWorkExperience, IEducation, ICourse } from '@/lib/models/Curriculum';

// Interface for the incoming JSON data
interface JSONSkillCategory {
  lenguajes?: string[];
  frameworks_y_librerias?: string[];
  bases_de_datos?: string[];
  herramientas_y_entornos?: string[];
  metodologias?: string[];
  seguridad?: string[];
  movil?: string[];
  analisis_y_gestion?: string[];
  comunicacion?: string[];
}

interface JSONWorkExperience {
  empresa: string;
  periodo: string;
  puesto: string;
  descripcion: string[];
}

interface JSONEducation {
  institucion: string;
  titulo: string;
  campo_estudio: string;
  periodo: string;
  descripcion?: string[];
}

interface JSONCourse {
  nombre: string;
  institucion: string;
  fecha_finalizacion: string | null;
  duracion_horas?: number | null;
  url_certificado?: string | null;
  descripcion?: string[];
}

interface JSONCV {
  perfil: string;
  resumen_profesional: string;
  habilidades: JSONSkillCategory;
  experiencia_laboral: JSONWorkExperience[];
  educacion?: JSONEducation[];
  cursos?: JSONCourse[];
}

interface JSONImportData {
  curriculum_vitae?: JSONCV[];
}

// Helper function to create a skill category object
function createSkillCategory(data: JSONSkillCategory): ISkillCategory {
  return {
    languages: data.lenguajes || [],
    frameworks_libraries: data.frameworks_y_librerias || [],
    databases: data.bases_de_datos || [],
    tools_environments: data.herramientas_y_entornos || [],
    methodologies: data.metodologias || [],
    security: data.seguridad || [],
    mobile: data.movil || [],
    analysis_management: data.analisis_y_gestion || [],
    communication: data.comunicacion || [],
  } as ISkillCategory;
}

// Helper function to create a work experience object
function createWorkExperience(data: JSONWorkExperience): IWorkExperience {
  return {
    company: data.empresa,
    period: data.periodo,
    position: data.puesto,
    description: data.descripcion,
  } as IWorkExperience;
}

// Helper function to create an education object
function createEducation(data: JSONEducation): IEducation {
  return {
    institution: data.institucion,
    degree: data.titulo,
    field_of_study: data.campo_estudio,
    period: data.periodo,
    description: data.descripcion || [],
  } as IEducation;
}

// Helper function to create a course object
function createCourse(data: JSONCourse): ICourse {
  // Manejar fecha_finalizacion null o undefined
  let completionDate: Date;
  if (data.fecha_finalizacion) {
    completionDate = new Date(data.fecha_finalizacion);
  } else {
    // Fecha por defecto si no hay fecha de finalización
    completionDate = new Date();
  }

  return {
    name: data.nombre,
    institution: data.institucion,
    completion_date: completionDate,
    duration_hours: data.duracion_horas || undefined,
    certificate_url: data.url_certificado || undefined,
    description: data.descripcion || [],
  } as ICourse;
}

// Transform JSON data to match our Mongoose model
export function transformJSONToModel(jsonData: any, userId: string): Partial<ICurriculum> {
  // Validar que exista data
  if (!jsonData) {
    throw new Error('Datos de entrada vacíos');
  }

  // Handle both single CV and array of CVs
  let cvData: JSONCV;

  if (jsonData.curriculum_vitae && Array.isArray(jsonData.curriculum_vitae)) {
    // Si es un array, tomar el primero
    if (jsonData.curriculum_vitae.length === 0) {
      throw new Error('Array curriculum_vitae está vacío');
    }
    cvData = jsonData.curriculum_vitae[0];
  } else {
    // Asumir que es un objeto CV individual
    cvData = jsonData;
  }

  // Validar campos requeridos
  if (!cvData.perfil) {
    throw new Error('Datos de CV incompletos. Se requiere "perfil"');
  }
  if (!cvData.resumen_profesional) {
    throw new Error('Datos de CV incompletos. Se requiere "resumen_profesional"');
  }
  if (!cvData.habilidades) {
    throw new Error('Datos de CV incompletos. Se requiere "habilidades"');
  }
  if (!cvData.experiencia_laboral || !Array.isArray(cvData.experiencia_laboral)) {
    throw new Error('Datos de CV incompletos. Se requiere "experiencia_laboral" como array');
  }

  // Transform skills
  const skills: ISkillCategory = createSkillCategory(cvData.habilidades);

  // Transform work experience
  const work_experience: IWorkExperience[] = cvData.experiencia_laboral.map((exp: JSONWorkExperience) =>
    createWorkExperience(exp)
  );

  // Transform education
  const education: IEducation[] = (cvData.educacion || []).map((edu: JSONEducation) =>
    createEducation(edu)
  );

  // Transform courses - filtrar cursos que no tengan nombre
  const courses: ICourse[] = (cvData.cursos || [])
    .filter((course: JSONCourse) => course.nombre && course.institucion)
    .map((course: JSONCourse) => createCourse(course));

  return {
    user: new Types.ObjectId(userId) as any,
    profile: cvData.perfil,
    professional_summary: cvData.resumen_profesional,
    skills,
    work_experience,
    education,
    courses,
  };
}

// Transform model data back to JSON format
export function transformModelToJSON(cv: ICurriculum): any {
  // Convert Mongoose document to plain object if needed
  const plainCV = cv.toObject ? cv.toObject() : cv;

  return {
    perfil: plainCV.profile || '',
    resumen_profesional: plainCV.professional_summary || '',
    habilidades: {
      lenguajes: plainCV.skills?.languages || [],
      frameworks_y_librerias: plainCV.skills?.frameworks_libraries || [],
      bases_de_datos: plainCV.skills?.databases || [],
      herramientas_y_entornos: plainCV.skills?.tools_environments || [],
      metodologias: plainCV.skills?.methodologies || [],
      seguridad: plainCV.skills?.security || [],
      movil: plainCV.skills?.mobile || [],
      analisis_y_gestion: plainCV.skills?.analysis_management || [],
      comunicacion: plainCV.skills?.communication || [],
    },
    experiencia_laboral: plainCV.work_experience?.map((exp: any) => ({
      empresa: exp.company || '',
      periodo: exp.period || '',
      puesto: exp.position || '',
      descripcion: exp.description || [],
    })) || [],
    educacion: plainCV.education?.map((edu: any) => ({
      institucion: edu.institution || '',
      titulo: edu.degree || '',
      campo_estudio: edu.field_of_study || '',
      periodo: edu.period || '',
      descripcion: edu.description || [],
    })) || [],
    cursos: plainCV.courses?.map((course: any) => ({
      nombre: course.name || '',
      institucion: course.institution || '',
      fecha_finalizacion: course.completion_date?.toISOString().split('T')[0] || '',
      duracion_horas: course.duration_hours || undefined,
      url_certificado: course.certificate_url || undefined,
      descripcion: course.description || [],
    })) || [],
  };
}