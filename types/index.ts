// types/index.ts
export interface UserProfile {
  _id?: string;
  userId: string;
  personalInfo: PersonalInfo;
  education: Education[];
  workExperience: WorkExperience[];
  skills: Skill[];
  certifications: Certification[];
  languages: Language[];
  createdAt?: Date;
  updatedAt?: Date;
}

export interface PersonalInfo {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  address: string;
  linkedIn?: string;
  github?: string;
  website?: string;
  summary: string;
}

export interface Education {
  id: string;
  institution: string;
  degree: string;
  fieldOfStudy: string;
  startDate: string;
  endDate: string;
  current: boolean;
  description: string;
}

export interface WorkExperience {
  id: string;
  company: string;
  position: string;
  startDate: string;
  endDate: string;
  current: boolean;
  description: string;
  achievements: string[];
}

export interface Skill {
  id: string;
  name: string;
  level: number; // 1-5 or 1-10
  category: string; // e.g., "Frontend", "Backend", "Tools", etc.
}

export interface Certification {
  id: string;
  name: string;
  institution: string;
  date: string;
  expirationDate?: string;
  credentialId?: string;
  url?: string;
}

export interface Language {
  id: string;
  name: string;
  proficiency: 'Basic' | 'Intermediate' | 'Fluent' | 'Native';
}

export interface CVTemplate {
  id: string;
  name: string;
  type: 'frontend' | 'backend' | 'fullstack' | 'analyst' | 'custom';
  sections: string[];
  styling: {
    primaryColor: string;
    secondaryColor: string;
    fontFamily: string;
  };
}

export interface CVVersion {
  id: string;
  profileId: string;
  template: CVTemplate;
  content: UserProfile;
  createdAt: Date;
  updatedAt: Date;
  name: string;
}

export interface CoverLetterType {
  _id: string;
  user: string;
  title: string;
  content: string;
  company?: string;
  position?: string;
  isTemplate: boolean;
  createdAt: string;
  updatedAt: string;
}