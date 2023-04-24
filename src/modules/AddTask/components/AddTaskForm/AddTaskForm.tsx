import React, { ChangeEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import { observer } from 'mobx-react';
import { yupResolver } from '@hookform/resolvers/yup';
import { Controller, useForm } from 'react-hook-form';
import { AddTaskStoreInstance } from '../../store';
import { defaultAddTaskFormValues } from './AddTaskForm.constants';
import { validationSchema } from './AddTaskFormValidationSchema';
import { TextField, Checkbox, Loader } from 'components/index';
import { TaskFormEntity, FieldNamesType } from 'domains/index';
import './AddTaskForm.css';

export function AddTaskFormProto() {
  const { isRequestActive, errorText, addTask } = AddTaskStoreInstance;

  const { control, handleSubmit, setValue, reset } = useForm<TaskFormEntity>({
    defaultValues: defaultAddTaskFormValues,
    resolver: yupResolver(validationSchema),
  });

  const navigate = useNavigate();

  const onFormElChange = (evt: ChangeEvent<HTMLInputElement>, fieldName: FieldNamesType) => {
    if (isRequestActive) return;

    setValue(fieldName, fieldName !== 'isImportant' ? evt.target.value : evt.target.checked);
  };

  const onSubmit = async (data: TaskFormEntity) => {
    if (isRequestActive) return;

    const addTaskSuccess = await addTask({
      ...data,
      isDone: false,
    });
    if (addTaskSuccess) {
      reset();
      navigate('/');
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="add-form">
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
            disabled={isRequestActive}
            label="Important"
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
            <span>Создание задачи...</span>
          </>
        ) : (
          'Add task'
        )}
      </button>
      {errorText ? <p className="text-danger">{errorText}</p> : null}
    </form>
  );
}

export const AddTaskForm = observer(AddTaskFormProto);
