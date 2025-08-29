// import { Types } from 'mongoose';
// import { ICurriculum, ISkillCategory, IWorkExperience } from '@/lib/models/Curriculum';

// // Interface for the incoming JSON data
// interface JSONSkillCategory {
//   lenguajes?: string[];
//   frameworks_y_librerias?: string[];
//   bases_de_datos?: string[];
//   herramientas_y_entornos?: string[];
//   metodologias?: string[];
//   seguridad?: string[];
//   movil?: string[];
//   analisis_y_gestion?: string[];
//   comunicacion?: string[];
// }

// interface JSONWorkExperience {
//   empresa: string;
//   periodo: string;
//   puesto: string;
//   descripcion: string[];
// }

// interface JSONCV {
//   perfil: string;
//   resumen_profesional: string;
//   habilidades: JSONSkillCategory;
//   experiencia_laboral: JSONWorkExperience[];
// }

// interface JSONImportData {
//   curriculum_vitae?: JSONCV[];
// }

// // Transform JSON data to match our Mongoose model
// export function transformJSONToModel(jsonData: any, userId: string): Partial<ICurriculum> {
//   // Handle both single CV and array of CVs
//   let cvData: JSONCV;
  
//   if (jsonData.curriculum_vitae && Array.isArray(jsonData.curriculum_vitae)) {
//     // If it's an array, take the first one
//     cvData = jsonData.curriculum_vitae[0];
//   } else {
//     // Assume it's a single CV object
//     cvData = jsonData;
//   }

//   // Transform skills
//   const skills: ISkillCategory = {
//     languages: cvData.habilidades.lenguajes || [],
//     frameworks_libraries: cvData.habilidades.frameworks_y_librerias || [],
//     databases: cvData.habilidades.bases_de_datos || [],
//     tools_environments: cvData.habilidades.herramientas_y_entornos || [],
//     methodologies: cvData.habilidades.metodologias || [],
//     security: cvData.habilidades.seguridad || [],
//     mobile: cvData.habilidades.movil || [],
//     analysis_management: cvData.habilidades.analisis_y_gestion || [],
//     communication: cvData.habilidades.comunicacion || [],
//   };

//   // Transform work experience
//   const work_experience: IWorkExperience[] = cvData.experiencia_laboral.map((exp: JSONWorkExperience) => ({
//     company: exp.empresa,
//     period: exp.periodo,
//     position: exp.puesto,
//     description: exp.descripcion,
//   }));

//   return {
//     user: new Types.ObjectId(userId) as any,
//     profile: cvData.perfil,
//     professional_summary: cvData.resumen_profesional,
//     skills,
//     work_experience,
//   };
// }

// // Transform model data back to JSON format
// export function transformModelToJSON(cv: ICurriculum): any {
//   return {
//     perfil: cv.profile,
//     resumen_profesional: cv.professional_summary,
//     habilidades: {
//       lenguajes: cv.skills.languages,
//       frameworks_y_librerias: cv.skills.frameworks_libraries,
//       bases_de_datos: cv.skills.databases,
//       herramientas_y_entornos: cv.skills.tools_environments,
//       metodologias: cv.skills.methodologies,
//       seguridad: cv.skills.security,
//       movil: cv.skills.mobile,
//       analisis_y_gestion: cv.skills.analysis_management,
//       comunicacion: cv.skills.communication,
//     },
//     experiencia_laboral: cv.work_experience.map(exp => ({
//       empresa: exp.company,
//       periodo: exp.period,
//       puesto: exp.position,
//       descripcion: exp.description,
//     })),
//   };
// }


import { Types } from 'mongoose';
import { ICurriculum, ISkillCategory, IWorkExperience } from '@/lib/models/Curriculum';

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

interface JSONCV {
  perfil: string;
  resumen_profesional: string;
  habilidades: JSONSkillCategory;
  experiencia_laboral: JSONWorkExperience[];
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

// Transform JSON data to match our Mongoose model
export function transformJSONToModel(jsonData: any, userId: string): Partial<ICurriculum> {
  // Handle both single CV and array of CVs
  let cvData: JSONCV;
  
  if (jsonData.curriculum_vitae && Array.isArray(jsonData.curriculum_vitae)) {
    // If it's an array, take the first one
    cvData = jsonData.curriculum_vitae[0];
  } else {
    // Assume it's a single CV object
    cvData = jsonData;
  }

  // Transform skills
  const skills: ISkillCategory = createSkillCategory(cvData.habilidades);

  // Transform work experience
  const work_experience: IWorkExperience[] = cvData.experiencia_laboral.map((exp: JSONWorkExperience) => 
    createWorkExperience(exp)
  );

  return {
    user: new Types.ObjectId(userId) as any,
    profile: cvData.perfil,
    professional_summary: cvData.resumen_profesional,
    skills,
    work_experience,
  };
}

// Transform model data back to JSON format
export function transformModelToJSON(cv: ICurriculum): any {
  // Convert Mongoose document to plain object if needed
  const plainCV = cv.toObject ? cv.toObject() : cv;
  
  return {
    perfil: plainCV.profile,
    resumen_profesional: plainCV.professional_summary,
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
    experiencia_laboral: plainCV.work_experience?.map((exp:any) => ({
      empresa: exp.company,
      periodo: exp.period,
      puesto: exp.position,
      descripcion: exp.description,
    })) || [],
  };
}