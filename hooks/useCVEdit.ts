import { useState } from 'react';
import { CVData } from '@/store/features/cvSlice';
import { DropResult } from '@hello-pangea/dnd';

export const useCVEdit = (initialCV: CVData) => {
  const [editedCV, setEditedCV] = useState<CVData>({ ...initialCV });
  const [expandedSections, setExpandedSections] = useState<Record<string, boolean>>({
    skills: true,
    experience: true,
    education: true,
    courses: true
  });

  const toggleSection = (section: string) => {
    setExpandedSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setEditedCV(prev => ({ ...prev, [name]: value }));
  };

  const handleSkillChange = (category: keyof typeof initialCV.skills, index: number, value: string) => {
    setEditedCV(prev => {
      const newSkills = { ...prev.skills };
      newSkills[category] = [...newSkills[category]];
      newSkills[category][index] = value;
      return { ...prev, skills: newSkills };
    });
  };

  const addSkill = (category: keyof typeof initialCV.skills) => {
    setEditedCV(prev => {
      const newSkills = { ...prev.skills };
      newSkills[category] = [...newSkills[category], ''];
      return { ...prev, skills: newSkills };
    });
  };

  const removeSkill = (category: keyof typeof initialCV.skills, index: number) => {
    setEditedCV(prev => {
      const newSkills = { ...prev.skills };
      newSkills[category] = newSkills[category].filter((_, i) => i !== index);
      return { ...prev, skills: newSkills };
    });
  };

  const handleWorkExperienceChange = (index: number, field: string, value: string) => {
    setEditedCV(prev => {
      const newWorkExperience = [...prev.work_experience];
      newWorkExperience[index] = { ...newWorkExperience[index], [field]: value };
      return { ...prev, work_experience: newWorkExperience };
    });
  };

  const handleWorkExperienceDescriptionChange = (expIndex: number, descIndex: number, value: string) => {
    setEditedCV(prev => {
      const newWorkExperience = [...prev.work_experience];
      const newDescription = [...newWorkExperience[expIndex].description];
      newDescription[descIndex] = value;
      newWorkExperience[expIndex] = {
        ...newWorkExperience[expIndex],
        description: newDescription
      };
      return { ...prev, work_experience: newWorkExperience };
    });
  };

  const addWorkExperienceDescription = (expIndex: number) => {
    setEditedCV(prev => {
      const newWorkExperience = [...prev.work_experience];
      newWorkExperience[expIndex] = {
        ...newWorkExperience[expIndex],
        description: [...newWorkExperience[expIndex].description, '']
      };
      return { ...prev, work_experience: newWorkExperience };
    });
  };

  const removeWorkExperienceDescription = (expIndex: number, descIndex: number) => {
    setEditedCV(prev => {
      const newWorkExperience = [...prev.work_experience];
      newWorkExperience[expIndex] = {
        ...newWorkExperience[expIndex],
        description: newWorkExperience[expIndex].description.filter((_, i) => i !== descIndex)
      };
      return { ...prev, work_experience: newWorkExperience };
    });
  };

  const addWorkExperience = () => {
    setEditedCV(prev => ({
      ...prev,
      work_experience: [
        ...prev.work_experience,
        { company: '', period: '', position: '', description: [''] }
      ]
    }));
  };

  const removeWorkExperience = (index: number) => {
    setEditedCV(prev => ({
      ...prev,
      work_experience: prev.work_experience.filter((_, i) => i !== index)
    }));
  };

  const handleEducationChange = (index: number, field: string, value: string) => {
    setEditedCV(prev => {
      const newEducation = [...prev.education];
      newEducation[index] = { ...newEducation[index], [field]: value };
      return { ...prev, education: newEducation };
    });
  };

  const handleEducationDescriptionChange = (eduIndex: number, descIndex: number, value: string) => {
    setEditedCV(prev => {
      const newEducation = [...prev.education];
      const newDescription = [...newEducation[eduIndex].description];
      newDescription[descIndex] = value;
      newEducation[eduIndex] = {
        ...newEducation[eduIndex],
        description: newDescription
      };
      return { ...prev, education: newEducation };
    });
  };

  const addEducationDescription = (eduIndex: number) => {
    setEditedCV(prev => {
      const newEducation = [...prev.education];
      newEducation[eduIndex] = {
        ...newEducation[eduIndex],
        description: [...newEducation[eduIndex].description, '']
      };
      return { ...prev, education: newEducation };
    });
  };

  const removeEducationDescription = (eduIndex: number, descIndex: number) => {
    setEditedCV(prev => {
      const newEducation = [...prev.education];
      newEducation[eduIndex] = {
        ...newEducation[eduIndex],
        description: newEducation[eduIndex].description.filter((_, i) => i !== descIndex)
      };
      return { ...prev, education: newEducation };
    });
  };

  const addEducation = () => {
    setEditedCV(prev => ({
      ...prev,
      education: [
        ...prev.education,
        { institution: '', degree: '', field_of_study: '', period: '', description: [''] }
      ]
    }));
  };

  const removeEducation = (index: number) => {
    setEditedCV(prev => ({
      ...prev,
      education: prev.education.filter((_, i) => i !== index)
    }));
  };

  const handleCourseChange = (index: number, field: string, value: string | number) => {
    setEditedCV(prev => {
      const newCourses = [...prev.courses];
      newCourses[index] = { ...newCourses[index], [field]: value };
      return { ...prev, courses: newCourses };
    });
  };

  const handleCourseDescriptionChange = (courseIndex: number, descIndex: number, value: string) => {
    setEditedCV(prev => {
      const newCourses = [...prev.courses];
      const newDescription = [...newCourses[courseIndex].description];
      newDescription[descIndex] = value;
      newCourses[courseIndex] = {
        ...newCourses[courseIndex],
        description: newDescription
      };
      return { ...prev, courses: newCourses };
    });
  };

  const addCourseDescription = (courseIndex: number) => {
    setEditedCV(prev => {
      const newCourses = [...prev.courses];
      newCourses[courseIndex] = {
        ...newCourses[courseIndex],
        description: [...newCourses[courseIndex].description, '']
      };
      return { ...prev, courses: newCourses };
    });
  };

  const removeCourseDescription = (courseIndex: number, descIndex: number) => {
    setEditedCV(prev => {
      const newCourses = [...prev.courses];
      newCourses[courseIndex] = {
        ...newCourses[courseIndex],
        description: newCourses[courseIndex].description.filter((_, i) => i !== descIndex)
      };
      return { ...prev, courses: newCourses };
    });
  };

  const addCourse = () => {
    setEditedCV(prev => ({
      ...prev,
      courses: [
        ...prev.courses,
        { 
          name: '', 
          institution: '', 
          completion_date: '', 
          duration_hours: 0, 
          certificate_url: '', 
          description: [''] 
        }
      ]
    }));
  };

  const removeCourse = (index: number) => {
    setEditedCV(prev => ({
      ...prev,
      courses: prev.courses.filter((_, i) => i !== index)
    }));
  };

  const onDragEnd = (result: DropResult) => {
    const { destination, source, type } = result;

    if (!destination || (destination.droppableId === source.droppableId && destination.index === source.index)) {
      return;
    }

    if (type === 'work_experience') {
      const reorderedItems = Array.from(editedCV.work_experience);
      const [movedItem] = reorderedItems.splice(source.index, 1);
      reorderedItems.splice(destination.index, 0, movedItem);
      setEditedCV(prev => ({ ...prev, work_experience: reorderedItems }));
    } else if (type === 'education') {
      const reorderedItems = Array.from(editedCV.education);
      const [movedItem] = reorderedItems.splice(source.index, 1);
      reorderedItems.splice(destination.index, 0, movedItem);
      setEditedCV(prev => ({ ...prev, education: reorderedItems }));
    } else if (type === 'courses') {
      const reorderedItems = Array.from(editedCV.courses);
      const [movedItem] = reorderedItems.splice(source.index, 1);
      reorderedItems.splice(destination.index, 0, movedItem);
      setEditedCV(prev => ({ ...prev, courses: reorderedItems }));
    }
  };

  return {
    editedCV,
    setEditedCV,
    expandedSections,
    toggleSection,
    handleInputChange,
    handleSkillChange,
    addSkill,
    removeSkill,
    handleWorkExperienceChange,
    handleWorkExperienceDescriptionChange,
    addWorkExperienceDescription,
    removeWorkExperienceDescription,
    addWorkExperience,
    removeWorkExperience,
    handleEducationChange,
    handleEducationDescriptionChange,
    addEducationDescription,
    removeEducationDescription,
    addEducation,
    removeEducation,
    handleCourseChange,
    handleCourseDescriptionChange,
    addCourseDescription,
    removeCourseDescription,
    addCourse,
    removeCourse,
    onDragEnd
  };
};