import React, { useState, ChangeEvent, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { observer } from 'mobx-react';
import { yupResolver } from '@hookform/resolvers/yup';
import { Controller, useForm } from 'react-hook-form';
import { EditTaskStoreInstance } from '../../store';
import { defaultEditTaskFormValues } from './EditTaskForm.constants';
import { validationSchema } from './EditTaskFormValidationSchema';
import { TextField, Checkbox, Loader } from 'components/index';
import { FormTaskEntity } from 'domains/index';
import './EditTaskForm.css';

export function EditTaskFormProto() {
  const { loadTask, editTask, task, errorText, isRequestActive } = EditTaskStoreInstance;

  const { name, info, isImportant, isDone } = task;

  const { control, handleSubmit, setValue, reset } = useForm<FormTaskEntity>({
    defaultValues: defaultEditTaskFormValues,
    resolver: yupResolver(validationSchema),
  });

  const [checkboxComplitedValue, setCheckboxComplitedValue] = useState<boolean>(false);

  const params = useParams();
  const navigate = useNavigate();

  useEffect((): void => {
    loadTask(params.taskId);
  }, [params.taskId]);

  useEffect((): void => {
    setCheckboxComplitedValue(isDone);
    setValue('name', name);
    setValue('info', info);
    setValue('isImportant', isImportant);
    setValue('isDone', isDone);
  }, [task]);

  const onTaskNameInputChange = (evt: ChangeEvent<HTMLInputElement>) => setValue('name', evt.target.value);

  const onTaskDescInputChange = (evt: ChangeEvent<HTMLInputElement>) => setValue('info', evt.target.value);

  const onCheckboxImportantChange = (evt: ChangeEvent<HTMLInputElement>) => setValue('isImportant', evt.target.checked);

  const onCheckboxComplitedChange = (evt: ChangeEvent<HTMLInputElement>) => {
    setValue('isDone', evt.target.checked);
    setCheckboxComplitedValue(evt.target.checked);
  };

  const onSubmit = async (data: FormTaskEntity) => {
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
            onChange={onTaskNameInputChange}
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
            onChange={onTaskDescInputChange}
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
            onChange={onCheckboxImportantChange}
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
            onChange={onCheckboxComplitedChange}
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
