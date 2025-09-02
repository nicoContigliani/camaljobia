import { Box } from "@mui/material";
import CVHeaders from "../CVSParts/CVHeaders/CVHeaders";
import Summary from "../CVSParts/Summary/Summary";
import HardSkill from "../CVSParts/HardSkill/HardSkill";
import WorkExperience from "../CVSParts/WorkExperience/WorkExperience";
import Education from "../CVSParts/Education/Education";
import Courses from "../CVSParts/Courses/Courses";

export const CVPDFTemplate: React.FC<{ cv: any; userProfile: any }> = ({ cv, userProfile }) => {
    return (
      <Box id="pdf-content" sx={{
        padding: '15mm',
        fontFamily: 'Arial, sans-serif',
        fontSize: '11px',
        lineHeight: 1.4,
        width: '210mm',
        minHeight: '297mm',
        boxSizing: 'border-box',
        backgroundColor: 'white'
      }}>
        {/* Encabezado con información de contacto */}
        
        <CVHeaders
          userProfile={userProfile}
          cv={cv}
        />
  
  
        {/* Resumen profesional */}
 
        <Summary cv={cv} />
  
  
  
        {/* Habilidades - Formato ATS-friendly mejorado */}
  
        <HardSkill cv={cv} />
  
        {/* Experiencia laboral */}
       
  
        <WorkExperience cv={cv} />
  
        {/* Educación */}
     
  
        <Education cv={cv} />
  
        {/* Cursos y certificaciones */}
     
        <Courses cv={cv} />
  
  
      </Box>
    );
  };