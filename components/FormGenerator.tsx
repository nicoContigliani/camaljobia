"use client"

// components/FormGenerator.tsx
import React from 'react';
import {
  Box,
  TextField,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Typography,
  Paper,
  FormHelperText
} from '@mui/material';
import { useForm, Controller, SubmitHandler } from 'react-hook-form';

// Tipos para definir la estructura del formulario
export interface FormField {
  id: string;
  type: 'text' | 'email' | 'number' | 'textarea' | 'select' | 'file' | 'password';
  label: string;
  placeholder?: string;
  required?: boolean;
  options?: string[]; // Para select
  validation?: {
    pattern?: {
      value: RegExp;
      message: string;
    };
    minLength?: {
      value: number;
      message: string;
    };
    maxLength?: {
      value: number;
      message: string;
    };
    min?: {
      value: number;
      message: string;
    };
    max?: {
      value: number;
      message: string;
    };
  };
}

export interface FormConfig {
  title?: string;
  description?: string;
  fields: FormField[];
  submitButtonText?: string;
  onSubmit: (data: any) => void;
}

interface FormGeneratorProps {
  config: FormConfig;
  defaultValues?: any; // Nueva prop para valores por defecto
}

const FormGenerator: React.FC<FormGeneratorProps> = ({ config, defaultValues }) => {
  const { control, handleSubmit, formState: { errors } } = useForm({
    defaultValues: defaultValues || {} // Pasa los valores por defecto
  });

  const onSubmit: SubmitHandler<any> = (data) => {
    config.onSubmit(data);
  };

  const renderField = (field: FormField) => {
    switch (field.type) {
      case 'textarea':
        return (
          <Controller
            key={field.id}
            name={field.id}
            control={control}
            rules={{
              required: field.required ? `${field.label} es requerido` : false,
              ...field.validation
            }}
            render={({ field: controllerField }) => (
              <TextField
                {...controllerField}
                label={field.label}
                placeholder={field.placeholder}
                multiline
                rows={4}
                fullWidth
                margin="normal"
                error={!!errors[field.id]}
                helperText={errors[field.id]?.message as string}
              />
            )}
          />
        );

      case 'select':
        return (
          <Controller
            key={field.id}
            name={field.id}
            control={control}
            rules={{
              required: field.required ? `${field.label} es requerido` : false
            }}
            render={({ field: controllerField }) => (
              <FormControl fullWidth margin="normal" error={!!errors[field.id]}>
                <InputLabel>{field.label}</InputLabel>
                <Select
                  {...controllerField}
                  label={field.label}
                >
                  {field.options?.map((option) => (
                    <MenuItem key={option} value={option}>
                      {option}
                    </MenuItem>
                  ))}
                </Select>
                {errors[field.id] && (
                  <FormHelperText>{errors[field.id]?.message as string}</FormHelperText>
                )}
              </FormControl>
            )}
          />
        );

      case 'file':
        return (
          <Controller
            key={field.id}
            name={field.id}
            control={control}
            rules={{
              required: field.required ? `${field.label} es requerido` : false
            }}
            render={({ field: controllerField }) => (
              <Box margin="normal">
                <Button variant="outlined" component="label">
                  Subir {field.label}
                  <input
                    type="file"
                    hidden
                    onChange={(e) => {
                      const file = e.target.files?.[0];
                      controllerField.onChange(file);
                    }}
                  />
                </Button>
                {controllerField.value && (
                  <Typography variant="body2" sx={{ mt: 1 }}>
                    Archivo seleccionado: {controllerField.value.name}
                  </Typography>
                )}
                {errors[field.id] && (
                  <FormHelperText error>
                    {errors[field.id]?.message as string}
                  </FormHelperText>
                )}
              </Box>
            )}
          />
        );

      default:
        return (
          <Controller
            key={field.id}
            name={field.id}
            control={control}
            rules={{
              required: field.required ? `${field.label} es requerido` : false,
              ...field.validation
            }}
            render={({ field: controllerField }) => (
              <TextField
                {...controllerField}
                type={field.type}
                label={field.label}
                placeholder={field.placeholder}
                fullWidth
                margin="normal"
                error={!!errors[field.id]}
                helperText={errors[field.id]?.message as string}
              />
            )}
          />
        );
    }
  };

  return (
    <Paper elevation={3} sx={{ p: 3, maxWidth: 600, margin: '0 auto' }}>
      {config.title && (
        <Typography variant="h4" component="h1" gutterBottom align="center">
          {config.title}
        </Typography>
      )}

      {config.description && (
        <Typography variant="body1" paragraph align="center">
          {config.description}
        </Typography>
      )}

      <Box component="form" onSubmit={handleSubmit(onSubmit)} sx={{ mt: 2 }}>
        {config.fields.map(renderField)}

        <Button
          type="submit"
          variant="contained"
          color="primary"
          fullWidth
          size="large"
          sx={{ mt: 3 }}
        >
          {config.submitButtonText || 'Enviar'}
        </Button>
      </Box>
    </Paper>
  );
};

export default FormGenerator;