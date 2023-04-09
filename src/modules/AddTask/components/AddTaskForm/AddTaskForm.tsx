import React, { useState, MouseEvent, ChangeEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import { observer } from 'mobx-react';
import { yupResolver } from '@hookform/resolvers/yup';
import { Controller, useForm } from 'react-hook-form';
import { AddTaskStoreInstance } from '../../store';
import { defaultAddTaskFormValues } from './AddTaskForm.constants';
import { validationSchema } from './AddTaskFormValidationSchema';
import { TextField, Checkbox } from 'components/index';
import { FormTaskEntity } from 'domains/index';
import './AddTaskForm.css';

export function AddTaskFormProto() {
  const { isRequestActive, addTask } = AddTaskStoreInstance;
  const { control, handleSubmit, setValue, reset } = useForm<FormTaskEntity>({
    defaultValues: defaultAddTaskFormValues,
    resolver: yupResolver(validationSchema),
  });
  // const [taskNameValue, setTaskNameValue] = useState<string>('');
  // const [taskDescValue, setTaskDescValue] = useState<string>('');
  // const [checkboxValue, setCheckboxValue] = useState<boolean>(false);
  const navigate = useNavigate();

  /*const onTaskNameInputChange = (evt: ChangeEvent<HTMLInputElement>) => {
    // console.log('onTaskNameInputChange_evt:', evt.target.value);
    setTaskNameValue(evt.target.value);
  };
  const onTaskDescInputChange = (evt: ChangeEvent<HTMLInputElement>) => {
    // console.log('onTaskDescInputChange_evt:', evt.target.value);
    setTaskDescValue(evt.target.value);
  };
  const onCheckboxInputChange = (evt: ChangeEvent<HTMLInputElement>) => {
    // console.log('onCheckboxInputChange_evt:', evt.target.checked);
    setCheckboxValue(evt.target.checked);
  };*/
  const onTaskNameInputChange = (evt: ChangeEvent<HTMLInputElement>) => {
    // console.log('onTaskNameInputChange:', 'name', name);
    setValue('name', evt.target.value);
  };
  const onTaskDescInputChange = (evt: ChangeEvent<HTMLInputElement>) => {
    // console.log('onTaskDescInputChange:', 'info', info);
    setValue('info', evt.target.value);
  };
  const onCheckboxInputChange = (evt: ChangeEvent<HTMLInputElement>) => {
    // console.log('onCheckboxInputChange_evt:', evt.target.checked);
    setValue('isImportant', evt.target.checked);
  };

  /*const onSubmit = async (evt: MouseEvent<HTMLButtonElement>) => {
    evt.preventDefault();
    // isDone = false при создании таски!!!
    console.log('onSubmit: ', { taskNameValue, taskDescValue, checkboxValue });
    const addTaskSuccess = await addTask({
      name: taskNameValue,
      info: taskDescValue,
      isImportant: checkboxValue,
      isDone: false,
    });
    if (addTaskSuccess) {
      setTaskNameValue('');
      setTaskDescValue('');
      setCheckboxValue(false);
      navigate('/');
    }
  };*/
  const onSubmit = async (data: FormTaskEntity) => {
    // isDone = false при создании таски!!!
    console.log('onSubmit: ', data);
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
    //     <form /*onSubmit={handleSubmit(onSubmit)}*/ className="add-form">
    //     <TextField
    //     disabled={isRequestActive}
    //     label={'Task name'}
    //     placeholder={'Clean room'}
    //     inputType={'text'}
    //     value={taskNameValue}
    //     onChange={onTaskNameInputChange}
    //     // errorText={''}
    //   />
    //   <TextField
    //     disabled={isRequestActive}
    //     label={'What to do(description)'}
    //     placeholder={'Clean my room'}
    //     inputType={'text'}
    //     value={taskDescValue}
    //     onChange={onTaskDescInputChange}
    //     // errorText={''}
    //   />
    //   <Checkbox
    //     disabled={isRequestActive}
    //     label={'Important'}
    //     onChange={onCheckboxInputChange}
    //     checked={checkboxValue}
    //   />
    //   <button disabled={isRequestActive} type="submit" className="btn btn-secondary d-block w-100" onClick={onSubmit}>
    //     Add task
    //   </button>
    // </form>

    <form onSubmit={handleSubmit(onSubmit)} className="add-form">
      <Controller
        control={control}
        name="name"
        render={({ field, fieldState: { error } }) => (
          <TextField
            disabled={isRequestActive}
            label={'Task name'}
            placeholder={'Clean room'}
            inputType={'text'}
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
            label={'What to do(description)'}
            placeholder={'Clean my room'}
            inputType={'text'}
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
            disabled={isRequestActive}
            label={'Important'}
            onChange={onCheckboxInputChange}
            checked={field.value}
          />
        )}
      />
      <button disabled={isRequestActive} type="submit" className="btn btn-secondary d-block w-100">
        Add task
      </button>
    </form>
  );
}

export const AddTaskForm = observer(AddTaskFormProto);
