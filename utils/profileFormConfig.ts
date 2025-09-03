// utils/profileFormConfig.ts
import { FormConfig } from '../components/FormGenerator';

export const profileFormConfig = (isEdit = false, initialData = {}): FormConfig => ({
  title: isEdit ? 'Editar Perfil' : 'Crear Perfil',
  description: 'Completa tu información personal para tu CV',
  submitButtonText: isEdit ? 'Actualizar Perfil' : 'Crear Perfil',
  fields: [
    {
      id: 'fullname',
      type: 'text',
      label: 'Nombre Completo',
      placeholder: 'Ej: Juan Pérez',
      required: true,
      validation: {
        minLength: {
          value: 3,
          message: 'El nombre debe tener al menos 3 caracteres'
        }
      }
    },
    {
      id: 'email',
      type: 'email',
      label: 'Correo Electrónico',
      placeholder: 'Ej: juan@example.com',
      required: true,
      validation: {
        pattern: {
          value: /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/,
          message: 'Por favor ingresa un email válido'
        }
      }
    },
    {
      id: 'phone',
      type: 'text',
      label: 'Teléfono',
      placeholder: 'Ej: +1234567890',
      required: true,
      validation: {
        pattern: {
          value: /^\+?[0-9]{10,15}$/,
          message: 'Por favor ingresa un número de teléfono válido'
        }
      }
    },
    {
      id: 'repository',
      type: 'text',
      label: 'Repositorio (GitHub, GitLab, etc.)',
      placeholder: 'Ej: https://github.com/tuusuario'
    },
    {
      id: 'linkedin',
      type: 'text',
      label: 'Perfil de LinkedIn',
      placeholder: 'Ej: https://linkedin.com/in/tuusuario'
    },
    {
      id: 'portfolio',
      type: 'text',
      label: 'Portafolio Personal',
      placeholder: 'Ej: https://tuportafolio.com'
    }
  ],
  onSubmit: () => { } // Esta función se reemplazará en el componente
});