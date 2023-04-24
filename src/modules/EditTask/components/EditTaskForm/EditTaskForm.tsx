import React, { useState, ChangeEvent, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { observer } from 'mobx-react';
import { yupResolver } from '@hookform/resolvers/yup';
import { Controller, useForm } from 'react-hook-form';
import { EditTaskStoreInstance } from '../../store';
import { defaultEditTaskFormValues } from './EditTaskForm.constants';
import { validationSchema } from './EditTaskFormValidationSchema';
import { TextField, Checkbox, Loader } from 'components/index';
import { TaskFormEntity, FieldNamesType } from 'domains/index';
import './EditTaskForm.css';

export function EditTaskFormProto() {
  const { loadTask, editTask, task, errorText, isRequestActive } = EditTaskStoreInstance;

  const { name, info, isImportant, isDone } = task;

  const { control, handleSubmit, setValue, reset } = useForm<TaskFormEntity>({
    defaultValues: defaultEditTaskFormValues,
    resolver: yupResolver(validationSchema),
  });

  const [checkboxComplitedValue, setCheckboxComplitedValue] = useState<boolean>(false);

  const params = useParams();
  const navigate = useNavigate();

  useEffect((): void => {
    if (params.taskId) loadTask(params.taskId);
  }, [params.taskId]);

  useEffect((): void => {
    setCheckboxComplitedValue(isDone);
    setValue('name', name);
    setValue('info', info);
    setValue('isImportant', isImportant);
    setValue('isDone', isDone);
  }, [task]);

  const onFormElChange = (evt: ChangeEvent<HTMLInputElement>, fieldName: FieldNamesType) => {
    if (isRequestActive) return;

    setValue(
      fieldName,
      fieldName === 'isImportant' ? evt.target.checked : fieldName === 'isDone' ? evt.target.checked : evt.target.value
    );
    if (fieldName === 'isDone') setCheckboxComplitedValue(evt.target.checked);
  };

  const onSubmit = async (data: TaskFormEntity) => {
    if (isRequestActive) return;

    const editTaskSuccess = await editTask(data);
    if (editTaskSuccess) {
      reset();
      navigate('/');
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="edit-form">
      <Controller
        control={control}
        name="name"
        render={({ field, fieldState: { error } }) => (
          <TextField
            disabled={isRequestActive}
            label="Task name"
            placeholder="Clean room"
            inputType="text"
            value={field.value}
            onChange={(evt) => onFormElChange(evt, field.name)}
            errorText={error?.message}
          />
        )}
      />
      <Controller
        control={control}
        name="info"
        render={({ field, fieldState: { error } }) => (
          <TextField
            disabled={isRequestActive}
            label="What to do(description)"
            placeholder="Clean my room"
            inputType="text"
            value={field.value}
            onChange={(evt) => onFormElChange(evt, field.name)}
            errorText={error?.message}
          />
        )}
      />
      <Controller
        control={control}
        name="isImportant"
        render={({ field }) => (
          <Checkbox
            disabled={isRequestActive || checkboxComplitedValue}
            label="Important"
            onChange={(evt) => onFormElChange(evt, field.name)}
            checked={field.value && !checkboxComplitedValue}
          />
        )}
      />
      <Controller
        control={control}
        name="isDone"
        render={({ field }) => (
          <Checkbox
            disabled={isRequestActive}
            label="Complited"
            onChange={(evt) => onFormElChange(evt, field.name)}
            checked={field.value}
          />
        )}
      />
      <button disabled={isRequestActive} type="submit" className="btn btn-secondary d-block w-100">
        {isRequestActive ? (
          <>
            <Loader isLoading={isRequestActive} variant="dot">
              {null}
            </Loader>
            <span>Загрузка...</span>
          </>
        ) : (
          'Edit task'
        )}
      </button>
      {errorText ? <p className="text-danger">{errorText}</p> : null}
    </form>
  );
}

export const EditTaskForm = observer(EditTaskFormProto);
