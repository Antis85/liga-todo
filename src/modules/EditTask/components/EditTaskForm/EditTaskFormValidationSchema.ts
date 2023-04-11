import * as Yup from 'yup';

export const validationSchema = Yup.object().shape({
  name: Yup.string()
    .required('Task name is required')
    .min(3, 'Task name must be at least 6 characters')
    .max(20, 'Task name must not exceed 20 characters'),
  info: Yup.string()
    .required('Description is required')
    .min(3, 'Description must be at least 6 characters')
    .max(255, 'Description must not exceed 255 characters'),
});
